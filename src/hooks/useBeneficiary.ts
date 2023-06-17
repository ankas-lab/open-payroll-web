import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract } from 'useink';

import { pickDecoded, pickResultOk, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

import { BN } from 'bn.js';

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const [amountToClaim, setAmountToClaim] = useState<undefined | any>(undefined);
  const [beneficiaryMultipliers, setBeneficiaryMultipliers] = useState<undefined | any>(undefined);
  const [beneficiaryUnclaimedPayments, setBeneficiaryUnclaimedPayments] = useState<undefined | any>(undefined);
  const [lastClaim, setLastClaim] = useState<undefined | any>(1111);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getAmountToClaim = useCall<any>(contract, 'getAmountToClaim');
  const getBeneficiary = useCall<any>(contract, 'getBeneficiary'); 

  useEffect(() => {
    getAmountToClaim.send([address], { defaultCaller: true });
    getBeneficiary.send([address], { defaultCaller: true });
    return () => {};
  }, [contract?.contract]);

  useEffect(() => {
    if (getAmountToClaim.result) {
      let data = stringNumberToBN(pickResultOk(getAmountToClaim.result!)!);

      setAmountToClaim(planckToDecimalFormatted(data, api?.api));
    }
  }, [getAmountToClaim.result]);

  useEffect(() => {
    if (getBeneficiary.result) {
      let data = pickDecoded(getBeneficiary.result!)!;
      setLastClaim(data.last_claim);
      setBeneficiaryMultipliers(data.multipliers);
      setBeneficiaryUnclaimedPayments(data.unclaimed_payments);
    }
  }, [getBeneficiary.result]);

  return { amountToClaim, lastClaim, beneficiaryMultipliers, beneficiaryUnclaimedPayments };
}
