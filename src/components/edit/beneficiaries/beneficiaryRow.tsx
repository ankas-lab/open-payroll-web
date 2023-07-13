/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import Button from '@/components/generals/button';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useApi } from 'useink';

import { useBeneficiary, usePayrollContract } from '@/hooks';

import { planckToDecimalFormatted } from 'useink/utils';

import { BN } from 'bn.js';

import MultiplierCell from '../beneficiaries/multiplierCell';

import { DappContext } from '@/context';
import { useRemoveBeneficiary } from '@/hooks/useRemoveBeneficiary';
import { useUpdateBeneficiary } from '@/hooks/useUpdateBeneficiary';
import Loader from '@/components/generals/Loader';
import { IoIosCopy } from 'react-icons/io';
import { AiFillCheckCircle } from 'react-icons/ai';

interface BeneficiarieRowProps {
  indexBeneficiary: number;
  contract: any | undefined;
  beneficiaryAddress: string;
  contractAddress: string | undefined;
  multipliersIdList: string[] | undefined;
}

const BeneficiaryRow = ({
  beneficiaryAddress,
  indexBeneficiary,
  contract,
  contractAddress,
  multipliersIdList,
}: BeneficiarieRowProps) => {
  const { rawBasePayment } = usePayrollContract(contract);

  const { beneficiaryMultipliersToArray, finalPay, beneficiary, beneficiaryMultipliers } = useBeneficiary(
    beneficiaryAddress,
    contract,
  );
  const { handleUpdateBeneficiary, isProcessing, finalized, edit, setEdit } = useUpdateBeneficiary(
    beneficiaryAddress,
    contract,
  );
  const { handleRemoveBeneficiary, isProcessingRemove } = useRemoveBeneficiary(
    contract,
    contractAddress!,
    beneficiaryAddress,
  );

  const context = useContext(DappContext);

  const { addressToShort, updateBeneficiaryName, getBeneficiaryName, removeBeneficiaryFromLocalStorage } = context!;

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------UseStates---------------------------------
  const [newMultipliers, setNewMultipliers] = useState<any | undefined>(undefined);
  const [initialMultipliers, setInitialMultipliers] = useState<any | undefined>(undefined);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState<boolean>(false);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    const floatValue = parseFloat(value.replace(',', '.'));
    const roundedValue = floatValue.toFixed(2);
    const decimalValue = parseFloat(roundedValue) * 100;

    const newValues =
      value === ''
        ? { ...newMultipliers, [id]: beneficiaryMultipliers?.[id] }
        : { ...newMultipliers, [id]: decimalValue };
    setNewMultipliers(newValues);
  };

  const calculateNewFinalPayment = () => {
    const oldMultToArray = Object.values(beneficiaryMultipliers);
    const multToArray = Object.values(newMultipliers);
    let sum = 0;
    for (let i = 0; i < multToArray.length; i++) {
      multToArray[i] === ''
        ? (sum += parseInt(String(oldMultToArray[i])) / 100)
        : (sum += parseInt(String(multToArray[i])) / 100);
    }
    const rawBasePaymentBN = new BN(rawBasePayment);
    const result = rawBasePaymentBN.mul(new BN(sum));
    return planckToDecimalFormatted(result, api?.api);
  };

  const handleUpdate = () => {
    if (newMultipliers !== beneficiary.multipliers) {
      handleUpdateBeneficiary(beneficiaryAddress, newMultipliers);
    }
    if (newBeneficiaryName !== undefined) {
      updateBeneficiaryName(contractAddress, beneficiaryAddress, newBeneficiaryName);
      setEdit(false);
    }
  };

  const handleDelete = () => {
    handleRemoveBeneficiary(beneficiaryAddress);
  };
  //---------------------------------Copy to Clipboard---------------------------------
  const copyToClipboard = () => {
    const textToCopy = beneficiaryAddress;
    textToCopy !== undefined && navigator.clipboard.writeText(textToCopy.toString());
    setCopied(true);
    setTimeout(function () {
      setCopied(false);
    }, 5000);
  };

  //---------------------------------Initialize functions---------------------------------
  useEffect(() => {
    beneficiary && setNewMultipliers(beneficiary.multipliers);
    beneficiary && setInitialMultipliers(beneficiary.multipliers);
  }, [beneficiary]);

  useEffect(() => {
    newMultipliers !== undefined && calculateNewFinalPayment();
  }, [newMultipliers]);

  useEffect(() => {
    finalized && setEdit(false);
  }, [finalized]);

  return contract ? (
    <tr
      className={
        indexBeneficiary % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
          : `flex gap-[50px] text-[14px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
      }
    >
      <td className="w-[100px]">
        {!edit && <Button type="text" icon="edit" action={() => setEdit(true)} />}
        {edit && isProcessing && <Button type="disabled outlined" icon="loading" />}
        {edit && isProcessingRemove && <Button type="disabled outlined" icon="loading" />}
        {edit && !isProcessing && !isProcessingRemove && (
          <div className="flex">
            <Button type={'text'} icon={'check'} action={() => handleUpdate()} />
            <Button type={'text'} icon={'cancel'} action={() => setEdit(false)} />
            <Button type={'text danger'} icon={'delete'} action={() => handleDelete()} />
          </div>
        )}
      </td>
      {/* Beneficiary name */}
      <td className="w-[150px]">
        {edit ? (
          <input
            placeholder={getBeneficiaryName(contractAddress, beneficiaryAddress)}
            id="name"
            type="text"
            name="name"
            disabled={isProcessing}
            onChange={(e) => setNewBeneficiaryName(e.target.value)}
            className={
              isProcessing || isProcessingRemove
                ? 'bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full'
                : 'bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full'
            }
          />
        ) : (
          <p>{getBeneficiaryName(contractAddress, beneficiaryAddress)}</p>
        )}
      </td>
      {/* Beneficiary address */}
      <td className="w-[150px] flex items-baseline gap-2 ">
        <p>{addressToShort(beneficiaryAddress)}</p>
        {copied ? (
          <AiFillCheckCircle className="w-3.5 h-3.5 text-opgreen cursor-pointer" onClick={() => copyToClipboard()} />
        ) : (
          <IoIosCopy className="w-3.5 h-3.5 text-oppurple cursor-pointer" onClick={() => copyToClipboard()} />
        )}
      </td>
      {/* Multipliers */}
      {multipliersIdList?.map((m: any) => (
        <MultiplierCell
          key={m}
          contract={contract}
          mult={m}
          showInput={edit}
          disabled={isProcessing || isProcessingRemove}
          beneficiaryMultipliers={beneficiaryMultipliersToArray}
          onChange={handleInputChange}
        />
      ))}
      {/* Final pay */}

      {finalPay !== undefined ? (
        <td className="w-[100px]">{edit ? <p>{calculateNewFinalPayment()}</p> : <p>{finalPay}</p>}</td>
      ) : (
        <td className="w-[100px]">
          <Loader />
        </td>
      )}
    </tr>
  ) : (
    <Loader />
  );
};

export default BeneficiaryRow;
