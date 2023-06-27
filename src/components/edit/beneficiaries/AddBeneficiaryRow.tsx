import React, { useState, useEffect, useContext } from 'react';
import Button from '@/components/generals/button';
import { Archivo } from 'next/font/google';
import MultiplierCell from '@/components/edit/beneficiaries/multiplierCell';
import { usePayrollContract } from '@/hooks';
import { useAddBeneficiary } from '@/hooks/useAddBeneficiary';
const archivo = Archivo({ subsets: ['latin'] });
import { planckToDecimalFormatted } from 'useink/utils';
import { useApi } from 'useink/core';
import { DappContext } from '@/context';

interface ContractProps {
  contract: any | undefined;
  multipliersIdList: string[] | undefined;
  contractAddress: string;
  show: any;
  isProcessing: boolean;
  handleAddBeneficiary: any;
}

const AddBeneficiaryRow = ({
  contract,
  multipliersIdList,
  contractAddress,
  show,
  handleAddBeneficiary,
  isProcessing,
}: ContractProps) => {
  const { rawBasePayment } = usePayrollContract(contract);

  const { handleAddBeneficiaryName } = useContext(DappContext)!;

  const [beneficiaryName, setBeneficiaryName] = useState<string | undefined>(undefined);
  const [beneficiaryAddress, setBeneficiaryAddress] = useState<string | undefined>(undefined);
  const [validAddress, setValidAddress] = useState<boolean>(false);

  const [newMultipliers, setNewMultipliers] = useState<any | undefined>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    const floatValue = parseFloat(value.replace(',', '.'));
    const roundedValue = floatValue.toFixed(2);
    const decimalValue = parseFloat(roundedValue) * 100;
    const newValues = { ...newMultipliers, [id]: decimalValue };
    setNewMultipliers(newValues);
  };

  const calculateNewFinalPayment = () => {
    if (newMultipliers !== undefined) {
      const multToArray = Object.values(newMultipliers);
      let sum = 0;
      for (let i = 0; i < multToArray.length; i++) {
        sum += parseInt(multToArray[i]);
      }
      const newFinalPay = planckToDecimalFormatted((sum / 100) * rawBasePayment, api?.api);
      return newFinalPay;
    } else {
      const basePayment = planckToDecimalFormatted(rawBasePayment, api?.api);
      return basePayment;
    }
  };

  const sendData = () => {
    handleAddBeneficiary(beneficiaryAddress!, newMultipliers);
    handleAddBeneficiaryName(contractAddress, beneficiaryAddress, beneficiaryName);
  };

  useEffect(() => {
    beneficiaryAddress !== undefined && beneficiaryAddress!.length >= 48 && setValidAddress(true);
  }, [beneficiaryAddress]);

  return (
    <tr
      className={`flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`}
    >
      <td className="w-[50px] flex">
        {isProcessing ? (
          <Button type="disabled outlined" icon="loading" />
        ) : (
          <>
            <Button type={validAddress ? 'text' : 'disabled outlined'} icon="check" action={() => sendData()} />
            <Button type="text danger" icon="cancel" action={() => show(false)} />
          </>
        )}
      </td>
      {/* Beneficiary name */}
      <td className="w-[150px]">
        <input
          placeholder="Beneficiary name"
          id="name"
          type="text"
          name="name"
          onChange={(e) => setBeneficiaryName(e.target.value)}
          disabled={isProcessing}
          className={
            isProcessing
              ? 'bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full'
              : 'bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full'
          }
        />
      </td>
      {/* Beneficiary address */}
      <td className="w-[150px]">
        <input
          placeholder="Beneficiary address"
          id="name"
          type="text"
          name="name"
          disabled={isProcessing}
          onChange={(e) => setBeneficiaryAddress(e.target.value)}
          className={
            isProcessing
              ? 'bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full'
              : 'bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full'
          }
        />
      </td>
      {/* Multipliers */}
      {multipliersIdList !== undefined &&
        multipliersIdList?.map((m: any) => (
          <MultiplierCell
            key={m}
            contract={contract}
            mult={m}
            disabled={isProcessing}
            showInput={true}
            onChange={handleInputChange}
          />
        ))}

      {/* Final pay */}

      <td className="w-[100px]">
        <p>{calculateNewFinalPayment()}</p>
      </td>
    </tr>
  );
};

export default AddBeneficiaryRow;
