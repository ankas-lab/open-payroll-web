import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import { toast } from 'react-toastify';

export function useDeleteMultiplier(_contract: any) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteUnusedMultiplier = useTx(_contract, 'deleteUnusedMultiplier');

  //TODO change notifications

  const handleDeleteUnusedMultipliers = (_multiplierToDelete: string) => {
    deleteUnusedMultiplier.signAndSend([_multiplierToDelete]);
  };

  useEffect(() => {
    if (isPendingSignature(deleteUnusedMultiplier)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(deleteUnusedMultiplier)) {
      setIsDeleting(true);
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(deleteUnusedMultiplier)) {
      setIsDeleted(true);
      setIsDeleting(false);
      toast('Transaction is in the block.');
    }

    if (isErrored(deleteUnusedMultiplier)) {
      toast(`Error`);
    }

    if (isFinalized(deleteUnusedMultiplier)) {
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUnusedMultiplier.status]);

  return {
    handleDeleteUnusedMultipliers,
    isDeleted,
    isDeleting,
  };
}
