import React, { useEffect, useState } from "react";

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
  handleContractBaseChange: any;
  onMultipliersChange: any;
  handleBeneficiariesChange: any;
  totalToPay: any;
  handleCalculateTotalPayment: any;
  periodicityType: string;
  setPeriodicityType: any;
}

const StepFive: React.FC<stepFiveProps> = ({
  onContractBaseContract,
  handleContractBaseChange,
  periodicityType,
  setPeriodicityType,
  onContractMultipliers,
  onContractBeneficiaries,
  onMultipliersChange,
  handleBeneficiariesChange,
  totalToPay,
  handleCalculateTotalPayment,
}) => {
  //---------------------------------States---------------------------------
  const [contractBase, setContractBase] = useState<ContractBase>({
    contractName: "",
    basePayment: 0,
    periodicity: 0,
    ownerEmail: "",
  });
  const [multipliers, setMultipliers] = useState<Multiplier[]>(
    onContractMultipliers
  );
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(
    onContractBeneficiaries
  );

  const handleMultiplierChange = (id: number, name: string) => {
    const updatedMultipliers = multipliers.map((multiplier) =>
      multiplier.id === id ? { ...multiplier, name } : multiplier
    );
    setMultipliers(updatedMultipliers);
    onMultipliersChange(updatedMultipliers);
  };

  const handleBeneficiaryChange = (
    index: number,
    field: keyof Beneficiary,
    value: any
  ) => {
    const updatedBeneficiaries = beneficiaries.map(
      (beneficiary, beneficiaryIndex) => {
        if (beneficiaryIndex === index) {
          const updatedBeneficiary = {
            ...beneficiary,
            [field]: value,
          };

          updatedBeneficiary.multipliers = multipliers.map((multiplier) => ({
            id: multiplier.id,
            value: multiplier.value,
            name: multiplier.name,
          }));

          updatedBeneficiary.totalMultipliers =
            updatedBeneficiary.multipliers.reduce(
              (accumulator, currentMultiplier) =>
                accumulator + currentMultiplier.value,
              0
            );

          updatedBeneficiary.finalPayment =
            updatedBeneficiary.totalMultipliers * contractBase.basePayment;

          return updatedBeneficiary;
        }

        return beneficiary;
      }
    );

    setBeneficiaries(updatedBeneficiaries);
    handleBeneficiariesChange(updatedBeneficiaries);
  };

  const handleBeneficiaryMultiplierChange = (
    beneficiaryIndex: number,
    multiplierIndex: number,
    value: string
  ) => {
    const updatedBeneficiaries = [...beneficiaries];
    const beneficiary = updatedBeneficiaries[beneficiaryIndex];
    const updatedMultipliers = [...beneficiary.multipliers];

    const sanitizedValue = value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
    const parsedValue = parseFloat(sanitizedValue);

    updatedMultipliers[multiplierIndex] = {
      ...updatedMultipliers[multiplierIndex],
      value: parsedValue,
    };
    beneficiary.multipliers = updatedMultipliers;

    // Calculate the total multipliers for the beneficiary
    const totalMultipliers = updatedMultipliers.reduce(
      (accumulator, currentMultiplier) => accumulator + currentMultiplier.value,
      0
    );

    beneficiary.totalMultipliers = totalMultipliers;

    // Calculate the final payment for the beneficiary
    const finalPayment = totalMultipliers * contractBase.basePayment;

    beneficiary.finalPayment = finalPayment;

    setBeneficiaries(updatedBeneficiaries);
    calculateTotalPayment();
  };

  const calculateTotalPayment = () => {
    let totalPayment = 0;
    beneficiaries.forEach((beneficiary) => {
      totalPayment += beneficiary.finalPayment;
    });
    handleCalculateTotalPayment(totalPayment);
  };

  //---------------------------------Effects---------------------------------
  useEffect(() => {
    const base = {
      contractName: "",
      basePayment: 0,
      periodicity: 0,
      ownerEmail: "",
    };
    if (onContractBaseContract !== base) {
      setContractBase(onContractBaseContract);
    } else {
      setContractBase({
        contractName: "",
        basePayment: 0,
        periodicity: 0,
        ownerEmail: "",
      });
    }
  }, [onContractBaseContract]);

  //---------------------------------UI---------------------------------
  return (
    <div className="">
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
        <div className="w-full">
          <form className="flex flex-col gap-[40px]">
            {/* ---------------------------------Contract--------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] md:gap-[20px]">
              <div className="grid grid-cols-1 gap-[10px]">
                <Text type="h4" text="Contract" />
                <div className="flex flex-col">
                  <label
                    htmlFor="contractName"
                    className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
                  >
                    Contract name
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
                    Email
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
                    Base payment
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
                        value={contractBase.periodicity}
                        type="number"
                        name="periodicity"
                        className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex"
                        onChange={handleContractBaseChange}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* ---------------------------------Multipliers--------------------------------- */}
              <div className="flex flex-col gap-[10px]">
                <Text type="h4" text="Multipliers" />
                {multipliers.map((multiplier) => (
                  <div className="flex">
                    <input
                      key={multiplier.id}
                      type="text"
                      value={multiplier.name}
                      onChange={(e) =>
                        handleMultiplierChange(multiplier.id, e.target.value)
                      }
                      className="bg-opwhite w-full border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                    />
                  </div>
                ))}
              </div>
              {/* ---------------------------------Funds--------------------------------- */}
              <div className="flex flex-col gap-[10px] md:border-l-2 md:border-oppurple md:pl-[20px]">
                <Text type="h4" text="Funds" />
                <div className="flex flex-col gap-[20px]">
                  <Text
                    type="h6"
                    text={`Minimum funds necesaries: ${totalToPay} DOT`}
                  />
                  <Button type="outlined" text="add funds" icon="+" action />
                </div>
              </div>
            </div>
            {/* ---------------------------------Beneficiaries--------------------------------- */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <Text type="h4" text="Beneficiaries" />
                <Text
                  type="h6"
                  text={`Base payment: ${contractBase.basePayment} DOT`}
                />
              </div>
              <div className="flex flex-col gap-[10px] overflow-auto pb-5">
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
                </div>
                {/* Beneficiarie row */}
                <div className="flex flex-col gap-[5px]">
                  {beneficiaries.map((b, index) => (
                    <div
                      key={index}
                      className="flex gap-[20px] text-left w-fit items-center"
                    >
                      <div className="w-[150px]">
                        <input
                          className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                          type="text"
                          value={b.name}
                          placeholder="Name"
                          name="name"
                          onChange={(e) =>
                            handleBeneficiaryChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="w-[150px]">
                        <input
                          className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                          type="text"
                          value={b.address}
                          placeholder="Name"
                          name="address"
                          onChange={(e) =>
                            handleBeneficiaryChange(
                              index,
                              "address",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      {b.multipliers.map((bm, multiplierIndex) => (
                        <div key={bm.id} className="w-[150px]">
                          <input
                            className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                            type="number"
                            value={bm.value}
                            onChange={(e) =>
                              handleBeneficiaryMultiplierChange(
                                index,
                                multiplierIndex,
                                e.target.value
                              )
                            }
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
                </div>

                <hr className="border-2 rounded my-[10px] w-full md:w-10/12 "></hr>
                <div className="flex w-full md:w-9/12 justify-between px-1">
                  <Text type="h4" text="Total pay" />
                  <Text type="h4" text={`${totalToPay} DOT`} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
