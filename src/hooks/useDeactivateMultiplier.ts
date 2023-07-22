import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import toast from 'react-hot-toast';

export function useDeactivateMultiplier(_contract: any) {
  const [isDeactivated, setIsDeactivated] = useState<boolean>(false);
  const [isDeactivating, setIsDeactivating] = useState<boolean>(false);

  const deactivateMultiplier = useTx(_contract, 'deactivateMultiplier');

  const handleDeactivateMultiplier = (_multiplierToDeactivate: string) => {
    deactivateMultiplier.signAndSend([_multiplierToDeactivate]);
  };

  useEffect(() => {
    if (isPendingSignature(deactivateMultiplier)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(deactivateMultiplier)) {
      setIsDeactivating(true);
    }

    if (isInBlock(deactivateMultiplier)) {
      setIsDeactivating(false);
      setIsDeactivated(true);

      toast('👍 Multiplier successfully deleted');
    }

    if (isErrored(deactivateMultiplier)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deactivateMultiplier.status]);

  return {
    handleDeactivateMultiplier,
    isDeactivated,
    isDeactivating,
  };
}
