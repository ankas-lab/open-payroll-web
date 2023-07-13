import React from 'react';
import Text from '@/components/generals/text';
import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import Loader from '../generals/Loader';

interface multiplierHeaderCellProps {
  contract: any;
  multiplierId: string;
}

const MultiplierHeaderCell = ({ contract, multiplierId }: multiplierHeaderCellProps) => {
  //---------------------------------Connect to contract---------------------------------
  const { baseMultiplier } = useBaseMultiplier(contract, multiplierId);

  return (
    <>
      {baseMultiplier !== null ? (
        baseMultiplier?.validUntilBlock === null && (
          <th className="w-[100px]">
            <Text type="overline" text={`${baseMultiplier?.name || `multiplier ${multiplierId}`}`} />
          </th>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MultiplierHeaderCell;
