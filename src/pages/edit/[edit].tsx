import React, { useEffect, useState } from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
import { useRouter } from "next/router";
import {
  useApi,
  useBlockHeader,
  useCall,
  useContract,
  useWallet,
} from "useink";
import WalletManager from "@/components/walletManager";
import { pickDecoded } from "useink/utils";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });
import metadata from "../../contract/open_payroll.json";

import Contract from "@/components/edit/baseContract";
import Multipliers from "@/components/edit/multipliers";
import Beneficiaries from "@/components/edit/beneficiaries";

export default function Edit() {
  //---------------------------------Security---------------------------------
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    !account && router.push("/");
  }, [account]);

  //---------------------------------Get contract address---------------------------------
  const {
    query: { edit },
  } = router;
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">(
    "loading"
  );

  // Tabs
  const [tab, setTab] = useState<string>("contract");

  /*
  const handleContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewContract((prevContract) => ({
      ...prevContract,
      [name]: value,
    }));
  };
*/

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <div className="flex flex-col justify-between md:w-10/12 lg:w-7/12">
          <Text type="h2" text="Edit contract" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
            {tab === "contract" ? (
              <Button
                type="active"
                text="contract"
                icon=""
                action={() => setTab("contract")}
              />
            ) : (
              <Button
                type="outlined"
                text="contract"
                icon=""
                action={() => setTab("contract")}
              />
            )}
            {tab === "multipliers" ? (
              <Button
                type="active"
                text="multipliers"
                icon=""
                action={() => setTab("multipliers")}
              />
            ) : (
              <Button
                type="outlined"
                text="multipliers"
                icon=""
                action={() => setTab("multipliers")}
              />
            )}
            {tab === "beneficiaries" ? (
              <Button
                type="active"
                text="beneficiaries"
                icon=""
                action={() => setTab("beneficiaries")}
              />
            ) : (
              <Button
                type="outlined"
                text="beneficiaries"
                icon=""
                action={() => setTab("beneficiaries")}
              />
            )}
          </div>
        </div>
        {tab === "contract" && <Contract address={edit!.toString()} />}
        {tab === "multipliers" && <Multipliers />}
        {tab === "beneficiaries" && <Beneficiaries />}
      </div>
    </main>
  );
}
