import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import Nav from "../../components/nav";
import Button from "../../components/generals/button";
import StepOne from "./steps/stepOne";
import StepTwo from "./steps/stepTwo";
import StepThree from "./steps/stepThree";
import StepFour from "./steps/stepFour";
import StepFive from "./steps/stepFive";
import Result from "./results";

import { useWallet } from "useink";

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

//BeneficiariesBC
interface BeneficiaryBC {
  address: string;
  multipliers: Multiplier[];
  totalMultipliers: number;
  basePayment: number;
  finalPayment: number;
}

//ContractBC
interface ContractBC {
  basePayment: number;
  periodicity: number;
  totalPayment: number;
}

interface InfoForBlockchain {
  multipliers: Multiplier[];
  beneficiaries: BeneficiaryBC[];
  contract: ContractBC;
}

export default function Create() {
  //---------------------------------Security---------------------------------
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    !account && router.push("/");
  }, [account]);

  //---------------------------------Steps
  // steps to advance in the creation of the contract
  const [steps, setSteps] = useState(0);
  const step = (step: string) => {
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

  const [periodicityType, setPeriodicityType] = useState<string>("fixed");

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

  useEffect(() => {
    steps === 4 && setCanContinue(false);
  }, [steps]);

  //---------------------------------Total to pay---------------------------------
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const handleCalculateTotalPayment = (total: number) => {
    setTotalToPay(total);
  };

  //---------------------------------infoForBlockchain---------------------------------
  const [infoForBlockchain, setInfoForBlockchain] =
    useState<InfoForBlockchain | null>(null);

  const handleCreateAllInfoBC = () => {
    const contract: ContractBC = {
      basePayment: contractBase.basePayment,
      periodicity: contractBase.periodicity,
      totalPayment: totalToPay,
    };

    const beneficiariesBC: BeneficiaryBC[] = beneficiaries.map(
      (beneficiary) => ({
        address: beneficiary.address,
        multipliers: beneficiary.multipliers,
        totalMultipliers: beneficiary.totalMultipliers,
        basePayment: beneficiary.basePayment,
        finalPayment: beneficiary.finalPayment,
      })
    );

    const infoBC: InfoForBlockchain = {
      multipliers,
      beneficiaries: beneficiariesBC,
      contract,
    };

    setInfoForBlockchain(infoBC);
    setTimeout(() => {
      setResult("loading");
    }, 1000);
    setTimeout(() => {
      setResult("done");
    }, 7000);
  };

  useEffect(() => {
    console.log(infoForBlockchain);
  }, [infoForBlockchain]);

  //---------------------------------Results---------------------------------
  const [result, setResult] = useState<
    "creating" | "loading" | "done" | "error"
  >("creating");

  const handleEmptyAll = () => {
    setSteps(0);
    setContractBase({
      contractName: "",
      basePayment: 0,
      periodicity: 0,
      ownerEmail: "",
    });
    setMultipliers([]);
    setBeneficiaries([]);
    setTotalToPay(0);
    setInfoForBlockchain(null);
  };

  //---------------------------------UI---------------------------------

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      {result === "creating" && (
        <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] my-[50px] md:my-[100px]">
          {/* Steps  */}
          {steps === 0 && (
            <StepOne
              handleContractBaseChange={handleContractBaseChange}
              onContractContractBase={contractBase}
              handleCanContiue={handleCanContiue}
              periodicityType={periodicityType}
              setPeriodicityType={setPeriodicityType}
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
              onContractBaseContract={contractBase}
              handleContractBaseChange={handleContractBaseChange}
              onContractMultipliers={multipliers}
              onMultipliersChange={handleMultipliersChange}
              onContractBeneficiaries={beneficiaries}
              handleBeneficiariesChange={handleBeneficiariesChange}
              totalToPay={totalToPay}
              handleCalculateTotalPayment={handleCalculateTotalPayment}
              periodicityType={periodicityType}
              setPeriodicityType={setPeriodicityType}
            />
          )}
          <div className="flex w-6/12 md:w-2/12 gap-5">
            {steps === 0 ? (
              <Link href={"/"}>
                <Button type="outlined" text="cancel" />
              </Link>
            ) : (
              <div>
                <Button
                  type="outlined"
                  text="back"
                  action={() => step("back")}
                />
              </div>
            )}
            <div>
              {canContinue && steps !== 4 && (
                <Button type="active" text="next" action={() => step("next")} />
              )}
              {!canContinue && steps !== 4 && (
                <Button
                  type="disabled"
                  text="next"
                  action={() => step("next")}
                />
              )}
              {steps === 4 && (
                <Button
                  type="active"
                  text="done"
                  action={handleCreateAllInfoBC}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {result !== "creating" && (
        <Result result={result} handleEmptyAll={handleEmptyAll} />
      )}
    </main>
  );
}
