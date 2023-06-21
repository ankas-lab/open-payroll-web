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

const multiplierIntput = ({ _contract, _multiplier, _active }: ContractProps) => {
  //TODO when a multiplier is created, paused or deleted, actualize the UI

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
              {/*
                TODO this is correct?
                block?.blockNumber is updated multiple times
                */}
              {block?.blockNumber! < parseInt(baseMultiplier?.validUntilBlock.replace(/,/g, '')) ? (
                <button
                  onClick={() => handleDeleteUnusedMultipliers(_multiplier)}
                  className="items-center text-center flex rounded-[5px] py-[10px] px-[10px]  w-full justify-center text-oppurple"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              ) : (
                <button
                  disabled
                  className="items-center text-center flex rounded-[5px] py-[10px] px-[10px]  w-full justify-center text-opgray"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="my-auto">{baseMultiplier?.name}</p>
          </div>
        </div>
      );
};

export default multiplierIntput;
