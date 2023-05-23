import React, { useEffect, useState } from "react";

import Button from "../../../components/generals/button";
import Text from "../../../components/generals/text";

//---------------------------------Interfaces---------------------------------
interface Multiplier {
  id: number;
  value: number;
  name: string;
}

//---------------------------------Props---------------------------------
interface StepTwoProps {
  onMultipliersChange: (multipliers: Multiplier[]) => void;
  onContractMultipliers: Multiplier[];
  handleCanContiue: any;
}

const StepTwo: React.FC<StepTwoProps> = ({
  onMultipliersChange,
  onContractMultipliers,
  handleCanContiue,
}) => {
  //---------------------------------States---------------------------------
  const [multipliers, setMultipliers] = useState<Multiplier[]>([]);

  //---------------------------------Handles---------------------------------
  const handleMultiplierChange = (id: number, name: string) => {
    const updatedMultipliers = multipliers.map((multiplier) =>
      multiplier.id === id ? { ...multiplier, name } : multiplier
    );
    setMultipliers(updatedMultipliers);
    onMultipliersChange(updatedMultipliers);
  };

  const handleAddMultiplier = () => {
    const newMultiplierId = Date.now();
    setMultipliers([
      ...multipliers,
      { id: newMultiplierId, value: 1, name: "" },
    ]);
  };

  const handleRemoveMultiplier = (id: number) => {
    if (multipliers.length > 1) {
      const updatedMultipliers = multipliers.filter(
        (multiplier) => multiplier.id !== id
      );
      setMultipliers(updatedMultipliers);
      onMultipliersChange(updatedMultipliers);
    }
  };

  //---------------------------------Effects---------------------------------
  //Disable can continue
  useEffect(() => {
    handleCanContiue(false);
  }, []);
  //Pull created multipliers
  useEffect(() => {
    if (onContractMultipliers.length > 0) {
      setMultipliers(onContractMultipliers);
      handleCanContiue(true);
    } else {
      setMultipliers([{ id: 1, value: 1, name: "" }]);
    }
  }, [onContractMultipliers]);
  //See changes + active/disable can continue
  useEffect(() => {
    console.log(multipliers);
    const hasEmptyMultiplier = multipliers.some(
      (multiplier) => multiplier.name === ""
    );
    hasEmptyMultiplier ? handleCanContiue(false) : handleCanContiue(true);
  }, [multipliers]);

  //---------------------------------UI---------------------------------
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Create multipliers" />
          <Text type="h6" text="2/4" />
        </div>
        <div className="">
          <Text
            type=""
            text={`Now it's time to create the base salary multipliers, for example "seniority", "antiquity", etc. Then you can assign a number for each type of multipliers.`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <form className="w-12/12 md:w-6/12 lg:w-4/12 flex flex-col gap-[10px] md:gap-[20px]">
          <Text type="h6" text="Multipliers" />
          {multipliers.map((multiplier) => (
            <div key={multiplier.id} className="flex gap-[10px]">
              <input
                type="text"
                value={multiplier.name}
                onChange={(e) =>
                  handleMultiplierChange(multiplier.id, e.target.value)
                }
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
              <div>
                <Button
                  type="outlined"
                  text=""
                  icon="delete"
                  action={() => handleRemoveMultiplier(multiplier.id)}
                />
              </div>
            </div>
          ))}
        </form>
      </div>
      <div className="w-fit mt-[40px]">
        <Button
          type="outlined"
          text="add another"
          icon="add"
          action={handleAddMultiplier}
        />
      </div>
    </>
  );
};

export default StepTwo;
