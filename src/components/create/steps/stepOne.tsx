/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from 'react';

import Text from '../../generals/text';
import Button from '../../generals/button';
import { CreateContext } from '@/context/create';

const StepOne = () => {
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

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
    if (basePayment !== undefined) {
      setCanContinue(true);
    }
  }, [basePayment]);

  //---------------------------------UI---------------------------------
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Create contract" />
          <Text type="h6" text="1/4" />
        </div>
        <div className="">
          <Text type="" text="We are going to create the contract with which you will pay your beneficiaries." />
        </div>
      </div>
      <form className="w-12/12 md:w-6/12 lg:w-4/12 flex flex-col gap-[10px] md:gap-[20px]">
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <Text type="h6" text="Email*" />

          <input
            type="email"
            name="ownerEmail"
            id="ownerEmail"
            value={ownerEmail}
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            onChange={(e) => {
              setOwnerEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
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
                setBasePayment(e.target.value);
              }}
            />
            <p className="mx-5">DOT</p>
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
      <div>
        <Text
          type=""
          text="* These data are stored in your browser, not in the blockchain, the emails will be used to send notifications to you or your beneficiaries and the names to more easily identify the data in the interface, surely it is easier to remember a name than a code, or no?"
        />
        <Text
          type=""
          text="** This is the base payment of your beneficiaries, on this the multipliers will be applied and added to this amount."
        />
        <Text
          type=""
          text="*** If you select the 'custom' option, please note that you must enter the number of blocks, and that 5 blocks are generated per minute."
        />
      </div>
    </>
  );
};

export default StepOne;
