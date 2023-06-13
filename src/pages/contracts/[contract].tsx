import React, { useEffect, useState, useRef, useContext } from 'react';

import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';

import { AiOutlineLoading } from 'react-icons/ai';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract, useCall, useBlockHeader, useApi, useWallet } from 'useink';
import { pickDecoded } from 'useink/utils';
import metadata from '../../contract/open_payroll.json';
import { useRouter } from 'next/router';
import BeneficiaryRow from '@/components/contracts/beneficiaryRow';
import WalletManager from '@/components/walletManager';
import Link from 'next/link';
import { GoKebabHorizontal } from 'react-icons/go';
import MultiplierHeaderCell from '@/components/contracts/multiplierHeaderCell';
import { DappContext } from '@/context';
import { IoIosCopy } from 'react-icons/io';

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
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');

  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();
  const _contract = useContract(contractAddress!, metadata);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');
  const chainInfo = api?.api.registry.getChainProperties().toHuman();
  //api.rpc.system.chain
  //---------------------------------Get from contract---------------------------------
  // 👥 Get beneficiaries from contract
  const getAmountBeneficiaries = useCall<any | undefined>(_contract, 'getListBeneficiaries');

  // 📅 Get next block from contract
  const getNextBlockPeriod = useCall<any | undefined>(_contract, 'getNextBlockPeriod');

  // ⚖ Get balance from contract
  const getContractBalance = useCall<any | undefined>(_contract, 'getContractBalance');

  // ➖ Get debts from contract
  const getTotalDebts = useCall<any | undefined>(_contract, 'getTotalDebts');

  // ⌚ Get periodicity from contract
  const getPeriodicity = useCall<any | undefined>(_contract, 'getPeriodicity');

  // 💰 Get base payment from contract
  const getBasePayment = useCall<any | undefined>(_contract, 'getBasePayment');

  // ❎ Get multipliers list from contratc
  const getMultipliersList = useCall<any | undefined>(_contract, 'getMultipliersList');

  //---------------------------------Initialize functions---------------------------------
  useEffect(() => {
    getAmountBeneficiaries.send();
    getContractBalance.send()
    getNextBlockPeriod.send();
    getTotalDebts.send();
    getPeriodicity.send();
    getBasePayment.send();
    getMultipliersList.send();
    setLoading('done');
  }, [_contract?.contract]);

  //---------------------------------Loading---------------------------------
  // useEffect(() => {
  //   _contract?.contract !== undefined && setLoading("done");
  // }, [_contract]);

  // useEffect(() => {
  //   //contract!==null&&findContractInLocalStorage(contract)
  // }, [contract]);

  // 🤟🤟🤟 Fix showMenu 🤟🤟🤟

  //---------------------------------Show menu---------------------------------
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  //---------------------------------Truncate numbers---------------------------------
  function trunc(x: number, p = 0) {
    var s = x.toString();
    var l = s.length;
    var decimalLength = s.indexOf('.') + 1;
    var numStr = s.substr(0, decimalLength + p);
    return Number(numStr);
  }

  return loading === 'done' ? (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="flex flex-col">
            {contractAddress && ( <Text type="h2" text={`${findContractInLocalStorage(contractAddress).name}`} />)}
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
            {getPeriodicity ? (
              <p>{pickDecoded(getPeriodicity.result!)}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>

          <div className="capitalize">
            <Text type="overline" text="next pay in (days)" />
            {/* 🤟🤟🤟 Calculate real next pay day 🤟🤟🤟 */}
            {getNextBlockPeriod !== null ? (
              <p className="text-ellipsis overflow-hidden">{trunc(pickDecoded(getNextBlockPeriod.result!) / pickDecoded(getPeriodicity.result!) / 7200)}</p>
            ) : (
              <p>{nextBlockPeriod - blockHeader?.blockNumber}</p>
            )}
            {nextBlockPeriod === null && (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>

          <div className="capitalize">
            <Text type="overline" text="beneficiaries" />
            {getAmountBeneficiaries !== null ? (
              <p>{pickDecoded(getAmountBeneficiaries.result!)?.length}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="base payment" />
            {getBasePayment && chainInfo ? (
              <p>
                {trunc(Math.pow(pickDecoded(getBasePayment.result!) * 10, parseInt(chainInfo.tokenDecimals[0])))} {chainInfo?.tokenSymbol}
              </p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="funds in contract" />

            {getContractBalance && chainInfo ? (
              <p className="text-ellipsis overflow-hidden">
                {trunc(Math.pow(pickDecoded(getContractBalance.result!) * 10, parseInt(chainInfo.tokenDecimals[0])), 2)}{' '}
                {chainInfo?.tokenSymbol}
              </p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="total funds needed" />
            {getTotalDebts && chainInfo !== undefined ? (
              <p className="text-ellipsis overflow-hidden">
                {trunc(Math.pow(parseInt(pickDecoded(getTotalDebts.result!)) * 10, parseInt(chainInfo.tokenDecimals[0])), 2)}{' '}
                {chainInfo?.tokenSymbol}
              </p>
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
          <table className="mt-[30px]">
            <tbody>
              <tr className="flex gap-[50px] text-left px-2">
                <th className="w-[150px]">
                  <Text type="overline" text="name" />
                </th>
                <th className="w-[150px]">
                  <Text type="overline" text="address" />
                </th>
                {getMultipliersList.result &&
                  pickDecoded(getMultipliersList.result!).map((m: string) => (
                    <MultiplierHeaderCell key={m} contract={_contract?.contract} mult={m} />
                  ))}
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
              {pickDecoded<string[]>(getAmountBeneficiaries.result!)?.map((beneficiary, i) => (
                <BeneficiaryRow key={i} i={i} _beneficiary={beneficiary} contract={_contract?.contract} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
}
