import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract, useBlockHeader, useTx } from 'useink';

import {
  pickResultOk,
  planckToDecimalFormatted,
  stringNumberToBN,
  isBroadcast,
  isErrored,
  isFinalized,
  isInBlock,
  isInvalid,
  isPendingSignature,
  pickDecoded,
  bnToBalance,
} from 'useink/utils';

import { BN } from 'bn.js';
import { usePayrollContract } from '.';
import { toast } from 'react-toastify';

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {

  const blockHeader = useBlockHeader();
  const { rawBasePayment } = usePayrollContract(contract);

  const [amountToClaim, setAmountToClaim] = useState<undefined | any>(undefined);
  const [lastClaim, setLastClaim] = useState<undefined | any>(undefined);
  const [beneficiary, setBeneficiary] = useState<any | undefined>(undefined);
  const [beneficiaryMultipliers, setBeneficiaryMultipliers] = useState<undefined | any>(undefined);
  const [beneficiaryMultipliersToArray, setBeneficiaryMultipliersToArray] = useState<undefined | any>(undefined);
  const [finalPay, setFinalPay] = useState<undefined | any>(undefined);
  const [beneficiaryUnclaimedPayments, setBeneficiaryUnclaimedPayments] = useState<undefined | any>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getAmountToClaim = useCall<any>(contract, 'getAmountToClaim');
  const getBeneficiary = useCall<any>(contract, 'getBeneficiary');
  const updateBeneficiary = useTx(contract, 'updateBeneficiary');

  const getBeneficiaryMultipliersToArray = (data: any) => {
    const multipliersArray = Object.entries(data.multipliers).map(([key, value]) => ({
      multiplierId: parseInt(key),
      value: parseInt(value),
    }));
    setBeneficiaryMultipliersToArray(multipliersArray);
  };

  const getFinalPay = (mults: any) => {
    let sum = 0;
    for (let i = 0; i < mults.length; i++) {
      sum += mults[i].value;
    }
    const finalPay = sum * rawBasePayment;
    setFinalPay(planckToDecimalFormatted(finalPay, api?.api));
  };

  const getLastClaim = (lastClaim: any) => {
    let lastClaimFromContract = parseInt(lastClaim.replace(/,/g, ''));
    blockHeader?.blockNumber! - lastClaimFromContract > 7200 &&
      setLastClaim(`${((blockHeader?.blockNumber! - lastClaimFromContract) / 7200).toFixed(0)} days`);
    blockHeader?.blockNumber! - lastClaimFromContract < 7200 &&
      blockHeader?.blockNumber! - lastClaimFromContract > 300 &&
      setLastClaim(`${((blockHeader?.blockNumber! - lastClaimFromContract) / 300).toFixed(0)} hours`);
    blockHeader?.blockNumber! - lastClaimFromContract < 300 &&
      setLastClaim(`${((blockHeader?.blockNumber! - lastClaimFromContract) / 5).toFixed(0)} minutes`);
  };

  const handleUpdateBeneficiary = (beneficiaryAddress: string, newMultipliers: any) => {
    console.log('handleUpdateBeneficiary');
    console.log(beneficiaryAddress);
    console.log(newMultipliers);
    const newMultipliersToEntries = Object.entries(newMultipliers);
    console.log(newMultipliersToEntries);

    updateBeneficiary.signAndSend([beneficiaryAddress, newMultipliersToEntries]);
  };

  useEffect(() => {
    if (contract !== undefined) {
      getAmountToClaim.send([address]);
      getBeneficiary.send([address]);
    }
  }, [contract?.contract, address]);


  /*
  //FIXME
  //amountToClaim is in the Beneficiary object like unclaimedPayments, it is unnecessary to call the blockchain twice.
  useEffect(() => {
    if (getAmountToClaim.result?.ok) {
      let data = stringNumberToBN(pickResultOk(getAmountToClaim.result!)!);
      setAmountToClaim(planckToDecimalFormatted(data, api?.api, { decimals: 2 }));
    }
  }, [getAmountToClaim.result?.ok]);
*/

  useEffect(() => {
    if (getBeneficiary.result?.ok) {
      let data = pickResultOk(getBeneficiary.result!);
      let amountToClaim = stringNumberToBN(data.unclaimedPayments);

      getBeneficiaryMultipliersToArray(data);
      setBeneficiary(data);


      setBeneficiaryMultipliers(data.multipliers);

      setAmountToClaim(planckToDecimalFormatted(amountToClaim, api?.api, { decimals: 2 }));

      getLastClaim(data.lastUpdatedPeriodBlock);
    }
  }, [getBeneficiary.result?.ok]);

  useEffect(() => {
    if (beneficiaryMultipliersToArray !== undefined) {
      getFinalPay(beneficiaryMultipliersToArray);
    }
  }, [beneficiaryMultipliersToArray]);

  useEffect(() => {
    if (isPendingSignature(updateBeneficiary)) {
      console.log({ type: updateBeneficiary.status, message: `Please sign the transaction in your wallet` });
      toast(`Please sign the transaction in your wallet`);
    }

    if (isBroadcast(updateBeneficiary)) {
      console.log({
        type: updateBeneficiary.status,
        message: 'Flip transaction has been broadcast!',
      });
      toast('Flip transaction has been broadcast!');
    }

    if (isInBlock(updateBeneficiary)) {
      console.log({
        type: updateBeneficiary.status,
        message: 'Transaction is in the block.',
      });

      toast('Transaction is in the block.');
    }

    if (isErrored(updateBeneficiary)) {
      console.log({ type: updateBeneficiary.status, message: `Error` });
      toast(`Error`);
    }
    if (isInvalid(updateBeneficiary)) {
      console.log({ type: updateBeneficiary.status, message: `IsInvalid` });
      toast(`IsInvalid`);
    }

    if (isFinalized(updateBeneficiary)) {
      console.log({ type: updateBeneficiary.status, message: `The transaction has been finalized.` });
      toast(`The transaction has been finalized.`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBeneficiary.status]);
  
  useEffect(() => {
    if (getBeneficiary.result) {
      let data = pickResultOk(getBeneficiary.result!)!;
      console.log('data');
      console.log(data);
      setLastClaim(data.last_claim);//TODO Eslint throws error but it works
      setBeneficiaryMultipliers(data.multipliers);
      setBeneficiaryUnclaimedPayments(data.unclaimed_payments);
    }
  }, [getBeneficiary.result]);

  return {
    beneficiary,
    amountToClaim,
    lastClaim,
    beneficiaryMultipliers,
    beneficiaryUnclaimedPayments,
    beneficiaryMultipliersToArray,
    finalPay,
    handleUpdateBeneficiary,
  };
}
