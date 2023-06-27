import React from 'react';

import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import Button from '@/components/generals/button';

import { useBlockHeader } from 'useink';

import { useDeactivateMultiplier } from '@/hooks/useDeactivateMultiplier';
import { useDeleteMultiplier } from '@/hooks/useDeleteMultiplier';

interface ContractProps {
  _contract: any | undefined;
  _multiplier: string;
  _active: boolean;
}

const MultiplierIntput = ({ _contract, _multiplier, _active }: ContractProps) => {
  const { baseMultiplier } = useBaseMultiplier(_contract, _multiplier);
  const { handleDeactivateMultiplier, isDeactivating } = useDeactivateMultiplier(_contract);
  const { handleDeleteUnusedMultipliers, isDeleting } = useDeleteMultiplier(_contract);

  const block = useBlockHeader();

  //TODO Multipliers not delete

  return _active === true
    ? baseMultiplier?.validUntilBlock === null && (
        <div>
          <div className="flex gap-1">
            <div className="flex">
              {isDeactivating ? (
                <Button type="disabled outlined" text="" icon="loading" />
              ) : (
                <Button type="text" text="" icon="pause" action={() => handleDeactivateMultiplier(_multiplier)} />
              )}
            </div>
            <p className="my-auto">{baseMultiplier?.name}</p>
          </div>
        </div>
      )
    : baseMultiplier?.validUntilBlock !== null && (
        <div>
          <div className="flex gap-1">
            <div className="flex">
              {block?.blockNumber! > parseInt(baseMultiplier?.validUntilBlock.replace(/,/g, '')) ? (
                isDeleting ? (
                  <Button type="disabled outlined" text="" icon="loading" />
                ) : (
                  <Button type="text" icon="delete" action={() => handleDeleteUnusedMultipliers(_multiplier)} />
                )
              ) : (
                <Button
                  type="disabled outlined"
                  icon="delete"
                  action={() => handleDeleteUnusedMultipliers(_multiplier)}
                />
              )}
            </div>
            <p className="my-auto">{baseMultiplier?.name}</p>
          </div>
        </div>
      );
};

export default MultiplierIntput;
