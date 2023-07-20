/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract, useBlockHeader, useCallSubscription, useTokenSymbol } from 'useink';
import { usePayrollContract } from '../hooks/usePayrollContract';

import { pickDecoded, planckToDecimal, planckToDecimalFormatted } from 'useink/utils';
import { BN } from 'bn.js';

interface Beneficiary {
  accountId: any;
  multipliers: any;
  unclaimedPayments: any;
  lastUpdatedPeriodBlock: any;
}

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const [beneficiaryMultipliers, setBeneficiaryMultipliers] = useState<undefined | any>(undefined);
  const [beneficiaryUnclaimedPayments, setBeneficiaryUnclaimedPayments] = useState<undefined | any>(undefined);
  const [lastClaim, setLastClaim] = useState<undefined | any>(undefined);
  const [beneficiary, setBeneficiary] = useState<any | undefined>(undefined);
  const [beneficiaryMultipliersToArray, setBeneficiaryMultipliersToArray] = useState<undefined | any>(undefined);
  const [finalPay, setFinalPay] = useState<undefined | any>(undefined);

  const blockHeader = useBlockHeader();
  const { rawBasePayment } = usePayrollContract(contract);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getBeneficiary = useCallSubscription(contract, 'getBeneficiary', [address]);

  const getBeneficiaryMultipliersToArray = (data: any) => {
    if (data !== undefined) {
      const multipliersArray = Object.entries(data).map(([key, value]) => ({
        multiplierId: parseInt(key),
        value: parseInt(value as string) === 0 ? 1 : parseInt(value as string),
      }));
      setBeneficiaryMultipliersToArray(multipliersArray);
    }
  };

  const getFinalPay = (mults: any) => {
    let sum = 1;

    for (let i = 0; i < mults.length; i++) {
      sum *= mults[i].value / 100;
    }

    const basePayment = planckToDecimal(rawBasePayment, { api: api?.api });

    const finalPay = basePayment! * sum;

    setFinalPay(finalPay);
  };

  const getLastClaim = (lastClaim: any) => {
    if (lastClaim !== undefined) {
      let lastClaimFromContract = parseInt(lastClaim.replace(/,/g, ''));
      const timeDifference = blockHeader?.blockNumber! - lastClaimFromContract;

      if (timeDifference > 7200) {
        const days = Math.floor(timeDifference / 7200);
        const dayText = days === 1 ? 'day' : 'days';
        setLastClaim(`${days} ${dayText}`);
      } else if (timeDifference > 300) {
        const hours = Math.floor(timeDifference / 300);
        const hourText = hours === 1 ? 'hour' : 'hours';
        setLastClaim(`${hours} ${hourText}`);
      } else {
        const minutes = Math.floor(timeDifference / 5);
        const minuteText = minutes === 1 ? 'minute' : 'minutes';
        setLastClaim(`${minutes} ${minuteText}`);
      }
    }
  };

  useEffect(() => {
    if (getBeneficiary.result?.ok) {
      const data = pickDecoded<any | null>(getBeneficiary.result);

      if (data) {
        getLastClaim(data.lastUpdatedPeriodBlock);
        setBeneficiary(data);
        setBeneficiaryUnclaimedPayments(data?.unclaimedPayments);
      }
    }
  }, [getBeneficiary.result]);

  useEffect(() => {
    if (beneficiary?.multipliers !== beneficiaryMultipliers) {
      getBeneficiaryMultipliersToArray(beneficiary.multipliers);
      setBeneficiaryMultipliers(beneficiary.multipliers);
    }
  }, [beneficiary]);

  useEffect(() => {
    if (beneficiaryMultipliersToArray !== undefined) {
      getFinalPay(beneficiaryMultipliersToArray);
    }
  }, [beneficiaryMultipliersToArray]);

  return {
    beneficiary,
    lastClaim,
    beneficiaryMultipliers,
    beneficiaryUnclaimedPayments,
    beneficiaryMultipliersToArray,
    finalPay,
    rawBasePayment,
  };
}
