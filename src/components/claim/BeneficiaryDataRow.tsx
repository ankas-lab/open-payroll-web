import React, { useEffect, useState, useContext } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useBeneficiary, usePayrollContract } from '@/hooks';

import MultiplierCell from '@/components/contracts/multiplerCell';

interface BeneficiarieRowProps {
  contract: any | undefined;
  beneficiaryAddress: string;
}

const BeneficiaryDataRow = ({ beneficiaryAddress, contract }: BeneficiarieRowProps) => {
  const { amountToClaim, beneficiaryMultipliersToArray, finalPay, lastClaim } = useBeneficiary(
    beneficiaryAddress,
    contract,
  );
  const { multipliersIdList } = usePayrollContract(contract);

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
      className={`flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className} hover:bg-opwhite transition duration-150`}
    >
      {/* Multipliers */}
      {multipliersIdList?.map((m: any) => (
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
    <tr className="flex items-center w-full">
      <td className="flex w-full">
        <div className="flex w-full">
          <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
        </div>
      </td>
    </tr>
  );
};

export default BeneficiaryDataRow;
