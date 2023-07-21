/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from 'react';

import Text from '../../generals/text';
import Button from '../../generals/button';
import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';
import toast from 'react-hot-toast';

const StepOne = () => {
  const context = useContext(DappContext);
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }
  if (!context) {
    return null;
  }
  const { chainSymbol } = context;

  const {
    canContinue,
    setCanContinue,
    contractName,
    periodicity,
    ownerEmail,
    setContractName,
    setOwnerEmail,
    setPeriodicity,
    setBasePayment,
    basePayment,
  } = createContext;

  const [periodicityType, setPeriodicityType] = useState<string>('fixed');

  useEffect(() => {
    if (basePayment !== undefined && basePayment > 0) {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [basePayment]);

  //---------------------------------UI---------------------------------
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-baseline">
          <Text type="h2" text="Create contract" />
          <Text type="h6" text="1/4" />
        </div>
        <div className="">
          <Text type="" text="We are going to create the contract for paying your beneficiaries." />
        </div>
      </div>
      <form className="md:w-6/12 lg:w-4/12 flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="Contract name*" />
          <input
            type="text"
            value={contractName}
            name="contractName"
            id="contractName"
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            onChange={(e) => {
              setContractName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="Base payment**" />
          <div className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex">
            <input
              type="number"
              name="basePayment"
              min={0}
              step={0.01}
              id="basePayment"
              value={basePayment}
              className="bg-opwhite without-ring w-full"
              onChange={(e) => {
                setBasePayment(parseFloat(e.target.value));
              }}
            />
            <p className="mx-5">{chainSymbol}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text type="h6" text="Periodicity***" />
          <div className="flex gap-[10px]">
            {periodicityType === 'fixed' ? (
              <Button type="active" text="fixed" action={() => setPeriodicityType('fixed')} />
            ) : (
              <Button type="outlined" text="fixed" action={() => setPeriodicityType('fixed')} />
            )}
            {periodicityType === 'custom' ? (
              <Button type="active" text="custom" action={() => setPeriodicityType('custom')} />
            ) : (
              <Button type="outlined" text="custom" action={() => setPeriodicityType('custom')} />
            )}
          </div>
          <div className="flex">
            {periodicityType === 'fixed' ? (
              <select
                name="periodicity"
                onChange={(e) => {
                  setPeriodicity(e.target.value);
                }}
                className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-1.5 flex"
              >
                <option value="7200">Daily</option>
                {/* x 5 days */}
                <option value="36000">Weekly</option>
                {/* x 30 days */}
                <option value="216000">Monthly</option>
              </select>
            ) : (
              <input
                type="number"
                min={1}
                step={1}
                name="periodicity"
                value={periodicity}
                className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex"
                onChange={(e) => {
                  setPeriodicity(e.target.value);
                }}
              />
            )}
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-[10px]">
        <Text
          type=""
          text="* The information is stored locally in your browser and not on the blockchain. The name serve the purpose of conveniently identifying the data in the interface. Considering the ease of remembering a name compared to a code, would you agree that names are more memorable?"
        />
        <Text
          type=""
          text="** This is the base payment of your beneficiaries, all later multipliers will be applied and added to this amount."
        />
        <Text
          type=""
          text="*** If you select the 'custom' option, please note that you must enter the number of blocks, blocks production is generally 5 blocks per minute depending on each chain."
        />
      </div>
    </div>
  );
};

export default StepOne;
