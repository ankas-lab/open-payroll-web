/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from 'react';

import Text from '@/components/generals/text';
import Button from '@/components/generals/button';
import { DappContext } from '@/context';
import { useRouter } from 'next/router';

interface ContractProps {
  _contractAddress: string | undefined;
  _setForget: any;
}

const Index = ({ _contractAddress, _setForget }: ContractProps) => {
  const router = useRouter();
  const context = useContext(DappContext);
  if (!context) {
    return null;
  }
  const { deleteContract } = context;
  const [contractAddressEntered, setContractAddressEntered] = useState<string | undefined>(undefined);

  return (
    <div className="absolute top-0 left-0 items-center justify-center flex backdrop-blur-md w-screen h-full">
      <div className="flex flex-col gap-[20px] p-[40px] rounded-md bg-opwhite border-2 border-oppurple w-fit h-fit">
        <div className="flex w-full">
          <div className="w-fit ml-auto">
            <Button
              type="text"
              icon="cancel"
              action={() => {
                _setForget(false);
              }}
            />
          </div>
        </div>

        <Text type="h5" text="Forget contract" />
        <Text type="" text="Enter the contract address to forget it from localStorage." />
        <div className="flex flex-col gap-[20px]">
          <input
            className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            id="enteredAddress"
            type="text"
            name="enteredAddress"
            onChange={(e) => setContractAddressEntered(e.target.value)}
          />
          <Button
            type={contractAddressEntered === _contractAddress ? 'danger' : 'disabled'}
            text="forget"
            action={() => {
              deleteContract(_contractAddress), router.push('/contracts');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
