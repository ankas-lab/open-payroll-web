import { useState, useEffect } from 'react';
import { useCall } from 'useink';
import { pickDecoded, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';

interface baseMultiplier {
  name: string;
  validUntilBlock: any;
}

export function useBaseMultiplier(_contract: any, _multiplier: string) {
  const [baseMultiplier, setBaseMultiplier] = useState<baseMultiplier | undefined>(undefined);
  const getBaseMultiplier = useCall(_contract, 'getBaseMultiplier');

  useEffect(() => {
    _contract !== undefined && _multiplier !== undefined && getBaseMultiplier.send([_multiplier]);
  }, [_contract]);

  useEffect(() => {
    if (getBaseMultiplier.result?.ok) {
      const decodedBaseMultiplier = pickDecoded(getBaseMultiplier.result);
      setBaseMultiplier(decodedBaseMultiplier);
    }
  }, [getBaseMultiplier.result?.ok]);

  return { baseMultiplier };
}
