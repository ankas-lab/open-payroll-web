import { useState, useEffect } from 'react';
import { useTx } from 'useink';

import toast from 'react-hot-toast';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';

export function useRemoveBeneficiary(contract: any, contractAddress: string, beneficiaryAddress: string) {
  const [isProcessingRemove, setIsProcessingRemove] = useState<boolean>(false);
  const removeBeneficiary = useTx(contract, 'removeBeneficiary');

  const handleRemoveBeneficiary = (beneficiaryAddress: string) => {
    removeBeneficiary.signAndSend([beneficiaryAddress]);
  };

  useEffect(() => {
    if (isPendingSignature(removeBeneficiary)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(removeBeneficiary)) {
      setIsProcessingRemove(true);
    }

    if (isInBlock(removeBeneficiary)) {
      toast('🗑 Beneficiary successfully removed');
    }

    if (isErrored(removeBeneficiary)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    if (isFinalized(removeBeneficiary)) {
      setIsProcessingRemove(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeBeneficiary.status]);

  return {
    handleRemoveBeneficiary,
    isProcessingRemove,
  };
}
