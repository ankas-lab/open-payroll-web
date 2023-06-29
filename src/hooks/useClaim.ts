import { useState, useEffect } from 'react';
import { ChainContract, useChainDecimals, useTx } from 'useink';
import { isBroadcast, isErrored, isFinalized, isInBlock, isInvalid, isPendingSignature } from 'useink/utils';
import { usePayrollContract } from '.';

import { toast } from 'react-toastify';

export function useClaim(contract: ChainContract<any> | undefined) {
  const { listBeneficiaries } = usePayrollContract(contract);
  const chainDecimals = useChainDecimals('rococo-contracts-testnet');

  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false);
  const [isFindedEnds, setIsFindedEnds] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  const checkIfBeneficiary = (address: string) => {
    listBeneficiaries && setIsBeneficiary(listBeneficiaries?.includes(address));
    setIsFindedEnds(true);
  };

  const claimPaymentTx = useTx(contract, 'claimPayment');

  const handleClaimPayment = (account: string, amountToClaim: any) => {
    const amountFormated = amountToClaim * 10 ** chainDecimals!;

    claimPaymentTx.signAndSend([account, amountFormated]);
  };

  //TODO change notifications

  useEffect(() => {
    if (isPendingSignature(claimPaymentTx)) {
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(claimPaymentTx)) {
      setIsClaiming(true);
      toast('Transaction has been broadcast!');
    }

    if (isInBlock(claimPaymentTx)) {
      setIsClaiming(false);
      setIsClaimed(true);
      toast('Transaction is in block.');
    }

    if (isErrored(claimPaymentTx)) {
      toast(`Error`);
    }
    if (isInvalid(claimPaymentTx)) {
      toast(`IsInvalid`);
    }

    if (isFinalized(claimPaymentTx)) {
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimPaymentTx.status]);

  return { checkIfBeneficiary, isBeneficiary, isFindedEnds, handleClaimPayment, isClaiming, isClaimed };
}
