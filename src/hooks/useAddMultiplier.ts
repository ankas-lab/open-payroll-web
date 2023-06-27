import { useState, useEffect } from 'react';
import { useCall, useCallSubscription, useTx } from 'useink';
import { pickDecoded, isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import { toast } from 'react-toastify';

export function useAddMultiplier(_contract: any) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addBaseMultiplier = useTx(_contract, 'addBaseMultiplier');

  //TODO change notifications

  const handleAddBaseMultiplier = (_newBaseMultiplier: string) => {
    addBaseMultiplier.signAndSend([_newBaseMultiplier]);
  };

  useEffect(() => {
    if (isPendingSignature(addBaseMultiplier)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(addBaseMultiplier)) {
      setIsAdding(true);
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(addBaseMultiplier)) {
      toast('Transaction is in the block.');
      setIsAdded(true);
      setIsAdding(false);
    }

    if (isErrored(addBaseMultiplier)) {
      toast(`Error`);
    }

    if (isFinalized(addBaseMultiplier)) {
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBaseMultiplier.status]);

  return {
    handleAddBaseMultiplier,
    isAdded,
    isAdding,
  };
}
