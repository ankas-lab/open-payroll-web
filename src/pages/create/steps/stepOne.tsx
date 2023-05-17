import React, { useEffect, useState } from "react";

import Text from "../../../components/generals/text";
import Button from "../../../components/generals/button";

import { Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });

//---------------------------------Interfaces---------------------------------
interface ContractBase {
  contractName: string;
  basePayment: number;
  periodicity: number;
  ownerEmail: string;
}

//---------------------------------Props---------------------------------
interface stepOneProps {
  handleContractBaseChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCanContiue: any;
  onContractContractBase: ContractBase;
}

const StepOne: React.FC<stepOneProps> = ({
  handleContractBaseChange,
  handleCanContiue,
  onContractContractBase,
}) => {
  //---------------------------------States---------------------------------
  const [contractBase, setContractBase] = useState<ContractBase>({
    contractName: "",
    basePayment: 0,
    periodicity: 0,
    ownerEmail: "",
  });

  const [periodicityType, setPeriodicityType] = useState<string>("fixed");

  //---------------------------------Effects---------------------------------
  //Pull created multipliers
  useEffect(() => {
    const base = {
      contractName: "",
      basePayment: 0,
      periodicity: 0,
      ownerEmail: "",
    };
    if (onContractContractBase !== base) {
      setContractBase(onContractContractBase);
      handleCanContiue(true);
    } else {
      setContractBase({
        contractName: "",
        basePayment: 0,
        periodicity: 0,
        ownerEmail: "",
      });
    }
  }, [onContractContractBase]);
  //active/disable can continue
  useEffect(() => {
    contractBase.basePayment !== 0 && handleCanContiue(true);
  }, [contractBase]);

  //---------------------------------UI---------------------------------
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Create contract" />
          <Text type="h6" text="1/4" />
        </div>
        <div className="">
          <Text
            type=""
            text="We are going to create the contract with which you will pay your beneficiaries."
          />
        </div>
      </div>
      <form className="w-12/12 md:w-6/12 lg:w-4/12 flex flex-col gap-[10px] md:gap-[20px]">
        <div className="flex flex-col">
          <label
            htmlFor="contractName"
            className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
          >
            Contract name*
          </label>
          <input
            value={contractBase.contractName}
            type="text"
            name="contractName"
            id="contractName"
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            onChange={handleContractBaseChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
          >
            Email*
          </label>
          <input
            value={contractBase.ownerEmail}
            type="email"
            name="ownerEmail"
            id="ownerEmail"
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            onChange={handleContractBaseChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
          >
            Base payment**
          </label>
          <div className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex">
            <input
              value={contractBase.basePayment}
              type="number"
              name="basePayment"
              id="basePayment"
              className="bg-opwhite without-ring w-full"
              onChange={handleContractBaseChange}
            />
            <p className="mx-5">DOT</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}
          >
            Periodicity***
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
                value={contractBase.periodicity}
                onChange={handleContractBaseChange}
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
                onChange={handleContractBaseChange}
              />
            )}
          </div>
        </div>
      </form>
      <div>
        <Text
          type=""
          text="* These data are stored in your browser, not in the blockchain, the emails will be used to send notifications to you or your beneficiaries and the names to more easily identify the data in the interface, surely it is easier to remember a name than a code, or no?"
        />
        <Text
          type=""
          text="** This is the base payment of your beneficiaries, on this the multipliers will be applied and added to this amount."
        />
        <Text
          type=""
          text="*** If you select the 'custom' option, please note that you must enter the number of blocks, and that 5 blocks are generated per minute."
        />
      </div>
    </>
  );
};

export default StepOne;
