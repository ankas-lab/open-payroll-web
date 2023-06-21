import React, { useEffect, useState, useRef, useContext } from 'react';

import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';

import { AiOutlineLoading } from 'react-icons/ai';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract, useCall, useBlockHeader, useApi, useWallet, useChainDecimals, useTokenSymbol } from 'useink';
import { pickDecoded, planckToDecimalFormatted } from 'useink/utils';
import metadata from '../../contract/open_payroll.json';
import { useRouter } from 'next/router';
import BeneficiaryRow from '@/components/contracts/beneficiaryRow';
import WalletManager from '@/components/walletManager';
import Link from 'next/link';
import { GoKebabHorizontal } from 'react-icons/go';
import MultiplierHeaderCell from '@/components/contracts/multiplierHeaderCell';
import { DappContext } from '@/context';
import { IoIosCopy } from 'react-icons/io';

import { usePayrollContract } from '@/hooks';

import { BN } from 'bn.js';
import Result from '../create/results';

interface BaseMultiplier {
  name: string;
  validUntilBlock: any;
}

export default function Contract() {
  //---------------------------------Security---------------------------------
  const router = useRouter();

  const { account } = useWallet();

  //---------------------------------Get contract address---------------------------------
  const {
    query: { contract },
  } = router;
  const contractAddress = contract?.toString();
  //---------------------------------Get any from context---------------------------------
  const context = useContext(DappContext);

  // if (!context) {
  //   //TODO This should not return null here
  //   return null;
  // }

  const { findContractInLocalStorage } = context!;
  const _contract = useContract(contractAddress!, metadata);
  const {
    contractState,
    contractBalance,
    periodicity,
    totalDebts,
    nextBlockPeriodInDays,
    amountBeneficiaries,
    basePayment,
    listBeneficiaries,
    multipliersList,
  } = usePayrollContract(_contract);

  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');

  //TODO: showMenu
  //---------------------------------Show menu---------------------------------
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (_contract) {
      setLoading('done');
    }
  }, [_contract]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  //---------------------------------Copy to Clipboard---------------------------------
  const copyToClipboard = () => {
    const textToCopy = contractAddress;
    textToCopy !== undefined && navigator.clipboard.writeText(textToCopy.toString());
  };

  //---------------------------------Functions to Format-------------------------------------
  //TODO If the beneficiary doesn't have a multiplier, show something that indicates an unassigned multiplier.
  return loading === 'done' ? (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="flex flex-col">
            {contractAddress && <Text type="h2" text={`${findContractInLocalStorage(contractAddress).name}`} />}
            <div className="flex items-center -mt-1">
              <Text type="overline" text={`${contractAddress}`} />
              <IoIosCopy className="text-oppurple mx-2" onClick={() => copyToClipboard()} />
            </div>
          </div>
          <div className="flex gap-2 ml-auto mt-0 md:mt-4 relative">
            <div>
              <Button type="active" text="add funds" icon="" />
            </div>
            <div ref={menuRef} className="cursor-pointer w-12">
              {showMenu ? (
                <div className="absolute right-0 pt-[10px] py-[5px] px-[5px] border-2 border-oppurple rounded-[5px] bg-[#FFFFFF] flex flex-col gap-[16px] w-[300px] z-[100]">
                  <Link className="rounded hover:bg-opwhite p-1.5 cursor-pointer" href={`/edit/${contractAddress}`}>
                    <Text text="Edit" type="" />
                  </Link>
                </div>
              ) : (
                <div
                  onClick={() => setShowMenu(true)}
                  className="text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[13px] px-[13px] bg-opwhite text-[14px] uppercase w-full justify-center hover:bg-opwhite transition duration-100"
                >
                  <GoKebabHorizontal className="leading-none p-0 m-0 text-base rotate-90" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* CONTRACT INFO */}
        <div
          className={`mt-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[20px] text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}
        >
          <div className="capitalize">
            <Text type="overline" text="periodicity" />
            {periodicity ? (
              <p>{periodicity}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>

          <div className="capitalize">
            <Text type="overline" text="next pay in (days)" />
            {nextBlockPeriodInDays ? (
              <p className="text-ellipsis  ">{nextBlockPeriodInDays}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>

          <div className="capitalize">
            <Text type="overline" text="beneficiaries" />
            {amountBeneficiaries ? (
              <p>{amountBeneficiaries}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="base payment" />
            {basePayment ? (
              <p>{basePayment}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="funds in contract" />

            {contractBalance ? (
              <p className="text-ellipsis  ">{contractBalance}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="total funds needed" />
            {totalDebts ? (
              <p className="text-ellipsis  ">{totalDebts}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
        </div>
        {/* BENEFICIARIES TABLE */}
        <div className=" ">
          <Text type="h4" text="Beneficiaries" />
          <div className="overflow-x-scroll">
            <table className="mt-[30px]">
              <tbody>
                <tr className="flex gap-[50px] text-left px-2">
                  <th className="w-[150px]">
                    <Text type="overline" text="name" />
                  </th>
                  <th className="w-[150px]">
                    <Text type="overline" text="address" />
                  </th>
                  {multipliersList !== undefined &&
                    multipliersList.map((m: string) => <MultiplierHeaderCell key={m} contract={_contract} mult={m} />)}
                  <th className="w-[100px]">
                    <Text type="overline" text="final pay" />
                  </th>
                  <th className="w-[100px]">
                    <Text type="overline" text="total to claim" />
                  </th>
                  <th className="w-[100px]">
                    <Text type="overline" text="last claim" />
                  </th>
                </tr>
                {listBeneficiaries &&
                  amountBeneficiaries &&
                  amountBeneficiaries > 0 &&
                  listBeneficiaries.map((address: string, index: number) => (
                    <BeneficiaryRow
                      key={index}
                      indexBeneficiary={index}
                      beneficiaryAddress={address}
                      contract={_contract}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <div className="flex items-center w-full min-h-screen">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
}
