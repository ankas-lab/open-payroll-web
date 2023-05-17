import React, { useEffect, useState } from "react";

import Button from "../../../components/generals/button";
import Text from "../../../components/generals/text";

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
interface StepThreeProps {
  handleBeneficiariesChange: (beneficiaries: Beneficiary[]) => void;
  onContractMultipliers: Multiplier[];
  onContractBaseContract: ContractBase;
  onContractBeneficiaries: Beneficiary[];
  handleCanContiue: any;
  handleCalculateTotalPayment: any;
  totalToPay: number;
}

const StepThree: React.FC<StepThreeProps> = ({
  handleBeneficiariesChange,
  onContractBaseContract,
  onContractMultipliers,
  onContractBeneficiaries,
  handleCanContiue,
  handleCalculateTotalPayment,
  totalToPay,
}) => {
  //---------------------------------States---------------------------------
  const [baseContract, setBaseContract] = useState<ContractBase>(
    onContractBaseContract
  );

  const [multipliers, setMultipliers] = useState<Multiplier[]>(
    onContractMultipliers
  );

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      name: "",
      address: "",
      multipliers: multipliers.map((multiplier) => ({
        id: multiplier.id,
        value: multiplier.value,
        name: multiplier.name,
      })),
      totalMultipliers: 1,
      basePayment: Number(baseContract.basePayment),
      finalPayment: 1,
    },
  ]);

  //---------------------------------Handles---------------------------------
  const handleAddBeneficiary = () => {
    const newBeneficiary: Beneficiary = {
      name: "",
      address: "",
      multipliers: multipliers.map((multiplier) => ({
        id: multiplier.id,
        value: multiplier.value,
        name: multiplier.name,
      })),
      totalMultipliers: 1,
      basePayment: Number(baseContract.basePayment),
      finalPayment: 1,
    };

    setBeneficiaries([...beneficiaries, newBeneficiary]);
  };

  const handleRemoveBeneficiary = (beneficiaryIndex: number) => {
    if (beneficiaries.length > 1) {
      const updatedBeneficiaries = [...beneficiaries];
      updatedBeneficiaries.splice(beneficiaryIndex, 1);
      setBeneficiaries(updatedBeneficiaries);
    }
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
            updatedBeneficiary.totalMultipliers * baseContract.basePayment;

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
    const finalPayment = totalMultipliers * baseContract.basePayment;

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
  //Disable can continue
  useEffect(() => {
    handleCanContiue(false);
  }, []);

  //Pull created multipliers
  useEffect(() => {
    const base = [
      {
        name: "",
        address: "",
        multipliers: multipliers.map((multiplier) => ({
          id: multiplier.id,
          value: multiplier.value,
          name: multiplier.name,
        })),
        totalMultipliers: 1,
        basePayment: Number(baseContract.basePayment),
        finalPayment: 1,
      },
    ];
    if (onContractBeneficiaries.length > 0) {
      setBeneficiaries(onContractBeneficiaries);
      handleCanContiue(true);
    }
  }, [onContractBeneficiaries]);

  //See changes + active/disable can continue
  useEffect(() => {
    console.log(beneficiaries);
    const hasEmptyBeneficiarie = beneficiaries.some((b) => b.address === "");
    hasEmptyBeneficiarie ? handleCanContiue(false) : handleCanContiue(true);
  }, [beneficiaries]);

  //---------------------------------UI---------------------------------
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Create beneficiaries" />
          <Text type="h6" text="3/4" />
        </div>
        <div className="">
          <Text
            type=""
            text="Now it's time for the beneficiaries, add their wallets and corresponding multipliers."
          />
        </div>
      </div>
      <div className="flex gap-[20px]">
        <Text
          type="h6"
          text={`Base payment: ${baseContract.basePayment} DOT`}
        />
      </div>
      <div className="flex flex-col gap-[10px] overflow-x-scroll pb-5">
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
                    handleBeneficiaryChange(index, "name", e.target.value)
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
                    handleBeneficiaryChange(index, "address", e.target.value)
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
              <div className="w-[100px]">
                <Button
                  type="text"
                  text=""
                  icon="delete"
                  action={() => handleRemoveBeneficiary(index)}
                />
              </div>
            </div>
          ))}
        </form>

        <hr className="border-2 rounded my-[10px] w-full md:w-10/12 "></hr>
        <div className="flex w-full md:w-9/12 justify-between px-1">
          <Text type="h4" text="Total pay" />
          <Text type="h4" text={`${totalToPay} DOT`} />
        </div>
        <div className="w-[200px]">
          <Button
            type="outlined"
            text="add other"
            icon="add"
            action={handleAddBeneficiary}
          />
        </div>
      </div>
    </>
  );
};

export default StepThree;
