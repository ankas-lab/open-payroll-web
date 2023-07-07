/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';
import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';

const StepThree = () => {
  const context = useContext(DappContext);
  const createContext = useContext(CreateContext);

  if (!context) {
    return null;
  }

  if (!createContext) {
    return null;
  }

  const { chainSymbol } = context;

  const {
    basePayment,
    initialBaseMultipliers,
    initialBeneficiaries,
    addInitialBeneficiary,
    removeInitialBeneficiary,
    handleChangeInitialBeneficiary,
    handleChangeMultiplierInitialBeneficiary,
    getTotalMultiplierByBeneficiary,
    getFinalPayByBeneficiary,
    calculateTotalToPay,
    setCanContinue,
    totalToPay,
    getTotalMultipliers,
  } = createContext;

  useEffect(() => {
    setCanContinue(false);
  }, []);

  //---------------------------------UI---------------------------------
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-baseline">
          <Text type="h2" text="Create beneficiaries" />
          <Text type="h6" text="3/4" />
        </div>
        <div className="">
          <Text type="" text="Now it's time for the beneficiaries, add their wallets and corresponding multipliers." />
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <Text type="h4" text={`Beneficiaries`} />
        <div className="flex flex-col gap-[10px] overflow-x-auto pb-2">
          {/* Header table row */}
          <div className="flex gap-[20px] text-left w-fit">
            <div className="w-[150px]">
              <Text type="overline" text="name" />
            </div>
            <div className="w-[150px]">
              <Text type="overline" text="address" />
            </div>
            {initialBaseMultipliers.map((m: any, i: number) => (
              <div key={'mh' + i} className="w-[150px]">
                <Text type="overline" text={m} />
              </div>
            ))}
            <div className="w-[150px]">
              <Text type="overline" text="total multipliers" />
            </div>
            <div className="w-[150px]">
              <Text type="overline" text="final pay" />
            </div>
            <div className="w-[150px]"></div>
          </div>
          {/* Beneficiarie row */}
          {initialBeneficiaries.map((b: any, bIndex: any) => (
            <div key={'b' + bIndex} className="flex gap-[20px] text-left w-fit items-center">
              <div className="w-[150px]">
                <input
                  className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                  type="text"
                  value={initialBeneficiaries[bIndex]?.name!}
                  placeholder="Name"
                  name="name"
                  onChange={(e) => handleChangeInitialBeneficiary(bIndex, e)}
                />
              </div>
              <div className="w-[150px]">
                <input
                  className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                  type="text"
                  value={initialBeneficiaries[bIndex]?.address!}
                  placeholder="Address"
                  name="address"
                  onChange={(e) => handleChangeInitialBeneficiary(bIndex, e)}
                />
              </div>
              {initialBaseMultipliers.map((bm: any, mIndex: any) => (
                <div key={'bm' + mIndex} className="w-[150px]">
                  <input
                    className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] p-1"
                    type="number"
                    name={mIndex}
                    onChange={(e) => handleChangeMultiplierInitialBeneficiary(bIndex, mIndex, e)}
                  />
                </div>
              ))}
              <div className="w-[150px]">
                <p>{getTotalMultiplierByBeneficiary(bIndex)}</p>
              </div>
              <div className="w-[150px]">
                <p>{getFinalPayByBeneficiary(bIndex)}</p>
              </div>
              <div className="w-[100px]">
                <Button type="text" text="" icon="delete" action={() => removeInitialBeneficiary(bIndex)} />
              </div>
            </div>
          ))}
        </div>
        <Button type="outlined" text="add other" icon="add" action={() => addInitialBeneficiary()} />
        <hr className="border rounded w-full"></hr>
        <div className="flex w-full justify-between">
          <Text type="h4" text="Total to pay" />
          <Text type="h4" text={`${parseInt(totalToPay).toFixed(2)} ${chainSymbol}`} />
        </div>
        <div className="w-[200px]"></div>
      </div>
    </div>
  );
};

export default StepThree;
