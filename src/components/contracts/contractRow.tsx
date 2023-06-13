import React, { useEffect, useState } from 'react';
import Link from 'next/link.js';

import Button from '../../components/generals/button';

import { IoIosAlert } from 'react-icons/io';
import { AiOutlineLoading } from 'react-icons/ai';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract, useCall, useBlockHeader, useApi } from 'useink';
import { BN, pickDecoded } from 'useink/utils';

import metadata from '@/contract/open_payroll.json';
import { parse } from 'path';

interface ContractRowProps {
  contract: {
    name: string;
    address: string;
  };
  i: number;
}

const ContractRow = ({ contract, i }: ContractRowProps) => {
  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();

  const _contract = useContract(contract.address, metadata);

  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');
  const [amountBeneficiaries, setAmountBeneficiaries] = useState<null | string[]>(null);
  const [contractBalance, setContractBalance] = useState<null | number>(null);
  const [nextBlockPeriod, setNextBlockPeriod] = useState<null | number>(null);
  const [fundsNeeded, setFundsNeeded] = useState<null | string>(null);
  const [state, setState] = useState<boolean | undefined>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  const chainInfo = api?.api.registry.getChainProperties()!.toHuman();

  //---------------------------------Get from contract---------------------------------
  const getAmountBeneficiaries = useCall<string[]>(_contract, 'getListBeneficiaries');

  const getNextBlockPeriod = useCall(_contract, 'getNextBlockPeriod');

  const getContractBalance = useCall<string>(_contract, 'getContractBalance');

  const getTotalDebts = useCall(_contract, 'getTotalDebts');

  // 🤟🤟🤟 Get periodicity from contract
  const getPeriodicity = useCall<number>(_contract, 'getPeriodicity');

  //---------------------------------Initialize functions---------------------------------
  useEffect(() => {
    if (_contract) {
      getAmountBeneficiaries.send();
      getContractBalance.send();
      getNextBlockPeriod.send();
      getTotalDebts.send();
      getPeriodicity.send();
      setLoading('done');
    }
  }, [_contract]);

  useEffect(() => {
    if (_contract) {
      console.log(getContractBalance);
    }
  }, [getContractBalance.result?.ok]);

  //---------------------------------Truncate numbers-------------------------------------
  function trunc(x: number, p = 0) {
    var s = x.toString();
    var l = s.length;
    var decimalLength = s.indexOf('.') + 1;
    var numStr = s.substr(0, decimalLength + p);
    return Number(numStr);
  }

  function formatBalance(balance: string | undefined): number | undefined {
    // return undefined if balance is undefined so can continue with the spinner waiting
    if (balance === undefined) return undefined;

    let num_string = balance.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    let num = parseInt(num_string);

    return trunc(Math.pow(num * 10, 2), 2);
  }

  function formatBalanceWithSymbol(balance: number | undefined): string | undefined {
    if (balance === undefined) return undefined;

    let tokenSymbol = chainInfo?.tokenSymbol?.toString() || '';
    return `${balance} ${tokenSymbol}`;
  }

  let contractBalanceFormat = formatBalanceWithSymbol(
    formatBalance(pickDecoded(getContractBalance.result!)?.toString()),
  );
  let periodicityValue = pickDecoded(getPeriodicity.result!)?.toString();

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
        {getAmountBeneficiaries ? (
          <p>{pickDecoded(getAmountBeneficiaries.result!)?.length}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {periodicityValue ? (
          <p>{periodicityValue}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {contractBalanceFormat !== null ? (
          <p className="text-ellipsis overflow-hidden">{contractBalanceFormat}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {fundsNeeded !== null && chainInfo !== undefined ? (
          <p className="text-ellipsis overflow-hidden">
            {trunc(Math.pow(parseInt(fundsNeeded) * 10, parseInt(chainInfo.tokenDecimals[0])), 2)}{' '}
            {chainInfo?.tokenSymbol?.toString()}
          </p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {/* 🤟🤟🤟 Calculate real next pay day 🤟🤟🤟 */}
        {nextBlockPeriod !== null ? (
          <p className="text-ellipsis overflow-hidden">{trunc(nextBlockPeriod / periodicity / 7200)}</p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {/* 🤟🤟🤟 Show network 🤟🤟🤟 */}
        <p>network</p>
      </td>
      <td className="w-[80px]">
        {/* 🤟🤟🤟 Show state 🤟🤟🤟 */}

        <p>state</p>
      </td>
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
