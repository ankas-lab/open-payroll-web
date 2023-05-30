import React, { useEffect, useState } from "react";
import Link from "next/link.js";

import Button from "../../components/generals/button";
import Text from "../../components/generals/text";

import { IoIosAlert } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import { useContract, useCall, useBlockHeader, useApi } from "useink";
import { pickDecoded } from "useink/utils";
import metadata from "../../contract/open_payroll.json";

interface ContractRowProps {
  c: {
    name: string;
    address: string;
  };
}

const ContractRow = ({ c }: ContractRowProps) => {
  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();
  const _contract = useContract(
    c.address,
    metadata,
    "rococo-contracts-testnet"
  );
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">(
    "loading"
  );
  const [amountBeneficiaries, setAmountBeneficiaries] = useState<
    null | string[]
  >(null);
  const [contractBalance, setContractBalance] = useState<null | string[]>(null);
  const [nextBlockPeriod, setNextBlockPeriod] = useState<null | number>(null);
  const [fundsNeeded, setFundsNeeded] = useState<null | string>(null);
  //---------------------------------Api---------------------------------
  const api = useApi("rococo-contracts-testnet");
  const chainInfo = api?.api.registry.getChainProperties().toHuman();
  //api.rpc.system.chain
  //---------------------------------Get from contract---------------------------------
  const getAmountBeneficiaries = useCall<any | undefined>(
    _contract?.contract,
    "getAmountBeneficiaries"
  );

  const getNextBlockPeriod = useCall<any | undefined>(
    _contract?.contract,
    "getNextBlockPeriod"
  );

  const getContractBalance = useCall<any | undefined>(
    _contract?.contract,
    "getContractBalance"
  );

  const getTotalDebts = useCall<any | undefined>(
    _contract?.contract,
    "getTotalDebts"
  );

  //---------------------------------Set in states---------------------------------
  const seeBeneficiaries = async () =>
    setAmountBeneficiaries(pickDecoded(await getAmountBeneficiaries.send()));

  const seeContractBalance = async () =>
    setContractBalance(pickDecoded(await getContractBalance.send()));

  const seeNextBlockPeriod = async () => {
    const nextPeriodString = pickDecoded(await getNextBlockPeriod.send());
    nextPeriodString !== null &&
      setNextBlockPeriod(parseInt(nextPeriodString.replace(/,/g, "")));
  };

  const seeTotalDebts = async () =>
    setFundsNeeded(pickDecoded(await getTotalDebts.send()));

  useEffect(() => {
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeBeneficiaries();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeNextBlockPeriod();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeContractBalance();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeTotalDebts();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      console.log(_contract?.contract);
  }, [blockHeader?.blockNumber]);

  //---------------------------------See in console---------------------------------
  useEffect(() => {
    api &&
      console.log("API: ", api?.api.registry.getChainProperties().toHuman());
  }, [api]);
  useEffect(() => {
    _contract?.contract !== undefined && setLoading("done");
  }, [_contract]);
  return loading === "done" ? (
    <tr
      className={`flex gap-[50px] items-center px-3 text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}
    >
      <td className="w-[150px]">
        <p>{c.name}</p>
      </td>
      <td className="w-[100px]">
        <p>{amountBeneficiaries}</p>
      </td>
      <td className="w-[80px]">
        {/* Is correct? */}
        <p>{_contract?.contract.abi.constructors[0].args[0].type.info}</p>
      </td>
      <td className="w-[80px]">
        <p>
          {contractBalance} {chainInfo?.tokenSymbol}
        </p>
      </td>
      <td className="w-[80px]">
        {fundsNeeded !== null && chainInfo !== undefined ? (
          <p className="text-ellipsis overflow-hidden">
            {Math.pow(
              parseInt(fundsNeeded) * 10,
              parseInt(chainInfo.tokenDecimals[0])
            )}
            {chainInfo?.tokenSymbol}
          </p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {nextBlockPeriod !== null ? (
          <p className="text-ellipsis overflow-hidden">
            {nextBlockPeriod / 7200}
          </p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {/* To do */}
        <p>state</p>
      </td>
      <td className="w-[80px]">
        {/* To do */}
        <p>state</p>
      </td>
      <td className="w-[100px]">
        <Link href={`/contracts/${c.address}`}>
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
