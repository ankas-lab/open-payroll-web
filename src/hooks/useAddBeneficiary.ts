import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { usePayrollContract } from '../hooks/usePayrollContract';
import { toast } from 'react-toastify';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';

export function useAddBeneficiary(contract: any) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const addBeneficiary = useTx(contract, 'addBeneficiary');

  const handleAddBeneficiary = (beneficiaryAddress: string, beneficiaryMultipliers: any) => {
    const multipliersToArray = beneficiaryMultipliers !== undefined ? Object.entries(beneficiaryMultipliers) : [];
    addBeneficiary.signAndSend([beneficiaryAddress, multipliersToArray]);
  };

  //TODO: change notifications

  useEffect(() => {
    if (isPendingSignature(addBeneficiary)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(addBeneficiary)) {
      setIsProcessing(true);
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(addBeneficiary)) {
      setIsAdded(true);
    }
    if (isInBlock(addBeneficiary)) {
      //here I need to unshow the row
      setIsAdded(true);
      toast('Transaction is in the block.');
    }

    if (isErrored(addBeneficiary)) {
      toast(`Error`);
    }

    if (isFinalized(addBeneficiary)) {
      setIsProcessing(false);
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBeneficiary.status]);

  return {
    handleAddBeneficiary,
    isProcessing,
    isAdded,
  };
}
