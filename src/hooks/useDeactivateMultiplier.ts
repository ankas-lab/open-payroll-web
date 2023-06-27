import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import { toast } from 'react-toastify';

export function useDeactivateMultiplier(_contract: any) {
  const [isDeactivated, setIsDeactivated] = useState<boolean>(false);
  const [isDeactivating, setIsDeactivating] = useState<boolean>(false);

  const deactivateMultiplier = useTx(_contract, 'deactivateMultiplier');

  //TODO change notifications

  const handleDeactivateMultiplier = (_multiplierToDeactivate: string) => {
    deactivateMultiplier.signAndSend([_multiplierToDeactivate]);
  };

  useEffect(() => {
    if (isPendingSignature(deactivateMultiplier)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(deactivateMultiplier)) {
      toast('Flip transaction has been broadcast!');
      setIsDeactivating(true);
    }

    if (isInBlock(deactivateMultiplier)) {
      setIsDeactivating(false);
      setIsDeactivated(true);

      toast('Transaction is in the block.');
    }

    if (isErrored(deactivateMultiplier)) {
      toast(`Error`);
    }

    if (isFinalized(deactivateMultiplier)) {
      toast(`The transaction has been finalized.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deactivateMultiplier.status]);

  return {
    handleDeactivateMultiplier,
    isDeactivated,
    isDeactivating,
  };
}
