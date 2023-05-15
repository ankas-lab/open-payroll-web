import React, { useEffect, useState } from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
import { useRouter } from "next/router";
import { useInkathon } from "@scio-labs/use-inkathon";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

export default function Edit() {
  // Security
  const router = useRouter();
  const { isConnected } = useInkathon();
  useEffect(() => {
    isConnected === false && router.push("/");
  }, [isConnected]);

  // Find in localStorage

  // Tabs
  const [tab, setTab] = useState<string>("contract");

  // Contract Base
  interface ContractBase {
    basePayment: number;
    periodicity: string;
  }

  const [initialContract, setInitialContract] = useState<ContractBase>({
    basePayment: 50,
    periodicity: "Weekly",
  });

  const [newContract, setNewContract] = useState<ContractBase>(initialContract);

  const handleContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewContract((prevContract) => ({
      ...prevContract,
      [name]: value,
    }));
  };

  // Multipliers
  interface Multiplier {
    id: string;
    name: string;
    multiplier?: number;
    state: string;
  }

  const [initialMultipliers, setInitialMultipliers] = useState<Multiplier[]>([
    { id: "abcd", name: "seniority", state: "active" },
    { id: "efgh", name: "bonus", state: "active" },
    { id: "ijk", name: "other", state: "paused" },
  ]);

  const [newMultipliers, setNewMultipliers] =
    useState<Multiplier[]>(initialMultipliers);

  const handleMultiplierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewMultipliers((prevMultiplier) => ({
      ...prevMultiplier,
      [name]: value,
    }));
  };

  // Beneficiaries
  interface Beneficiaries {
    address: string;
    multipliers: Multiplier[];
    basePayemnt: number;
    totalPayment: number;
  }

  const [initialBeneficiaries, setInitialBeneficiaries] = useState<
    Beneficiaries[]
  >([
    {
      address: "0x123456789123456789",
      multipliers: initialMultipliers,
      basePayemnt: initialContract.basePayment,
      totalPayment: 0,
    },
    {
      address: "0x123456789123456788",
      multipliers: initialMultipliers,
      basePayemnt: initialContract.basePayment,
      totalPayment: 0,
    },
    {
      address: "0x123456789123456787",
      multipliers: initialMultipliers,
      basePayemnt: initialContract.basePayment,
      totalPayment: 0,
    },
    {
      address: "0x123456789123456786",
      multipliers: initialMultipliers,
      basePayemnt: initialContract.basePayment,
      totalPayment: 0,
    },
  ]);

  const Contract = () => {
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
                  <input
                    id="basePayment"
                    type="text"
                    name="basePayment"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                    onChange={handleContractChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}
                  >
                    Periodicity
                  </label>
                  <select
                    id="periodicity"
                    name="periodicity"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-[9.4px] w-full px-2"
                  >
                    <option value="dayly">Dayly</option>
                    <option value="weekly" selected>
                      Weekly
                    </option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[10px]">
            {initialContract !== newContract ? (
              <Button type="active" text="confirm update" icon="" />
            ) : (
              <Button type="disabled" text="confirm update" icon="" />
            )}
          </div>
        </form>
      </div>
    );
  };

  const Multipliers = () => {
    return (
      <div className="w-full md:w-8/12">
        <div className="">
          <Text type="h4" text="Multipliers" />
          <Text
            type=""
            text="These are the multipliers of your contract, you can create new ones, pause them or delete them.
To eliminate a multiplier it is necessary that it be paused for a period."
          />
        </div>

        <div className="flex flex-col gap-[10px] mt-[10px]">
          <form className="flex flex-col gap-[10px]">
            <Text type="h6" text="Active" />
            <div className="grid grid-cols-1 w-full md:w-6/12 gap-[10px]">
              {/* 👇 .map of active multipliers 👇 */}
              {initialMultipliers
                .filter((m) => m.state === "active")
                .map((ma) => (
                  <div className="flex gap-[10px]">
                    <input
                      value={ma.name}
                      id="multiplier 1"
                      type="text"
                      name="multiplier 1"
                      className="capitalize bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                      onChange={handleMultiplierChange}
                    />
                    <div>
                      <Button type="text" text="" icon="pause" />
                    </div>
                  </div>
                ))}
            </div>
            {/* 👆 .map of active multipliers 👆 */}
            <div>
              <Button type="outlined" text="add other" icon="add" />
            </div>
            <div className="mt-[10px]">
              <Text type="h6" text="Paused" />
              <div className="grid grid-cols-1 gap-[10px]">
                {/* 👇 .map of paused multipliers 👇 */}
                {initialMultipliers
                  .filter((m) => m.state === "paused")
                  .map((ma) => (
                    <div className="flex gap-[10px] items-center capitalize">
                      <Text text={ma.name} type="" />
                      <div>
                        <Button type="text" text="" icon="delete" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* 👆 .map of paused multipliers 👆 */}
            <div className="mt-[10px]">
              {initialMultipliers !== newMultipliers ? (
                <Button type="active" text="confirm update" icon="" />
              ) : (
                <Button type="disabled" text="confirm update" icon="" />
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  const Beneficiaries = () => {
    return (
      <div className="w-10/12 flex flex-col gap-[20px]">
        <div className="">
          <Text type="h4" text="Beneficiaries" />
          <Text
            type=""
            text="These are all the beneficiaries that exist in your contract, you can add, delete or edit them."
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          {/* Beneficiarie header row */}
          <div className="flex gap-[20px] text-left w-12/12">
            <div className="w-2/12">
              <Text type="overline" text="name" />
            </div>
            <div className="w-2/12">
              <Text type="overline" text="address" />
            </div>
            {initialMultipliers
              .filter((m) => m.state === "active")
              .map((ma) => (
                <div className="w-2/12">
                  <Text type="overline" text={ma.name} />
                </div>
              ))}
            <div className="w-2/12">
              <Text type="overline" text="final pay" />
            </div>
            <div className="w-2/12"></div>
          </div>
          <form className="flex flex-col gap-[5px]">
            {/* Beneficiarie row */}
            {/* 👇 .map of active multipliers 👇 */}
            {initialBeneficiaries.map((b) => (
              <div className="flex gap-[20px] text-left w-12/12 items-center">
                <div className="w-2/12">
                  <input
                    value="name a"
                    name="beneficiarieName"
                    className="capitalize w-full bg-opwhite border-2 rounded-[5px] p-1"
                  />
                </div>
                <div className="w-2/12">
                  <input
                    value={b.address}
                    name="beneficiarieAddress"
                    className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                  />
                </div>
                <div className="w-2/12">
                  <input
                    name="beneficiarieMultiplier1"
                    className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                  />
                </div>
                <div className="w-2/12">
                  <input
                    name="beneficiarieMultiplier2"
                    className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                  />
                </div>
                <div className="w-2/12">
                  <Text type="" text="000 DOT" />
                </div>
                <div className="w-2/12">
                  <Button type="text" text="" icon="delete" />
                </div>
              </div>
            ))}
            {/* 👆 .map of active multipliers 👆 */}
          </form>
          <hr className="border-2 rounded my-[10px] w-10/12 "></hr>
          <div className="flex w-9/12 justify-between px-1">
            <Text type="h4" text="Total pay" />
            <Text type="h4" text="000 DOT" />
          </div>
        </div>

        <div>
          <Button type="outlined" text="add other" icon="add" />
        </div>
        <div>
          <Button type="active" text="confirm update" icon="" />
        </div>
      </div>
    );
  };

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[100px]">
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
        {tab === "contract" && <Contract />}
        {tab === "multipliers" && <Multipliers />}
        {tab === "beneficiaries" && <Beneficiaries />}
      </div>
    </main>
  );
}
