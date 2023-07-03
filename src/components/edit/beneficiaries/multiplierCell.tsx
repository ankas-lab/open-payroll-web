import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import React, { useState, useEffect } from 'react';

interface multiplierCellProps {
  contract: any;
  mult: string;
  beneficiaryMultipliers?: any;
  showInput?: boolean;
  onChange: any;
  disabled?: boolean;
}

const MultiplerCell = ({
  contract,
  mult,
  beneficiaryMultipliers,
  showInput,
  onChange,
  disabled,
}: multiplierCellProps) => {
  const { baseMultiplier } = useBaseMultiplier(contract, mult);

  const [multiplier, setMultiplier] = useState<any | undefined>(undefined);

  const findMultiplier = () => {
    const multiplier = beneficiaryMultipliers.find((m: any) => mult == m.multiplierId);
    setMultiplier(multiplier);
  };

  useEffect(() => {
    beneficiaryMultipliers !== undefined && findMultiplier();
  }, [beneficiaryMultipliers]);

  if (baseMultiplier?.validUntilBlock === null && multiplier !== undefined && !showInput) {
    return <td className="w-[100px]">{multiplier.value == 0 ? <p>1</p> : <p>{multiplier.value / 100}</p>}</td>;
  }

  if (baseMultiplier?.validUntilBlock === null && multiplier === undefined && !showInput) {
    return (
      <td className="w-[100px]">
        <p>-</p>
      </td>
    );
  }
  if (baseMultiplier?.validUntilBlock === null && multiplier !== undefined && showInput) {
    return (
      <td className="w-[100px]">
        <input
          placeholder={multiplier.value == 0 ? 1 : parseInt(multiplier.value) / 100}
          id={mult}
          type="number"
          disabled={disabled}
          name={mult}
          onChange={onChange}
          className={
            disabled
              ? 'bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full'
              : 'bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full'
          }
        />
      </td>
    );
  }
  if (baseMultiplier?.validUntilBlock === null && multiplier === undefined && showInput) {
    return (
      <td className="w-[100px]">
        <input
          placeholder="-"
          id={mult}
          type="number"
          disabled={disabled}
          name={mult}
          onChange={onChange}
          className={
            disabled
              ? 'bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full'
              : 'bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full'
          }
        />
      </td>
    );
  }
};

export default MultiplerCell;
