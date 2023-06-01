import React, { useState } from "react";

import Text from "../generals/text";

import { AiOutlineLoading } from "react-icons/ai";
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

interface BeneficiarieRowProps {
  i: number;
}

const BeneficiarieRow = ({ i }: BeneficiarieRowProps) => {
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">("done");

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
