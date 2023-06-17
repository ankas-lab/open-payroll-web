import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useApi, useCall, useChainDecimals, useTx } from 'useink';
import {
  isBroadcast,
  isErrored,
  isFinalized,
  isInBlock,
  isInvalid,
  isPendingSignature,
  pickDecoded,
  bnToBalance,
} from 'useink/utils';
//USE CALL SUBCRIOTION
export function useBasePayment(_contract: any) {
  const [basePayment, setBasePayment] = useState<string | undefined>(undefined);

  const api = useApi('rococo-contracts-testnet');
  const chainDecimals = useChainDecimals(_contract?.chainId);

  const getBasePayment = useCall(_contract, 'getBasePayment');

  const updateBasePayment = useTx(_contract, 'updateBasePayment');

  const handleUpdateBasePayment = (_newBasePayment: any) => {
    const formatedNewBasePayment = _newBasePayment * 10 ** chainDecimals!;
    updateBasePayment.signAndSend([formatedNewBasePayment]);
  };

  useEffect(() => {
    if (_contract) {
      getBasePayment.send();
    }
  }, [_contract]);

  useEffect(() => {
    if (getBasePayment.result?.ok && chainDecimals) {
      const decoded = pickDecoded(getBasePayment.result);
      const decodedToNumber = parseInt(decoded);
      const decodedNumberWithDecimals = decodedToNumber * 10 ** chainDecimals;
      const toBalance = bnToBalance(api?.api, BigInt(decodedNumberWithDecimals));
      const finalBasePayment = parseInt(toBalance.toHuman().slice(0, -4)).toFixed(2);
      setBasePayment(finalBasePayment);
    }
  }, [getBasePayment.result?.ok]);

  useEffect(() => {
    if (isPendingSignature(updateBasePayment)) {
      console.log({ type: updateBasePayment.status, message: `Please sign the transaction in your wallet` });
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updateBasePayment)) {
      console.log({
        type: updateBasePayment.status,
        message: 'Flip transaction has been broadcast!',
      });
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(updateBasePayment)) {
      console.log({
        type: updateBasePayment.status,
        message: 'Transaction is in the block.',
      });

      toast('Transaction is in the block.');
    }

    if (isErrored(updateBasePayment)) {
      console.log({ type: updateBasePayment.status, message: `Error` });
      toast(`Error`);
    }
    if (isInvalid(updateBasePayment)) {
      console.log({ type: updateBasePayment.status, message: `IsInvalid` });
      toast(`IsInvalid`);
    }

    if (isFinalized(updateBasePayment)) {
      console.log({ type: updateBasePayment.status, message: `The transaction has been finalized.` });
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBasePayment.status]);

  return { chainDecimals, api, handleUpdateBasePayment, basePayment };
}
