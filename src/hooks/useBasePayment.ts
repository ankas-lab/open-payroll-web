import { useState, useEffect } from 'react';
import { useApi, useCall, useChainDecimals } from 'useink';
import { pickDecoded, bnToBalance, planckToDecimal } from 'useink/utils';

export function useBasePayment(_contract: any) {
  const [basePayment, setBasePayment] = useState<any | undefined>(undefined);

  const api = useApi('rococo-contracts-testnet');

  const chainDecimals = useChainDecimals(_contract?.chainId);

  const getBasePayment = useCall(_contract, 'getBasePayment');

  useEffect(() => {
    if (_contract) {
      getBasePayment.send();
    }
  }, [_contract]);

  useEffect(() => {
    if (getBasePayment.result?.ok && chainDecimals) {
      const decoded = pickDecoded(getBasePayment.result);
      const decodedToNumber = parseInt(decoded as string);
      const decodedNumberWithDecimals = decodedToNumber * 10 ** chainDecimals;
      const toBalance = bnToBalance(api?.api, BigInt(decodedNumberWithDecimals));
      const finalBasePayment = parseInt(toBalance.toHuman().slice(0, -4)).toFixed(2);
      const planck = planckToDecimal(decodedToNumber, { api: api?.api });
      setBasePayment(planck);
    }
  }, [getBasePayment.result?.ok]);

  return { chainDecimals, basePayment };
}
