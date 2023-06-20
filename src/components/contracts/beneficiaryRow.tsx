import React, { useEffect, useState, useContext } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useApi, useBlockHeader } from 'useink';

import { useBeneficiary, usePayrollContract } from '@/hooks';

import MultiplierCell from '@/components/contracts/multiplerCell';

import { DappContext } from '@/context';

interface BeneficiarieRowProps {
  indexBeneficiary: number;
  contract: any | undefined;
  beneficiaryAddress: string;
}

const BeneficiaryRow = ({ beneficiaryAddress, indexBeneficiary, contract }: BeneficiarieRowProps) => {
  const { amountToClaim, beneficiaryMultipliersToArray, finalPay, lastClaim } = useBeneficiary(
    beneficiaryAddress,
    contract,
  );
  const { multipliersList } = usePayrollContract(contract);

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

  //---------------------------------Initialize functions---------------------------------

  useEffect(() => {
    if (contract) {
      setLoading('done');
    }
  }, [contract]);

  return loading === 'done' ? (
    <tr
      className={
        indexBeneficiary % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
          : `flex gap-[50px] text-[14px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`
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
      {multipliersList?.map((m: any) => (
        <MultiplierCell
          key={m}
          contract={contract}
          mult={m}
          beneficiaryMultipliersToArray={beneficiaryMultipliersToArray}
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
      {/* Total to claim */}
      {amountToClaim !== undefined ? (
        <td className="w-[100px]">
          <p>{amountToClaim}</p>
        </td>
      ) : (
        <td className="w-[100px]">
          <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto" />
        </td>
      )}
      {/* Last claim */}
      {lastClaim !== undefined ? (
        <td className="w-[100px]">
          <p>{lastClaim}</p>
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
