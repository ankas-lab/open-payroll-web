import React, { useState, useEffect } from 'react';

import { useCall } from 'useink';
import { pickDecoded } from 'useink/utils';

import Text from '@/components/generals/text';
import Button from '@/components/generals/button';

import { Podkova } from 'next/font/google';
const podkova = Podkova({ subsets: ['latin'] });

import { AiOutlineLoading } from 'react-icons/ai';
import { IoIosAlert } from 'react-icons/io';

import { useLocalStorageData } from '@/hooks/useLocalStorageData';
import { useBasePayment } from '@/hooks/useBasePayment';
import { usePeriodicty } from '@/hooks/usePeriodicity';
import Link from 'next/link';
import { useUpdateBasePayment } from '@/hooks/useUpdateBasePayment';
import { useUpdatePeriodicty } from '@/hooks/useUpdatePeriodicity';
import { usePayrollContract } from '@/hooks';

interface ContractProps {
  _contract: any | undefined;
  _contractAddress: string | undefined;
}

const Index = ({ _contract, _contractAddress }: ContractProps) => {
  const {
    localStorageData,
    newLocalStorageData,
    handleNewNameLocalStorageData,
    handleNewEmailLocalStorageData,
    updateContract,
  } = useLocalStorageData(_contractAddress);

  const { unclaimBeneficiaries } = usePayrollContract(_contract);
  const { basePayment } = useBasePayment(_contract);
  const { handleUpdateBasePayment } = useUpdateBasePayment(_contract);

  const { periodicity, periodicityType, setPeriodicityType } = usePeriodicty(_contract);
  const { handleUpdatePeriodicity } = useUpdatePeriodicty(_contract);

  const [newBasePayment, setNewBasePayment] = useState<number | bigint | undefined>(undefined);
  const [newPeriodicity, setNewPeriodicity] = useState<any | undefined>(undefined);
  const [canUpdate, setCanUpdate] = useState<boolean>(false);

  const handleInputNewBasePayment = (e: any) => {
    setNewBasePayment(e.target.value);
  };

  const handleInputNewPeriodicity = (e: any) => {
    setNewPeriodicity(e.target.value);
  };

  useEffect(() => {
    if (unclaimBeneficiaries !== undefined) {
      unclaimBeneficiaries > 0 ? setCanUpdate(false) : setCanUpdate(true);
    }
  }, [unclaimBeneficiaries]);

  return (
    <div className="w-full md:w-8/12 flex flex-col gap-[20px]">
      <div>
        <Text type="h4" text="Contract" />
        <Text type="" text="These are the basic data of your contract." />
      </div>
      <form className="">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <Text type="h5" text="Off chain" />
            <div className="flex gap-[10px]">
              <div className="flex flex-col w-full">
                <label className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] ${podkova.className}`}>
                  Contract name
                </label>
                <input
                  placeholder={localStorageData !== undefined ? localStorageData.name : undefined}
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => handleNewNameLocalStorageData(e)}
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] ${podkova.className}`}>
                  Email
                </label>
                <input
                  placeholder={localStorageData !== undefined ? localStorageData.email : undefined}
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => handleNewEmailLocalStorageData(e)}
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
            </div>
            <div>
              <Button
                type={newLocalStorageData !== undefined ? 'outlined' : 'disabled'}
                text="Update"
                action={() => updateContract(newLocalStorageData)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text type="h5" text="On chain" />
            {!canUpdate && (
              <div className="bg-opdanger rounded p-[10px] pr-[20px] flex gap-3 text-[#FFFFFF]">
                <IoIosAlert className="h-12 w-12 m-0 " />
                <div className="flex flex-col gap-3">
                  <div>
                    <Text type="h6" text="You can't update yet" />
                    <Text
                      type=""
                      text="You still can't update this information, you need all your beneficiaries to claim their payment or do it for them."
                    />
                  </div>
                  {/* TODO Link to permaClaim */}
                  {/*
                  <Link href={''}>
                    <Button type="outlined" text="claim for them" />
                  </Link>
                  */}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <Text type="h6" text="Base payment" />

                {basePayment !== undefined ? (
                  <div className="flex gap-[10px] items-center">
                    <div
                      className={
                        canUpdate
                          ? 'bg-opwhite border-2 border-oppurple rounded-[5px] flex py-[8px] px-1.5 w-full'
                          : 'bg-opgray border-2 border-[#666666] text-opwhite rounded-[5px] flex py-[8px] px-1.5 w-full'
                      }
                    >
                      <input
                        placeholder={basePayment}
                        disabled={!canUpdate}
                        id="basePayment"
                        type="number"
                        name="basePayment"
                        className={
                          canUpdate
                            ? 'p-0 m-0 bg-opwhite ring-0 focus:ring-0 focus:outline-none w-full'
                            : 'p-0 m-0 bg-opgray ring-0 focus:ring-0 focus:outline-none placeholder:text-opwhite w-full'
                        }
                        onChange={(e) => handleInputNewBasePayment(e)}
                      />
                      ROC
                    </div>
                    <Button
                      type={newBasePayment !== undefined && canUpdate ? 'outlined' : 'disabled'}
                      text="Update"
                      action={() => handleUpdateBasePayment(newBasePayment)}
                    />
                  </div>
                ) : (
                  <div className="flex w-full h-full">
                    <AiOutlineLoading className="animate-spin m-auto" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-[10px]">
                <label className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}>
                  Periodicity
                </label>
                {periodicity !== undefined ? (
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-[10px]">
                      {periodicityType === 'fixed' ? (
                        <Button
                          type={canUpdate ? 'active' : 'disabled'}
                          text="fixed"
                          action={() => setPeriodicityType('fixed')}
                        />
                      ) : (
                        <Button
                          type={canUpdate ? 'outlined' : 'text disabled'}
                          text="fixed"
                          action={() => setPeriodicityType('fixed')}
                        />
                      )}
                      {periodicityType === 'custom' ? (
                        <Button
                          type={canUpdate ? 'active' : 'disabled'}
                          text="custom"
                          action={() => setPeriodicityType('custom')}
                        />
                      ) : (
                        <Button
                          type={canUpdate ? 'outlined' : 'text disabled'}
                          text="custom"
                          action={() => setPeriodicityType('custom')}
                        />
                      )}
                    </div>
                    <div className="flex">
                      {periodicityType === 'fixed' ? (
                        <select
                          name="periodicity"
                          disabled={!canUpdate}
                          onChange={(e) => {
                            handleInputNewPeriodicity(e);
                          }}
                          className={
                            canUpdate
                              ? 'w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-1.5'
                              : 'w-full bg-opgray border-2 border-[#666666] rounded-[5px] py-2.5 px-1.5 ring-0 focus:ring-0 focus:outline-none placeholder:text-opwhite'
                          }
                        >
                          <option value="7200">Daily</option>

                          <option value="36000">Weekly</option>

                          <option value="216000">Monthly</option>
                        </select>
                      ) : (
                        <input
                          placeholder={`${periodicity} blocks`}
                          type="number"
                          name="periodicity"
                          disabled={!canUpdate}
                          className={
                            canUpdate
                              ? 'w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5'
                              : 'w-full bg-opgray border-2 border-[#666666] rounded-[5px] py-1.5 px-1.5 ring-0 focus:ring-0 focus:outline-none placeholder:text-opwhite'
                          }
                          onChange={(e) => {
                            handleInputNewPeriodicity(e);
                          }}
                        />
                      )}
                    </div>
                    <Button
                      type={newPeriodicity === undefined ? 'disabled' : 'outlined'}
                      text="update"
                      action={() => handleUpdatePeriodicity(newPeriodicity)}
                    />
                  </div>
                ) : (
                  <div className="flex w-full min-h-screen">
                    <AiOutlineLoading className="animate-spin m-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Index;
