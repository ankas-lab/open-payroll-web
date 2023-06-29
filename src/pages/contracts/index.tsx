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

import { ToastContainer } from 'react-toastify';

export default function Contracts() {
  //---------------------------------Get contracts from context---------------------------------
  const context = useContext(DappContext);

  if (!context) {
    return null;
  }

  const { ownerContracts } = context;

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <ToastContainer />
      <div className="w-10/12 md:w-8/12 min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center">
          <Text type="h2" text="My contracts" />
          <Link className="w-fit" href="/create">
            <Button type="active" text="create new contract" icon="" />
          </Link>
        </div>
        <div className="md:w-[600px]">
          <Text
            type=""
            text="These are your contracts, you can select one to inspect what's inside, edit them or add funds to them. If you don't have any contract, create one!"
          />
        </div>
        <div className="overflow-x-auto">
          {ownerContracts.length > 0 ? (
            <table className="mt-[30px] md:mt-[50px]">
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
                  <th className="w-[80px]">
                    <Text type="overline" text="funds in contract" />
                  </th>
                  <th className="w-[80px]">
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
            <Text type="" text="It seems like there are no contracts here." />
          )}
        </div>
      </div>
    </main>
  );
}
