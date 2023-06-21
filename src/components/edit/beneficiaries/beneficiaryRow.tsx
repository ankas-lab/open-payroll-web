import React, { useEffect, useState, useContext } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';
import Button from '@/components/generals/button';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useApi, useBlockHeader } from 'useink';

import { useBeneficiary, usePayrollContract } from '@/hooks';

import MultiplierCell from '../beneficiaries/multiplierCell';

import { DappContext } from '@/context';

interface newMultiplier {
  [index: number]: [string, string];
}

interface BeneficiarieRowProps {
  indexBeneficiary: number;
  contract: any | undefined;
  beneficiaryAddress: string;
}

const BeneficiaryRow = ({ beneficiaryAddress, indexBeneficiary, contract }: BeneficiarieRowProps) => {
  const { amountToClaim, beneficiaryMultipliersToArray, finalPay, lastClaim, handleUpdateBeneficiary, beneficiary } =
    useBeneficiary(beneficiaryAddress, contract);
  const { multipliersIdList } = usePayrollContract(contract);

  const context = useContext(DappContext);

  // if (!context) {
  //   //TODO This should not return null here
  //   return null;
  // }

  const { addressToShort } = context!;

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');
  const [edit, setEdit] = useState<boolean>(false);

  const [newMultipliers, setNewMultipliers] = useState({});

  //---------------------------------Initialize functions---------------------------------

  useEffect(() => {
    if (contract) {
      setLoading('done');
    }
  }, [contract]);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    const newValues = { ...newMultipliers, [id]: value };
    setNewMultipliers(newValues);
  };

  useEffect(() => {
    beneficiary && setNewMultipliers(beneficiary.multipliers);
    console.log('beneficiary', beneficiary);
  }, [beneficiary]);

  useEffect(() => {
    console.log('newMultipliers state:', newMultipliers);
  }, [newMultipliers]);

  useEffect(() => {
    console.log('beneficiaryMultipliersToArray:', beneficiaryMultipliersToArray);
  }, [beneficiaryMultipliersToArray]);

  return loading === 'done' ? (
    <tr
      className={
        indexBeneficiary % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
          : `flex gap-[50px] text-[14px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
      }
    >
      <td className="w-[50px]">
        {!edit && <Button type="text" icon="edit" action={() => setEdit(true)} />}
        {edit && (
          <Button type="text" icon="check" action={() => handleUpdateBeneficiary(beneficiaryAddress, newMultipliers)} />
        )}
      </td>
      {/* Beneficiary name */}
      <td className="w-[150px]">
        {edit ? (
          <input
            placeholder={'name'}
            id="name"
            type="text"
            name="name"
            onChange={(e) => console.log(e)}
            className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
          />
        ) : (
          <p>Name</p>
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
          edit={edit}
          beneficiaryMultipliersToArray={beneficiaryMultipliersToArray}
          getNewMultipliers={handleInputChange}
        />
      ))}
      {/* Final pay */}
      {finalPay !== undefined ? (
        <td className="w-[100px]">
          <p>{finalPay}</p>
        </td>
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
