import { useState, useEffect } from 'react';
import { ChainContract, useTx } from 'useink';
import { toast } from 'react-toastify';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';

export function useUpdateBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const [edit, setEdit] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [finalized, setFinalized] = useState<boolean>(false);

  const updateBeneficiary = useTx(contract, 'updateBeneficiary');

  //TODO: change notifications

  const handleUpdateBeneficiary = (beneficiaryAddress: string, newMultipliers: any) => {
    const newMultipliersToEntries = Object.entries(newMultipliers);
    updateBeneficiary.signAndSend([beneficiaryAddress, newMultipliersToEntries]);
  };

  useEffect(() => {
    if (isPendingSignature(updateBeneficiary)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updateBeneficiary)) {
      setIsProcessing(true);
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(updateBeneficiary)) {
      toast('Transaction is in the block.');
    }

    if (isErrored(updateBeneficiary)) {
      toast(`Error`);
    }

    if (isFinalized(updateBeneficiary)) {
      setIsProcessing(false);
      setFinalized(true);
      setEdit(false);
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBeneficiary.status]);

  return { handleUpdateBeneficiary, isProcessing, finalized, edit, setEdit };
}
