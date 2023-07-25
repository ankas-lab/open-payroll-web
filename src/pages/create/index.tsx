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
import Text from '@/components/generals/text';

import { useWallet } from 'useink';
import WalletManager from '@/components/walletManager';

import { CreateContext } from '@/context/create';
import StepSix from '@/components/create/steps/stepSix';
import Loader from '@/components/generals/Loader';
import { Toaster } from 'react-hot-toast';

//---------------------------------Interfaces---------------------------------

const Index = () => {
  const router = useRouter();
  const { account } = useWallet();
  const createContext = useContext(CreateContext);

  if (!createContext) {
    return null;
  }

  const {
    canContinue,
    setCanContinue,
    hasBeneficiaryWithoutAddress,
    check,
    deploy,
    D,
    clearAllInfo,
    rawFundsToTransfer,
    rawOwnerBalance,
    deleteEmptyMultipliers,
    initialBeneficiaries,
    basePayment,
    fundsToTransfer,
  } = createContext;

  //---------------------------------Steps
  const [steps, setSteps] = useState(0);
  const step = (step: string) => {
    if (step === 'next') {
      steps < 4 && setSteps(steps + 1);
    } else if (step === 'back') {
      steps > 0 && setSteps(steps - 1);
    }
  };

  const [canDryRun, setCanDryRun] = useState<boolean>(false);

  useEffect(() => {
    account === undefined && router.push('/');
  }, [account]);

  useEffect(() => {
    steps === 1 && setCanContinue(true);
    if (steps === 2) {
      hasBeneficiaryWithoutAddress() ? setCanContinue(true) : setCanContinue(false);
    }
  }, [steps, initialBeneficiaries]);

  useEffect(() => {
    if (
      fundsToTransfer >= 0 &&
      fundsToTransfer <= rawOwnerBalance &&
      basePayment > 0 &&
      basePayment !== undefined &&
      initialBeneficiaries.length > 0
    ) {
      setCanDryRun(true);
    } else {
      setCanDryRun(false);
    }
  }, [rawFundsToTransfer, rawOwnerBalance, basePayment, initialBeneficiaries]);

  return (
    <main className={account ? `flex flex-col md:flex-row ${archivo.className}` : `flex flex-col ${archivo.className}`}>
      <Nav />
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            border: '2px solid #25064C',
            padding: '16px',
            backgroundColor: '#F8F7FF',
            borderRadius: '5px',
            color: '#000000',
          },
        }}
      />
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
        {steps === 5 && <StepSix />}

        <div className="flex flex-col gap-2 md:flex-row md:gap-0 md:justify-between">
          {steps === 0 ? (
            <Link href={'/'}>
              <Button type="outlined" text="cancel" />
            </Link>
          ) : steps === 5 && D.wasDeployed && D.status === 'Finalized' ? (
            <div>
              <Button
                type="outlined"
                text="create other contract"
                action={() => {
                  setSteps(0), clearAllInfo();
                }}
              />
            </div>
          ) : steps === 5 && D.status === 'Finalized' && !D.wasDeployed ? (
            <Link href={'/'}>
              <Button type="outlined" text="go home" action={() => clearAllInfo()} />
            </Link>
          ) : steps === 5 && D.status !== 'Finalized' && D.status !== 'None' ? (
            <div>
              <Button type="disabled" text="back" action={() => setSteps(steps - 1)} />
            </div>
          ) : (
            <div>
              <Button type="outlined" text="back" action={() => setSteps(steps - 1)} />
            </div>
          )}

          {canContinue && steps < 4 && (
            <div>
              <Button
                type="active"
                text="next"
                action={
                  steps === 1
                    ? () => {
                        deleteEmptyMultipliers(), setSteps(steps + 1);
                      }
                    : () => setSteps(steps + 1)
                }
              />
            </div>
          )}

          {!canContinue && steps < 4 && (
            <div>
              <Button type="disabled" text="next" />
            </div>
          )}

          {steps === 4 && (
            <div>
              <Button
                type={canDryRun ? 'active' : 'disabled'}
                text="confirm"
                action={() => {
                  check(), setSteps(steps + 1);
                }}
              />
            </div>
          )}

          {steps === 5 && !D.wasDeployed && D.status !== 'Finalized' && (
            <div>
              <Button
                type={D.status !== 'Finalized' && D.status !== 'None' ? 'disabled' : 'active'}
                text={
                  D.status !== 'Finalized' &&
                  D.status !== 'None' &&
                  D.gasRequired.proofSize.toString() < rawOwnerBalance
                    ? ''
                    : 'deploy contract'
                }
                icon={
                  D.status === 'PendingSignature' || D.status === 'Broadcast' || D.status === 'InBlock'
                    ? 'loading'
                    : undefined
                }
                action={() => deploy()}
              />
            </div>
          )}

          {steps === 5 && D.wasDeployed && D.status === 'Finalized' && (
            <Link href={'/'}>
              <Button type="active" text="go home" action={() => clearAllInfo()} />
            </Link>
          )}

          {steps === 5 && D.status === 'Finalized' && !D.wasDeployed && (
            <div>
              <Button
                type="active"
                text="try again"
                action={() => {
                  setSteps(4), D.resetState();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default Index;
