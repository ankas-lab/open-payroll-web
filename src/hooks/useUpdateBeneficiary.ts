import { useState, useEffect } from 'react';
import { ChainContract, useTx } from 'useink';
import toast from 'react-hot-toast';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';

export function useUpdateBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const [edit, setEdit] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [finalized, setFinalized] = useState<boolean>(false);

  const updateBeneficiary = useTx(contract, 'updateBeneficiary');

  const handleUpdateBeneficiary = (beneficiaryAddress: string, newMultipliers: any) => {
    const newMultipliersToEntries = Object.entries(newMultipliers);
    updateBeneficiary.signAndSend([beneficiaryAddress, newMultipliersToEntries]);
  };

  useEffect(() => {
    if (isPendingSignature(updateBeneficiary)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updateBeneficiary)) {
      setIsProcessing(true);
    }

    if (isInBlock(updateBeneficiary)) {
      toast('👍 The beneficiary was correctly updated');
      setIsProcessing(false);
      setFinalized(true);
      setEdit(false);
    }

    if (isErrored(updateBeneficiary)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    if (isFinalized(updateBeneficiary)) {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBeneficiary.status]);

  return { handleUpdateBeneficiary, isProcessing, finalized, edit, setEdit };
}
