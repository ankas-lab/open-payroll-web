import { useState, useEffect } from 'react';
import { useCallSubscription } from 'useink';
import { pickDecoded } from 'useink/utils';

export function useGetOwner(_contract: any) {
  const [owner, setOwner] = useState<string | undefined>(undefined);

  const getOwner = useCallSubscription(_contract, 'getOwner');

  useEffect(() => {
    if (getOwner.result?.ok) {
      const data = pickDecoded(getOwner.result);
      setOwner(data as string);
    }
  }, [getOwner.result]);

  return {
    owner,
  };
}
