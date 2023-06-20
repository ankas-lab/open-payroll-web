import React, { useEffect, useState } from 'react';
import { useBlockHeader, useCall } from 'useink';
import { pickDecoded } from 'useink/utils';
import { AiOutlineLoading } from 'react-icons/ai';
import Text from '@/components/generals/text';

interface multiplierHeaderCellProps {
  contract: any;
  mult: string;
}

const MultiplierHeaderCell = ({ contract, mult }: multiplierHeaderCellProps) => {
  //---------------------------------Connect to contract---------------------------------

  const [baseMultipliers, setBaseMultipliers] = useState<any | null>(null);

  // ❎ Get multipliers list from contratc
  const getBaseMultiplier = useCall<any | undefined>(contract, 'getBaseMultiplier');

  const seeBaseMultiplier = async (mult: string) => {
    setBaseMultipliers(pickDecoded(await getBaseMultiplier.send([mult])));
  };

  useEffect(() => {
    if (blockHeader?.blockNumber && contract !== undefined) seeBaseMultiplier(mult);
  }, [blockHeader?.blockNumber]);

  return baseMultipliers !== null ? (
    <th className="w-[100px]">
      <Text type="overline" text={`${baseMultipliers.name}`} />
    </th>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="animate-spin" />
    </div>
  );
};

export default MultiplierHeaderCell;
