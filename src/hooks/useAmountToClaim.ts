import { useState, useEffect } from 'react';
import { useApi, useCallSubscription, useChainDecimals, useTokenSymbol } from 'useink';
import { pickDecoded, pickResultOk, planckToDecimal, planckToDecimalFormatted } from 'useink/utils';

export function useAmountToClaim(_contract: any, address: string) {
  const api = useApi('rococo-contracts-testnet');
  const decimals = useChainDecimals('rococo-contracts-testnet');
  const chainSymbol = useTokenSymbol('rococo-contracts-testnet');
  const [amountToClaim, setAmountToClaim] = useState<undefined | any>(undefined);
  const [rawAmountToClaim, setRawAmountToClaim] = useState<undefined | number>(undefined);

  const getAmountToClaim = useCallSubscription(_contract, 'getAmountToClaim', [address]);

  useEffect(() => {
    if (getAmountToClaim.result?.ok) {
      const data = pickDecoded(getAmountToClaim.result);

      const dataToNumber = parseFloat(String(data).replace(/,/g, ''));

      if (dataToNumber === 0) {
        setAmountToClaim(dataToNumber + ' ' + chainSymbol);
      } else {
        setAmountToClaim(planckToDecimal(dataToNumber, { api: api?.api, decimals: decimals }) + ' ' + chainSymbol);
      }
      setRawAmountToClaim(dataToNumber);
    }
  }, [getAmountToClaim.result]);

  return {
    amountToClaim,
    rawAmountToClaim,
  };
}
