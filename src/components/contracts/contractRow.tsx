import React, { useEffect, useState } from "react";
import Link from "next/link.js";

import Button from "../../components/generals/button";

import { IoIosAlert } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import { useContract, useCall, useBlockHeader, useApi } from "useink";
import { pickDecoded } from "useink/utils";

import metadata from "@/contract/open_payroll.json";

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
  const _contract = useContract(
    contract.address,
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
  const [contractBalance, setContractBalance] = useState<null | number>(null);
  const [nextBlockPeriod, setNextBlockPeriod] = useState<null | number>(null);
  const [fundsNeeded, setFundsNeeded] = useState<null | string>(null);
  const [periodicity, setPeriodicity] = useState<any | null>(null);

  //---------------------------------Api---------------------------------
  const api = useApi("rococo-contracts-testnet");
  const chainInfo = api?.api.registry.getChainProperties().toHuman();

  //---------------------------------Get from contract---------------------------------
  const getAmountBeneficiaries = useCall<any | undefined>(
    _contract?.contract,
    "getListBeneficiaries"
  );

  const getNextBlockPeriod = useCall<any | undefined>(
    _contract,
    "getNextBlockPeriod"
  );

  const getContractBalance = useCall<any | undefined>(
    _contract,
    "getContractBalance"
  );

  const getTotalDebts = useCall<any | undefined>(
    _contract,
    "getTotalDebts"
  );

  // 🤟🤟🤟 Get periodicity from contract
  const getPeriodicity = useCall<any | undefined>(
    _contract?.contract,
    "getPeriodicity"
  );

  // 🤟🤟🤟 Get network from contract
  // 🤟🤟🤟 Get state from contract

  //---------------------------------Set in states---------------------------------
  const seeBeneficiaries = async () => {
    const b = pickDecoded(await getAmountBeneficiaries.send());
    setAmountBeneficiaries(b);
  };

  const seeContractBalance = async () => {
    const contractBalance = pickDecoded(await getContractBalance.send());
    contractBalance !== undefined &&
      setContractBalance(parseInt(contractBalance.replace(/,/g, "")));
  };

  const seeNextBlockPeriod = async () => {
    const nextPeriodString = pickDecoded(await getNextBlockPeriod.send());

    nextPeriodString !== undefined &&
      setNextBlockPeriod(parseInt(nextPeriodString.replace(/,/g, "")));
  };

  const seeTotalDebts = async () =>
    setFundsNeeded(pickDecoded(await getTotalDebts.send()));

  const seePeriodicity = async () =>
    setPeriodicity(pickDecoded(await getPeriodicity.send()));
  //---------------------------------Initialize functions---------------------------------
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
      seePeriodicity();
  }, [blockHeader?.blockNumber]);

  //---------------------------------See in console---------------------------------
  useEffect(() => {
    _contract?.contract !== undefined && setLoading("done");
    //_contract?.contract !== undefined &&
    //console.log("TOM CONTRACT:", _contract?.contract);
  }, [_contract]);

  //---------------------------------Truncate numbers---------------------------------
  function trunc(x: number, p = 0) {
    var s = x.toString();
    var l = s.length;
    var decimalLength = s.indexOf(".") + 1;
    var numStr = s.substr(0, decimalLength + p);
    return Number(numStr);
  }

  return loading === "done" ? (
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
          <p>{amountBeneficiaries.length}</p>
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
        {contractBalance !== null ? (
          <p className="text-ellipsis overflow-hidden">
            {trunc(
              Math.pow(
                contractBalance * 10,
                parseInt(chainInfo.tokenDecimals[0])
              ),
              2
            )}{" "}
            {chainInfo?.tokenSymbol}
          </p>
        ) : (
          <div className="flex items-center w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        )}
      </td>
      <td className="w-[80px]">
        {fundsNeeded !== null && chainInfo !== undefined ? (
          <p className="text-ellipsis overflow-hidden">
            {trunc(
              Math.pow(
                parseInt(fundsNeeded) * 10,
                parseInt(chainInfo.tokenDecimals[0])
              ),
              2
            )}{" "}
            {chainInfo?.tokenSymbol}
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
          <p className="text-ellipsis overflow-hidden">
            {trunc(nextBlockPeriod / periodicity / 7200)}
          </p>
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
