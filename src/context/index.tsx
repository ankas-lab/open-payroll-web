import React, { createContext, useState, useEffect, useMemo } from 'react';
import { BN } from 'bn.js';
import {
  useCall,
  useCallSubscription,
  useChainDecimals,
  useContract,
  useMetadata,
  useTokenSymbol,
  useWallet,
} from 'useink';
import metadata from '@/contract/open_payroll.json';
import { pickDecoded } from 'useink/utils';

interface beneficiaries {
  name: string;
  address: string;
}

//My contracts
interface StorageContract {
  name: string;
  address: string;
  email: string;
  owner: string;
  beneficiaries: beneficiaries[];
}

//Contracts I can claim
interface StorageContractCanClaim {
  name: string | undefined;
  claimer: string;
  contractAddress: string;
}

//DappContext
interface DappContextData {
  chainSymbol: any;
  chainDecimals: any;
  getStoredContracts: () => void;
  contracts: StorageContract[];
  findContractInLocalStorage: any;
  addressToShort: (address: string) => string;
  updateBeneficiaryName: any;
  getBeneficiaryName: any;
  handleAddBeneficiaryName: any;
  removeBeneficiaryFromLocalStorage: any;
  allContractsCanClaim: StorageContractCanClaim[];
  findContractCanClaimInLocalStorage: any;
  contractCanClaimFromLocalStorage: any;
  changeContractCanClaimNameInLocalStorage: any;
  codeHash: string | undefined;
  ownerContracts: StorageContract[];
  getOwner: any;
  deleteContract: any;
}

export const DappContext = createContext<DappContextData | null>(null);

export const DappContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { account } = useWallet();
  //---------------------------------Generals---------------------------------
  const [chainSymbol, setChainSymbol] = useState<any | undefined>(undefined);
  const [chainDecimals, setChainDecimals] = useState<any | undefined>(undefined);

  const [contracts, setContracts] = useState<StorageContract[]>([]);
  const [ownerContracts, setOwnerContracts] = useState<StorageContract[]>([]);
  const [allContractsCanClaim, setAllContractsCanClaim] = useState<StorageContractCanClaim[]>([]);
  const [contractCanClaimFromLocalStorage, setContractCanClaimFromLocalStorage] = useState<
    StorageContractCanClaim | undefined
  >();

  function getStoredContracts() {
    const storedContracts = localStorage.getItem('contracts');
    let contracts: StorageContract[] = [];

    if (storedContracts) {
      contracts = JSON.parse(storedContracts);
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
      const beneficiaryIndex = findedContract.beneficiaries.findIndex((b) => b.address === beneficiaryAddress);
      if (beneficiaryIndex !== -1) {
        findedContract.beneficiaries[beneficiaryIndex].name = beneficiaryNewName;
      } else {
        const newBeneficiary = { address: beneficiaryAddress, name: beneficiaryNewName };
        findedContract.beneficiaries.push(newBeneficiary);
      }

      findedContract.beneficiaries = findedContract.beneficiaries.filter(
        (b, index, self) => self.findIndex((s) => s.address === b.address) === index,
      );

      const allOtherContracts = contracts.filter((c) => c.address !== contractAddress);
      const allContractsUpdate = [...allOtherContracts, { ...findedContract }];
      const contractsJSON = JSON.stringify(allContractsUpdate);
      localStorage.setItem('contracts', contractsJSON);
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

  const getAllStoredContractsCanClaim = () => {
    const storedContractsCanClaim = localStorage.getItem('contractsCanClaim');
    let contractsCanClaim: StorageContractCanClaim[] = [];

    if (storedContractsCanClaim) {
      contractsCanClaim = JSON.parse(storedContractsCanClaim);
    } else {
      localStorage.setItem('contractsCanClaim', JSON.stringify(contractsCanClaim));
    }
    setAllContractsCanClaim(contractsCanClaim);
  };

  const findContractCanClaimInLocalStorage = (contractAddress: string, claimer: string) => {
    const storedContractsCanClaim = localStorage.getItem('contractsCanClaim');
    let contractsCanClaim: StorageContractCanClaim[] = [];

    if (storedContractsCanClaim) {
      contractsCanClaim = JSON.parse(storedContractsCanClaim);
    }

    const findedContract = contractsCanClaim.find(
      (c) => c.contractAddress === contractAddress && c.claimer === claimer,
    );

    if (findedContract) {
      setContractCanClaimFromLocalStorage(findedContract);
    } else {
      const newContract = {
        name: undefined,
        claimer: claimer,
        contractAddress: contractAddress,
      };
      contractsCanClaim.push(newContract);
      localStorage.setItem('contractsCanClaim', JSON.stringify(contractsCanClaim));
      setContractCanClaimFromLocalStorage(newContract);
    }
  };

  const changeContractCanClaimNameInLocalStorage = (contractAddress: string, claimer: string, newName: string) => {
    const storedContractsCanClaim = localStorage.getItem('contractsCanClaim');

    if (storedContractsCanClaim) {
      let contractsCanClaim: StorageContractCanClaim[] = JSON.parse(storedContractsCanClaim);

      const foundIndex = contractsCanClaim.findIndex(
        (c) => c.contractAddress === contractAddress && c.claimer === claimer,
      );

      if (foundIndex !== -1) {
        contractsCanClaim[foundIndex].name = newName;
        localStorage.setItem('contractsCanClaim', JSON.stringify(contractsCanClaim));
      }
    }

    findContractCanClaimInLocalStorage(contractAddress, claimer);
  };

  function deleteContract(contractAddressToDelete: string) {
    setContracts((prevContracts) => {
      const updatedContracts = prevContracts.filter((contract) => contract.address !== contractAddressToDelete);
      localStorage.setItem('contracts', JSON.stringify(updatedContracts));
      return updatedContracts;
    });
  }

  const getOwner = () => {
    const myContracts = contracts.filter((c) => c.owner === account?.address);
    setOwnerContracts(myContracts);
  };

  //--------------------------------------Const----------------------------------

  const [codeHash, setCodeHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    getStoredContracts();
    getAllStoredContractsCanClaim();
    setCodeHash(metadata.source.hash);
  }, []);

  useEffect(() => {
    getOwner();
  }, [account?.address]);

  const decimals = useChainDecimals('rococo-contracts-testnet');
  const token = useTokenSymbol('rococo-contracts-testnet');
  useEffect(() => {
    setChainSymbol(token);
    setChainDecimals(decimals);
  }, [decimals, token]);

  const contextValue: DappContextData = {
    chainSymbol,
    chainDecimals,
    contracts,
    getStoredContracts,
    findContractInLocalStorage,
    addressToShort,
    updateBeneficiaryName,
    getBeneficiaryName,
    handleAddBeneficiaryName,
    removeBeneficiaryFromLocalStorage,
    allContractsCanClaim,
    findContractCanClaimInLocalStorage,
    contractCanClaimFromLocalStorage,
    changeContractCanClaimNameInLocalStorage,
    codeHash,
    ownerContracts,
    getOwner,
    deleteContract,
  };

  return <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>;
};
