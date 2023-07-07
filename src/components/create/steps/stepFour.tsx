import React, { useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';
import { CreateContext } from '@/context/create';

//---------------------------------Props---------------------------------

const StepFour = () => {
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

  const { totalToPay } = createContext;
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
      {/* TODO: add contract clipboard */}
      <div className="flex gap-[10px]">
        <Text type="h4" text="My contract" />
        <div>
          <Button type="text" text="" icon="copy" />
        </div>
      </div>
      <div className="flex gap-[50px]">
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="In contract" />
          <Text type="" text="000 DOT" />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="Total required" />
          <Text type="" text={`${totalToPay} DOT`} />
        </div>
      </div>
      <Button type="active" text="add funds" icon="add" />
    </div>
  );
};

export default StepFour;
