import React, { useEffect, useState } from 'react';
import Link from 'next/link.js';

import Button from '../../components/generals/button';

import { IoIosAlert } from 'react-icons/io';
import { AiOutlineLoading } from 'react-icons/ai';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract } from 'useink';
import { usePayrollContract } from '@/hooks';
import metadata from '@/contract/open_payroll.json';
import { BN } from 'bn.js';

interface ContractRowProps {
  contract: {
    name: string;
    address: string;
  };
  i: number;
}

//---------------------------------Get contracts from context---------------------------------

const ContractRow = ({ contract, i }: ContractRowProps) => {
  //---------------------------------Connect to contract---------------------------------
  const _contract = useContract(contract.address, metadata);
  const { contractState, contractBalance, periodicity, totalDebts, nextBlockPeriodInDays, amountBeneficiaries } =
    usePayrollContract(_contract);

  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    if (_contract) {
      setLoading('done');
    }
  }, [_contract]);

  return loading === 'done' ? (
    <tr
      className={
        i % 2 === 0
          ? `flex gap-[50px] items-center px-3 text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`
          : `flex gap-[50px] items-center px-3 text-[14px] bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className}`
      }
    >
      <td className="w-[150px]">
        <p>{contract.name}</p>
      </td>
      <td className="w-[100px]">
        {amountBeneficiaries ? (
          <p>{amountBeneficiaries}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {periodicity ? (
          <p>{periodicity}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {contractBalance !== undefined ? (
          <p className="text-ellipsis overflow-hidden">{contractBalance}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {totalDebts !== null ? (
          <p className="text-ellipsis overflow-hidden">{totalDebts}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {/* 🤟🤟🤟 Calculate real next pay day 🤟🤟🤟 */}
        {nextBlockPeriodInDays !== null ? (
          <p className="text-ellipsis overflow-hidden">{nextBlockPeriodInDays}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {_contract ? (
          <p>{_contract?.chainId}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">{contractState ? <p>ON</p> : <p>OFF</p>}</td>
      <td className="w-[100px]">
        <Link href={`/contracts/${contract.address}`}>
          <Button type="text" text="view" icon="" />
        </Link>
      </td>
      <td className="w-[100px]">
        <IoIosAlert className="w-5 h-5 text-opdanger" />
      </td>
    </tr>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
};

export default ContractRow;
