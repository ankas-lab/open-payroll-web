import React, { useEffect, useState, useContext } from 'react';

import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });

import { useBeneficiary, usePayrollContract } from '@/hooks';

import MultiplierCell from '@/components/contracts/multiplerCell';
import { useAmountToClaim } from '@/hooks/useAmountToClaim';
import Loader from '../generals/Loader';
import { DappContext } from '@/context';

interface BeneficiarieRowProps {
  contract: any | undefined;
  beneficiaryAddress: string;
}

const BeneficiaryDataRow = ({ beneficiaryAddress, contract }: BeneficiarieRowProps) => {
  const { beneficiaryMultipliersToArray, finalPay, lastClaim } = useBeneficiary(beneficiaryAddress, contract);
  const { amountToClaim } = useAmountToClaim(contract, beneficiaryAddress);
  const { multipliersIdList } = usePayrollContract(contract);

  const context = useContext(DappContext);

  const { chainSymbol } = context!;

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
          <p>{finalPay.toFixed(2) + ' ' + chainSymbol}</p>
        </td>
      ) : (
        <td className="w-[100px]">
          <Loader />
        </td>
      )}
      {/* Total to claim */}
      {amountToClaim !== undefined ? (
        <td className="w-[100px]">
          <p>{amountToClaim}</p>
        </td>
      ) : (
        <td className="w-[100px]">
          <Loader />
        </td>
      )}
      {/* Last claim */}
      {lastClaim !== undefined ? (
        <td className="w-[100px]">
          <p>{lastClaim}</p>
        </td>
      ) : (
        <td className="w-[100px]">
          <Loader />
        </td>
      )}
    </tr>
  ) : (
    <tr className="flex items-center w-full">
      <td className="flex w-full">
        <Loader />
      </td>
    </tr>
  );
};

export default BeneficiaryDataRow;
