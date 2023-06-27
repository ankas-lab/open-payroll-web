import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useApi, useCall, useCallSubscription, useChainDecimals, useTx } from 'useink';
import {
  isBroadcast,
  isErrored,
  isFinalized,
  isInBlock,
  isInvalid,
  isPendingSignature,
  pickDecoded,
} from 'useink/utils';
//USE CALL SUBCRIOTION
export function usePeriodicty(_contract: any) {
  const [periodicity, setPeriodicity] = useState<string | undefined>(undefined);
  const [periodicityType, setPeriodicityType] = useState<'fixed' | 'custom'>('fixed');

  //TODO: separate get/Tx?

  const chainDecimals = useChainDecimals(_contract?.chainId);

  const getPeriodicity = useCallSubscription(_contract, 'getPeriodicity');

  const updatePeriodicity = useTx(_contract, 'updatePeriodicity');

  const handleUpdatePeriodicity = (_newPeriodicity: any) => {
    updatePeriodicity.signAndSend([_newPeriodicity]);
  };

  useEffect(() => {
    if (getPeriodicity.result?.ok && chainDecimals) {
      const decoded = pickDecoded(getPeriodicity.result);
      setPeriodicity(decoded);

      decoded === '7200' || decoded === '36000' || decoded === '216000'
        ? setPeriodicityType('fixed')
        : setPeriodicityType('custom');
    }
  }, [getPeriodicity.result?.ok]);

  useEffect(() => {
    if (isPendingSignature(updatePeriodicity)) {
      console.log({ type: updatePeriodicity.status, message: `Please sign the transaction in your wallet` });
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updatePeriodicity)) {
      console.log({
        type: updatePeriodicity.status,
        message: 'Flip transaction has been broadcast!',
      });
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(updatePeriodicity)) {
      console.log({
        type: updatePeriodicity.status,
        message: 'Transaction is in the block.',
      });

      toast('Transaction is in the block.');
    }

    if (isErrored(updatePeriodicity)) {
      console.log({ type: updatePeriodicity.status, message: `Error` });
      toast(`Error`);
    }
    if (isInvalid(updatePeriodicity)) {
      console.log({ type: updatePeriodicity.status, message: `IsInvalid` });
      toast(`IsInvalid`);
    }

    if (isFinalized(updatePeriodicity)) {
      console.log({ type: updatePeriodicity.status, message: `The transaction has been finalized.` });
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePeriodicity.status]);

  return { handleUpdatePeriodicity, periodicity, periodicityType, setPeriodicityType };
}
