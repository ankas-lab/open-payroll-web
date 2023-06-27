import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract, useBlockHeader, useCallSubscription } from 'useink';
import { usePayrollContract } from '../hooks/usePayrollContract';

import { pickDecoded, pickResultOk, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

interface Beneficiary {
  accountId: any;
  multipliers: any;
  unclaimedPayments: any;
  lastUpdatedPeriodBlock: any;
}

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const [amountToClaim, setAmountToClaim] = useState<undefined | any>(undefined);
  const [beneficiaryMultipliers, setBeneficiaryMultipliers] = useState<undefined | any>(undefined);
  const [beneficiaryUnclaimedPayments, setBeneficiaryUnclaimedPayments] = useState<undefined | any>(undefined);
  const [lastClaim, setLastClaim] = useState<undefined | any>(undefined);
  const [beneficiary, setBeneficiary] = useState<any | undefined>(undefined);
  const [beneficiaryMultipliersToArray, setBeneficiaryMultipliersToArray] = useState<undefined | any>(undefined);
  const [finalPay, setFinalPay] = useState<undefined | any>(undefined);
  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false);
  const [beneficiaryList, setBeneficiaryList] = useState<string[] | undefined>(undefined);

  const blockHeader = useBlockHeader();
  const { rawBasePayment } = usePayrollContract(contract);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getBeneficiary = useCallSubscription(contract, 'getBeneficiary', [address]);

  const getBeneficiaryMultipliersToArray = (data: any) => {
    const multipliersArray = Object.entries(data).map(([key, value]) => ({
      multiplierId: parseInt(key),
      value: parseInt(value as string) === 0 ? 1 : parseInt(value as string),
    }));
    setBeneficiaryMultipliersToArray(multipliersArray);
  };

  const getFinalPay = (mults: any) => {
    let sum = 0;
    for (let i = 0; i < mults.length; i++) {
      sum += mults[i].value / 100;
    }
    const finalPay = sum * rawBasePayment;
    setFinalPay(planckToDecimalFormatted(finalPay, api?.api));
  };

  const getLastClaim = (lastClaim: any) => {
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
  };

  const checkIfBeneficiary = () => {
    if (address && beneficiaryList?.includes(address)) {
      setIsBeneficiary(true);
    } else {
      setIsBeneficiary(false);
    }
  };

  useEffect(() => {
    checkIfBeneficiary();
  }, [address, beneficiaryList]);

  useEffect(() => {
    if (getBeneficiary.result?.ok) {
      const data = pickDecoded(getBeneficiary.result);
      if (data?.Ok) {
        getBeneficiaryMultipliersToArray(data?.Ok.multipliers);
        getLastClaim(data?.Ok.lastUpdatedPeriodBlock);

        setBeneficiary(data?.Ok);
        setBeneficiaryMultipliers(data?.Ok.multipliers);
        const amountToClaim = stringNumberToBN(data?.Ok.unclaimedPayments);
        setAmountToClaim(planckToDecimalFormatted(amountToClaim, api?.api, { decimals: 2 }));
        setBeneficiaryUnclaimedPayments(data?.Ok.unclaimedPayments);
      }
    }
  }, [getBeneficiary.result]);

  useEffect(() => {
    if (beneficiaryMultipliersToArray !== undefined) {
      getFinalPay(beneficiaryMultipliersToArray);
    }
  }, [beneficiaryMultipliersToArray]);

  return {
    beneficiary,
    amountToClaim,
    lastClaim,
    beneficiaryMultipliers,
    beneficiaryUnclaimedPayments,
    beneficiaryMultipliersToArray,
    finalPay,
    isBeneficiary,
    rawBasePayment,
  };
}
