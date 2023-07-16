import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isInvalid, isPendingSignature } from 'useink/utils';

export function useUpdatePeriodicty(_contract: any) {
  const [isUpdatingPeriodicity, setIsUpdatingBasePeriodicity] = useState<boolean>(false);

  const updatePeriodicity = useTx(_contract, 'updatePeriodicity');

  const handleUpdatePeriodicity = (_newPeriodicity: any) => {
    updatePeriodicity.signAndSend([_newPeriodicity]);
  };

  useEffect(() => {
    if (isPendingSignature(updatePeriodicity)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updatePeriodicity)) {
      setIsUpdatingBasePeriodicity(true);
    }

    if (isInBlock(updatePeriodicity)) {
      setIsUpdatingBasePeriodicity(false);
      toast('👍 The periodicity was successfully updated');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePeriodicity.status]);

  return { handleUpdatePeriodicity, isUpdatingPeriodicity };
}
