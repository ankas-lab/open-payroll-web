import React, { useState, useEffect, useContext } from 'react';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { useApi, useContract, useWallet } from 'useink';
import { useClaim } from '@/hooks/useClaim';
import { useRouter } from 'next/router';
import metadata from '../../contract/open_payroll.json';
import { useBeneficiary, usePayrollContract } from '@/hooks';
import { planckToDecimal, planckToDecimalFormatted } from 'useink/utils';
import Loader from '../generals/Loader';
import { useAmountToClaim } from '@/hooks/useAmountToClaim';
import { DappContext } from '@/context';
import { IoIosAlert } from 'react-icons/io';

const ClaimInput = () => {
  //---------------------------------Get ContractAddress---------------------------------
  const router = useRouter();
  const { claim } = router.query;
  const contractAddress = claim?.toString();

  const api = useApi('rococo-contracts-testnet');

  const { account } = useWallet();
  const _contract = useContract(contractAddress!, metadata);
  const { handleClaimPayment, isClaiming, isClaimed } = useClaim(_contract);
  const { rawAmountToClaim } = useAmountToClaim(_contract, account?.address);
  const { rawContractBalance, nextBlockPeriod } = usePayrollContract(_contract);

  const [inputValue, setInputValue] = useState<number | string | undefined>();
  const [max, setMax] = useState<number | undefined>();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const calculateMax = () => {
    if (rawContractBalance! <= 33333333) {
      setMax(0);
    }
    if (rawContractBalance! >= rawAmountToClaim!) {
      setMax(planckToDecimal(rawAmountToClaim, api?.api));
    }
    if (rawContractBalance! < rawAmountToClaim! && rawContractBalance! > 33333333) {
      setMax(planckToDecimal(rawContractBalance, api?.api));
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

  const context = useContext(DappContext);

  if (!context) {
    return null;
  }

  const { chainSymbol } = context;

  return (
    <div className="order-1 md:order-3 md:w-4/12 flex flex-col gap-[20px]">
      <Text type="h4" text="Claim" />

      {max !== undefined ? (
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
            <Button type={max! > 0 ? 'outlined' : 'disabled'} text="max" action={() => setInputValue(max.toFixed(2))} />

            {isClaiming ? (
              <Button type={'disabled'} icon={'loading'} />
            ) : (
              <Button
                type={max! > 0 ? 'active' : 'disabled'}
                text={'claim'}
                action={() => {
                  handleClaimPayment(account?.address, inputValue);
                }}
              />
            )}
          </div>
          {nextBlockPeriod! && (
            <div className="bg-opdanger rounded p-[10px] pr-[20px] flex gap-3 text-[#FFFFFF]">
              <IoIosAlert className="h-12 w-12 m-0 " />
              <div className="flex flex-col gap-3">
                <div>
                  <Text
                    type=""
                    text={`You cannot claim your payment now, possibly the contract has no funds, contact the owner of the contract or try again in ${nextBlockPeriod}`}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ClaimInput;
