import { useState, useEffect } from 'react';
import { useCallSubscription } from 'useink';
import { pickDecoded } from 'useink/utils';

export function useMultipliers(_contract: any) {
  const [multipliersIdList, setMultipliersIdList] = useState<string[] | undefined>(undefined);

  const getMultipliersList = useCallSubscription(_contract, 'getMultipliersList');

  useEffect(() => {
    if (getMultipliersList.result?.ok) {
      const data = pickDecoded(getMultipliersList.result);
      setMultipliersIdList(data);
    }
  }, [getMultipliersList.result]);

  return {
    multipliersIdList,
  };
}
