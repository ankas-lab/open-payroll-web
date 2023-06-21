import React, { createContext, useState, useEffect } from 'react';
import { BN } from 'bn.js';

//My contracts
interface StorageContract {
  name: string;
  address: string;
  email: string;
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
        name: "My Contract by My",
        address: "5DNj7Z75xZtNUzjZ8fVdK95hRjd7hEKbsLgTvYdDZ22MCaCK",
        email: '',
      });
      localStorage.setItem('contracts', JSON.stringify(contracts));
    }

    setContracts(contracts);
  }

  const findContractInLocalStorage = (contractAddress: string) => {
    const findedContract = contracts.find((c) => c.address === contractAddress);
    return findedContract;
  };

  const addressToShort = (address: string): any => {
    return address.slice(0, 5) + '...' + address.slice(-5);
  };

  useEffect(() => {
    getStoredContracts();
  }, []);

  useEffect(() => {
    //console.log(contracts);
  }, [contracts]);

  const contextValue: DappContextData = {
    contracts,
    getStoredContracts,
    findContractInLocalStorage,
    addressToShort,
  };

  return <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>;
};
