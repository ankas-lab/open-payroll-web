/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import Nav from '../../components/nav';
import Button from '../../components/generals/button';
import StepOne from '../../components/create/steps/stepOne';
import StepTwo from '../../components/create/steps/stepTwo';
import StepThree from '../../components/create/steps/stepThree';
import StepFour from '../../components/create/steps/stepFour';
import StepFive from '../../components/create/steps/stepFive';
import Result from '../../components/create/results';

import { useWallet } from 'useink';
import WalletManager from '@/components/walletManager';
import { useCreate } from '@/hooks/useCreate';
import { CreateContext } from '@/context/create';

//---------------------------------Interfaces---------------------------------

const Index = () => {
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

  const { canContinue, formatConstructorParams } = createContext;

  //---------------------------------Steps
  // steps to advance in the creation of the contract
  //FIXME
  const [steps, setSteps] = useState(0);
  const step = (step: string) => {
    if (step === 'next') {
      steps < 4 && setSteps(steps + 1);
    } else if (step === 'back') {
      steps > 0 && setSteps(steps - 1);
    }
  };

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />

      <div className="w-10/12 md:w-8/12 overflow-x-auto min-h-screen mx-auto flex flex-col gap-[40px] py-[10vh] md:py-0 md:pb-[20vh]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>

        {/* Steps  */}
        {steps === 0 && <StepOne />}
        {steps === 1 && <StepTwo />}
        {steps === 2 && <StepThree />}
        {steps === 3 && <StepFour />}
        {steps === 4 && <StepFive />}

        <div className="flex justify-between">
          {steps === 0 ? (
            <Link href={'/'}>
              <Button type="outlined" text="cancel" />
            </Link>
          ) : (
            <div>
              <Button type="outlined" text="back" action={() => setSteps(steps - 1)} />
            </div>
          )}
          {canContinue && steps < 4 && (
            <div>
              <Button type="active" text="next" action={() => setSteps(steps + 1)} />
            </div>
          )}
          {!canContinue && steps < 4 && (
            <div>
              <Button type="disabled" text="next" />
            </div>
          )}
          {steps === 4 && (
            <div>
              <Button type="active" text="done" action={() => formatConstructorParams()} />
            </div>
          )}
        </div>
      </div>

      {/*result !== 'creating' && <Result result={result} handleEmptyAll={handleEmptyAll} />*/}
    </main>
  );
};
export default Index;
