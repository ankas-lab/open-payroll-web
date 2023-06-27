import React, { useEffect, useState, useContext } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';
import Button from '@/components/generals/button';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useApi } from 'useink';

import { useBeneficiary, usePayrollContract } from '@/hooks';

import { planckToDecimalFormatted } from 'useink/utils';

import MultiplierCell from '../beneficiaries/multiplierCell';

import { DappContext } from '@/context';
import { useRemoveBeneficiary } from '@/hooks/useRemoveBeneficiary';
import { useUpdateBeneficiary } from '@/hooks/useUpdateBeneficiary';

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
  //TODO when finalized, refresh component
  //TODO error when set a XXXX mult
  const { rawBasePayment } = usePayrollContract(contract);

  const { beneficiaryMultipliersToArray, finalPay, beneficiary } = useBeneficiary(beneficiaryAddress, contract);
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
  const [loading, setLoading] = useState<boolean>(true);

  const [newMultipliers, setNewMultipliers] = useState<any | undefined>(undefined);
  const [initialMultipliers, setInitialMultipliers] = useState<any | undefined>(undefined);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState<string | undefined>(undefined);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    const floatValue = parseFloat(value.replace(',', '.'));
    const roundedValue = floatValue.toFixed(2);
    const decimalValue = parseFloat(roundedValue) * 100;

    const newValues =
      value === '' ? { ...newMultipliers, [id]: initialMultipliers?.[id] } : { ...newMultipliers, [id]: decimalValue };
    setNewMultipliers(newValues);
  };

  const calculateNewFinalPayment = () => {
    const oldMultToArray = Object.values(beneficiary.multipliers);
    const multToArray = Object.values(newMultipliers);
    let sum = 0;
    for (let i = 0; i < multToArray.length; i++) {
      multToArray[i] === '' ? (sum += parseInt(oldMultToArray[i]) / 100) : (sum += parseInt(multToArray[i]) / 100);
    }
    const newFinalPay = planckToDecimalFormatted(sum * rawBasePayment, api?.api);
    return newFinalPay;
  };

  const handleUpdate = () => {
    newMultipliers !== beneficiary.multipliers && handleUpdateBeneficiary(beneficiaryAddress, newMultipliers);
    if (newBeneficiaryName !== undefined) {
      updateBeneficiaryName(contractAddress, beneficiaryAddress, newBeneficiaryName);
    }
  };

  const handleDelete = () => {
    //TODO: This works but the localStorage is updated before sending the Tx,
    // if the user would like to cancel the Tx, the beneficiary has already
    // been deleted from the localStorage.
    handleRemoveBeneficiary(beneficiaryAddress);
    removeBeneficiaryFromLocalStorage(contractAddress, beneficiaryAddress);
  };

  //---------------------------------Initialize functions---------------------------------

  useEffect(() => {
    if (contract) {
      setLoading(false);
    }
  }, [contract]);

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

  return !loading ? (
    <tr
      className={
        indexBeneficiary % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
          : `flex gap-[50px] text-[14px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
      }
    >
      <td className="w-[50px]">
        {!edit && <Button type="text" icon="edit" action={() => setEdit(true)} />}
        {isProcessingRemove && <Button type="disabled outlined" icon="loading" />}
        {isProcessing && <Button type="disabled outlined" icon="loading" />}
        {edit && !isProcessing && !isProcessingRemove && (
          <div className="flex">
            <Button
              type={isProcessing || isProcessingRemove ? 'disabled outlined' : 'text'}
              icon={isProcessing || isProcessingRemove ? 'loading' : 'check'}
              action={() => handleUpdate()}
            />
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
      <td className="w-[150px]">
        <p>{addressToShort(beneficiaryAddress)}</p>
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
          <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto" />
        </td>
      )}
    </tr>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
};

export default BeneficiaryRow;
