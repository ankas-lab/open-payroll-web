import React, { useEffect, useState } from "react";
import Text from "../../../components/generals/text";
import { Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });

// Interfaces
interface ContractBase {
  contractName: string;
  basePayment: number;
  periodicity: string;
  ownerEmail: string;
}

// Props
interface stepOneProps {
  handleContractBaseChange: any;
}

const StepOne: React.FC<stepOneProps> = ({ handleContractBaseChange }) => {
  const [contractBase, setContractBase] = useState<ContractBase>({
    contractName: "",
    basePayment: 0,
    periodicity: "",
    ownerEmail: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setContractBase((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleContractBaseChange(contractBase);
  }, [contractBase]);

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
            type="text"
            name="contractName"
            id="contractName"
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            onChange={handleInputChange}
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
              type="number"
              name="basePayment"
              id="basePayment"
              className="bg-opwhite without-ring w-full"
              onChange={handleInputChange}
            />
            <p className="mx-5">DOT</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
          >
            Periodicity
          </label>
          <div className="flex">
            <select
              name="periodicity"
              value={contractBase.periodicity}
              onChange={handleInputChange}
              className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-1.5 flex"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
          >
            Email*
          </label>
          <input
            type="email"
            name="ownerEmail"
            id="ownerEmail"
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div>
        <Text
          type=""
          text="* These data are stored in your browser, not in the blockchain, the emails will be used to send notifications to you or your beneficiaries and the names to more easily identify the data in the interface, surely it is easier to remember a name than a code, or no?
** This is the base payment of your beneficiaries, on this the multipliers will be applied and added to this amount"
        />
      </div>
    </>
  );
};

export default StepOne;
