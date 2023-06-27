import { useState, useEffect } from 'react';
import { useCall, useCallSubscription, useTx } from 'useink';
import { pickDecoded, isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import { toast } from 'react-toastify';

export function useMultipliers(_contract: any) {
  //TODO: separate get/Tx?

  const [multipliersIdList, setMultipliersIdList] = useState<string[] | undefined>(undefined);
  const getMultipliersList = useCallSubscription(_contract, 'getMultipliersList');

  const addBaseMultiplier = useTx(_contract, 'addBaseMultiplier');
  const deactivateMultiplier = useTx(_contract, 'deactivateMultiplier');
  const deleteUnusedMultiplier = useTx(_contract, 'deleteUnusedMultiplier');

  //TODO change notifications

  const handleAddBaseMultiplier = (_newBaseMultiplier: string) => {
    addBaseMultiplier.signAndSend([_newBaseMultiplier]);
  };

  const handleDeactivateMultiplier = (_multiplierToDeactivate: string) => {
    deactivateMultiplier.signAndSend([_multiplierToDeactivate]);
  };

  const handleDeleteUnusedMultipliers = (_multiplierToDelete: string) => {
    deleteUnusedMultiplier.signAndSend([_multiplierToDelete]);
  };

  useEffect(() => {
    _contract && getMultipliersList.send();
  }, [_contract]);

  useEffect(() => {
    if (getMultipliersList.result?.ok) {
      const data = pickDecoded(getMultipliersList.result);
      setMultipliersIdList(data);
    }
  }, [getMultipliersList.result?.ok]);

  useEffect(() => {
    if (isPendingSignature(addBaseMultiplier)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(addBaseMultiplier)) {
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(addBaseMultiplier)) {
      toast('Transaction is in the block.');
    }

    if (isErrored(addBaseMultiplier)) {
      toast(`Error`);
    }

    if (isFinalized(addBaseMultiplier)) {
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBaseMultiplier.status]);

  useEffect(() => {
    if (isPendingSignature(deactivateMultiplier)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(deactivateMultiplier)) {
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(deactivateMultiplier)) {
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

  useEffect(() => {
    if (isPendingSignature(deleteUnusedMultiplier)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(deleteUnusedMultiplier)) {
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(deleteUnusedMultiplier)) {
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
    multipliersIdList,
    handleAddBaseMultiplier,
    handleDeactivateMultiplier,
    handleDeleteUnusedMultipliers,
  };
}
