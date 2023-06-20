import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract } from 'useink';

import { pickDecoded, pickResultOk, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

import { BN } from 'bn.js';

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

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getAmountToClaim = useCall<any>(contract, 'getAmountToClaim');
  const getBeneficiary = useCall<any>(contract, 'getBeneficiary');

  useEffect(() => {
    getAmountToClaim.send([address], { defaultCaller: true });
    getBeneficiary.send([address], { defaultCaller: true });
  }, [contract?.contract, address]);

  useEffect(() => {
    if (getAmountToClaim.result) {
      let data = stringNumberToBN(pickResultOk(getAmountToClaim.result!)!);

      setAmountToClaim(planckToDecimalFormatted(data, api?.api, { decimals: 2 }));
    }
  }, [getAmountToClaim.result]);

  useEffect(() => {
    if (getBeneficiary.result) {
      let data: Beneficiary = pickResultOk(getBeneficiary.result!)!;
      setLastClaim(data.lastUpdatedPeriodBlock);
      setBeneficiaryMultipliers(data.multipliers);
      setBeneficiaryUnclaimedPayments(data.unclaimedPayments);
    }
  }, [getBeneficiary.result]);

  return { amountToClaim, lastClaim, beneficiaryMultipliers, beneficiaryUnclaimedPayments };
}
