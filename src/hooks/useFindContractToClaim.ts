import React, { useEffect, useState } from 'react';
import { useApi } from 'useink';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export function useFindContractToClaim() {
  const codeHash = '0x4a8a55c4a112cb4d754d89966ee3b3f788b96c3f87f73493a33cf7c1ea3261f5';
  //const codeHash = '0xf2deced10c8ab2df321c8f236fd94ca749a0b15a075e2ed3ecc4c5489cb747fd';
  const router = useRouter();
  const api = useApi('rococo-contracts-testnet');

  const [contractAddress, setContractAddress] = useState<string>('');
  const [validContractAddress, setValidContractAddress] = useState<boolean>(false);

  const handleFindContract = async (contractAddress: string) => {
    console.log(contractAddress);
    if (api) {
      try {
        const res = await api.api.query.contracts.contractInfoOf(contractAddress);
        let result = res.toHuman();
        console.log(result);
        if (result !== null) {
          if (result.codeHash === codeHash) {
            router.push(`/claim/${contractAddress}`);
          } else {
            toast('You entered an incorrect address');
          }
          //TODO: Show error
        } else {
          //TODO: Show error
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
        console.log(formattedAddress);
        setValidContractAddress(true);
      } catch (e) {
        setValidContractAddress(false);
        //console.log('invalid_address');
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
