/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from 'react';

import Text from '@/components/generals/text';
import Button from '@/components/generals/button';

import { Podkova } from 'next/font/google';
const podkova = Podkova({ subsets: ['latin'] });

import { IoIosAlert } from 'react-icons/io';

import { useLocalStorageData } from '@/hooks/useLocalStorageData';
import { useBasePayment } from '@/hooks/useBasePayment';
import { usePeriodicty } from '@/hooks/usePeriodicity';
import Link from 'next/link';
import { useUpdateBasePayment } from '@/hooks/useUpdateBasePayment';
import { useUpdatePeriodicty } from '@/hooks/useUpdatePeriodicity';
import { usePayrollContract } from '@/hooks';
import Loader from '@/components/generals/Loader';
import { DappContext } from '@/context';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface ContractProps {
  _contract: any | undefined;
  _contractAddress: string | undefined;
}

const Index = ({ _contract, _contractAddress }: ContractProps) => {
  const context = useContext(DappContext);
  if (!context) {
    return null;
  }
  const { chainSymbol } = context;

  const { localStorageData, newLocalStorageData, handleNewNameLocalStorageData, updateContract } =
    useLocalStorageData(_contractAddress);

  const { unclaimBeneficiaries, basePayment } = usePayrollContract(_contract);
  const { handleUpdateBasePayment, isUpdatingBasePayment } = useUpdateBasePayment(_contract);

  const { periodicity, periodicityType, setPeriodicityType } = usePeriodicty(_contract);
  const { handleUpdatePeriodicity, isUpdatingPeriodicity } = useUpdatePeriodicty(_contract);

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

  useEffect(() => {
    parseFloat(String(newBasePayment)) < 0 && toast("❌ The contract's base payment cannot be negative.");
  }, [newBasePayment]);

  useEffect(() => {
    parseFloat(String(newPeriodicity)) < 0 && toast("❌ The contract's periodicity cannot be negative.");
  }, [periodicity, newPeriodicity]);

  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="">
        <Text type="h4" text="Contract" />
        <Text type="" text="This is the main information of your contract." />
      </div>
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[20px]">
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
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
              />
            </div>
          </div>
          <Text type="" text="This information is stored in your browser, not in the blockchain." />
          <div className="">
            <Button
              type={newLocalStorageData !== undefined ? 'outlined' : 'disabled'}
              text="Update"
              action={() => updateContract(newLocalStorageData)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <Text type="h5" text="On chain" />
          {!canUpdate && (
            <div className="bg-opdanger rounded p-[10px] pr-[20px] flex gap-3 text-[#FFFFFF]">
              <IoIosAlert className="h-12 w-12 m-0 " />
              <div className="flex flex-col gap-3">
                <div>
                  <Text type="h6" text="You can't update yet" />
                  <Text
                    type=""
                    text="You cannot update this contract information, wait until all beneficiaries have claimed their payments."
                  />
                </div>
              </div>
            </div>
          )}
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
                    min={1}
                    className={
                      canUpdate
                        ? 'p-0 m-0 bg-opwhite ring-0 focus:ring-0 focus:outline-none w-full'
                        : 'p-0 m-0 bg-opgray ring-0 focus:ring-0 focus:outline-none placeholder:text-opwhite w-full'
                    }
                    onChange={(e) => handleInputNewBasePayment(e)}
                  />
                  {chainSymbol}
                </div>
                {isUpdatingBasePayment ? (
                  <Button
                    type={newBasePayment !== undefined && canUpdate ? 'outlined' : 'text disabled'}
                    icon="loading"
                  />
                ) : (
                  <Button
                    type={
                      newBasePayment !== undefined &&
                      newBasePayment > 0 &&
                      parseFloat(String(basePayment)) !== parseFloat(String(newBasePayment)) &&
                      canUpdate
                        ? 'outlined'
                        : 'disabled'
                    }
                    text="Update"
                    action={() => handleUpdateBasePayment(newBasePayment)}
                  />
                )}
              </div>
            ) : (
              <Loader />
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
                {isUpdatingPeriodicity ? (
                  <Button
                    type={newPeriodicity !== undefined && canUpdate ? 'outlined' : 'text disabled'}
                    icon="loading"
                  />
                ) : (
                  <Button
                    type={
                      newPeriodicity !== undefined &&
                      parseFloat(String(newPeriodicity)) !== parseFloat(String(periodicity)) &&
                      parseFloat(String(newPeriodicity)) > 0
                        ? 'outlined'
                        : 'disabled'
                    }
                    text="update"
                    action={() => handleUpdatePeriodicity(newPeriodicity)}
                  />
                )}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
