import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import toast from 'react-hot-toast';

export function useDeleteMultiplier(_contract: any) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteUnusedMultiplier = useTx(_contract, 'deleteUnusedMultiplier');

  const handleDeleteUnusedMultipliers = (_multiplierToDelete: string) => {
    deleteUnusedMultiplier.signAndSend([_multiplierToDelete]);
  };

  useEffect(() => {
    if (isPendingSignature(deleteUnusedMultiplier)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(deleteUnusedMultiplier)) {
      setIsDeleting(true);
    }

    if (isInBlock(deleteUnusedMultiplier)) {
      setIsDeleted(true);
      setIsDeleting(false);
      toast('🗑 Multiplier successfully deleted');
    }

    if (isErrored(deleteUnusedMultiplier)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUnusedMultiplier.status]);

  return {
    handleDeleteUnusedMultipliers,
    isDeleted,
    isDeleting,
  };
}
