import React, { createContext, useState, useEffect, useMemo } from 'react';
import { BN } from 'bn.js';
import {
  useCall,
  useCallSubscription,
  useCodeHash,
  useContract,
  useDeployer,
  useMetadata,
  useSalter,
  useWallet,
} from 'useink';
import metadata from '@/contract/open_payroll.json';
import { pickDecoded } from 'useink/utils';
import { useTxNotifications } from 'useink/notifications';

interface CreateContextData {
  canContinue: any;
  setCanContinue: any;
  contractName: any;
  setContractName: any;
  ownerEmail: any;
  setOwnerEmail: any;
  setPeriodicity: any;
  setBasePayment: any;
  basePayment: any;
  periodicity: any;
  initialBaseMultipliers: any;
  addInitialBaseMultiplier: any;
  handleChangeInitialBaseMultiplier: any;
  handleRemoveInitialBaseMultiplier: any;
  initialBeneficiaries: any;
  addInitialBeneficiary: any;
  removeInitialBeneficiary: any;
  handleChangeInitialBeneficiary: any;
  handleChangeMultiplierInitialBeneficiary: any;
  getTotalMultiplierByBeneficiary: any;
  getFinalPayByBeneficiary: any;
  calculateTotalToPay: any;
  totalToPay: any;
  formatConstructorParams: any;
  hasBeneficiaryWithoutAddress: any;
  getTotalMultipliers: any;
  C: any;
  M: any;
  S: any;
  D: any;
  check: any;
  deploy: any;
}

interface Beneficiary {
  name: string;
  address: string;
  multipliers: [][];
}

export const CreateContext = createContext<CreateContextData | null>(null);

export const CreateContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  //---------------------------------Generals---------------------------------
  const { account } = useWallet();
  const [canContinue, setCanContinue] = useState<boolean>(false);

  //---------------------------------Contract base---------------------------------
  const [contractName, setContractName] = useState<string | undefined>(undefined);
  const [ownerEmail, setOwnerEmail] = useState<string | undefined>(undefined);
  const [periodicity, setPeriodicity] = useState<string | undefined>('7200');
  const [basePayment, setBasePayment] = useState<string | undefined>(undefined);

  //---------------------------------initialBaseMultipliers---------------------------------
  const [initialBaseMultipliers, setInitialBaseMultipliers] = useState<string[]>(['']);

  const addInitialBaseMultiplier = () => {
    const newMultipliers = [...initialBaseMultipliers];
    newMultipliers.push('');
    setInitialBaseMultipliers(newMultipliers);
  };

  const handleChangeInitialBaseMultiplier = (index: number, value: string) => {
    const newMultipliers = [...initialBaseMultipliers];
    newMultipliers[index] = value;
    setInitialBaseMultipliers(newMultipliers);
  };

  const handleRemoveInitialBaseMultiplier = (index: number) => {
    const newMultipliers = [...initialBaseMultipliers];
    newMultipliers.splice(index, 1);
    setInitialBaseMultipliers(newMultipliers);
  };

  const hasEmptyString = () => {
    return initialBaseMultipliers.includes('');
  };

  useEffect(() => {
    hasEmptyString() ? setCanContinue(false) : setCanContinue(true);
  }, [initialBaseMultipliers]);

  //---------------------------------initialBeneficiaries---------------------------------
  const [initialBeneficiaries, setInitialBeneficiaries] = useState<any>([
    {
      name: '',
      address: '',
      multipliers: [],
    },
  ]);

  const [totalToPay, setTotalToPay] = useState<any | undefined>(undefined);

  const addInitialBeneficiary = () => {
    const newBeneficiaries = [...initialBeneficiaries];
    newBeneficiaries.push({
      name: '',
      address: '',
      multipliers: [],
    });
    setInitialBeneficiaries(newBeneficiaries);
  };

  const removeInitialBeneficiary = (index: number) => {
    const newBeneficiaries = [...initialBeneficiaries];
    newBeneficiaries.splice(index, 1);
    setInitialBeneficiaries(newBeneficiaries);
  };

  const handleChangeInitialBeneficiary = (beneficiaryIndex: number, e: any) => {
    const { name, value } = e.target;
    const newBeneficiaries = [...initialBeneficiaries];
    newBeneficiaries[beneficiaryIndex][name] = value;
    setInitialBeneficiaries(newBeneficiaries);
  };

  const handleChangeMultiplierInitialBeneficiary = (beneficiaryIndex: number, multiplierIndex: number, e: any) => {
    const { value } = e.target;
    const newBeneficiaries = [...initialBeneficiaries];
    const beneficiary = newBeneficiaries[beneficiaryIndex];
    let found = false;

    beneficiary.multipliers.forEach((multiplier: any, index: number) => {
      if (multiplier[0] === multiplierIndex) {
        if (value === '') {
          beneficiary.multipliers.splice(index, 1);
        } else {
          multiplier[1] = value;
        }
        found = true;
      }
    });

    if (!found && value !== '') {
      const newMultiplier = [multiplierIndex, value];
      beneficiary.multipliers.push(newMultiplier);
    }

    setInitialBeneficiaries(newBeneficiaries);
  };

  const getTotalMultiplierByBeneficiary = (beneficiaryIndex: number) => {
    const beneficiary = initialBeneficiaries[beneficiaryIndex];
    let totalMultiplier = 0;
    if (beneficiary && beneficiary.multipliers) {
      beneficiary.multipliers.forEach((multiplier: any) => {
        totalMultiplier += parseFloat(multiplier[1]);
      });
    }
    return totalMultiplier.toFixed(2);
  };

  const getFinalPayByBeneficiary = (beneficiaryIndex: number) => {
    const beneficiary = initialBeneficiaries[beneficiaryIndex];
    let totalMultiplier = 0;
    if (beneficiary && beneficiary.multipliers) {
      beneficiary.multipliers.forEach((multiplier: any) => {
        totalMultiplier += parseFloat(multiplier[1]);
      });
    }
    return (
      totalMultiplier === 0
        ? parseInt(basePayment!.replace(/,/g, ''))
        : totalMultiplier * parseInt(basePayment!.replace(/,/g, ''))
    ).toFixed(2);
  };

  const calculateTotalToPay = () => {
    const total = getTotalMultipliers() * parseInt(basePayment!);

    setTotalToPay(total);
  };

  const hasBeneficiaryWithoutAddress = () => {
    return initialBeneficiaries.some((beneficiary: any) => beneficiary.address === '');
  };

  const getTotalMultipliers = () => {
    let totalMultipliers = 0;
    initialBeneficiaries.forEach((beneficiary: any) =>
      beneficiary.multipliers.forEach((multiplier: any) => {
        totalMultipliers += parseFloat(multiplier[1]);
      }),
    );

    return totalMultipliers;
  };

  useEffect(() => {
    hasBeneficiaryWithoutAddress() ? setCanContinue(false) : setCanContinue(true);
    calculateTotalToPay();
  }, [initialBeneficiaries]);

  //---------------------------------Create contract---------------------------------

  /*
    ["periodicity"]: 10,
    ["basePayment"]: 3,
    ["initialBaseMultipliers"]: ["Mul1", "Mul2"],
    ["initialBeneficiaries"]: [["5Dsykc2KUHcziwcTgZkHxyDDTotBJbGNh3BakfZ5PdDGMzfm", [[0, 1]]]],
  */

  const metadataToFile = () => {
    const metadataToString = JSON.stringify(metadata);
    const blob = new Blob([metadataToString], {
      type: 'application/json',
    });
    const file = new File([blob], 'metadata.json', { type: 'application/json' });
    return file;
  };

  const [formatedConstructorParams, setFormatedConstructorParams] = useState<Record<string, any>>({
    periodicity: 0,
    basePayment: 0,
    initialBaseMultipliers: [],
    initialBeneficiaries: [],
  });

  const C = useCodeHash();
  const M = useMetadata({ requireWasm: false });
  const S = useSalter();
  const D = useDeployer();
  useTxNotifications(D);

  const formatConstructorParams = () => {
    /*
    let beneficiaries: any[][] = [];

    initialBeneficiaries.forEach((b: any) => {
      beneficiaries.push([b.address, b.multipliers]);
    });
*/
    setFormatedConstructorParams({
      periodicity: periodicity,
      basePayment: basePayment,
      initialBaseMultipliers: initialBaseMultipliers,
      initialBeneficiaries: initialBeneficiaries,
    });
  };

  const check = () => {
    formatConstructorParams();
    if (!M.abi) return;
    console.log('check');

    D.dryRun(
      M.abi,
      'new',
      { periodicity: periodicity, basePayment: basePayment },
      {
        salt: S.salt,
        codeHash: C.codeHash,
        periodicity: periodicity,
        basePayment: basePayment,
      },
    );
  };

  const deploy = () => {
    formatConstructorParams();
    if (!M.abi) return;

    const constructor = M.abi?.findConstructor(M.abi.constructors[0].identifier);
    D.signAndSend(M.abi, constructor?.method, formatedConstructorParams, {
      salt: S.salt,
      codeHash: C.codeHash,
      formatedConstructorParams,
    });
  };

  const setM = useMemo(() => {
    if (!M.abi) {
      M.set(metadataToFile());
    }
  }, [M.abi]);

  useEffect(() => {
    C.set(metadata.source.hash);
    setM;
  }, []);

  useEffect(() => {
    console.log('M.abi', M.abi);
  }, [M.abi]);

  useEffect(() => {
    console.log('aaaa');
    console.log(M.abi?.constructors);
    const params = M.abi?.constructors[0].args;
    if (!params) return;
    const newParams: Record<string, unknown> = {};
    params.forEach((param: any) => {
      console.log(param);
    });
  }, [M.abi?.constructors]);

  const contextValue: CreateContextData = {
    canContinue,
    setCanContinue,
    contractName,
    setContractName,
    ownerEmail,
    setOwnerEmail,
    setPeriodicity,
    periodicity,
    setBasePayment,
    basePayment,
    initialBaseMultipliers,
    addInitialBaseMultiplier,
    handleChangeInitialBaseMultiplier,
    handleRemoveInitialBaseMultiplier,
    initialBeneficiaries,
    addInitialBeneficiary,
    removeInitialBeneficiary,
    handleChangeInitialBeneficiary,
    handleChangeMultiplierInitialBeneficiary,
    getTotalMultiplierByBeneficiary,
    getFinalPayByBeneficiary,
    calculateTotalToPay,
    totalToPay,
    formatConstructorParams,
    hasBeneficiaryWithoutAddress,
    getTotalMultipliers,
    C,
    M,
    S,
    D,
    check,
    deploy,
  };

  return <CreateContext.Provider value={contextValue}>{children}</CreateContext.Provider>;
};
