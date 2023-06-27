import React, { createContext, useState, useEffect } from 'react';
import { BN } from 'bn.js';

interface beneficiaries {
  name: string;
  address: string;
}

//My contracts
interface StorageContract {
  name: string;
  address: string;
  email: string;
  beneficiaries: beneficiaries[];
}

//Contracts I can claim
interface StorageContractCanClaim {
  name: string;
  address: string;
}

//DappContext
interface DappContextData {
  getStoredContracts: () => void;
  contracts: StorageContract[];
  findContractInLocalStorage: any;
  addressToShort: (address: string) => string;
  updateBeneficiaryName: any;
  getBeneficiaryName: any;
  handleAddBeneficiaryName: any;
  removeBeneficiaryFromLocalStorage: any;
}

export const DappContext = createContext<DappContextData | null>(null);

export const DappContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [contracts, setContracts] = useState<StorageContract[]>([]);
  const [contractsCanClaim, setContractsCanClaim] = useState<StorageContractCanClaim[]>([]);

  // 👇 function that reads the contracts that I can claim, stored in localStorage

  function getStoredContracts() {
    const storedContracts = localStorage.getItem('contracts');
    let contracts: StorageContract[] = [];

    if (storedContracts) {
      contracts = JSON.parse(storedContracts);
    } else {
      contracts.push({
        name: 'My Contract by My',
        address: '5EpK8bC2J4vUzgYG6rJG8xVmJKKnrGZGENgGHg9aXcbdNGra',
        email: '',
        beneficiaries: [{ name: 'gera', address: '5H3ik1BKrBMcPXZQYnNHsZ12qUntsDfEVbfi5PFHEUofNg25' }],
      });
      localStorage.setItem('contracts', JSON.stringify(contracts));
    }

    setContracts(contracts);
  }

  const findContractInLocalStorage = (contractAddress: string) => {
    const findedContract = contracts.find((c) => c.address === contractAddress);
    return findedContract;
  };

  const getBeneficiaryName = (contractAddress: string, beneficiaryAddress: string) => {
    const findedContract = contracts.find((c) => c.address === contractAddress);

    if (findedContract) {
      const beneficiary = findedContract.beneficiaries.find((b) => b.address === beneficiaryAddress);
      if (beneficiary) {
        return beneficiary.name;
      }
    }
  };

  const updateBeneficiaryName = (contractAddress: string, beneficiaryAddress: string, beneficiaryNewName: string) => {
    const findedContract = contracts.find((c) => c.address === contractAddress);
    if (findedContract) {
      const beneficiary = findedContract.beneficiaries.find((b) => b.address === beneficiaryAddress);
      if (beneficiary) {
        beneficiary.name = beneficiaryNewName;
        const contractsJSON = JSON.stringify(contracts);
        localStorage.setItem('contracts', contractsJSON);
      }
    }
  };

  const handleAddBeneficiaryName = (contractAddress: string, beneficiaryAddress: string, beneficiaryName: string) => {
    const findedContract = contracts.find((c) => c.address === contractAddress);
    if (findedContract) {
      const newBeneficiary = { name: beneficiaryName, address: beneficiaryAddress };
      findedContract.beneficiaries.push(newBeneficiary);
      const contractsJSON = JSON.stringify(contracts);
      localStorage.setItem('contracts', contractsJSON);
    }
  };

  const removeBeneficiaryFromLocalStorage = (contractAddress: string, beneficiaryAddress: string) => {
    const findedContract = contracts.find((c) => c.address === contractAddress);
    if (findedContract) {
      const beneficiariesUpdated = findedContract.beneficiaries.filter((b) => b.address !== beneficiaryAddress);
      if (beneficiariesUpdated) {
        findedContract.beneficiaries = beneficiariesUpdated;
        const contractsJSON = JSON.stringify(contracts);
        localStorage.setItem('contracts', contractsJSON);
      }
    }
  };

  const addressToShort = (address: string): any => {
    return address.slice(0, 5) + '...' + address.slice(-5);
  };

  useEffect(() => {
    getStoredContracts();
  }, []);

  const contextValue: DappContextData = {
    contracts,
    getStoredContracts,
    findContractInLocalStorage,
    addressToShort,
    updateBeneficiaryName,
    getBeneficiaryName,
    handleAddBeneficiaryName,
    removeBeneficiaryFromLocalStorage,
  };

  return <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>;
};
