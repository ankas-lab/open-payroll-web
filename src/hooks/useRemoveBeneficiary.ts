import { useState, useEffect } from 'react';
import { useTx } from 'useink';

import { toast } from 'react-toastify';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';

export function useRemoveBeneficiary(contract: any, contractAddress: string, beneficiaryAddress: string) {
  //TODO change notifications

  const [isProcessingRemove, setIsProcessingRemove] = useState<boolean>(false);
  const removeBeneficiary = useTx(contract, 'removeBeneficiary');

  const handleRemoveBeneficiary = (beneficiaryAddress: string) => {
    removeBeneficiary.signAndSend([beneficiaryAddress]);
  };

  useEffect(() => {
    if (isPendingSignature(removeBeneficiary)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(removeBeneficiary)) {
      setIsProcessingRemove(true);
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(removeBeneficiary)) {
      toast('Transaction is in the block.');
    }

    if (isErrored(removeBeneficiary)) {
      toast(`Error`);
    }

    if (isFinalized(removeBeneficiary)) {
      toast(`The transaction has been finalized.`);

      setIsProcessingRemove(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeBeneficiary.status]);

  return {
    handleRemoveBeneficiary,
    isProcessingRemove,
  };
}
