/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';
import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';
import toast from 'react-hot-toast';
import { useApi, useBalance, useWallet } from 'useink';
import { planckToDecimal, planckToDecimalFormatted } from 'useink/utils';

//---------------------------------Props---------------------------------

const StepFour = () => {
  const context = useContext(DappContext);
  const createContext = useContext(CreateContext);
  const { account } = useWallet();
  const balance = useBalance(account);
  const api = useApi('rococo-contracts-testnet');

  if (!createContext) {
    return null;
  }
  if (!context) {
    return null;
  }
  const { chainSymbol } = context;
  const {
    totalToPay,
    handleChangeFundsToTransfer,
    rawOwnerBalance,
    rawFundsToTransfer,
    setCanContinue,
    fundsToTransfer,
  } = createContext;

  useEffect(() => {
    rawFundsToTransfer > parseInt(rawOwnerBalance) ? setCanContinue(false) : setCanContinue(true);
    rawFundsToTransfer > parseInt(rawOwnerBalance) &&
      toast('❌ you cannot send more funds to the contract than the amount in your wallet ');
  }, [rawOwnerBalance, rawFundsToTransfer]);

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-baseline">
          <Text type="h2" text="Add funds (optional)" />
          <Text type="h6" text="4/4" />
        </div>
        <div className="">
          <Text
            type=""
            text={`Add funds to your contract, you can do it now or later. Remember that if your contract does not have sufficient funds you will not be able to pay your beneficiaries.`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <Text type="h6" text="Total required" />
        <Text type="" text={`${totalToPay + ' ' + chainSymbol} `} />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Text type="h6" text={`Total funds in ${account.name} `} />
        <Text
          type=""
          text={`${
            balance && planckToDecimal(balance.freeBalance, { api: api?.api })?.toFixed(2) + ' ' + chainSymbol
          } `}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Text type="h6" text="To add" />
        <div className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex">
          <input
            type="number"
            name="fundsToTransfer"
            min={0}
            max={parseInt(rawOwnerBalance).toFixed(2)}
            step={0.01}
            value={fundsToTransfer}
            id="fundsToTransfer"
            className="bg-opwhite without-ring w-full"
            onChange={(e) => {
              handleChangeFundsToTransfer(e);
            }}
          />
          <p className="mx-5">{chainSymbol}</p>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
