import React, { useEffect, useState, useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';
import { CreateContext } from '@/context/create';

const StepThree = () => {
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

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
  } = createContext;

  //---------------------------------UI---------------------------------
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Create beneficiaries" />
          <Text type="h6" text="3/4" />
        </div>
        <div className="">
          <Text type="" text="Now it's time for the beneficiaries, add their wallets and corresponding multipliers." />
        </div>
      </div>
      <div className="flex gap-[20px]">
        {/*TODO ROC */}
        <Text type="h6" text={`Base payment: ${basePayment} ROC`} />
      </div>
      <div className="flex flex-col gap-[10px] overflow-x-auto pb-5">
        {/* Header table row */}
        <div className="flex gap-[20px] text-left w-fit md:w-12/12">
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
        <form className="flex flex-col gap-[5px]">
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
                    value={initialBeneficiaries[bIndex].multipliers[mIndex]?.[1]}
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
        </form>

        <hr className="border rounded my-[10px] w-full"></hr>
        <div className="flex w-full md:w-9/12 justify-between px-1">
          <Text type="h4" text="Total pay" />
          <Text type="h4" text={`${calculateTotalToPay()} ROC`} />
        </div>
        <div className="w-[200px]">
          <Button type="outlined" text="add other" icon="add" action={() => addInitialBeneficiary()} />
        </div>
      </div>
    </>
  );
};

export default StepThree;
