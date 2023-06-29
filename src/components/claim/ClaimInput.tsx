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

const ClaimInput = () => {
  //---------------------------------Get ContractAddress---------------------------------
  const router = useRouter();
  const { claim } = router.query;
  const contractAddress = claim?.toString();

  const api = useApi('rococo-contracts-testnet');

  const { account } = useWallet();
  const _contract = useContract(contractAddress!, metadata);
  const { handleClaimPayment, isClaiming, isClaimed } = useClaim(_contract);
  const { rawAmountToClaim } = useBeneficiary(account?.address, _contract);
  const { rawContractBalance } = usePayrollContract(_contract);

  //TODO: handle Time
  const [timeToClaim, setTimeToClaim] = useState<string>('');
  const [inputValue, setInputValue] = useState<number | string | undefined>();
  const [max, setMax] = useState<number | undefined>();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const calculateMax = () => {
    if (rawContractBalance! < 33333333) {
      setMax(0);
    }
    if (rawContractBalance! > rawAmountToClaim!) {
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
    if (rawContractBalance !== undefined && rawContractBalance !== undefined) {
      calculateMax();
    }
  }, [rawContractBalance, rawAmountToClaim]);

  return (
    <div className="order-1 md:order-3 md:w-4/12 flex flex-col ">
      <Text type="h4" text="Claim" />

      {max ? (
        <form className="flex flex-col gap-[20px]">
          <div className="flex gap-[20px] items-center">
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

            <p className="w-full">of {max?.toFixed(2)} ROC</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button type="outlined" text="max" action={() => setInputValue(max.toFixed(2))} />

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
          {/*<Text type="" text={`You still can't claim your payment, try again in ${timeToClaim}`} />*/}
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ClaimInput;
