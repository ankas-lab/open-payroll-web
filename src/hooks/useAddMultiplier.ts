import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import toast from 'react-hot-toast';

export function useAddMultiplier(_contract: any) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addBaseMultiplier = useTx(_contract, 'addBaseMultiplier');

  const handleAddBaseMultiplier = (_newBaseMultiplier: string) => {
    addBaseMultiplier.signAndSend([_newBaseMultiplier]);
  };

  useEffect(() => {
    if (isPendingSignature(addBaseMultiplier)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(addBaseMultiplier)) {
      setIsAdding(true);
    }

    if (isInBlock(addBaseMultiplier)) {
      toast('👍 Multiplier successfully added');
      setIsAdded(true);
      setIsAdding(false);
    }

    if (isErrored(addBaseMultiplier)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    if (isFinalized(addBaseMultiplier)) {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBaseMultiplier.status]);

  return {
    handleAddBaseMultiplier,
    isAdded,
    isAdding,
  };
}
