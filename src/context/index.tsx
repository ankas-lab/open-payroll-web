import React, { createContext, useState, useEffect } from "react";

//My contracts
interface StorageContract {
  name: string;
  address: string;
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
}

export const DappContext = createContext<DappContextData | null>(null);

export const DappContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [contracts, setContracts] = useState<StorageContract[]>([]);
  const [contractsCanClaim, setContractsCanClaim] = useState<
    StorageContractCanClaim[]
  >([]);

  useEffect(() => {
    getStoredContracts();
  }, []);

  function getStoredContracts() {
    const storedContracts = localStorage.getItem("contracts");
    let contracts: StorageContract[] = [];

    if (storedContracts) {
      contracts = JSON.parse(storedContracts);
    } else {
      contracts.push({
        name: "My Contract",
        address: "5GNukKy7izXYCepwAH4JVRuU7RkiqNUNk3LRhAHJn7zjmu4H",
      });
      localStorage.setItem("contracts", JSON.stringify(contracts));
    }

    setContracts(contracts);
  }

  // 👇 function that reads the contracts that I can claim, stored in localStorage

  const contextValue: DappContextData = {
    contracts,
    getStoredContracts,
  };

  return (
    <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>
  );
};
