import React, { useEffect, useState } from "react";
import Nav from "@/components/nav";
import Text from "@/components/generals/text";
import Button from "@/components/generals/button";
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
import metadata from "@/contract/open_payroll.json";

interface ContractProps {
  address: string | string[] | undefined;
}

const index = ({ address }: ContractProps) => {
  //---------------------------------UseStates---------------------------------
  const [basePayment, setBasePayment] = useState<any | null>("");
  const [newBasePayment, setNewBasePayment] = useState<number | null>(null);
  const [periodicity, setPeriodicity] = useState<any | null>(null);
  const [periodicityType, setPeriodicityType] = useState<"fixed" | "custom">(
    "fixed"
  );
  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();
  const _contract = useContract(address, metadata, "rococo-contracts-testnet");

  //---------------------------------Api---------------------------------
  const api = useApi("rococo-contracts-testnet");
  const chainInfo = api?.api.registry.getChainProperties().toHuman();
  //api.rpc.system.chain

  //---------------------------------Get from contract---------------------------------
  // 💰 Get base payment from contract
  const getBasePayment = useCall<any | undefined>(
    _contract?.contract,
    "getBasePayment"
  );

  // ⌚ Get periodicity from contract
  const getPeriodicity = useCall<any | undefined>(
    _contract?.contract,
    "getPeriodicity"
  );

  // 🆙💰 Get update base payment from contract
  const updateBasePayment = useCall(_contract?.contract, "updateBasePayment");

  //---------------------------------Set in states---------------------------------
  const seeBasePayment = async () => {
    const basePayment = pickDecoded(await getBasePayment.send());
    basePayment !== undefined &&
      setBasePayment(parseInt(basePayment.replace(/,/g, "")));
  };

  const seePeriodicity = async () => {
    const periodicity = pickDecoded(await getPeriodicity.send());
    if (
      periodicity === "7200" ||
      periodicity === "36000" ||
      periodicity === "216000"
    ) {
      setPeriodicityType("fixed");
    } else {
      setPeriodicityType("custom");
    }
    setPeriodicity(periodicity);
  };

  //---------------------------------Handles---------------------------------
  const handleBasePaymentChange = (e: any) => {
    setNewBasePayment(e.target.value);
  };

  const handleUpdateBasePayment = () =>
    updateBasePayment.send([newBasePayment]);

  //---------------------------------UseEffect---------------------------------
  useEffect(() => {
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeBasePayment();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seePeriodicity();
  }, [blockHeader?.blockNumber]);

  useEffect(() => {
    console.log(periodicity);
  }, [periodicity]);

  return (
    <div className="w-full md:w-8/12 flex flex-col gap-[20px]">
      <div>
        <Text type="h4" text="Contract" />
        <Text type="" text="These are the basic data of your contract." />
      </div>
      <form className="">
        <div className="flex flex-col gap-[10px] bg-oplightpurple">
          <div className="flex flex-col gap-[10px] bg-oplightgreen">
            <Text type="h5" text="Off blockchain" />
            <div className="flex gap-[10px]">
              <div className="flex flex-col ">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] ${podkova.className}`}
                >
                  Contract name
                </label>
                <input
                  id="contractName"
                  type="text"
                  name="contractName"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] ${podkova.className}`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] bg-opgray">
            <Text type="h5" text="On blockchain" />
            <div className="flex gap-[10px]">
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5
          px] ${podkova.className}`}
                >
                  Base payment
                </label>
                {basePayment !== "" ? (
                  <div className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5">
                    <input
                      placeholder={basePayment}
                      id="basePayment"
                      type="number"
                      name="basePayment"
                      className=""
                      onChange={(e) => handleBasePaymentChange(e)}
                    />
                    {chainInfo?.tokenSymbol}
                  </div>
                ) : (
                  <div>loading </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}
                >
                  Periodicity
                </label>
                <div className="flex gap-[10px]">
                  {periodicityType === "fixed" ? (
                    <Button
                      type="active"
                      text="fixed"
                      action={() => setPeriodicityType("fixed")}
                    />
                  ) : (
                    <Button
                      type="outlined"
                      text="fixed"
                      action={() => setPeriodicityType("fixed")}
                    />
                  )}
                  {periodicityType === "custom" ? (
                    <Button
                      type="active"
                      text="custom"
                      action={() => setPeriodicityType("custom")}
                    />
                  ) : (
                    <Button
                      type="outlined"
                      text="custom"
                      action={() => setPeriodicityType("custom")}
                    />
                  )}
                </div>
                <div className="flex">
                  {periodicityType === "fixed" ? (
                    <select
                      name="periodicity"
                      onChange={() => {}}
                      className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-1.5 flex"
                    >
                      <option value="7200">Daily</option>
                      {/* x 5 days */}
                      <option value="36000">Weekly</option>
                      {/* x 30 days */}
                      <option value="216000">Monthly</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      name="periodicity"
                      className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex"
                      onChange={() => {}}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10px]">
          {newBasePayment !== null ? (
            <Button
              type="active"
              text="confirm update"
              icon=""
              action={handleUpdateBasePayment}
            />
          ) : (
            <Button type="disabled" text="confirm update" icon="" />
          )}
        </div>
      </form>
    </div>
  );
};

export default index;
