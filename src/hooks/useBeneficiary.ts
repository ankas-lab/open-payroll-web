import { useState, useEffect } from 'react';
import { useCall, useApi, useWallet, ChainContract } from 'useink';

import { pickDecoded, pickResultOk, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

//import { Abi, ContractOptions, ContractPromise } from '../../../core/index';
//import { ContractPromise } from '@polkadot/api-contract';

import { BN } from 'bn.js';

export function useBeneficiary(address: string, contract: ChainContract<any> | undefined) {
  // TODO: ChainContract<ContractPromise> | undefined
  const [amountToClaim, SetAmountToClaim] = useState<undefined | any>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getAmountToClaim = useCall<any>(contract, 'getAmountToClaim');
  const { account, accounts, setAccount } = useWallet();

  // TODO: Last claim

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

  return { amountToClaim };
}
