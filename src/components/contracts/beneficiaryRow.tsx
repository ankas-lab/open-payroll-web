import React, { useEffect, useState } from "react";

import Text from "../generals/text";

import { AiOutlineLoading } from "react-icons/ai";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import { useApi, useBlockHeader, useCall } from "useink";
import { pickDecoded } from "useink/utils";

interface BeneficiarieRowProps {
  i: number;
  _beneficiary: string;
  contract: any | undefined;
}

const BeneficiaryRow = ({
  i,
  _beneficiary,
  contract,
}: BeneficiarieRowProps) => {
  const blockHeader = useBlockHeader();
  //---------------------------------Api---------------------------------
  const api = useApi("rococo-contracts-testnet");
  const chainInfo = api?.api.registry.getChainProperties().toHuman();

  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">(
    "loading"
  );
  const [basePayment, setBasePayment] = useState<any | null>(null);
  const [beneficiary, setBeneficiary] = useState<any | null>(null);
  const [amountToClaim, setAmountToClaim] = useState<any | null>(null);

  //---------------------------------Get from contract---------------------------------
  // 👥 Get beneficiary from contract
  const getBeneficiary = useCall<any | undefined>(contract, "getBeneficiary");

  // 💰 Get base payment from contract
  const getBasePayment = useCall<any | undefined>(contract, "getBasePayment");

  // 💸 Get amount to claim from contratc
  const getAmountToClaim = useCall<any | undefined>(
    contract,
    "getAmountToClaim"
  );
  //---------------------------------Set in states---------------------------------
  const seeBeneficiary = async () =>
    setBeneficiary(pickDecoded(await getBeneficiary.send([_beneficiary])));

  const seeBasePayment = async () => {
    const basePayment = pickDecoded(await getBasePayment.send());
    basePayment !== undefined &&
      setBasePayment(parseInt(basePayment.replace(/,/g, "")));
  };

  const seeAmountToClaim = async () => {
    const amountToClaim = pickDecoded(
      await getAmountToClaim.send([_beneficiary])
    ).Ok;
    setAmountToClaim(parseInt(amountToClaim.replace(/,/g, "")));
  };
  //---------------------------------Truncate numbers---------------------------------
  function trunc(x: number, p = 0) {
    var s = x.toString();
    var l = s.length;
    var decimalLength = s.indexOf(".") + 1;
    var numStr = s.substr(0, decimalLength + p);
    return Number(numStr);
  }

  const calculateTotalMultipliers = () => {
    const multipliers = Object.values(beneficiary?.Ok.multipliers);
    let multipliersSum;
    multipliers.length === 0
      ? (multipliersSum = 1)
      : (multipliersSum = multipliers.reduce(
          (acumulator: number, value: any) => {
            return acumulator + parseInt(value);
          },
          0
        ));
    return multipliersSum;
  };

  //---------------------------------Initialize functions---------------------------------

  useEffect(() => {
    if (blockHeader?.blockNumber && contract !== undefined) seeBeneficiary();
    if (blockHeader?.blockNumber && contract !== undefined) seeBasePayment();
    if (blockHeader?.blockNumber && contract !== undefined) seeAmountToClaim();
  }, [blockHeader?.blockNumber]);

  useEffect(() => {
    beneficiary !== null;
    setLoading("done");
  }, [beneficiary]);

  return loading === "done" ? (
    <tr
      className={
        i % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className}`
          : `flex gap-[50px] text-[14px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className}`
      }
    >
      {/* Beneficiary name */}
      <td className="w-[150px]">
        <p>Name</p>
      </td>
      {/* Beneficiary address */}
      <td className="w-[150px]">
        <p>
          {_beneficiary.slice(0, 5)}...
          {_beneficiary.slice(_beneficiary.length - 5, _beneficiary.length)}
        </p>
      </td>
      {/* Multipliers */}
      {beneficiary !== null &&
        Object.values(beneficiary?.Ok.multipliers).map((m: any) => (
          <td className="w-[100px]">
            <p>{m === "0" ? "1" : m}</p>
          </td>
        ))}

      {/* Final pay */}
      <td className="w-[100px]">
        <p>
          {beneficiary !== null &&
            basePayment !== null &&
            trunc(
              Math.pow(basePayment * 10, parseInt(chainInfo.tokenDecimals[0])) *
                calculateTotalMultipliers(),
              2
            )}{" "}
          {chainInfo?.tokenSymbol}
        </p>
      </td>
      {/* Total to claim */}
      <td className="w-[100px]">
        <p>
          {amountToClaim !== null &&
            trunc(
              Math.pow(
                amountToClaim * 10,
                parseInt(chainInfo.tokenDecimals[0])
              ),
              2
            )}{" "}
          {chainInfo?.tokenSymbol}
        </p>
      </td>
      {/* Last claim */}
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

export default BeneficiaryRow;
