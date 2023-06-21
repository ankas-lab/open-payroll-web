import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCall } from 'useink';
import { pickDecoded } from 'useink/utils';

export function useBeneficiaries(_contract: any) {
  const [beneficiaries, setBeneficiaries] = useState<string[] | undefined>(undefined);

  const getListBeneficiaries = useCall(_contract, 'getListBeneficiaries');

  useEffect(() => {
    getListBeneficiaries.send();
  }, [_contract]);

  useEffect(() => {
    if (getListBeneficiaries.result?.ok) {
      const decoded: string[] | undefined = pickDecoded(getListBeneficiaries.result);
      setBeneficiaries(decoded);
    }
  }, [getListBeneficiaries.result?.ok]);

  return { beneficiaries };
}
