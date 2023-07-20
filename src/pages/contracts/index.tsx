/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from 'react';
import Link from 'next/link.js';

import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';

import ContractRow from '../../components/contracts/contractRow';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { DappContext } from '@/context';
import WalletManager from '@/components/walletManager';

import { Toaster } from 'react-hot-toast';
import { useWallet } from 'useink';
import { useRouter } from 'next/router';

export default function Contracts() {
  const { account } = useWallet();
  const router = useRouter();
  //---------------------------------Get contracts from context---------------------------------
  const context = useContext(DappContext);

  if (!context) {
    return null;
  }

  const { ownerContracts, getStoredContracts, getOwner } = context;

  useEffect(() => {
    account === undefined && router.push('/');
  }, [account]);

  useEffect(() => {
    getStoredContracts();
    getOwner();
  }, []);

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
          <div className="flex flex-col-reverse gap-[40px] md:flex-row md:justify-between">
            <Text type="h2" text="My contracts" />
            <Link className="w-fit" href="/create">
              <Button type="active" text="create new contract" />
            </Link>
          </div>
          <Text
            type=""
            text="These are your contracts, you can select one to inspect what's inside, for editing or adding funds. If you don't have any contract, you are able to create one!"
          />
        </div>
        <div className="overflow-x-auto">
          {ownerContracts.length > 0 ? (
            <table className="">
              <tbody>
                <tr className="flex gap-[50px] text-left px-2">
                  <th className="w-[25px]"></th>
                  <th className="w-[150px]">
                    <Text type="overline" text="contract name" />
                  </th>
                  <th className="w-[100px]">
                    <Text type="overline" text="beneficiaries" />
                  </th>
                  <th className="w-[80px]">
                    <Text type="overline" text="periodicity" />
                  </th>
                  <th className="w-[100px]">
                    <Text type="overline" text="funds in contract" />
                  </th>
                  <th className="w-[100px]">
                    <Text type="overline" text="funds needed" />
                  </th>
                  <th className="w-[80px]">
                    <Text type="overline" text="next pay in" />
                  </th>
                  <th className="w-[80px]">
                    <Text type="overline" text="network" />
                  </th>
                  <th className="w-[80px]">
                    <Text type="overline" text="state" />
                  </th>
                </tr>
                {/* .map of contracts */}
                {ownerContracts.map((c, i) => (
                  <ContractRow key={i} contract={c} i={i} />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col gap-[10px]">
              <Text type="h4" text="It seems that there is no contract yet!" />
              <Text type="" text="Start creating one right now" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
