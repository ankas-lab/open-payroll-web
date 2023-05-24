import React, { useEffect, useState } from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo } from "next/font/google";
import Link from "next/link.js";
import { IoIosAlert } from "react-icons/io";
const archivo = Archivo({ subsets: ["latin"] });

import { useContract, useCall, useWallet } from "useink";
import { pickDecoded } from "useink/utils";
import metadata from "../../contract/open_payroll.json";
import { useRouter } from "next/router";

const CONTRACT_ADDRESS = "5GNukKy7izXYCepwAH4JVRuU7RkiqNUNk3LRhAHJn7zjmu4H";

interface GetListPayees {
  payees: string[];
}

export default function Contracts() {
  //---------------------------------Security---------------------------------
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    !account && router.push("/");
  }, [account]);

  //---------------------------------Connect to contract---------------------------------
  const contract = useContract(
    CONTRACT_ADDRESS,
    metadata,
    "rococo-contracts-testnet"
  );

  console.log(contract);

  const getBeneficiaries = useCall<any | undefined>(
    contract?.contract,
    "getListPayees"
  );

  console.log(getBeneficiaries);

  const seeContract = async () =>
    console.log(pickDecoded(await getBeneficiaries.send()));

  useEffect(() => {
    seeContract();
  }, []);

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[100px]">
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center">
          <Text type="h2" text="My contracts" />
          <Link className="w-fit" href="/create">
            <Button type="active" text="create new contract" icon="" />
          </Link>
        </div>
        <div className="md:w-[600px]">
          <Text
            type=""
            text="These are your contracts, you can select one to inspect what's inside, edit them or add funds to them. If you don't have any contract, create one!"
          />
        </div>
        <table className="mt-[30px] md:mt-[50px] overflow-x-auto">
          <tr className="flex gap-[50px] text-left">
            <th className="w-[150px]">
              <Text type="overline" text="contract name" />
            </th>
            <th className="w-[100px]">
              <Text type="overline" text="beneficiaries" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="periodicity" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="funds in contract" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="funds needed" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="next pay in (day)" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="network" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="state" />
            </th>
          </tr>
          {/* .map of contracts */}
          <tr className="flex gap-[50px] items-center px-3">
            <td className="w-[150px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Link href={"/contracts/contract"}>
                <Button type="text" text="view" icon="" />
              </Link>
            </td>
            <td className="w-[100px]">
              <IoIosAlert className="w-5 h-5 text-opdanger" />
            </td>
          </tr>
          <tr className="flex gap-[50px] items-center bg-[#ECECEC] px-3">
            <td className="w-[150px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Button type="text" text="view" icon="" />
            </td>
            <td className="w-[100px]">
              <IoIosAlert className="w-5 h-5 text-opdanger" />
            </td>
          </tr>
        </table>
      </div>
    </main>
  );
}
