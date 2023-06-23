import React from 'react';
import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { Archivo, Podkova } from 'next/font/google';
import WalletManager from '@/components/walletManager';
const archivo = Archivo({ subsets: ['latin'] });
const podkova = Podkova({ subsets: ['latin'] });
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLoading } from 'react-icons/ai';
import metadata from '../../contract/open_payroll.json';
import { toast } from 'react-toastify';
import { useTxNotifications, useNotifications } from 'useink/notifications'
import { useContract, useCall, useTx, useWallet, useApi, useBlockHeader, useTokenSymbol } from 'useink';
import {
  pickDecoded,
  pickResultOk,
  pickResultErr,
  stringNumberToBN,
  isBroadcast,
  isErrored,
  isFinalized,
  isInBlock,
  isInvalid,
  isPendingSignature,
} from 'useink/utils';
import { useBeneficiary, usePayrollContract } from '@/hooks';
import { blocksToTime } from '@/utils/time';

export default function Claim() {
  //TODO: pasar a tabla los datos del beneficiario
  const router = useRouter();
  const api = useApi('rococo-contracts-testnet');

  const { claim } = router.query;
  const contractAddress = claim?.toString();

  const [beneficiaryList, setBeneficiaryList] = useState<string[]>([]);
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');
  const [timeToClaim, setTimeToClaim] = useState<string>('');
  const [inputValue, setInputValue] = useState<number | null>();

  const { account } = useWallet();
  const _contract = useContract(contractAddress!, metadata);
  const { amountToClaim, lastClaim, beneficiaryMultipliers, beneficiaryUnclaimedPayments, isBeneficiary } = useBeneficiary(
    account?.address,
    _contract,
  );

  const { basePayment, baseMultipliers, periodicity, contractBalance, contractState } = usePayrollContract(_contract);

  const chainSymbol = useTokenSymbol('rococo-contracts-testnet');

  const getListBeneficiaries = useCall<string[]>(_contract, 'getListBeneficiaries');
  const claimPaymentTx = useTx(_contract, 'claimPayment');
  useTxNotifications(claimPaymentTx);
  const { notifications } = useNotifications()

  const blockHeader = useBlockHeader();

  useEffect(() => {
    if (baseMultipliers && basePayment) {
      setLoading('done');
    }
  }, [baseMultipliers, basePayment, beneficiaryMultipliers]);

  useEffect(() => {
    // TODO: check if there are no enough funds to claim, we have to limited the amount to claim
    // and if funds are 0, we have to hide the claim button
    if (
      isBeneficiary &&
      lastClaim &&
      periodicity &&
      blockHeader?.blockNumber &&
      amountToClaim &&
      amountToClaim === `0 ${chainSymbol}`
    ) {
      let blocksUntilClaim = stringNumberToBN(lastClaim).toNumber() + periodicity - blockHeader.blockNumber;
      setTimeToClaim(blocksToTime(blocksUntilClaim));
    }
  }, [lastClaim, blockHeader, periodicity, amountToClaim]);
  

  useEffect(() => {
    if (isPendingSignature(claimPaymentTx)) {
      console.log({ type: claimPaymentTx.status, message: `Please sign the transaction in your wallet` });
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(claimPaymentTx)) {
      console.log({
        type: claimPaymentTx.status,
        message: 'Transaction has been broadcast!',
      });
      toast('Transaction has been broadcast!');
    }

    if (isInBlock(claimPaymentTx)) {
      console.log({
        type: claimPaymentTx.status,
        message: 'Transaction is in the block.',
      });
      toast('Transaction is in block.');
    }

    if (isErrored(claimPaymentTx)) {
      console.log({ type: claimPaymentTx.status, message: `Error` });
      toast(`Error`);
    }
    if (isInvalid(claimPaymentTx)) {
      console.log({ type: claimPaymentTx.status, message: `IsInvalid` });
      toast(`IsInvalid`);
    }

    if (isFinalized(claimPaymentTx)) {
      console.log({ type: claimPaymentTx.status, message: `The transaction has been finalized.` });
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimPaymentTx.status]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(value);
    setInputValue(value);
  };

  const handleClaimPayment = () => {
    const options = undefined;
    claimPaymentTx.signAndSend([account.address, inputValue], options, (result, api, error) => {

      if (error) {
        console.log('error');

        console.error(JSON.stringify(error));
      }

      if (result) {
        console.log('result');

        console.log(JSON.stringify(result));
      }
    });
  };

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        {loading === 'loading' ? (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        ) : loading === 'done' && isBeneficiary && beneficiaryMultipliers ? (
          <div>
            <Text type="h2" text="Claiming in My contract" />
            <div className="">
              <Text type="h4" text="Yeah! You have funds to claim here!" />
              <Text
                type=""
                text="contract You can claim everything or choose when you want to claim, you can also add a name to the contract to easily identify it."
              />
            </div>
            <div className="flex">
              <div className="w-8/12 flex flex-col gap-[20px]">
                <Text type="h4" text="Contract data" />
                <form className="flex gap-[20px] items-center">
                  <label className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}>
                    Contract name
                  </label>
                  <input
                    id="GET-name"
                    type="text"
                    name="name"
                    placeholder="Contract name"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                  />
                </form>
                <div className="grid grid-cols-4 gap-[20px]">
                  <div className="">
                    <Text type="h6" text="Base payment" />
                    <Text type="" text={basePayment} />
                  </div>
                  {baseMultipliers?.map((multiplier: any, index: any) => (
                    <div className="" key={index}>
                      <Text type="h6" text={multiplier.name} />
                      <Text type="" text={beneficiaryMultipliers[index]} />
                    </div>
                  ))}
                  <div className="">
                    <Text type="h6" text="Amount to claim" />
                    <Text type="" text={amountToClaim} />
                  </div>
                  <div className="">
                    <Text type="h6" text="Last claim" />
                    <Text type="" text={`${lastClaim} ago`} />
                  </div>
                  <div className="">
                    <Text type="h6" text="Funds in contract" />
                    {contractBalance ? (
                      <Text type="" text={contractBalance} />
                    ) : (
                      <AiOutlineLoading className="animate-spin" />
                    )}
                  </div>
                  <div className="">
                    <Text type="h6" text="Status" />
                    <Text type="" text={contractState ? 'ON' : 'OFF'} />
                  </div>
                </div>
              </div>
              <div className="border border-oppurple rounded-lg mx-5"></div>
              <div className="w-4/12 flex flex-col gap-[10px]">
                <Text type="h6" text="Claim" />

                <form className="flex flex-col gap-[20px]">
                  <div className="flex gap-[20px] items-center">
                    <input
                      id="GET-name"
                      type="number"
                      name=""
                      onChange={handleInputChange}
                      className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                    />
                    <label>of {amountToClaim}</label>
                  </div>
                  {
                    /*<Button type="active" text="claim" />*/
                    <>
                      <Button
                        type={timeToClaim === '' ? 'active' : 'disabled'}
                        text="claim"
                        action={() => {
                          handleClaimPayment();
                        }}
                      />
                      <Text type="" text={`You still can't claim your payment, try again in ${timeToClaim}`} />
                    </>
                  }
                </form>
              </div>
            </div>
          </div>
        ) : loading === 'done' && !isBeneficiary ? (
          <div>You are not a beneficiary</div> //TODO: add component to show this
        ) : null}
      </div>
    </main>
  );
}
