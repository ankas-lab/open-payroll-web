import React, { useEffect, useState } from 'react';
import Link from 'next/link.js';

import Button from '../../components/generals/button';

import { IoIosAlert } from 'react-icons/io';
import { AiOutlineLoading } from 'react-icons/ai';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract, useCall, useBlockHeader, useApi, useChainDecimals, useTokenSymbol } from 'useink';
import { pickDecoded, planckToDecimalFormatted } from 'useink/utils';

import metadata from '@/contract/open_payroll.json';
import { BN } from 'bn.js';

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
  const _chainDecimals = useChainDecimals(_contract?.chainId);
  const _tokenSymbol = useTokenSymbol(_contract?.chainId);

  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');

  const [contractBalance, setContractBalance] = useState<undefined | string>(undefined);
  const [periodicity, setPeriodicity] = useState<undefined | number>(undefined);
  const [totalDebts, setTotalDebts] = useState<undefined | string>(undefined);
  const [nextBlockPeriodInDays, setNextBlockPeriodInDays] = useState<undefined | number>(undefined);
  const [contractState, SetContractState] = useState<undefined | boolean>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  const chainInfo = api?.api.registry.getChainProperties()!.toHuman();

  //---------------------------------Get from contract---------------------------------
  const getAmountBeneficiaries = useCall<string[]>(_contract, 'getListBeneficiaries');
  const getNextBlockPeriod = useCall<any>(_contract, 'getNextBlockPeriod');
  const getContractBalance = useCall<any>(_contract, 'getContractBalance');
  const getTotalDebts = useCall<any>(_contract, 'getTotalDebts');
  const getPeriodicity = useCall<number>(_contract, 'getPeriodicity');
  const isPaused = useCall<boolean>(_contract, 'isPaused');

  //---------------------------------Initialize functions---------------------------------
  useEffect(() => {
    if (_contract) {
      getAmountBeneficiaries.send();
      getContractBalance.send();
      getNextBlockPeriod.send();
      getTotalDebts.send();
      getPeriodicity.send();
      isPaused.send();
      setLoading('done');
    }
  }, [_contract]);

  //---------------------------------Functions to Format-------------------------------------
  // return a BN!
  function formatStringNumberToPlainNumber(num: any): any {
    let num_string = num
      .toString()
      .replace(/,/g, '')
      .replace(/[^0-9.]/g, '');
    return new BN(num_string);
  }

  //---------------------------------Format incoming data-------------------------------------

  useEffect(() => {
    if (getContractBalance.result) {
      let data = formatStringNumberToPlainNumber(pickDecoded(getContractBalance.result!));
      setContractBalance(planckToDecimalFormatted(data, api?.api));
    }
  }, [getContractBalance.result]);

  useEffect(() => {
    if (getPeriodicity.result) {
      setPeriodicity(Number(pickDecoded(getPeriodicity.result!)));
    }
  }, [getPeriodicity.result]);

  useEffect(() => {
    if (getTotalDebts.result && api?.api) {
      let data = formatStringNumberToPlainNumber(pickDecoded(getTotalDebts.result!));
      // TODO: format millions
      setTotalDebts(planckToDecimalFormatted(data, api.api));
    }
  }, [getTotalDebts.result, api?.api]);

  useEffect(() => {
    if (getNextBlockPeriod.result && periodicity) {
      let getNextBlockPeriodValueString = pickDecoded(getNextBlockPeriod.result!)?.toString();
      if (getNextBlockPeriodValueString) {
        let getNextBlockPeriodValuePlainBN = new BN(formatStringNumberToPlainNumber(getNextBlockPeriodValueString));
        let totalBlocks = getNextBlockPeriodValuePlainBN.div(new BN(periodicity));
        let totalBlocksInDays = totalBlocks.div(new BN(7200));
        // TODO: less than a day if days < 0
        setNextBlockPeriodInDays(totalBlocksInDays.toNumber());
      }
    }
  }, [getNextBlockPeriod.result]);

  useEffect(() => {
    if (isPaused.result) {
      let data = Boolean(pickDecoded(getTotalDebts.result!)).valueOf();
      SetContractState(data);
    }
  }, [isPaused.result]);

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
