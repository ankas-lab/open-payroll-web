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
import BeneficiaryRow from "@/components/contracts/beneficiaryRow";
import WalletManager from "@/components/walletManager";
import Link from "next/link";
import { CiMenuKebab } from "react-icons/ci";
import MultiplierHeaderCell from "@/components/contracts/multiplierHeaderCell";
interface BaseMultiplier {
  name: string;
  validUntilBlock: any;
}

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
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">(
    "loading"
  );
  const [beneficiaries, setBeneficiaries] = useState<null | string[]>(null);
  const [contractBalance, setContractBalance] = useState<null | number>(null);
  const [nextBlockPeriod, setNextBlockPeriod] = useState<null | number>(null);
  const [fundsNeeded, setFundsNeeded] = useState<null | string>(null);
  const [periodicity, setPeriodicity] = useState<any | null>(null);
  const [basePayment, setBasePayment] = useState<any | null>(null);
  const [multipliersList, setMultipliersList] = useState<any | null>(null);

  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();
  const _contract = useContract(contract, metadata, "rococo-contracts-testnet");

  //---------------------------------Api---------------------------------
  const api = useApi("rococo-contracts-testnet");
  const chainInfo = api?.api.registry.getChainProperties().toHuman();
  //api.rpc.system.chain
  //---------------------------------Get from contract---------------------------------
  // 👥 Get beneficiaries from contract
  const getAmountBeneficiaries = useCall<any | undefined>(
    _contract?.contract,
    "getListBeneficiaries"
  );

  // 📅 Get next block from contract
  const getNextBlockPeriod = useCall<any | undefined>(
    _contract?.contract,
    "getNextBlockPeriod"
  );

  // ⚖ Get balance from contract
  const getContractBalance = useCall<any | undefined>(
    _contract?.contract,
    "getContractBalance"
  );

  // ➖ Get debts from contract
  const getTotalDebts = useCall<any | undefined>(
    _contract?.contract,
    "getTotalDebts"
  );

  // ⌚ Get periodicity from contract
  const getPeriodicity = useCall<any | undefined>(
    _contract?.contract,
    "getPeriodicity"
  );

  // 💰 Get base payment from contract
  const getBasePayment = useCall<any | undefined>(
    _contract?.contract,
    "getBasePayment"
  );

  // ❎ Get multipliers list from contratc
  const getMultipliersList = useCall<any | undefined>(
    _contract?.contract,
    "getMultipliersList"
  );

  //---------------------------------Set in states---------------------------------
  const seeBeneficiaries = async () => {
    setBeneficiaries(pickDecoded(await getAmountBeneficiaries.send()));
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

  const seeBasePayment = async () => {
    const basePayment = pickDecoded(await getBasePayment.send());
    basePayment !== undefined &&
      setBasePayment(parseInt(basePayment.replace(/,/g, "")));
  };

  const seeMultipliersList = async () =>
    setMultipliersList(pickDecoded(await getMultipliersList.send()));

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
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeBasePayment();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeMultipliersList();
  }, [blockHeader?.blockNumber]);

  //---------------------------------Loading---------------------------------
  useEffect(() => {
    _contract?.contract !== undefined && setLoading("done");
  }, [_contract]);

  // 🤟🤟🤟 Fix showMenu 🤟🤟🤟
  //---------------------------------Show menu---------------------------------
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

  //---------------------------------Truncate numbers---------------------------------
  function trunc(x: number, p = 0) {
    var s = x.toString();
    var l = s.length;
    var decimalLength = s.indexOf(".") + 1;
    var numStr = s.substr(0, decimalLength + p);
    return Number(numStr);
  }

  return loading === "done" ? (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
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

            <div
              ref={menuRef}
              //onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
            >
              {showMenu && (
                <div className="absolute right-0 pt-[10px] py-[5px] px-[5px] bg-opwhite border-2 border-oppurple rounded-[5px] flex flex-col gap-[16px] w-[300px]">
                  <Link
                    className={`hover:bg-oppurple hover:text-opwhite rounded-[3px] p-2 text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}
                    href={`/edit/${contract}`}
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
          </div>
          <div className="capitalize">
            <Text type="overline" text="beneficiaries" />
            {beneficiaries !== null ? (
              <p>{beneficiaries?.length}</p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="base payment" />
            {basePayment ? (
              <p>
                {trunc(
                  Math.pow(
                    basePayment * 10,
                    parseInt(chainInfo.tokenDecimals[0])
                  )
                )}{" "}
                {chainInfo?.tokenSymbol}
              </p>
            ) : (
              <div className="flex items-center w-full">
                <AiOutlineLoading className="animate-spin" />
              </div>
            )}
          </div>
          <div className="capitalize">
            <Text type="overline" text="funds in contract" />
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
          </div>
          <div className="capitalize">
            <Text type="overline" text="total funds needed" />
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
              {multipliersList !== null &&
                multipliersList.map((m: string) => (
                  <MultiplierHeaderCell
                    key={m}
                    contract={_contract?.contract}
                    mult={m}
                  />
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
            {beneficiaries?.map((beneficiary, i) => (
              <BeneficiaryRow
                key={i}
                i={i}
                _beneficiary={beneficiary}
                contract={_contract?.contract}
              />
            ))}
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
