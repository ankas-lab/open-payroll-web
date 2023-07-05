/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { OPLogo } from '@/assets/logo/OPLogo';
import Logo from '@/assets/logo/LogoHero.png';
import Link from 'next/link';
import { Archivo, Podkova } from 'next/font/google';
import { FaGithub, FaTelegram } from 'react-icons/fa';
import Image from 'next/image';
import Data from '@/assets/images/BasicData.png';
import Mults from '@/assets/images/CreateMultipliers.png';
import Beneficiaries from '@/assets/images/CreateBeneficiaries.png';
import Overview from '@/assets/images/Overview.png';
import AboutContract from '@/assets/images/AboutContract.png';
import WhatCanYouDo from '@/assets/images/WhatCanYouDo.png';
import Astar from '@/assets/stack/astar.png';
import Ink from '@/assets/stack/ink.png';
import Kusama from '@/assets/stack/kusama.png';
import Polkadot from '@/assets/stack/polkadot.png';
import W3f from '@/assets/stack/w3f.png';
const archivo = Archivo({ subsets: ['latin'] });
const podkova = Podkova({ subsets: ['latin'] });
const index = () => {
  return (
    <main className="bg-oppurple items-center flex flex-col overflow-hidden">
      {/* Hero */}
      <div className="h-[120vh] w-full overflow-hidden relative arrow">
        <div className="h-[99vh] w-full flex flex-col justify-between p-4 items-end overflow-hidden">
          <div className="w-[280px]">
            <Link
              href={'/'}
              className={` hidden md:flex items-center text-center gap-[10px] rounded-[5px] py-[12px] px-[15px] text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className} bg-gradient-to-r from-oplightpurple to-oplightgreen hover:bg-gradient-to-l transition-all duration-200 hover:shadow`}
            >
              LAUNCH DAPP
            </Link>
          </div>
          <div className="w-full h-fit flex flex-col gap-[20px] md:gap-[100px] items-center">
            <h1 className={`text-[36px] md:text-[82px] font-bold ${podkova.className} text-opwhite text-center`}>
              Pay your employees easily
            </h1>
            <div className="w-full flex flex-col gap-2 items-center">
              {/* Hero */}
              <Link
                href={'/'}
                className={`max-w-[550px] items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className} bg-opwhite transition-all duration-200 hover:shadow`}
              >
                what is this?
              </Link>
              <Link
                href={'/'}
                className={`max-w-[550px] items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className} bg-gradient-to-r from-oplightpurple to-oplightgreen hover:bg-gradient-to-l transition-all duration-200 hover:shadow`}
              >
                LAUNCH DAPP
              </Link>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <a>
              <FaGithub className="text-opwhite w-7 h-7" />
            </a>
            <a>
              <FaTelegram className="text-opwhite w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
      {/* Oval */}
      <div className=" bg-opwhite w-[150vw] md:w-[110vw] h-[30vh] oval shadow-inner -mt-[10vh] z-[2]"></div>
      {/* Create contracts in simple steps */}
      <div className=" bg-opwhite w-[100vw] -mt-[20vh] pb-[5vh] md:pb-[10vh] z-[3]">
        <div className="w-11/12 md:w-8/12 gap-5 flex flex-col mx-auto leading-none">
          <h2 className={`text-[32px] md:text-[51px] font-regular ${podkova.className}`}>
            Create contracts in simple steps
          </h2>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-3">
            <div className="w-full h-fit">
              <div className="p-5 border-2 border-oplightpurple rounded-xl w-full max-h-[350px] min-h-[350px] flex flex-col gap-3 bg-opwhite">
                <p className={`text-[24px] md:text-[29px] font-regular ${podkova.className}`}>1. Basic data</p>
                <p className={`text-[15px] font-regular ${archivo.className}`}>
                  Enter the basic data such as the name of the contract, the basic salary and the periodicity
                </p>
                <Image src={Data} alt="data" className="-ml-[7vw] block md:scale-[.95]" />
              </div>
            </div>
            <div className="w-full h-fit">
              <div className="p-5 border-2 border-oplightpurple rounded-xl w-full max-h-[350px] min-h-[350px] flex flex-col gap-3 bg-opwhite">
                <p className={`text-[24px] md:text-[29px] font-regular ${podkova.className}`}>2. Create multipliers</p>
                <p className={`text-[15px] font-regular ${archivo.className}`}>
                  Create the multipliers that will affect the base payment of your beneficiaries
                </p>
                <Image src={Mults} alt="mults" className="-mt-10 md:-mt-0 scale-75 block" />
              </div>
            </div>
            <div className="w-full h-fit">
              <div className="p-5 border-2 border-oplightpurple rounded-xl w-full max-h-[350px] min-h-[350px] flex flex-col gap-3 bg-opwhite">
                <p className={`text-[24px] md:text-[29px] font-regular ${podkova.className}`}>
                  3. Create beneficiaries
                </p>
                <p className={`text-[15px] font-regular ${archivo.className}`}>
                  Add the beneficiaries to whom the contract will pay automatically when appropriate according to the
                  periodicity
                </p>
                <Image src={Beneficiaries} alt="beneficiaries" className="scale-[.7] ml-[7vw] block" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our stack */}
      <div className=" bg-opwhite w-[100vw] py-[5vh] md:py-[10vh]">
        <div className="w-11/12 md:w-9/12 mx-auto flex flex-col">
          <h2 className={`text-[32px] md:text-[51px] font-regular ${podkova.className} md:mx-auto`}>Our stack</h2>
          <div className="grid grid-cols-2 align-middle md:flex md:justify-between">
            {/* TODO:change imgs */}
            <Image src={Kusama} alt="Kusama" className="m-auto scale-75" />
            <Image src={W3f} alt="W3f" className="m-auto scale-75" />
            <Image src={Polkadot} alt="Polkadot" className="m-auto scale-75" />
            <Image src={Ink} alt="Ink" className="m-auto scale-75" />
            <Image src={Astar} alt="Astar" className="m-auto scale-75 col-span-2" />
          </div>
        </div>
      </div>
      {/* About */}
      <div className=" bg-opwhite w-[100vw] py-[5vh] md:py-[10vh]">
        <div className="w-11/12 md:w-8/12 flex flex-col gap-10 mx-auto">
          <div className="flex gap-5">
            <div className="w-full md:w-6/12 flex flex-col gap-2">
              <h2 className={`text-[32px] md:text-[51px] font-regular ${podkova.className}`}>Overview</h2>
              <p className={`text-[15px] font-regular ${archivo.className}`}>
                The objective of Open Payroll is to meet the needs of organizations that wish to make transparent
                payments during a given period, creating a contract that enables anyone to configure and generate their
                own payroll system. The payroll contract is owned entirely by its creator.This creator could be a DAO
                address, a multisig or a single person. The contract manages a treasury from where all the payments are
                deducted. There is a base amount and a set of multipliers associated to the addresses of the payees.
                E.g. We create a payroll contract for paying developers salaries. We will have a base amount and only
                one multiplier which is the employee's seniority. Alice is a junior employee and Bob is a senior
                employee. Alice's multiplier is 1 and Bob's multiplier is 2. The base amount is 1000. The payroll
                contract will allow Alice to claim 1000 and Bob 2000 every period. The payroll smart contract
                transparently displays the addresses of all participants, along with the multipliers being utilized,
                allowing complete visibility to everyone. The initial rollout of this project is a super opinionated and
                geared towards an open payroll system, but this notion will allow us to build on various scenarios, such
                as any kind of recurring payments, subscriptions, etc.
              </p>
            </div>
            <div className="hidden md:w-6/12 md:flex">
              <Image src={Overview} alt="Overview" className="my-auto" />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="hidden md:w-6/12 md:flex">
              <Image src={AboutContract} alt="AboutContract" className="my-auto" />
            </div>
            <div className="w-full md:w-6/12 flex flex-col gap-2">
              <h2 className={`text-[32px] md:text-[51px] font-regular ${podkova.className}`}>About the contract</h2>
              <p className={`text-[15px] font-regular ${archivo.className}`}>
                Build an{' '}
                <a
                  className="links hover:font-semibold transition duration-200 my-auto"
                  href="https://use.ink/"
                  target="_blanck"
                >
                  Ink!
                </a>{' '}
                contract, which purpose is to manage a treasury, that can be spent by the parameters set by the owner at
                creation point. Those parameters can be changed over the time and more beneficiaries can be added or
                removed. The funds in the treasury can be withdrawn by the owner of the contract if needed. This could
                be helpful in the case of migrating to a new version of openPayroll, amending a mistake of sending too
                much funds, etc. Further information about the contract can be found{' '}
                <a
                  className="links hover:font-semibold transition duration-200 my-auto"
                  href="https://use.ink/"
                  target="_blanck"
                >
                  here
                </a>
                {/* TODO: add link */}
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-full md:w-6/12 flex flex-col gap-2">
              <h2 className={`text-[32px] md:text-[51px] font-regular ${podkova.className}`}>What can you do...</h2>
              <p className={`text-[29px] font-regular ${podkova.className}`}>if you are the owner of the contract</p>
              <ul className={`text-[15px] font-regular ${archivo.className}`}>
                <li>Change the current parameters in the contract.</li>
                <li>Add or remove beneficiaries.</li>
                <li>Withdraw funds from the treasury.</li>
                <li>Pause the contract.</li>
                <li>Change the owner of the contract.</li>
                <li>Calculate the amount that will be paid in the next period.</li>
              </ul>
              <p className={`text-[29px] font-regular ${podkova.className}`}>if you are the payee</p>
              <ul className={`text-[15px] font-regular ${archivo.className}`}>
                <li>Calculate the amount that they can claim.</li>
                <li>Calculate the amount that they can claim in the next period</li>
                <li>with the current parameters.</li>
                <li>Claim the payments that are already available.</li>
              </ul>
            </div>
            <div className="hidden md:w-6/12 md:flex">
              <Image src={WhatCanYouDo} alt="WhatCanYouDo" className="my-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* Do you want to know more? */}
      <div className=" bg-opwhite w-[100vw] py-[5vh] md:py-[10vh]">
        <div className="w-11/12 md:w-8/12 flex flex-col mx-auto gap-5">
          <h2 className={`text-[32px] md:text-[51px] font-regular ${podkova.className} leading-none`}>
            Do you want to know more?
          </h2>
          <div className={`flex gap-8 ${archivo.className} text-sm`}>
            <div className="flex gap-4">
              <FaGithub className="text-oppurple w-8 h-8" />
              {/* TODO: add link */}
              <a className="links hover:font-semibold transition duration-200 my-auto" target="_blanck">
                See the docs
              </a>
            </div>
            <div className="flex gap-4">
              <FaTelegram className="text-oppurple w-8 h-8" />
              {/* TODO: add link */}
              <a className="links hover:font-semibold transition duration-200 my-auto" target="_blanck">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      {/* TODO: add links */}
      <div className="w-[100vw] px-[5vh] pt-[5vh] pb-[1vh]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-[200px] mb-7 md:mb-0">
          <div className="flex items-center w-fit mx-auto">
            <OPLogo width={'59.26px'} height={'55.23px'} color="opwhite" />
            <p className={`text-[32px] font-bold text-opwhite ${podkova.className}`}>OpenPayroll</p>
          </div>
          <div className="flex gap-7 w-fit mx-auto">
            <div className="flex flex-col">
              <h3 className={`text-[20px] font-regular text-opwhite ${podkova.className}`}>The project</h3>
              <a
                className={`text-opwhite ${archivo.className} text-sm hover:text-oplightgreen transition duration-200`}
                target="_blanck"
              >
                Docs
              </a>
              <a
                className={`text-opwhite ${archivo.className} text-sm hover:text-oplightgreen transition duration-200`}
                target="_blanck"
              >
                Brand
              </a>
            </div>
            <div className="flex flex-col">
              <h3 className={`text-[20px] font-regular text-opwhite ${podkova.className}`}>Contact</h3>
              <a
                className={`text-opwhite ${archivo.className} text-sm hover:text-oplightgreen transition duration-200`}
                target="_blanck"
              >
                Telegram
              </a>
              <a
                className={`text-opwhite ${archivo.className} text-sm hover:text-oplightgreen transition duration-200`}
                target="_blanck"
              >
                Github
              </a>
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <p className={`text-oplightpurple ${archivo.className} text-sm mx-auto`}>OpenPayroll®</p>
        </div>
      </div>
    </main>
  );
};

export default index;
