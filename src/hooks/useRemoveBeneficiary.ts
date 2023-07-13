import { useState, useEffect, useContext } from 'react';
import { useTx } from 'useink';

import toast from 'react-hot-toast';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import { DappContext } from '@/context';

export function useRemoveBeneficiary(contract: any, contractAddress: string, beneficiaryAddress: string) {
  const context = useContext(DappContext);

  const { contracts } = context!;
  const [isProcessingRemove, setIsProcessingRemove] = useState<boolean>(false);
  const [deleteFromLS, setDeleteFromLS] = useState<boolean | undefined>(false);

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
      const findedContract = contracts.find((c) => c.address === contractAddress);
      if (findedContract) {
        const beneficiariesUpdated = findedContract.beneficiaries.filter((b) => b.address !== beneficiaryAddress);
        if (beneficiariesUpdated) {
          findedContract.beneficiaries = beneficiariesUpdated;
          const contractsJSON = JSON.stringify(contracts);
          localStorage.setItem('contracts', contractsJSON);
        }
      }
    }

    if (isInBlock(removeBeneficiary)) {
      setDeleteFromLS(true);
      toast('🗑 Beneficiary successfully removed');
    }

    if (isErrored(removeBeneficiary)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    if (isFinalized(removeBeneficiary)) {
      setIsProcessingRemove(false);
      toast('🗑 Beneficiary successfully removed');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeBeneficiary.status]);

  return {
    handleRemoveBeneficiary,
    isProcessingRemove,
  };
}
