import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useChainDecimals, useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isInvalid, isPendingSignature } from 'useink/utils';

export function useUpdateBasePayment(_contract: any) {
  const [isUpdatingBasePayment, setIsUpdatingBasePayment] = useState<boolean>(false);

  const chainDecimals = useChainDecimals(_contract?.chainId);

  const updateBasePayment = useTx(_contract, 'updateBasePayment');

  const handleUpdateBasePayment = (_newBasePayment: any) => {
    const formatedNewBasePayment = _newBasePayment * 10 ** chainDecimals!;
    updateBasePayment.signAndSend([formatedNewBasePayment]);
  };

  useEffect(() => {
    if (isPendingSignature(updateBasePayment)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updateBasePayment)) {
      setIsUpdatingBasePayment(true);
    }

    if (isInBlock(updateBasePayment)) {
      setIsUpdatingBasePayment(false);
      toast('👍 The base payment was updated correctly');
    }

    if (isErrored(updateBasePayment)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBasePayment.status]);

  return { handleUpdateBasePayment, isUpdatingBasePayment };
}
