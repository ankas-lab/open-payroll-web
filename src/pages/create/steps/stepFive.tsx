import React, { useState } from "react";

import Button from "../../../components/generals/button";
import Text from "../../../components/generals/text";

import { Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });

//---------------------------------Interfaces---------------------------------
interface ContractBase {
  contractName: string;
  basePayment: number;
  periodicity: number;
  ownerEmail: string;
}
interface Multiplier {
  id: number;
  value: number;
  name: string;
}
interface Beneficiary {
  name: string;
  address: string;
  multipliers: Multiplier[];
  totalMultipliers: number;
  basePayment: number;
  finalPayment: number;
}

//---------------------------------Props---------------------------------
interface stepFiveProps {
  onContractMultipliers: Multiplier[];
  onContractBaseContract: ContractBase;
  onContractBeneficiaries: Beneficiary[];
}

const StepFive: React.FC<stepFiveProps> = ({
  onContractMultipliers,
  onContractBaseContract,
  onContractBeneficiaries,
}) => {
  //---------------------------------States---------------------------------
  const [baseContract, setBaseContract] = useState<ContractBase>(
    onContractBaseContract
  );
  const [multipliers, setMultipliers] = useState<Multiplier[]>(
    onContractMultipliers
  );
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(
    onContractBeneficiaries
  );

  //---------------------------------UI---------------------------------
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Confirm the contract" />
          <Text type="h6" text="final" />
        </div>
        <div className="">
          <Text
            type=""
            text="Make sure that all the data you entered is correct to finish."
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-8/12">
          <form className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[20px]">
              <Text type="h4" text="Contract" />
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] md:mb-[10px] ${podkova.className}`}
                >
                  Contract name
                </label>
                <input
                  value={baseContract.contractName}
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] md:mb-[10px] ${podkova.className}`}
                >
                  Base pay
                </label>
                <input
                  value={baseContract.basePayment}
                  id="GET-name"
                  type="number"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] md:mb-[10px] ${podkova.className}`}
                >
                  Periodicity
                </label>
                <select
                  name="select"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-2"
                >
                  <option value="value1">Value 1</option>
                  <option value="value2" selected>
                    Value 2
                  </option>
                  <option value="value3">Value 3</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] md:mb-[10px] ${podkova.className}`}
                >
                  Email
                </label>
                <input
                  value={baseContract.ownerEmail}
                  id="GET-name"
                  type="email"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[20px]">
              <Text type="h4" text="Multipliers" />
              {multipliers.map((m) => (
                <input
                  key={m.id}
                  value={m.name}
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              ))}
            </div>
            <div className="flex gap-[20px]">
              <Text type="h4" text="Beneficiaries" />
              <Text type="h6" text={`Base payment: ${"000"} DOT`} />
            </div>
            <div className="flex flex-col gap-[10px] overflow-x-scroll">
              {/* Header table row */}
              <div className="flex gap-[20px] text-left w-fit md:w-12/12">
                <div className="w-[150px]">
                  <Text type="overline" text="name" />
                </div>
                <div className="w-[150px]">
                  <Text type="overline" text="address" />
                </div>
                {multipliers.map((m) => (
                  <div key={m.id} className="w-[150px]">
                    <Text type="overline" text={m.name} />
                  </div>
                ))}
                <div className="w-[150px]">
                  <Text type="overline" text="total multipliers" />
                </div>
                <div className="w-[150px]">
                  <Text type="overline" text="final pay" />
                </div>
                <div className="w-[150px]"></div>
              </div>
              {/* Beneficiarie row */}
              <form className="flex flex-col gap-[5px]">
                {beneficiaries.map((b, index) => (
                  <div className="flex gap-[20px] text-left w-fit items-center">
                    <div className="w-[150px]">
                      <input
                        className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                        type="text"
                        value={b.name}
                        placeholder="Name"
                        name="name"
                      />
                    </div>
                    <div className="w-[150px]">
                      <input
                        className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                        type="text"
                        value={b.address}
                        placeholder="Name"
                        name="address"
                      />
                    </div>
                    {b.multipliers.map((bm, multiplierIndex) => (
                      <div key={bm.id} className="w-[150px]">
                        <input
                          className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                          type="number"
                          value={bm.value}
                        />
                      </div>
                    ))}
                    <div className="w-[150px]">
                      <p>{b.totalMultipliers}</p>
                    </div>
                    <div className="w-[150px]">
                      <p>{b.finalPayment}</p>
                    </div>
                  </div>
                ))}
              </form>

              <hr className="border-2 rounded my-[10px] w-full md:w-10/12 "></hr>
              <div className="flex w-full md:w-9/12 justify-between px-1">
                <Text type="h4" text="Total pay" />
                <Text type="h4" text="000 DOT" />
              </div>
            </div>
          </form>
        </div>
        <div className="h-full border rounded-md border-oppurple my-5 md:my-0 md:mx-5"></div>
        <div className="w-full md:w-3/12">
          <Text type="h4" text="Funds" />
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <Text type="h6" text="Minimum funds necesaries" />
              <Text type="" text="000 DOT" />
              <Button type="outlined" text="add funds" icon="+" action />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
