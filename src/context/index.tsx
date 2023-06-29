import React, { createContext, useState, useEffect } from 'react';
import { BN } from 'bn.js';
import { useCall, useCallSubscription, useContract, useWallet } from 'useink';
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
  codeHash: string;
  ownerContracts: StorageContract[];
}

export const DappContext = createContext<DappContextData | null>(null);

export const DappContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { account } = useWallet();

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
    } else {
      contracts.push(
        {
          name: 'My Contract by My',
          address: '5DNj7Z75xZtNUzjZ8fVdK95hRjd7hEKbsLgTvYdDZ22MCaCK',
          owner: '5Dsykc2KUHcziwcTgZkHxyDDTotBJbGNh3BakfZ5PdDGMzfm',
          email: '',
          beneficiaries: [{ name: 'gera', address: '5H3ik1BKrBMcPXZQYnNHsZ12qUntsDfEVbfi5PFHEUofNg25' }],
        },
        {
          name: 'My Contract by My2',
          address: '5Ev9gHh7VTZZQVAa9TfoyNCMAy91zXVqBQR38iBqScAdmk9c',
          owner: '5G1WsvjyWoaVZzJKnCpn3iK3sScmXrtuTdU3VSVhZAabREot',
          email: '',
          beneficiaries: [{ name: 'gera2', address: '5H3ik1BKrBMcPXZQYnNHsZ12qUntsDfEVbfi5PFHEUofNg25' }],
        },
        {
          name: 'Cuenta de prueba como Owner',
          address: '5HHgY1XcWuvJXWFQ7agbe5xMZHgEGbY6K7x3SF75DCapSJWT',
          owner: '5H3ik1BKrBMcPXZQYnNHsZ12qUntsDfEVbfi5PFHEUofNg25',
          email: '',
          beneficiaries: [{ name: 'Yo mismo', address: '5H3ik1BKrBMcPXZQYnNHsZ12qUntsDfEVbfi5PFHEUofNg25' }],
        },
      );
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

  const getOwner = () => {
    const myContracts = contracts.filter((c) => c.owner === account.address);
    setOwnerContracts(myContracts);
    /*
    const _contract = useContract(contractAddress, metadata);
    const getOwner = useCallSubscription(_contract, 'getOwner');
    if (getOwner.result) {
      const ownerDecoded = pickDecoded(getOwner.result);
      if (ownerDecoded === account.address) {
        contracts.find((c) => c.address === contractAddress);
      }
    }
    */
  };

  //--------------------------------------Const----------------------------------
  const codeHash = '0x4a8a55c4a112cb4d754d89966ee3b3f788b96c3f87f73493a33cf7c1ea3261f5';

  useEffect(() => {
    getStoredContracts();
    getAllStoredContractsCanClaim();
  }, []);

  useEffect(() => {
    getOwner();
  }, [account?.address]);

  const contextValue: DappContextData = {
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
  };

  return <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>;
};
