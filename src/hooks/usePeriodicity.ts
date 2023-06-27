import { useState, useEffect } from 'react';
import { useCallSubscription } from 'useink';
import { pickDecoded } from 'useink/utils';

export function usePeriodicty(_contract: any) {
  const [periodicity, setPeriodicity] = useState<string | undefined>(undefined);
  const [periodicityType, setPeriodicityType] = useState<'fixed' | 'custom'>('fixed');

  const getPeriodicity = useCallSubscription(_contract, 'getPeriodicity');

  useEffect(() => {
    if (getPeriodicity.result?.ok) {
      const decoded = pickDecoded(getPeriodicity.result);
      setPeriodicity(decoded);

      decoded === '7200' || decoded === '36000' || decoded === '216000'
        ? setPeriodicityType('fixed')
        : setPeriodicityType('custom');
    }
  }, [getPeriodicity.result]);

  return { periodicity, periodicityType, setPeriodicityType };
}
