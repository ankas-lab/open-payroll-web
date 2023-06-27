import React from 'react';

import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import Button from '@/components/generals/button';
import { useMultipliers } from '@/hooks/useMultipliers';

import { useBlockHeader } from 'useink';

import { MdDelete } from 'react-icons/md';

interface ContractProps {
  _contract: any | undefined;
  _multiplier: string;
  _active: boolean;
}

const MultiplierIntput = ({ _contract, _multiplier, _active }: ContractProps) => {
  //TODO when a multiplier is created, paused or deleted, actualize the UI
  //I try using useCallSubscription, but it still doesn't work, it should because it calls the contract for each new block.

  const { baseMultiplier } = useBaseMultiplier(_contract, _multiplier);

  const { handleDeactivateMultiplier, handleDeleteUnusedMultipliers } = useMultipliers(_contract);

  const block = useBlockHeader();

  return _active === true
    ? baseMultiplier?.validUntilBlock === null && (
        <div>
          <div className="flex gap-1">
            <div className="flex">
              <Button type="text" text="" icon="pause" action={() => handleDeactivateMultiplier(_multiplier)} />
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
                <Button type="text" icon="delete" action={() => handleDeleteUnusedMultipliers(_multiplier)} />
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
