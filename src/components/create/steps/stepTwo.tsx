/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';
import { CreateContext } from '@/context/create';

const StepTwo = () => {
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

  const {
    canContinue,
    setCanContinue,
    initialBaseMultipliers,
    addInitialBaseMultiplier,
    handleChangeInitialBaseMultiplier,
    handleRemoveInitialBaseMultiplier,
  } = createContext;

<<<<<<< HEAD
  useEffect(() => {
    //setCanContinue(false);
  }, []);

=======
>>>>>>> la-nueva-dev
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-baseline">
          <Text type="h2" text="Create multipliers" />
          <Text type="h6" text="2/4" />
        </div>
        <div className="">
          <Text
            type=""
            text={`Now, let's establish the base salary multipliers, such as "seniority" and "performance." You can assign a numerical value to each type of multiplier.`}
          />
        </div>
      </div>
      <div className="flex flex-col  gap-[20px]">
        <Text type="h4" text="Multipliers" />
        {initialBaseMultipliers?.map((multiplier: any, i: number) => (
          <div key={i} className="flex items-center gap-[10px]">
            <Text type="h6" text={`Name: `} />
            <input
              type="text"
              value={multiplier}
              onChange={(e) => handleChangeInitialBaseMultiplier(i, e.target.value)}
              className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            />
            <div>
              <Button type="text" text="" icon="delete" action={() => handleRemoveInitialBaseMultiplier(i)} />
            </div>
          </div>
        ))}
      </div>
      <Button type="outlined" text="add another" icon="add" action={() => addInitialBaseMultiplier()} />
      <div className="w-fit"></div>
    </div>
  );
};

export default StepTwo;
