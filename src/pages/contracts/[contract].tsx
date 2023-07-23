import React, { useEffect, useState, useRef, useContext } from 'react';

import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useContract, useWallet, useTransfer } from 'useink';
import metadata from '../../contract/open_payroll.json';
import { useRouter } from 'next/router';
import BeneficiaryRow from '@/components/contracts/beneficiaryRow';
import WalletManager from '@/components/walletManager';
import Link from 'next/link';
import MultiplierHeaderCell from '@/components/contracts/multiplierHeaderCell';
import { DappContext } from '@/context';
import { IoIosCopy } from 'react-icons/io';

import { usePayrollContract } from '@/hooks';
import { useGetOwner } from '@/hooks/useGetOwner';

import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/generals/Loader';
import NotOwner from '@/components/contracts/NotOwner';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function Contract() {
  //---------------------------------Get contract address---------------------------------
  const router = useRouter();
  const {
    query: { contract },
  } = router;
  const contractAddress = contract?.toString();

  //---------------------------------Context---------------------------------
  const context = useContext(DappContext);
  const { findContractInLocalStorage } = context!;

  //---------------------------------Hooks---------------------------------
  const { account } = useWallet();

  const _contract = useContract(contractAddress!, metadata);

  const { owner } = useGetOwner(_contract);

  const {
    contractBalance,
    periodicity,
    totalDebts,
    nextBlockPeriod,
    amountBeneficiaries,
    basePayment,
    listBeneficiaries,
    multipliersIdList,
  } = usePayrollContract(_contract);

  //---------------------------------Copy to Clipboard---------------------------------
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    const textToCopy = contractAddress;
    textToCopy !== undefined && navigator.clipboard.writeText(textToCopy.toString());
    setCopied(true);
    toast('👍 Address copied');
    setTimeout(function () {
      setCopied(false);
    }, 5000);
  };

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
        {contractAddress && owner !== undefined ? (
          owner === account?.address ? (
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col-reverse gap-[40px] md:flex-row md:justify-between">
                <div className="flex flex-col">
                  {contractAddress && (
                    <Text
                      type="h2"
                      text={`${
                        findContractInLocalStorage(contractAddress)?.name === ''
                          ? 'Contract ' +
                            findContractInLocalStorage(contractAddress)?.address.slice(
                              findContractInLocalStorage(contractAddress)?.address.length - 5,
                              findContractInLocalStorage(contractAddress)?.address.length,
                            )
                          : findContractInLocalStorage(contractAddress)?.name
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <Text type="overline" text={`${contractAddress}`} />
                    {copied ? (
                      <AiFillCheckCircle className="text-opgreen cursor-pointer" onClick={() => copyToClipboard()} />
                    ) : (
                      <IoIosCopy className="text-oppurple cursor-pointer" onClick={() => copyToClipboard()} />
                    )}
                  </div>
                  {contractAddress && (
                    <Text
                      type="overline"
                      text={`${
                        findContractInLocalStorage(contractAddress)?.email !== undefined
                          ? findContractInLocalStorage(contractAddress).email
                          : ''
                      }`}
                    />
                  )}
                </div>
                <div className="flex gap-[20px] ml-auto md:ml-0">
                  <Link href={`/edit/${contractAddress}`}>
                    <Button type="active" text="edit" />
                  </Link>
                </div>
              </div>
              {/* CONTRACT INFO */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[20px] text-[14px] font-normal text-black tracking-[0.25px]">
                <div className="flex flex-col gap-[10px] ">
                  <Text type="overline" text="periodicity" />

                  {periodicity ? <p>{periodicity}</p> : <Loader />}
                </div>

                <div className="flex flex-col gap-[10px] ">
                  <Text type="overline" text="next pay in" />

                  {nextBlockPeriod ? <p className="text-ellipsis  ">{nextBlockPeriod}</p> : <Loader />}
                </div>

                <div className="flex flex-col gap-[10px] ">
                  <Text type="overline" text="beneficiaries" />

                  {listBeneficiaries ? <p>{amountBeneficiaries === 0 ? 0 : amountBeneficiaries}</p> : <Loader />}
                </div>
                <div className="flex flex-col gap-[10px] ">
                  <Text type="overline" text="base payment" />

                  {basePayment ? <p>{basePayment}</p> : <Loader />}
                </div>
                <div className="flex flex-col gap-[10px] ">
                  <Text type="overline" text="funds in contract" />

                  {contractBalance ? <p className="text-ellipsis  ">{contractBalance}</p> : <Loader />}
                </div>
                <div className="flex flex-col gap-[10px] ">
                  <Text type="overline" text="total funds needed" />

                  {totalDebts ? <p className="text-ellipsis  ">{totalDebts}</p> : <Loader />}
                </div>
              </div>
              {/* BENEFICIARIES TABLE */}
              <div className="flex flex-col gap-[20px]">
                <Text type="h4" text="Beneficiaries" />
                <div className="overflow-x-auto">
                  {amountBeneficiaries === 0 ? (
                    <div className="flex flex-col gap-[20px]">
                      <Text type="h5" text="It seems that there are no beneficiaries in this contract, add one!" />
                      <div className="w-fit">
                        <Link href={`/edit/${contractAddress}`}>
                          <Button type="active" text="add beneficiary" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <table>
                      <tbody>
                        <tr className="flex gap-[50px] text-left px-2">
                          <th className="w-[150px]">
                            <Text type="overline" text="name" />
                          </th>
                          <th className="w-[150px]">
                            <Text type="overline" text="address" />
                          </th>
                          {multipliersIdList !== undefined &&
                            multipliersIdList.map((m: string) => (
                              <MultiplierHeaderCell key={m} contract={_contract} multiplierId={m} />
                            ))}
                          <th className="w-[100px]">
                            <Text type="overline" text="final pay" />
                          </th>
                          <th className="w-[100px]">
                            <Text type="overline" text="total to claim" />
                          </th>
                          <th className="w-[100px]">
                            <Text type="overline" text="last update" />
                          </th>
                        </tr>
                        {listBeneficiaries &&
                          amountBeneficiaries &&
                          amountBeneficiaries > 0 &&
                          listBeneficiaries.map((address: string, index: number) => (
                            <BeneficiaryRow
                              key={index}
                              indexBeneficiary={index}
                              beneficiaryAddress={address}
                              contract={_contract}
                              contractAddress={contractAddress}
                            />
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <NotOwner />
          )
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
}
