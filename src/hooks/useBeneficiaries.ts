import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCall, useCallSubscription } from 'useink';
import { pickDecoded } from 'useink/utils';

//TODO: this hook is used two times, here and usePayrollContract

export function useBeneficiaries(_contract: any) {
  const [beneficiaries, setBeneficiaries] = useState<string[] | undefined>(undefined);

  const getListBeneficiaries = useCallSubscription(_contract, 'getListBeneficiaries');

  useEffect(() => {
    if (getListBeneficiaries.result?.ok) {
      const decoded: string[] | undefined = pickDecoded(getListBeneficiaries.result);
      setBeneficiaries(decoded);
    }
  }, [getListBeneficiaries.result?.ok]);

  return { beneficiaries };
}
