import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo, Podkova } from "next/font/google";

import Link from "next/link";
import { useRouter } from "next/router";
import { useInkathon } from "@scio-labs/use-inkathon";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

import StepOne from "./steps/stepOne";
import StepTwo from "./steps/stepTwo";
import StepThree from "./steps/stepThree";
import StepFour from "./steps/stepFour";
import StepFive from "./steps/stepFive";

//Interfaces

//Contract base
interface ContractBase {
  contractName: string;
  basePayment: number;
  periodicity: string;
  ownerEmail: string;
}

type handleContractBaseChangeType = (arg0: ContractBase) => void;

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
  // Security
  const router = useRouter();
  const { isConnected } = useInkathon();
  useEffect(() => {
    isConnected === false && router.push("/");
  }, [isConnected]);

  // Steps
  // steps to advance in the creation of the contract
  const [steps, setSteps] = useState(0);
  const step = (step: any) => {
    if (step === "next") {
      steps < 4 && setSteps(steps + 1);
    } else if (step === "back") {
      steps > 0 && setSteps(steps - 1);
    }
  };

  // Contract base
  // the base of the contract
  const [contractBase, setContractBase] = useState({
    contractName: "",
    basePayment: 0,
    periodicity: "",
    ownerEmail: "",
  });
  const handleContractBaseChange: handleContractBaseChangeType = (arg0) => {
    setContractBase(arg0);
  };
  //See changes in console
  useEffect(() => {
    console.log("From pather", contractBase);
  }, [contractBase]);

  // Multipliers
  // multipliers of the contract
  const [multipliers, setMultipliers] = useState<Multiplier[]>([]);
  //Can pass to step three
  const [isNextToThreeButtonEnabled, setIsNextToThreeButtonEnabled] =
    useState(false);
  const handleMultipliersChange = (multipliers: Multiplier[]) => {
    const hasName = multipliers.some(
      (multiplier) => multiplier.name.trim() !== ""
    );
    setIsNextToThreeButtonEnabled(hasName);
    setMultipliers(multipliers);
  };

  // Beneficiaeries
  // beneficiaries of the contract
  const [beneficieries, setBeneficiaries] = useState<Beneficiary[]>([]);

  // TotalPayment
  const [totalPayment, setTotalPayment] = useState<number>(0);

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[100px]">
        {/* Steps  */}
        {steps === 0 && (
          <StepOne handleContractBaseChange={handleContractBaseChange} />
        )}
        {steps === 1 && (
          <StepTwo
            onMultipliersChange={handleMultipliersChange}
            onContractMultipliers={multipliers}
          />
        )}
        {steps === 2 && (
          <StepThree
            onContractMultipliers={multipliers}
            onContractBaseContract={contractBase}
          />
        )}
        {steps === 3 && <StepFour />}
        {steps === 4 && (
          <StepFive
            onContractMultipliers={multipliers}
            onContractBaseContract={contractBase}
            onContractBeneficiaries={beneficieries}
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
            <Button type="active" text="next" action={() => step("next")} />
          </div>
        </div>
      </div>
    </main>
  );
}
