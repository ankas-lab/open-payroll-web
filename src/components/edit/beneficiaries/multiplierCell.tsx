import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import React, { useState, useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

interface multiplierHeaderCellProps {
  contract: any;
  mult: string;
  beneficiaryMultipliersToArray: any;
  edit: boolean;
  getNewMultipliers: any;
}

const multiplerCell = ({
  contract,
  mult,
  beneficiaryMultipliersToArray,
  edit,
  getNewMultipliers,
}: multiplierHeaderCellProps) => {
  const { baseMultiplier } = useBaseMultiplier(contract, mult);

  const [multiplier, setMultiplier] = useState<any | undefined>(undefined);

  const findMultiplier = () => {
    const multiplier = beneficiaryMultipliersToArray.find((m: any) => mult == m.multiplierId);
    setMultiplier(multiplier);
  };

  useEffect(() => {
    beneficiaryMultipliersToArray !== undefined && findMultiplier();
  }, [beneficiaryMultipliersToArray]);

  useEffect(() => {
    console.log(mult);
    console.log(multiplier);
  }, [multiplier]);

  if (baseMultiplier?.validUntilBlock === null && multiplier !== undefined && !edit) {
    return <td className="w-[100px]">{multiplier.value == 0 ? <p>1</p> : <p>{multiplier.value}</p>}</td>;
  }

  if (baseMultiplier?.validUntilBlock === null && multiplier === undefined && !edit) {
    return (
      <td className="w-[100px]">
        <p>-</p>
      </td>
    );
  }
  if (baseMultiplier?.validUntilBlock === null && multiplier !== undefined && edit) {
    return (
      <td className="w-[100px]">
        <input
          placeholder={multiplier.value == 0 ? 1 : multiplier.value}
          id={mult}
          type="number"
          name={mult}
          onChange={getNewMultipliers}
          className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
        />
      </td>
    );
  }
  if (baseMultiplier?.validUntilBlock === null && multiplier === undefined && edit) {
    return (
      <td className="w-[100px]">
        <input
          placeholder="-"
          id={mult}
          type="number"
          name={mult}
          onChange={getNewMultipliers}
          className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
        />
      </td>
    );
  }
};

export default multiplerCell;
