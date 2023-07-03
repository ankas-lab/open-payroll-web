import React, { useEffect, useState, useContext } from 'react';
import { useApi } from 'useink';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { DappContext } from '@/context';

export function useFindContractToClaim() {
  //---------------------------------Context---------------------------------
  const context = useContext(DappContext);
  const { codeHash } = context!;
  const router = useRouter();
  const api = useApi('rococo-contracts-testnet');

  const [contractAddress, setContractAddress] = useState<string>('');
  const [validContractAddress, setValidContractAddress] = useState<boolean>(false);

  const handleFindContract = async (contractAddress: string) => {
    if (api) {
      try {
        const res = await api.api.query.contracts.contractInfoOf(contractAddress);
        let result = res.toHuman();
        console.log(result);
        if (result !== null) {
          if (result.codeHash === codeHash) {
            router.push(`/claim/${contractAddress}`);
          } else {
            toast('❌ You entered an incorrect address');
          }
        } else {
          toast('😢 Something went wrong, try again');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleContractAddressChange = (newContractAddress: any) => {
    setContractAddress(newContractAddress);
    if (api) {
      try {
        if (newContractAddress.length === 0) {
          throw new Error('invalid_address');
        }
        const formattedAddress = api.api.registry.createType('AccountId', newContractAddress);
        setValidContractAddress(true);
      } catch (e) {
        setValidContractAddress(false);
      }
    }
  };
  return {
    handleFindContract,
    handleContractAddressChange,
    contractAddress,
    setContractAddress,
    validContractAddress,
    setValidContractAddress,
  };
}
