import { useState, useEffect, useContext } from 'react';
import { useCall, useApi, useContract } from 'useink';

import { pickDecoded, planckToDecimalFormatted } from 'useink/utils';
import { DappContext } from '@/context';
import metadata from '@/contract/open_payroll.json';
import { usePayrollContract } from '@/hooks';

import { BN } from 'bn.js';

export function useBeneficiary(address: string, contract: any) {
  // TODO: ChainContract<ContractPromise> | undefined
  const context = useContext(DappContext);
  const { formatNumberWithCommasToPlainNumber } = context!;

  const [amountToClaim, SetAmountToClaim] = useState<undefined | any>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getAmountToClaim = useCall<any>(contract, 'getAmountToClaim');

  // amountToClaim, Last claim

  useEffect(() => {
    getAmountToClaim.send([address], { defaultCaller: true });
    console.log('getAmountToClaim-init', getAmountToClaim);
    return () => {};
  }, [contract]);

  useEffect(() => {
    console.log('getAmountToClaim', getAmountToClaim);
    if (getAmountToClaim.result) {
      let data = formatNumberWithCommasToPlainNumber(pickDecoded(getAmountToClaim.result!));
      console.log('data', data);
      SetAmountToClaim(planckToDecimalFormatted(data, api?.api));
    }
  }, [getAmountToClaim.result]);

  return { amountToClaim };
}
