import { useState, useEffect } from 'react';
import { ChainContract, useApi, useChainDecimals, useTx, useTxPaymentInfo } from 'useink';
import {
  isBroadcast,
  isErrored,
  isFinalized,
  isInBlock,
  isInvalid,
  isPendingSignature,
  planckToDecimal,
} from 'useink/utils';
import { usePayrollContract } from '.';

import toast from 'react-hot-toast';

export function useClaim(contract: ChainContract<any> | undefined) {
  const { listBeneficiaries } = usePayrollContract(contract);
  const chainDecimals = useChainDecimals('rococo-contracts-testnet');
  const api = useApi('rococo-contracts-testnet');

  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false);
  const [isFindedEnds, setIsFindedEnds] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [claimPaymentGas, setClaimPaymentGas] = useState<number | undefined>(undefined);

  const checkIfBeneficiary = (address: string) => {
    listBeneficiaries && setIsBeneficiary(listBeneficiaries?.includes(address));
    setIsFindedEnds(true);
  };

  const claimPaymentTx = useTx(contract, 'claimPayment');
  const getClaimPaymentTxGas = useTxPaymentInfo(contract, 'claimPayment');

  const handleClaimPayment = (account: string, amountToClaim: any) => {
    const amountFormated = amountToClaim * 10 ** chainDecimals!;

    claimPaymentTx.signAndSend([account, amountFormated]);
  };

  const handleClaimPaymentTxGas = (account: string, amountToClaim: any) => {
    const amountFormated = amountToClaim * 10 ** chainDecimals!;
    getClaimPaymentTxGas.send([account, amountFormated]);
  };

  useEffect(() => {
    getClaimPaymentTxGas.result?.partialFee &&
      setClaimPaymentGas(planckToDecimal(getClaimPaymentTxGas.result?.partialFee.toString(), { api: api?.api }));
  }, [getClaimPaymentTxGas.result]);

  useEffect(() => {
    if (isPendingSignature(claimPaymentTx)) {
      toast(`✍ Please sign the transaction in your wallet`);
    }

    if (isBroadcast(claimPaymentTx)) {
      setIsClaiming(true);
    }

    if (isInBlock(claimPaymentTx)) {
      setIsClaiming(false);
      setIsClaimed(true);
      toast('👍 The claim was successful');
    }

    if (isErrored(claimPaymentTx)) {
      toast(`❌ Something went wrong, please try again.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimPaymentTx.status]);

  return {
    checkIfBeneficiary,
    isBeneficiary,
    isFindedEnds,
    handleClaimPayment,
    isClaiming,
    isClaimed,
    claimPaymentGas,
    handleClaimPaymentTxGas,
  };
}
