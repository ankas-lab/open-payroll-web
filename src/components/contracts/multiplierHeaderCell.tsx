import React, { useEffect, useState } from 'react';
import { useBlockHeader, useCall } from 'useink';
import { pickDecoded } from 'useink/utils';
import { AiOutlineLoading } from 'react-icons/ai';
import Text from '@/components/generals/text';
import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';

interface multiplierHeaderCellProps {
  contract: any;
  mult: string;
}

const MultiplierHeaderCell = ({ contract, mult }: multiplierHeaderCellProps) => {
  //---------------------------------Connect to contract---------------------------------
  const { baseMultiplier } = useBaseMultiplier(contract, mult);

  return baseMultiplier !== undefined ? (
    <th className="w-[100px]">
      <Text type="overline" text={`${baseMultiplier?.name}`} />
    </th>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="animate-spin" />
    </div>
  );
};

export default MultiplierHeaderCell;
