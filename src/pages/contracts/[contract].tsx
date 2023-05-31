import React, { useEffect, useState, useRef } from "react";

import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";

import { AiOutlineLoading } from "react-icons/ai";
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import {
  useContract,
  useCall,
  useBlockHeader,
  useApi,
  useWallet,
} from "useink";
import { pickDecoded } from "useink/utils";
import metadata from "../../contract/open_payroll.json";
import { useRouter } from "next/router";

interface StorageContract {
  name: string;
  address: string;
}

//CREATE A CONTEXT THAT GET ALL THE CONTRACT IN STORAGE TO FIND A CONTRACT HERE AND IN THE CON

export default function Contract() {
  //---------------------------------Security---------------------------------
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    !account && router.push("/");
  }, [account]);
  //---------------------------------Get contract address---------------------------------
  const {
    query: { contract },
  } = router;

  useEffect(() => {
    console.log("CONTRACT", contract);
  }, [contract]);

  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();

  const _contract = useContract(contract, metadata, "rococo-contracts-testnet");

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
  // Show menu
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(!showMenu);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //---------------------------------Copy to Clipboard---------------------------------
  const copyToClipboard = () => {
    const textToCopy = contract;
    textToCopy !== undefined && navigator.clipboard.writeText(textToCopy);
  };

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[100px]">
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="flex flex-col">
            <Text type="h2" text="Contract name" />
            <div className="flex items-center">
              <Text type="overline" text={`${contract}`} />

              <Button
                type="text"
                text=""
                icon="copy"
                action={copyToClipboard}
              />
            </div>
          </div>
          <div className="flex gap-2 ml-auto mt-0 md:mt-4 relative">
            <div>
              <Button type="active" text="add funds" icon="" />
            </div>
            {/*
            <div
              ref={menuRef}
              //onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
            >
              {showMenu && (
                <div className="absolute right-0 pt-[10px] py-[5px] px-[5px] bg-opwhite border-2 border-oppurple rounded-[5px] flex flex-col gap-[16px] w-[300px]">
                  <Link
                    className={`hover:bg-oppurple hover:text-opwhite rounded-[3px] p-2 text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}
                    href="/edit"
                  >
                    <Text text="Edit" type="" />
                  </Link>
                </div>
              )}
              <div
                className={`text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[14px] px-[13px] bg-opwhite text-[14px] uppercase w-full justify-center `}
              >
                <CiMenuKebab />
              </div>
            </div>
          */}
          </div>
        </div>
        {/* CONTRACT INFO */}
        <div
          className={`mt-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto gap-[20px] text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}
        >
          <div className="capitalize">
            <Text type="overline" text="periodicity" />
            <p>
              {/*_contract?.contract.abi.constructors[0].args[0].type.info*/}
            </p>
          </div>
          <div className="capitalize">
            <Text type="overline" text="next pay in (days)" />
            {nextBlockPeriod !== null ? (
              <p className="text-ellipsis overflow-hidden">
                {nextBlockPeriod / 7200}
              </p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="beneficiaries" />
            <p>{amountBeneficiaries}</p>
          </div>
          <div className="capitalize">
            <Text type="overline" text="base payment" />
            <Text type="" text="periodicity" />
          </div>
          <div className="capitalize">
            <Text type="overline" text="funds in contract" />
            {contractBalance} {chainInfo?.tokenSymbol}
          </div>
          <div className="capitalize">
            <Text type="overline" text="total funds needed" />
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
          </div>
        </div>
        {/* BENEFICIARIES TABLE */}
        <div className="overflow-x-auto">
          <Text type="h4" text="Beneficiaries" />
          <table className="mt-[30px]">
            <tr className="flex gap-[50px] text-left px-2">
              <th className="w-[150px]">
                <Text type="overline" text="name" />
              </th>
              <th className="w-[150px]">
                <Text type="overline" text="address" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="multiplier 1" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="multiplier 2" />
              </th>
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
            <tr className="flex gap-[50px] items-center h-11 px-2">
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
            </tr>
            <tr className="flex gap-[50px] items-center h-11 px-2 bg-[#ECECEC]">
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
}
