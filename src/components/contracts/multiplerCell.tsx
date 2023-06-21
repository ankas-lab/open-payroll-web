import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import React, { useState, useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

interface multiplierHeaderCellProps {
  contract: any;
  mult: string;
  beneficiaryMultipliersToArray: any;
}

const multiplerCell = ({ contract, mult, beneficiaryMultipliersToArray }: multiplierHeaderCellProps) => {
  const { baseMultiplier } = useBaseMultiplier(contract, mult);

  const [multiplierValue, setMultiplierValue] = useState<any | undefined>(undefined);

  const findMultiplierValue = () => {
    const value = beneficiaryMultipliersToArray.find((m: any) => mult == m.multiplierId)?.value;
    if (value === '0' || value === 0) {
      setMultiplierValue('1');
    } else {
      setMultiplierValue(value);
    }
  };

  useEffect(() => {
    beneficiaryMultipliersToArray !== undefined && findMultiplierValue();
  }, [beneficiaryMultipliersToArray]);

  return baseMultiplier !== null ? (
    baseMultiplier?.validUntilBlock === null && <td className="w-[100px]">{multiplierValue || '-'}</td>
  ) : (
    <div className="w-[100px]">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
};

export default multiplerCell;
