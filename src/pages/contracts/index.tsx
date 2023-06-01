import React, { useContext, useEffect } from "react";
import Link from "next/link.js";

import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";

import ContractRow from "../../components/contracts/contractRow";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import { useWallet } from "useink";
import { useRouter } from "next/router";

import { DappContext } from "@/context";
import WalletManager from "@/components/walletManager";

export default function Contracts() {
  //---------------------------------Security---------------------------------
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    !account && router.push("/");
  }, [account]);

  //---------------------------------Get contracts from context---------------------------------
  const context = useContext(DappContext);

  if (!context) {
    return null;
  }

  const { contracts } = context;

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px]">
        <WalletManager />
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
        {contracts.length > 0 ? (
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
            {contracts.map((c, i) => (
              <ContractRow key={i} contract={c} i={i} />
            ))}
          </table>
        ) : (
          <p> It seems like there are no contracts here.</p>
        )}
      </div>
    </main>
  );
}
//bg-[#ECECEC]
