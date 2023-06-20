import React, { useEffect, useState, useContext } from 'react';

import Text from '../generals/text';

import { AiOutlineLoading } from 'react-icons/ai';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useApi, useBlockHeader, useCall, useChainDecimals, useTokenSymbol } from 'useink';
import { pickDecoded, planckToDecimalFormatted } from 'useink/utils';

import { BN } from 'bn.js';
import { useBeneficiary, usePayrollContract } from '@/hooks';

import { DappContext } from '@/context';

interface BeneficiarieRowProps {
  indexBeneficiary: number;
  contract: any | undefined;
  beneficiaryAddress: string;
}

const BeneficiaryRow = ({ beneficiaryAddress, indexBeneficiary, contract }: BeneficiarieRowProps) => {
  const blockHeader = useBlockHeader();
  const { amountToClaim, lastClaim, beneficiaryMultipliers } = useBeneficiary(beneficiaryAddress, contract);
  const { basePayment } = usePayrollContract(contract);

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

  useEffect(() => {
    if (amountToClaim) {
      setLoading('done');
    }
  }, [contract, amountToClaim]);

  useEffect(() => {
    console.log(beneficiaryMultipliers);
  }, [beneficiaryMultipliers]);

  return loading === 'done' ? (
    <tr
      className={
        indexBeneficiary % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-1 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
          : `flex gap-[50px] text-[14px] items-center h-11 px-1 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
      }
    >
      {/* Beneficiary name */}
      <td className="w-[150px]">
        <p>Name</p>
      </td>
      {/* Beneficiary address */}
      <td className="w-[150px]">
        <p>{addressToShort(beneficiaryAddress)}</p>
      </td>
      {/* Multipliers */}
      {beneficiaryMultipliers &&
        Object.values(beneficiaryMultipliers).map((m: any, index: number) => (
          <td key={index + 's'} className="w-[100px]">
            <p>{m}</p>
          </td>
        ))}

      {/* Final pay */}
      <td className="w-[100px]">
        <p>{basePayment}</p>
      </td>
      {/* Total to claim */}
      <td className="w-[100px]">
        <p>{amountToClaim}</p>
      </td>
      {/* Last claim */}
      <td className="w-[100px]">
        <p>{lastClaim}</p>
      </td>
    </tr>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
};

export default BeneficiaryRow;
