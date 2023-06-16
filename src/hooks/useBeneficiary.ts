import { useState, useEffect } from 'react';
import { useCall, useApi, ChainContract } from 'useink';

import { pickDecoded, pickResultOk, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

import { BN } from 'bn.js';

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  const [amountToClaim, SetAmountToClaim] = useState<undefined | any>(undefined);
  const [lastClaim, setLastClaim] = useState<undefined | any>(1111);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getAmountToClaim = useCall<any>(contract, 'getAmountToClaim');

  useEffect(() => {
    getAmountToClaim.send([address], { defaultCaller: true });
    return () => {};
  }, [contract]);

  useEffect(() => {
    if (getAmountToClaim.result) {
      let data = stringNumberToBN(pickResultOk(getAmountToClaim.result!)!);

      SetAmountToClaim(planckToDecimalFormatted(data, api?.api));
    }
  }, [getAmountToClaim.result]);

  return { amountToClaim, lastClaim };
}
