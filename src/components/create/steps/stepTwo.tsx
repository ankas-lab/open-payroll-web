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
    initialBaseMultipliers,
    addInitialBaseMultiplier,
    handleChangeInitialBaseMultiplier,
    handleRemoveInitialBaseMultiplier,
  } = createContext;

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
          {initialBaseMultipliers?.map((multiplier: any, i: number) => (
            <div key={i} className="flex gap-[10px]">
              <input
                type="text"
                value={multiplier}
                onChange={(e) => handleChangeInitialBaseMultiplier(i, e.target.value)}
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
              <div>
                <Button type="outlined" text="" icon="delete" action={() => handleRemoveInitialBaseMultiplier(i)} />
              </div>
            </div>
          ))}
        </form>
      </div>
      <div className="w-fit mt-[40px]">
        <Button type="outlined" text="add another" icon="add" action={() => addInitialBaseMultiplier()} />
      </div>
    </>
  );
};

export default StepTwo;
