import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { Archivo } from 'next/font/google';
import { useRouter } from 'next/router';
const archivo = Archivo({ subsets: ['latin'] });
import { useWallet } from 'useink';
import WalletManager from '@/components/walletManager';
import { Toaster } from 'react-hot-toast';
import { useFindContractToClaim } from '@/hooks/useFindContractToClaim';
import ContractsTable from '@/components/claim/ContractsTable';

export default function Claim() {
  const router = useRouter();
  const { account } = useWallet();

  useEffect(() => {
    !account && router.push('/');
  }, [account]);

  const { handleFindContract, handleContractAddressChange, contractAddress, validContractAddress } =
    useFindContractToClaim();

  return (
    <main className={account ? `flex flex-col md:flex-row ${archivo.className}` : `flex flex-col ${archivo.className}`}>
      <Nav />
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            border: '2px solid #25064C',
            padding: '16px',
            backgroundColor: '#F8F7FF',
            borderRadius: '5px',
            color: '#000000',
          },
        }}
      />
      <div className="w-10/12 md:w-8/12 overflow-x-auto min-h-screen mx-auto flex flex-col gap-[40px] py-[10vh] md:py-0 md:pb-[20vh]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <div className="flex flex-col gap-[40px]">
          <Text type="h2" text="Contracts you can claim" />
          <div className="flex flex-col gap-[20px] md:w-8/12">
            <div className="">
              <Text type="h4" text="Find new contract" />
              <Text type="" text="Enter the contractAddress of the contract to claim your payment" />
            </div>
            <form className="flex flex-col gap-[10px]">
              <input
                id="contractAddress"
                type="text"
                name="contractAddress"
                placeholder="Contract Address"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                value={contractAddress}
                onChange={(e) => handleContractAddressChange(e.target.value)}
              />
              <div className="flex">
                {validContractAddress ? (
                  <Button type="active" text="find" action={() => handleFindContract(contractAddress)} />
                ) : (
                  <Button type="disabled" text="Invalid address" />
                )}
              </div>
            </form>
          </div>
          <ContractsTable />
        </div>
      </div>
    </main>
  );
}
