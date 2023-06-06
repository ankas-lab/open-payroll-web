import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Text from "../generals/text";

import { AiOutlineLoading } from "react-icons/ai";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import { useBlockHeader, useContract } from "useink";

import metadata from "@/contract/open_payroll.json";

interface BeneficiarieRowProps {
  i: number;
  b: string;
}

const BeneficiarieRow = ({ i, b }: BeneficiarieRowProps) => {
  //---------------------------------Get contract address---------------------------------
  const router = useRouter();
  const {
    query: { contract },
  } = router;
  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();
  const _contract = useContract(contract, metadata, "rococo-contracts-testnet");
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">("done");

  useEffect(() => {
    console.log("From BR:", contract);
  }, [contract]);

  return loading === "done" ? (
    <tr
      className={
        i % 2 === 0
          ? `flex gap-[50px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className}`
          : `flex gap-[50px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className}`
      }
    >
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
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
};

export default BeneficiarieRow;
