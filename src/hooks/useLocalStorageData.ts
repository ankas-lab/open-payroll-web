import { DappContext } from '@/context';
import React, { useContext, useEffect, useState } from 'react';
export function useLocalStorageData(_contractAddress: string | undefined) {
  const context = useContext(DappContext);
  const { findContractInLocalStorage, contracts, getStoredContracts } = context!;

  const [localStorageData, setLocalStorageData] = useState<any | undefined>(undefined);
  const [newLocalStorageData, setNewLocalStorageData] = useState<any | undefined>(undefined);

  //Handle localStorage data
  const handleNewNameLocalStorageData = (e: any) => {
    newLocalStorageData === undefined
      ? setNewLocalStorageData({ ...localStorageData, name: e.target.value })
      : setNewLocalStorageData({ ...newLocalStorageData, name: e.target.value });
  };

  const handleNewEmailLocalStorageData = (e: any) => {
    newLocalStorageData === undefined
      ? setNewLocalStorageData({ ...localStorageData, email: e.target.value })
      : setNewLocalStorageData({ ...newLocalStorageData, email: e.target.value });
  };

  const updateContract = (contractToUpdate: any) => {
    const findIndex = contracts.findIndex((contract: any) => contract.address === contractToUpdate.address);
    const newContracts = contracts;
    if (findIndex !== -1) {
      newContracts[findIndex] = contractToUpdate;
      localStorage.setItem('contracts', JSON.stringify(newContracts));
      setLocalStorageData(undefined);
      setNewLocalStorageData(undefined);
      getStoredContracts();
    } else {
      console.error('Contract to update was not found.');
    }
  };

  useEffect(() => {
    setLocalStorageData(findContractInLocalStorage(_contractAddress));
  }, [_contractAddress]);

  return {
    localStorageData,
    newLocalStorageData,
    handleNewNameLocalStorageData,
    handleNewEmailLocalStorageData,
    updateContract,
  };
}
