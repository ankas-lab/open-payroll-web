/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';

import { Podkova } from 'next/font/google';
import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';
import {
  asContractInstantiatedEvent,
  formatEventName,
  isContractInstantiatedEvent,
  isExtrinsicFailedEvent,
} from 'useink/utils';
import Loader from '@/components/generals/Loader';
import { IoIosCopy } from 'react-icons/io';
const podkova = Podkova({ subsets: ['latin'] });

const StepSix = () => {
  const [periodicityType, setPeriodicityType] = useState<string>('fixed');
  const context = useContext(DappContext);
  const createContext = useContext(CreateContext);
  if (!context) {
    return null;
  }
  if (!createContext) {
    return null;
  }

  const {
    contractName,
    setContractName,
    ownerEmail,
    setOwnerEmail,
    basePayment,
    setBasePayment,
    setPeriodicity,
    periodicity,
    initialBaseMultipliers,
    handleChangeInitialBaseMultiplier,
    handleRemoveInitialBaseMultiplier,
    initialBeneficiaries,
    addInitialBeneficiary,
    removeInitialBeneficiary,
    handleChangeInitialBeneficiary,
    handleChangeMultiplierInitialBeneficiary,
    getTotalMultiplierByBeneficiary,
    getFinalPayByBeneficiary,
    calculateTotalToPay,
    totalToPay,
    check,
    deploy,
    C,
    D,
    S,
    M,
  } = createContext;
  const { chainSymbol } = context;

  const copyToClipboard = () => {
    const textToCopy = D.contractAddress;
    textToCopy !== undefined && navigator.clipboard.writeText(textToCopy.toString());
  };

  //---------------------------------UI---------------------------------
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[20px]">
        {D.status !== 'Finalized' && (
          <div className="flex justify-between items-baseline">
            <Text type="h2" text="Deploy contract" />
            <Text type="h6" text="Lets go!" />
          </div>
        )}
        {D.status === 'Finalized' && D.wasDeployed && (
          <div className="flex justify-between items-baseline">
            <Text type="h2" text="Your contract was created successfully" />
          </div>
        )}
        {D.status === 'Finalized' && !D.wasDeployed && (
          <div className="flex justify-between items-baseline">
            <Text type="h2" text="An error has occurred" />
          </div>
        )}
        {!D.wasDeployed && D.status !== 'Finalized' && (
          <div className="">
            <Text type="" text="All is ready to deploy your contract!" />
          </div>
        )}
        {D.status === 'Finalized' && !D.wasDeployed && (
          <div className="flex justify-between items-baseline">
            <Text
              type=""
              text="Something went wrong while deploying the contract, try again or go back to the home page."
            />
          </div>
        )}

        {D.status === 'Finalized' && D.wasDeployed && (
          <div className="flex flex-col gap-[20px]">
            <Text type="h4" text="This is your contract address" />
            <div className="flex gap-3 align-middle">
              <Text type="" text={`${D.contractAddress}`} />
              <IoIosCopy onClick={() => copyToClipboard()} className="w-4 h-4 text-oppurple cursor-pointer" />
            </div>
            {/* ---------------------------------Funds--------------------------------- */}
            <div className="flex flex-col gap-[20px] md:border-l-2 md:border-oppurple md:pl-[40px] md:order-2">
              <Text type="h4" text="Add funds (optional)" />
              <div className="flex flex-col gap-[20px]">
                {/* TODO add funds */}
                <Text type="h6" text={`Minimum funds necesaries: ${totalToPay} ${chainSymbol}`} />
                <Button type="active" text="add funds" icon="add" action />
              </div>
            </div>
          </div>
        )}

        {D.contractAddress && (
          <div className="rounded p-2 border-oppurple border-2">
            <h4 className="test-xs">Contract Address</h4>
            <h3 className="test-sm">{D.contractAddress}</h3>
          </div>
        )}
        {M.error && (
          <div className="rounded p-2 border-oppurple border-2">
            <div>M.error: {M.error}</div>
          </div>
        )}
        {D.gasConsumed && (
          <div className="rounded p-2 border-oppurple border-2">
            <h3 className="test-xs uppercase font-semibold">Gas Consumed</h3>
            <ul className="p-0 list-none">
              <li>refTime: {D.gasConsumed.refTime.toString()}</li>
              <li>proof size: {D.gasConsumed.proofSize.toString()}</li>
            </ul>
          </div>
        )}

        {D.gasRequired && (
          <div className="rounded p-2 border-oppurple border-2">
            <h3 className="test-xs uppercase font-semibold">Gas Required</h3>
            <ul className="p-0 list-none">
              <li>refTime: {D.gasRequired.refTime.toString()}</li>
              <li>proof size: {D.gasRequired.proofSize.toString()}</li>
            </ul>
          </div>
        )}

        {D.storageDeposit && (
          <div className="rounded p-2 border-oppurple border-2">
            <ul className="p-0 list-none">
              <li>Storage Deposit: {D.storageDeposit.toString()}</li>
            </ul>
          </div>
        )}

        {D.error && <p className="rounded p-2 border-oppurple border-2">{D.error}</p>}

        {D.events?.length > 0 && (
          <div className="mt-6 w-full">
            <h3 className="text-sm">Events</h3>
            <ul className="rounded-lg bg-white/5 p-4 mt-6 w-full flex flex-col border-oppurple border-2 gap-2">
              {D.events.map((event: any) => (
                <li key={event.toString()} className="rounded p-2 border-oppurple border-2">
                  {isContractInstantiatedEvent(event) ? (
                    <div>
                      <h4 className="font-bold">{formatEventName(event)}</h4>
                      <h4>Deployer: {asContractInstantiatedEvent(event)?.deployer}</h4>

                      <h4>Contract Address: {asContractInstantiatedEvent(event)?.contractAddress}</h4>
                    </div>
                  ) : (
                    formatEventName(event)
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default StepSix;

/*

{D.contractAddress && (
              <div className="rounded p-2 border-oppurple border-2">
                <h4 className="test-xs">Contract Address</h4>
                <h3 className="test-sm">{D.contractAddress}</h3>
              </div>
            )}
            {M.error && (
              <div className="rounded p-2 border-oppurple border-2">
                <div>M.error: {M.error}</div>
              </div>
            )}
            {D.gasConsumed && (
              <div className="rounded p-2 border-oppurple border-2">
                <h3 className="test-xs uppercase font-semibold">Gas Consumed</h3>
                <ul className="p-0 list-none">
                  <li>refTime: {D.gasConsumed.refTime.toString()}</li>
                  <li>proof size: {D.gasConsumed.proofSize.toString()}</li>
                </ul>
              </div>
            )}

            {D.gasRequired && (
              <div className="rounded p-2 border-oppurple border-2">
                <h3 className="test-xs uppercase font-semibold">Gas Required</h3>
                <ul className="p-0 list-none">
                  <li>refTime: {D.gasRequired.refTime.toString()}</li>
                  <li>proof size: {D.gasRequired.proofSize.toString()}</li>
                </ul>
              </div>
            )}

            {D.storageDeposit && (
              <div className="rounded p-2 border-oppurple border-2">
                <ul className="p-0 list-none">
                  <li>Storage Deposit: {D.storageDeposit.toString()}</li>
                </ul>
              </div>
            )}

            {D.error && <p className="rounded p-2 border-oppurple border-2">{D.error}</p>}

            {D.events?.length > 0 && (
              <div className="mt-6 w-full">
                <h3 className="text-sm">Events</h3>
                <ul className="rounded-lg bg-white/5 p-4 mt-6 w-full flex flex-col border-oppurple border-2 gap-2">
                  {D.events.map((event: any) => (
                    <li key={event.toString()} className="rounded p-2 border-oppurple border-2">
                      {isContractInstantiatedEvent(event) ? (
                        <div>
                          <h4 className="font-bold">{formatEventName(event)}</h4>
                          <h4>Deployer: {asContractInstantiatedEvent(event)?.deployer}</h4>

                          <h4>Contract Address: {asContractInstantiatedEvent(event)?.contractAddress}</h4>
                        </div>
                      ) : (
                        formatEventName(event)
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button type="button" onClick={() => check()} className="flex items-center w-full ">
            Check
          </button>
          <button type="button" onClick={() => deploy()} className="flex items-center w-full ">
            Deploy
          </button>

 */
