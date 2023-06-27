import { useState, useEffect } from 'react';
import { useCallSubscription } from 'useink';
import { pickDecoded } from 'useink/utils';

interface baseMultiplier {
  name: string;
  validUntilBlock: any;
}

export function useBaseMultiplier(_contract: any, _multiplier: string) {
  const [baseMultiplier, setBaseMultiplier] = useState<baseMultiplier | undefined>(undefined);
  const getBaseMultiplier = useCallSubscription(_contract, 'getBaseMultiplier', [_multiplier]);

  useEffect(() => {
    if (getBaseMultiplier.result?.ok) {
      const decodedBaseMultiplier = pickDecoded(getBaseMultiplier.result);
      setBaseMultiplier(decodedBaseMultiplier);
    }
  }, [getBaseMultiplier.result?.ok]);

  return { baseMultiplier };
}
