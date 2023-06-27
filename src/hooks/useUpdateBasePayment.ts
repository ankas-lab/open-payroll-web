import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useChainDecimals, useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isInvalid, isPendingSignature } from 'useink/utils';

export function useUpdateBasePayment(_contract: any) {
  //TODO: change notifications

  const [isUpdatingBasePayment, setIsUpdatingBasePayment] = useState<boolean>(false);

  const chainDecimals = useChainDecimals(_contract?.chainId);

  const updateBasePayment = useTx(_contract, 'updateBasePayment');

  const handleUpdateBasePayment = (_newBasePayment: any) => {
    const formatedNewBasePayment = _newBasePayment * 10 ** chainDecimals!;
    updateBasePayment.signAndSend([formatedNewBasePayment]);
  };

  useEffect(() => {
    if (isPendingSignature(updateBasePayment)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updateBasePayment)) {
      setIsUpdatingBasePayment(true);
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(updateBasePayment)) {
      setIsUpdatingBasePayment(false);
      toast('Transaction is in the block.');
    }

    if (isErrored(updateBasePayment)) {
      toast(`Error`);
    }
    if (isInvalid(updateBasePayment)) {
      toast(`IsInvalid`);
    }

    if (isFinalized(updateBasePayment)) {
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBasePayment.status]);

  return { handleUpdateBasePayment, isUpdatingBasePayment };
}
