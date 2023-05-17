import React from "react";

import Button from "../../../components/generals/button";
import Text from "../../../components/generals/text";

//---------------------------------Props---------------------------------
interface StepFourProps {
  totalToPay: number;
}

const StepFour: React.FC<StepFourProps> = ({ totalToPay }) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
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
          <Text type="h6" text="In contract" />
          <Text type="" text="000 DOT" />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="Total required" />
          <Text type="" text={`${totalToPay} DOT`} />
        </div>
      </div>
      <div className="w-[200px]">
        <Button type="active" text="add funds" icon="add" />
      </div>
    </>
  );
};

export default StepFour;
