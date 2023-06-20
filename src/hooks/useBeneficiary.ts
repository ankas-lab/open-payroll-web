import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract } from 'useink';

import { pickDecoded, pickResultOk, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

import { BN } from 'bn.js';
import { usePayrollContract } from '.';

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const { rawBasePayment } = usePayrollContract(contract);

  const [amountToClaim, SetAmountToClaim] = useState<undefined | any>(undefined);
  const [lastClaim, setLastClaim] = useState<undefined | any>(1111);
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

  useEffect(() => {
    if (contract !== undefined) {
      getAmountToClaim.send([address]);
      getBeneficiary.send([address]);
    }
  }, [contract]);

  useEffect(() => {
    if (getAmountToClaim.result?.ok) {
      let data = stringNumberToBN(pickResultOk(getAmountToClaim.result!)!);
      SetAmountToClaim(planckToDecimalFormatted(data, api?.api));
    }
  }, [getAmountToClaim.result?.ok]);

  useEffect(() => {
    if (getBeneficiary.result?.ok) {
      let data = pickResultOk(getBeneficiary.result!);
      getBeneficiaryMultipliersToArray(data);
      setBeneficiary(data);
      setLastClaim(data.last_claim);
      setBeneficiaryMultipliers(data.multipliers);
      setBeneficiaryUnclaimedPayments(data.unclaimed_payments);
    }
  }, [getBeneficiary.result?.ok]);

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
  };
}
