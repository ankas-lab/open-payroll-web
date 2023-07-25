import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { BN } from 'bn.js';
import {
  useApi,
  useBalance,
  useCall,
  useCallSubscription,
  useChainDecimals,
  useCodeHash,
  useContract,
  useDeployer,
  useMetadata,
  useSalter,
  useWallet,
} from 'useink';
import metadata from '@/contract/open_payroll.json';
import { pickDecoded, planckToDecimal, stringNumberToBN } from 'useink/utils';
import { useTxNotifications } from 'useink/notifications';
import toast from 'react-hot-toast';
import { DappContext } from '.';

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
  deleteEmptyMultipliers: any;
  initialBeneficiaries: any;
  addInitialBeneficiary: any;
  removeInitialBeneficiary: any;
  handleChangeInitialBeneficiary: any;
  handleChangeMultiplierInitialBeneficiary: any;
  getTotalMultiplierByBeneficiary: any;
  getFinalPayByBeneficiary: any;
  handleChangeFundsToTransfer: any;
  fundsToTransfer: any;
  rawFundsToTransfer: any;
  rawOwnerBalance: any;
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
  clearAllInfo: any;
}

interface Beneficiary {
  name: string;
  address: string;
  multipliers: [][];
}

export const CreateContext = createContext<CreateContextData | null>(null);

export const CreateContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const context = useContext(DappContext);

  const { getStoredContracts, getOwner } = context!;
  //---------------------------------Generals---------------------------------
  const { account } = useWallet();
  const api = useApi('rococo-contracts-testnet');
  const decimals = useChainDecimals('rococo-contracts-testnet');
  const [canContinue, setCanContinue] = useState<boolean>(false);

  //---------------------------------Contract base---------------------------------
  const [contractName, setContractName] = useState<string | undefined>('');
  const [ownerEmail, setOwnerEmail] = useState<string | undefined>('');
  const [periodicity, setPeriodicity] = useState<string | undefined>('7200');
  const [basePayment, setBasePayment] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (parseFloat(basePayment!) < 0) {
      toast("❌ The contract's base payment cannot be negative.");
    }
  }, [basePayment]);

  //---------------------------------initialBaseMultipliers---------------------------------
  const [initialBaseMultipliers, setInitialBaseMultipliers] = useState([{ id: 0, name: '' }]);

  const addInitialBaseMultiplier = () => {
    setInitialBaseMultipliers((prevMultipliers) => {
      const lastIndex = prevMultipliers.length > 0 ? prevMultipliers[prevMultipliers.length - 1].id : -1;
      const newIndex = parseInt(String(lastIndex)) + 1;
      return [...prevMultipliers, { id: newIndex, name: '' }];
    });
  };

  const handleChangeInitialBaseMultiplier = (id: number, value: string) => {
    setInitialBaseMultipliers((prevMultipliers) => {
      const updatedMultipliers = prevMultipliers.map((multiplier) =>
        multiplier.id === id ? { ...multiplier, name: value } : multiplier,
      );
      return updatedMultipliers;
    });
  };

  const handleRemoveInitialBaseMultiplier = (id: number) => {
    setInitialBaseMultipliers((prevMultipliers) => {
      const filteredMultipliers = prevMultipliers.filter((multiplier) => multiplier.id !== id);
      return filteredMultipliers;
    });

    handleRemoveMultipliersByBeneficiary(id);
  };

  const deleteEmptyMultipliers = () => {
    setInitialBaseMultipliers((prevMultipliers) => {
      const filledMultipliers = prevMultipliers.filter((multiplier) => multiplier.name !== '');
      return filledMultipliers;
    });
  };

  const handleRemoveMultipliersByBeneficiary = (id: number) => {
    setInitialBeneficiaries((prevBeneficiaries: any) => {
      const newBeneficiaries = prevBeneficiaries.map((beneficiary: any) => {
        const index = beneficiary.multipliers.findIndex((multiplier: any) => multiplier[0] === id);
        if (index !== -1) {
          const updatedMultipliers = [...beneficiary.multipliers];
          updatedMultipliers.splice(index, 1);
          return { ...beneficiary, multipliers: updatedMultipliers };
        }
        return beneficiary;
      });
      return newBeneficiaries;
    });
  };

  //---------------------------------initialBeneficiaries---------------------------------
  const [initialBeneficiaries, setInitialBeneficiaries] = useState<any>([
    {
      name: '',
      address: '',
      multipliers: [],
    },
  ]);

  const [totalToPay, setTotalToPay] = useState<any | undefined>(0);

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
          multiplier[1] = parseFloat(value) * 100;
        }
        found = true;
      }
    });

    if (!found && value !== '') {
      const newMultiplier = [multiplierIndex, parseFloat(value) * 100];
      beneficiary.multipliers.push(newMultiplier);
    }

    setInitialBeneficiaries(newBeneficiaries);
  };

  const getTotalMultiplierByBeneficiary = (beneficiaryIndex: number) => {
    const beneficiary = initialBeneficiaries[beneficiaryIndex];

    let totalMultiplier = 1;

    if (beneficiary && beneficiary.multipliers) {
      beneficiary.multipliers.forEach((multiplier: any) => {
        totalMultiplier *= parseFloat(multiplier[1]) / 100;
      });
    }

    return totalMultiplier;
  };

  const getFinalPayByBeneficiary = (beneficiaryIndex: number) => {
    const beneficiary = initialBeneficiaries[beneficiaryIndex];
    let totalMultiplier = 1;
    if (beneficiary && beneficiary.multipliers) {
      beneficiary.multipliers.forEach((multiplier: any) => {
        totalMultiplier *= parseFloat(multiplier[1]) / 100;
      });
    }

    const total = totalMultiplier * parseFloat(basePayment!);

    return Number.isNaN(total) ? 0 : total;
  };

  const hasBeneficiaryWithoutAddress = () => {
    const addresses = new Set();
    const minLength = 48;

    for (let i = 0; i < initialBeneficiaries.length; i++) {
      const beneficiary = initialBeneficiaries[i];

      if (beneficiary.address.trim() === '') {
        return false;
      }

      if (beneficiary.address.length < minLength) {
        return false;
      }

      if (addresses.has(beneficiary.address)) {
        toast('❌ There cannot be two beneficiaries with the same addres ');
        return false;
      }

      addresses.add(beneficiary.address);
    }

    return true;
  };

  const getTotalMultipliers = () => {
    let totalMultipliers = 0;

    initialBeneficiaries.forEach((beneficiary: any) =>
      beneficiary.multipliers.forEach((multiplier: any) => {
        let totalMultipliersByBeneficiary = 1;
        totalMultipliersByBeneficiary *= parseFloat(multiplier[1]) / 100;
        totalMultipliers += totalMultipliersByBeneficiary;
      }),
    );

    return totalMultipliers;
  };

  const calculateTotalToPay = () => {
    let totalMultipliers = 0;

    initialBeneficiaries.forEach((beneficiary: any) => {
      let totalMultipliersByBeneficiary = 1;

      beneficiary.multipliers.forEach((multiplier: any) => {
        totalMultipliersByBeneficiary *= parseFloat(multiplier[1]) / 100;
      });

      totalMultipliers += totalMultipliersByBeneficiary;
    });

    const total = totalMultipliers * parseFloat(basePayment!);
    Number.isNaN(total) ? setTotalToPay(0) : setTotalToPay(total);
  };

  useEffect(() => {
    calculateTotalToPay();
  }, [initialBeneficiaries, basePayment]);

  //---------------------------------Fund to Transfer---------------------------------
  const balance = useBalance(account);
  const [fundsToTransfer, setFundsToTransfer] = useState<number>(0);
  const [rawFundsToTransfer, setRawFundsToTransfer] = useState<number>(0);
  const [rawOwnerBalance, setRawOwnerBalance] = useState<any | undefined>(undefined);

  const handleChangeFundsToTransfer = (e: any) => {
    const { value } = e.target;
    setFundsToTransfer(value);

    const raw = value * 10 ** decimals!;
    setRawFundsToTransfer(raw);
  };

  useEffect(() => {
    balance && setRawOwnerBalance(planckToDecimal(balance.freeBalance, { api: api?.api }));
  }, [account, balance]);

  useEffect(() => {
    fundsToTransfer < 0 && toast('❌ You cannot add negative funds to the contract.');
    fundsToTransfer > parseInt(rawOwnerBalance) &&
      toast('❌ Sending an amount greater than what is available in your wallet is not permitted.');
  }, [rawOwnerBalance, rawFundsToTransfer]);

  //---------------------------------Create contract---------------------------------

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
    let beneficiaries: any[][] = [];

    let multipliers: string[] = [];

    const newBeneficiaries = [...initialBeneficiaries];

    newBeneficiaries.forEach((beneficiary: any) => {
      const existingMultiplierIds = beneficiary.multipliers.map((m: any) => m[0]);
      initialBaseMultipliers.forEach((baseMultiplier: any) => {
        if (!existingMultiplierIds.includes(baseMultiplier.id)) {
          beneficiary.multipliers.push([baseMultiplier.id, 100]);
        }
      });
    });

    initialBeneficiaries.forEach((b: any) => {
      beneficiaries.push([b.address, b.multipliers]);
    });

    initialBaseMultipliers.forEach((m: any) => {
      multipliers.push(m.name);
    });

    setFormatedConstructorParams({
      periodicity: periodicity,
      basePayment: parseFloat(basePayment!) * 10 ** decimals!,
      initialBaseMultipliers: multipliers,
      initialBeneficiaries: beneficiaries,
    });
  };

  const check = () => {
    formatConstructorParams();
    if (!M.abi) return;

    D.dryRun(
      M.abi,
      'new',
      { ...formatedConstructorParams },
      {
        salt: S.salt,
        codeHash: C.codeHash,
        value: rawFundsToTransfer,
      },
    );
  };

  function deploy() {
    formatConstructorParams();
    if (!M.abi) return;
    D.signAndSend(
      M.abi,
      'new',
      { ...formatedConstructorParams },
      {
        salt: S.salt,
        codeHash: C.codeHash,
        value: rawFundsToTransfer,
      },
    );
  }

  const saveNewContractInLocalStorage = (contractAddress: string) => {
    const storedContracts = localStorage.getItem('contracts');
    let contracts = [];
    let beneficiaries: { name: any; address: any }[] = [];

    if (storedContracts) {
      contracts = JSON.parse(storedContracts);

      const existingContractIndex = contracts.findIndex((contract: any) => contract.address === contractAddress);

      if (existingContractIndex !== -1) {
        initialBeneficiaries.forEach((b: any) => {
          beneficiaries.push({ name: b.name!, address: b.address! });
        });

        contracts[existingContractIndex] = {
          name: contractName,
          address: contractAddress,
          owner: account.address,
          email: ownerEmail,
          beneficiaries: beneficiaries,
        };
      } else {
        initialBeneficiaries.forEach((b: any) => {
          beneficiaries.push({ name: b.name!, address: b.address! });
        });

        contracts.push({
          name: contractName,
          address: contractAddress,
          owner: account.address,
          email: ownerEmail,
          beneficiaries: beneficiaries,
        });
      }
    } else {
      initialBeneficiaries.forEach((b: any) => {
        beneficiaries.push({ name: b.name!, address: b.address! });
      });

      contracts.push({
        name: contractName,
        address: contractAddress,
        owner: account.address,
        email: ownerEmail,
        beneficiaries: beneficiaries,
      });
    }

    localStorage.setItem('contracts', JSON.stringify(contracts));
    getStoredContracts();
    getOwner();
  };

  useMemo(() => {
    D.wasDeployed && D.contractAddress !== undefined && saveNewContractInLocalStorage(D.contractAddress);
  }, [D.wasDeployed]);

  const setM = useMemo(() => {
    if (!M.abi) {
      M.set(metadataToFile());
    }
  }, [M.abi]);

  useEffect(() => {
    C.set(metadata.source.hash);
    setM;
  }, []);

  //---------------------------------Clear data---------------------------------
  const clearAllInfo = () => {
    setContractName('');
    setOwnerEmail(undefined);
    setBasePayment(undefined);
    setPeriodicity('7200');
    setFundsToTransfer(0);
    setInitialBaseMultipliers([{ id: 0, name: '' }]);
    setInitialBeneficiaries([
      {
        name: '',
        address: '',
        multipliers: [],
      },
    ]);
    setFormatedConstructorParams({
      periodicity: 0,
      basePayment: 0,
      initialBaseMultipliers: [],
      initialBeneficiaries: [],
    });
    D.resetState();
  };

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
    deleteEmptyMultipliers,
    initialBeneficiaries,
    addInitialBeneficiary,
    removeInitialBeneficiary,
    handleChangeInitialBeneficiary,
    handleChangeMultiplierInitialBeneficiary,
    getTotalMultiplierByBeneficiary,
    getFinalPayByBeneficiary,
    calculateTotalToPay,
    totalToPay,
    handleChangeFundsToTransfer,
    fundsToTransfer,
    rawFundsToTransfer,
    rawOwnerBalance,
    formatConstructorParams,
    hasBeneficiaryWithoutAddress,
    getTotalMultipliers,
    C,
    M,
    S,
    D,
    check,
    deploy,
    clearAllInfo,
  };

  return <CreateContext.Provider value={contextValue}>{children}</CreateContext.Provider>;
};
