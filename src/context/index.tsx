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

  // 👇 function that reads the contracts that I can claim, stored in localStorage

  function getStoredContracts() {
    const storedContracts = localStorage.getItem("contracts");
    let contracts: StorageContract[] = [];

    if (storedContracts) {
      contracts = JSON.parse(storedContracts);
    } else {
      contracts.push({
        name: "My Contract by My",
        address: "5EpK8bC2J4vUzgYG6rJG8xVmJKKnrGZGENgGHg9aXcbdNGra",
        //address: "5EpiMHMyWByxRrnak8q5Dyy1qoPFfWgVTQhiS4rivhRe3PJX",
      });
      localStorage.setItem("contracts", JSON.stringify(contracts));
    }

    setContracts(contracts);
  }

  useEffect(() => {
    getStoredContracts();
  }, []);

  useEffect(() => {
    console.log(contracts);
  }, [contracts]);

  const contextValue: DappContextData = {
    contracts,
    getStoredContracts,
  };

  return (
    <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>
  );
};
