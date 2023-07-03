import { useState, useEffect, useContext } from 'react';
import { useTx } from 'useink';
import toast from 'react-hot-toast';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';
import { DappContext } from '@/context';

export function useAddBeneficiary(contract: any) {
  const context = useContext(DappContext);

  const { addressToShort } = context!;

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const addBeneficiary = useTx(contract, 'addBeneficiary');

  const handleAddBeneficiary = (beneficiaryAddress: string, beneficiaryMultipliers: any) => {
    const multipliersToArray = beneficiaryMultipliers !== undefined ? Object.entries(beneficiaryMultipliers) : [];
    addBeneficiary.signAndSend([beneficiaryAddress, multipliersToArray]);
  };

  useEffect(() => {
    if (isPendingSignature(addBeneficiary)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(addBeneficiary)) {
      setIsProcessing(true);
    }

    if (isInBlock(addBeneficiary)) {
      setIsAdded(true);
    }
    if (isInBlock(addBeneficiary)) {
      //here I need to unshow the row
      setIsAdded(true);
      toast(`👍 Beneficiary successfully added`);
    }

    if (isErrored(addBeneficiary)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    if (isFinalized(addBeneficiary)) {
      setIsProcessing(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBeneficiary.status]);

  return {
    handleAddBeneficiary,
    isProcessing,
    isAdded,
  };
}
