import React from 'react';
import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { Archivo, Podkova } from 'next/font/google';
import WalletManager from '@/components/walletManager';
const archivo = Archivo({ subsets: ['latin'] });
const podkova = Podkova({ subsets: ['latin'] });
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLoading } from 'react-icons/ai';
import metadata from '../../contract/open_payroll.json';
import { useContract, useCall, useTx, useWallet, useApi, useBlockHeader, useTokenSymbol } from 'useink';
import { stringNumberToBN } from 'useink/utils';
import { useBeneficiary, usePayrollContract } from '@/hooks';
import { blocksToTime } from '@/utils/time';
import Link from 'next/link';
import { useClaim } from '@/hooks/useClaim';
import { DappContext } from '@/context';
import NotBeneficiary from '@/components/claim/NotBeneficiary';
import Loader from '@/components/generals/Loader';
import Header from '@/components/claim/Header';
import BeneficiaryDataRow from '@/components/claim/BeneficiaryDataRow';
import MultiplierHeaderCell from '@/components/contracts/multiplierHeaderCell';
import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import { useMultipliers } from '@/hooks/useMultipliers';
import ClaimInput from '@/components/claim/ClaimInput';
import MultiplierName from '@/components/generals/MultiplierName';
import { useAmountToClaim } from '@/hooks/useAmountToClaim';

export default function Claim() {
  //---------------------------------Get ContractAddress---------------------------------
  const router = useRouter();
  const { claim } = router.query;
  const contractAddress = claim?.toString();

  //---------------------------------Context---------------------------------
  const context = useContext(DappContext);
  const {
    findContractCanClaimInLocalStorage,
    addressToShort,
    contractCanClaimFromLocalStorage,
    changeContractCanClaimNameInLocalStorage,
  } = context!;

  //---------------------------------Hooks---------------------------------
  const { account } = useWallet();

  const _contract = useContract(contractAddress!, metadata);

  const { lastClaim } = useBeneficiary(account?.address, _contract);
  const { amountToClaim } = useAmountToClaim(_contract, account?.address);

  const { basePayment, periodicity, contractBalance, contractState, listBeneficiaries } = usePayrollContract(_contract);

  const { multipliersIdList } = useMultipliers(_contract);

  const { checkIfBeneficiary, isBeneficiary, isFindedEnds } = useClaim(_contract);

  const chainSymbol = useTokenSymbol('rococo-contracts-testnet');

  const blockHeader = useBlockHeader();

  //---------------------------------States---------------------------------

  const [showChangeName, setShowChangeName] = useState<boolean>(false);
  const [newContractName, setNewContractName] = useState<string | undefined>(undefined);

  useEffect(() => {
    listBeneficiaries !== undefined && checkIfBeneficiary(account?.address);
  }, [account, listBeneficiaries]);

  useEffect(() => {
    isBeneficiary && findContractCanClaimInLocalStorage(contractAddress, account?.address);
  }, [isBeneficiary]);

  useEffect(() => {
    if (
      isBeneficiary &&
      lastClaim &&
      periodicity &&
      blockHeader?.blockNumber &&
      amountToClaim &&
      amountToClaim === `0 ${chainSymbol}`
    ) {
      let blocksUntilClaim = stringNumberToBN(lastClaim).toNumber() + periodicity - blockHeader.blockNumber;
      // setTimeToClaim(blocksToTime(blocksUntilClaim));
    }
  }, [lastClaim, blockHeader, periodicity, amountToClaim]);

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        {isFindedEnds ? (
          isBeneficiary && contractCanClaimFromLocalStorage ? (
            <div>
              <Header />
              <div className="flex flex-col gap-5 mt-5">
                <div className="flex flex-col md:w-12/12 lg:w-8/12 md:flex-row gap-[20px]">
                  <div className="order-2 md:order-1 md:w-8/12">
                    <Text type="h4" text="Contract data" />
                    <div className="grid grid-cols-2 gap-[20px]">
                      <div className="">
                        <Text type="h6" text="Contract name" />
                        {showChangeName ? (
                          <div className="flex gap-[10px]">
                            <input
                              type="text"
                              name="contractName"
                              placeholder={
                                contractCanClaimFromLocalStorage.name ||
                                addressToShort(contractCanClaimFromLocalStorage.contractAddress)
                              }
                              onChange={(e) => setNewContractName(e.target.value)}
                              className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                            />
                            <div className="flex gap-[5px]">
                              <Button
                                type="text"
                                icon="check"
                                action={() => {
                                  changeContractCanClaimNameInLocalStorage(
                                    contractAddress,
                                    account?.address,
                                    newContractName,
                                  ),
                                    setShowChangeName(false);
                                }}
                              />
                              <Button type="text danger" icon="cancel" action={() => setShowChangeName(false)} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-[20px] items-center w-full -mt-2">
                            <p className="w-fit">
                              {contractCanClaimFromLocalStorage.name ||
                                addressToShort(contractCanClaimFromLocalStorage.contractAddress)}
                            </p>
                            <div>
                              <Button type="text" icon="edit" action={() => setShowChangeName(true)} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <Text type="h6" text="Status" />
                        <Text type="" text={contractState ? 'ON' : 'OFF'} />
                      </div>
                      <div className="">
                        <Text type="h6" text="Base payment" />
                        <Text type="" text={basePayment} />
                      </div>
                      <div className="">
                        <Text type="h6" text="Amount to claim" />
                        <Text type="" text={amountToClaim} />
                      </div>
                      <div className="">
                        <Text type="h6" text="Funds in contract" />
                        <Text type="" text={contractBalance!} />
                      </div>
                      <div className="">
                        <Text type="h6" text="Last claim" />
                        <Text type="" text={`${lastClaim} ago`} />
                      </div>
                      <div className="">
                        <Text type="h6" text="Multipliers" />
                        {multipliersIdList !== undefined &&
                          multipliersIdList.map((m, i) => (
                            <MultiplierName key={i} multiplierId={m} _contract={_contract} />
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:order-2 border-[1px] border-oppurple rounded-full"></div>
                  <ClaimInput />
                </div>
                <div className="">
                  <Text type="h4" text="My payment info" />
                  <div className="overflow-x-auto">
                    <table>
                      <tbody>
                        <tr className="flex gap-[50px] text-left px-2">
                          {multipliersIdList !== undefined &&
                            multipliersIdList.map((m: string) => (
                              <MultiplierHeaderCell key={m} contract={_contract} multiplierId={m} />
                            ))}
                          <th className="w-[100px]">
                            <Text type="overline" text="final pay" />
                          </th>
                          <th className="w-[100px]">
                            <Text type="overline" text="total to claim" />
                          </th>
                          <th className="w-[100px]">
                            <Text type="overline" text="last update" />
                          </th>
                        </tr>
                        <BeneficiaryDataRow contract={_contract} beneficiaryAddress={account?.address} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NotBeneficiary />
          )
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
}
