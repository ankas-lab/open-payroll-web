import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useInkathon } from "@scio-labs/use-inkathon";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import Nav from "../../components/nav";
import Button from "../../components/generals/button";
import StepOne from "./steps/stepOne";
import StepTwo from "./steps/stepTwo";
import StepThree from "./steps/stepThree";
import StepFour from "./steps/stepFour";
import StepFive from "./steps/stepFive";

//---------------------------------Interfaces---------------------------------
//Multipliers
interface Multiplier {
  id: number;
  value: number;
  name: string;
}

//Beneficiaries
interface Beneficiary {
  name: string;
  address: string;
  multipliers: Multiplier[];
  totalMultipliers: number;
  basePayment: number;
  finalPayment: number;
}

export default function Create() {
  //---------------------------------Security---------------------------------
  const router = useRouter();
  const { isConnected } = useInkathon();
  useEffect(() => {
    isConnected === false && router.push("/");
  }, [isConnected]);

  //---------------------------------Steps
  // steps to advance in the creation of the contract
  const [steps, setSteps] = useState(0);
  const step = (step: any) => {
    if (step === "next") {
      steps < 4 && setSteps(steps + 1);
    } else if (step === "back") {
      steps > 0 && setSteps(steps - 1);
    }
  };

  //---------------------------------Contract base---------------------------------
  // the base of the contract
  const [contractBase, setContractBase] = useState({
    contractName: "",
    basePayment: 0,
    periodicity: 0,
    ownerEmail: "",
  });

  const handleContractBaseChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    let updatedValue: any;

    if (name === "basePayment") {
      updatedValue = parseFloat(value);
    } else {
      updatedValue = value;
    }
    if (name === "periodicity") {
      updatedValue = parseFloat(value);
    } else {
      updatedValue = value;
    }

    setContractBase((prevValues) => ({
      ...prevValues,
      [name]: updatedValue,
    }));
  };

  //See changes in console
  useEffect(() => {
    console.log("From pather", contractBase);
  }, [contractBase]);

  //---------------------------------Multipliers---------------------------------
  // multipliers of the contract
  const [multipliers, setMultipliers] = useState<Multiplier[]>([]);

  const handleMultipliersChange = (multipliers: Multiplier[]) => {
    const hasName = multipliers.some(
      (multiplier) => multiplier.name.trim() !== ""
    );
    setMultipliers(multipliers);
  };

  //See changes in console
  useEffect(() => {
    console.log("From pather", multipliers);
  }, [multipliers]);

  //---------------------------------Beneficiaeries---------------------------------
  // beneficiaries of the contract
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  const handleBeneficiariesChange = (beneficiaries: Beneficiary[]) => {
    setBeneficiaries(beneficiaries);
  };
  //See changes in console
  useEffect(() => {
    console.log("From pather", beneficiaries);
  }, [beneficiaries]);

  //---------------------------------Can continue---------------------------------
  const [canContinue, setCanContinue] = useState(false);

  const handleCanContiue = (can: boolean) => {
    setCanContinue(can);
  };

  //---------------------------------Total to pay---------------------------------
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const handleCalculateTotalPayment = (total: number) => {
    setTotalToPay(total);
  };

  //---------------------------------UI---------------------------------

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[100px]">
        {/* Steps  */}
        {steps === 0 && (
          <StepOne
            handleContractBaseChange={handleContractBaseChange}
            onContractContractBase={contractBase}
            handleCanContiue={handleCanContiue}
          />
        )}
        {steps === 1 && (
          <StepTwo
            onMultipliersChange={handleMultipliersChange}
            onContractMultipliers={multipliers}
            handleCanContiue={handleCanContiue}
          />
        )}
        {steps === 2 && (
          <StepThree
            handleBeneficiariesChange={handleBeneficiariesChange}
            onContractBaseContract={contractBase}
            onContractMultipliers={multipliers}
            onContractBeneficiaries={beneficiaries}
            handleCanContiue={handleCanContiue}
            handleCalculateTotalPayment={handleCalculateTotalPayment}
            totalToPay={totalToPay}
          />
        )}
        {steps === 3 && <StepFour totalToPay={totalToPay} />}
        {steps === 4 && (
          <StepFive
            onContractMultipliers={multipliers}
            onContractBaseContract={contractBase}
            onContractBeneficiaries={beneficiaries}
          />
        )}
        <div className="flex w-6/12 md:w-2/12 gap-5">
          {steps === 0 ? (
            <Link href={"/"}>
              <Button type="outlined" text="cancel" />
            </Link>
          ) : (
            <div>
              <Button type="outlined" text="back" action={() => step("back")} />
            </div>
          )}
          <div>
            {canContinue ? (
              <Button type="active" text="next" action={() => step("next")} />
            ) : (
              <Button type="disabled" text="next" action={() => step("next")} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
