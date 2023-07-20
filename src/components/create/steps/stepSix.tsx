/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import Text from '../../generals/text';

import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';

import { IoIosCopy } from 'react-icons/io';
import Loader from '@/components/generals/Loader';
import { asContractInstantiatedEvent, formatEventName, isContractInstantiatedEvent } from 'useink/utils';

const StepSix = () => {
  const context = useContext(DappContext);
  const createContext = useContext(CreateContext);
  if (!context) {
    return null;
  }
  if (!createContext) {
    return null;
  }

  const { D, M } = createContext;

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
            <Text type="h2" text="Deploy the contract" />
            <Text type="h6" text="Lets go!" />
          </div>
        )}
        {D.status === 'Finalized' && D.wasDeployed && (
          <div className="flex justify-between items-baseline">
            <Text type="h2" text="Your contract has been created successfully" />
          </div>
        )}
        {D.status === 'Finalized' && !D.wasDeployed && (
          <div className="flex justify-between items-baseline">
            <Text type="h2" text="An error has occurred" />
          </div>
        )}
        {!D.wasDeployed && D.status !== 'Finalized' && (
          <div className="">
            <Text type="" text="Now we are ready to deploy your contract!" />
          </div>
        )}
        {!D.wasDeployed && D.status !== 'Finalized' && D.status !== 'None' && (
          <div className="">
            <Loader />
          </div>
        )}
        {D.status === 'Finalized' && !D.wasDeployed && (
          <div className="flex justify-between items-baseline">
            <Text type="" text="Something went wrong while deploying the contract, please try again." />
          </div>
        )}

        {D.status}

        {D.status === 'Finalized' && D.wasDeployed && (
          <div className="flex flex-col gap-[20px]">
            <Text type="h4" text="This is your contract address" />
            <div className="flex gap-3 align-middle">
              <Text type="" text={`${D.contractAddress}`} />
              <IoIosCopy onClick={() => copyToClipboard()} className="w-4 h-4 text-oppurple cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StepSix;
