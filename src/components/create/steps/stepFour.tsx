import React, { useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';
import { CreateContext } from '@/context/create';
import { useBalance, useWallet } from 'useink'

//---------------------------------Props---------------------------------

const StepFour = () => {
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

  const { totalToPay, fundsToTransfer, handleChangeFundsToTransfer } = createContext;

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
      <div className="flex gap-[10px]">
        <Text type="h4" text="My contract" />
        <div>
          <Button type="text" text="" icon="copy" />
        </div>
      </div>
      <div className="flex gap-[50px]">
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="You will send" />
          <Text type="" text= {`${fundsToTransfer} DOT`} />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="Total required to pay one period" />
          <Text type="" text={`${totalToPay} DOT`} />
        </div>
      </div>
      <Button type="active" text="add funds" icon="add" />
      <div className="w-[150px]">
                <input
                  className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                  type="number"
                  value={fundsToTransfer}
                  placeholder="Funds to transfer"
                  name="fundsToTransfer"
                  onChange={(e) => handleChangeFundsToTransfer(e)}
                />
              </div>
    </div>
  );
};

export default StepFour;
