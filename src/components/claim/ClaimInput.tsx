import React, { useState, useEffect, useContext } from 'react';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { useApi, useBalance, useBlockHeader, useChainDecimals, useContract, useWallet } from 'useink';
import { useClaim } from '@/hooks/useClaim';
import { useRouter } from 'next/router';
import metadata from '../../contract/open_payroll.json';
import { usePayrollContract } from '@/hooks';
import { planckToDecimal } from 'useink/utils';

import { useAmountToClaim } from '@/hooks/useAmountToClaim';
import { DappContext } from '@/context';
import { IoIosAlert } from 'react-icons/io';

const ClaimInput = () => {
  //---------------------------------Get ContractAddress---------------------------------
  const router = useRouter();
  const { claim } = router.query;
  const contractAddress = claim?.toString();

  const api = useApi('rococo-contracts-testnet');
  const decimals = useChainDecimals('rococo-contracts-testnet');

  const blockHeader = useBlockHeader();
  const { account } = useWallet();
  const balance = useBalance(account);
  const _contract = useContract(contractAddress!, metadata);
  const { handleClaimPayment, isClaiming, isClaimed, claimPaymentGas, handleClaimPaymentTxGas } = useClaim(_contract);
  const { rawAmountToClaim } = useAmountToClaim(_contract, account?.address);
  const { rawContractBalance, nextBlockPeriod, rawNextBlockPeriod } = usePayrollContract(_contract);

  const [inputValue, setInputValue] = useState<number | string | undefined>(0);
  const [max, setMax] = useState<number | undefined>(0);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const calculateMax = () => {
    if (rawContractBalance! <= 33333333) {
      setMax(0);
    }
    if (rawContractBalance! >= rawAmountToClaim!) {
      setMax(planckToDecimal(rawAmountToClaim, { api: api?.api, decimals: decimals }));
    }
    if (rawContractBalance! < rawAmountToClaim! && rawContractBalance! > 33333333) {
      setMax(planckToDecimal(rawContractBalance, { api: api?.api, decimals: decimals }));
    }
  };

  useEffect(() => {
    isClaimed && setInputValue(0);
  }, [isClaimed]);

  useEffect(() => {
    if (rawContractBalance !== undefined && rawAmountToClaim !== undefined) {
      calculateMax();
    }
  }, [rawContractBalance, rawAmountToClaim]);

  useEffect(() => {
    handleClaimPaymentTxGas(account?.address, inputValue);
  }, [inputValue]);

  const context = useContext(DappContext);

  if (!context) {
    return null;
  }

  const { chainSymbol } = context;

  return (
    <div className="order-1 md:order-3 md:w-4/12 flex flex-col gap-[20px]">
      <Text type="h4" text="Claim" />

      {
        <form className="flex flex-col gap-[20px]">
          <div className="flex gap-[10px] items-center">
            <input
              type="number"
              min={0}
              max={max}
              step="0.01"
              disabled={max === 0 && true}
              onChange={handleInputChange}
              value={inputValue}
              className={
                max === 0
                  ? 'bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full'
                  : 'bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full'
              }
            />

            <p className="w-full">
              of {max?.toFixed(2)} {chainSymbol}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type={
                max! > 0 && claimPaymentGas! < planckToDecimal(balance?.freeBalance, { api: api?.api })!
                  ? 'outlined'
                  : 'disabled'
              }
              text="max"
              action={() => setInputValue(max!.toFixed(2))}
            />
            {isClaiming ? (
              <Button type={'disabled'} icon={'loading'} />
            ) : (
              <Button
                type={
                  max! > 0 && claimPaymentGas! < planckToDecimal(balance?.freeBalance, { api: api?.api })!
                    ? 'active'
                    : 'disabled'
                }
                text={'claim'}
                action={() => {
                  handleClaimPayment(account?.address, inputValue);
                }}
              />
            )}
          </div>

          {rawContractBalance! <= 33333333 ||
            (rawAmountToClaim! <= 33333333 && (
              <div className="bg-opdanger rounded p-[10px] pr-[20px] flex gap-3 text-[#FFFFFF]">
                <IoIosAlert className="min-h-[20px] min-w-[20px] m-0" />
                <div className="flex flex-col gap-3">
                  <div>
                    <Text
                      type=""
                      text={`You cannot claim your payment yet. If the contract has no funds, try to contact the owner of the contract. If you still have no funds to claim, wait ${nextBlockPeriod} for the payment period to expire. `}
                    />
                  </div>
                </div>
              </div>
            ))}

          {claimPaymentGas! > planckToDecimal(balance?.freeBalance, { api: api?.api })! && (
            <div className="bg-opdanger rounded p-[10px] pr-[20px] flex gap-3 text-[#FFFFFF]">
              <IoIosAlert className="min-h-[20px] min-w-[20px] m-0 " />
              <div className="flex flex-col gap-3">
                <div>
                  <Text type="" text={`You do not have sufficient funds to pay for the gas transaction.`} />
                </div>
              </div>
            </div>
          )}
        </form>
      }
    </div>
  );
};

export default ClaimInput;
