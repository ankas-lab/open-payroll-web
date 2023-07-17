import React, { useEffect, useState } from 'react';
import Link from 'next/link.js';

import Button from '../../components/generals/button';

import { IoIosAlert } from 'react-icons/io';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract } from 'useink';
import { usePayrollContract } from '@/hooks';
import metadata from '@/contract/open_payroll.json';
import toast from 'react-hot-toast';
import Loader from '../generals/Loader';

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
  const { contractState, contractBalance, periodicity, totalDebts, nextBlockPeriod, amountBeneficiaries } =
    usePayrollContract(_contract);

  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    if (_contract) {
      setLoading('done');
    }
  }, [_contract]);

  return loading === 'done' ? (
    <Link href={`/contracts/${contract.address}`}>
      <tr
        className={
          i % 2 === 0
            ? `flex gap-[50px] items-center px-2 text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
            : `flex gap-[50px] items-center px-2 text-[14px] bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
        }
      >
        {totalDebts! > contractBalance! ? (
          <td
            className="w-[25px] flex"
            onMouseEnter={() => toast(`❗ You do not have enough funds in ${contract.name}`)}
          >
            <div className="flex w-full">
              <IoIosAlert className="w-5 h-5 text-opdanger m-auto" />
            </div>
          </td>
        ) : (
          <td className="w-[25px] flex"></td>
        )}
        <td className="w-[150px]">
          <p>{contract.name}</p>
        </td>
        <td className="w-[100px]">{amountBeneficiaries ? <p>{amountBeneficiaries}</p> : <Loader />}</td>
        <td className="w-[80px]">{periodicity ? <p>{periodicity}</p> : <Loader />}</td>
        <td className="w-[100px]">
          {contractBalance !== undefined ? (
            <p className="text-ellipsis overflow-hidden">{contractBalance}</p>
          ) : (
            <Loader />
          )}
        </td>
        <td className="w-[100px]">
          {totalDebts !== undefined ? <p className="text-ellipsis overflow-hidden">{totalDebts}</p> : <Loader />}
        </td>
        <td className="w-[80px]">
          {nextBlockPeriod !== undefined ? (
            <p className="text-ellipsis overflow-hidden">{nextBlockPeriod}</p>
          ) : (
            <Loader />
          )}
        </td>
        <td className="w-[80px] truncate">{_contract ? <p>{_contract?.chainId}</p> : <Loader />}</td>
        <td className="w-[80px]">{contractState ? contractState ? <p>ON</p> : <p>OFF</p> : <Loader />}</td>
        <td className="w-[100px]">
          <Link href={`/contracts/${contract.address}`}>
            <Button type="text" text="view" />
          </Link>
        </td>
      </tr>
    </Link>
  ) : (
    <tr className="flex items-center w-full">
      <td className="flex w-full">
        <Loader />
      </td>
    </tr>
  );
};

export default ContractRow;
