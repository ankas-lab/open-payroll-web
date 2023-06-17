import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { Archivo } from 'next/font/google';
import { useRouter } from 'next/router';
const archivo = Archivo({ subsets: ['latin'] });
import { useWallet, useApi } from 'useink';
import WalletManager from '@/components/walletManager';

export default function Claim() {
  const codeHash = "0x4a8a55c4a112cb4d754d89966ee3b3f788b96c3f87f73493a33cf7c1ea3261f5";
  const router = useRouter();
  const { account } = useWallet();
  const api = useApi('rococo-contracts-testnet');

  useEffect(() => {
    !account && router.push('/');
  }, [account]);

  const [contractAddress, setContractAddress] = useState<string>('');
  const [validContractAddress, setValidContractAddress] = useState<boolean>(false);

  const handleFindContract = async (contractAddress: string) => {
    console.log(contractAddress);
    if (api) {
      try
      {
        const res = await api.api.query.contracts.contractInfoOf(contractAddress);
        let result = res.toHuman();
        console.log(result);
        if (result !== null) {
            if(result.codeHash === codeHash){
              router.push(`/claim/${contractAddress}`);
            }
            //TODO: Show error
        }
        else{
          //TODO: Show error
        }
      }
      catch (e)
      {
        console.log(e);
      }
    }
  };

  const handleContractAddressChange = (newContractAddress:any) => {
    setContractAddress(newContractAddress);
    if (api) {
      try
      {
        if(newContractAddress.length === 0){
          throw new Error("invalid_address");
        }
        
        const formattedAddress = api.api.registry.createType('AccountId',newContractAddress);
        console.log(formattedAddress);
        setValidContractAddress(true);
      }
      catch (e)
      {
        setValidContractAddress(false);
        console.log("invalid_address");
      }
    }
  }

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <Text type="h2" text="Contracts you can claim" />
        <div className="max-w-[400px] flex flex-col gap-[10px]">
          <Text type="h4" text="Find new contract" />
          <Text type="" text="Enter the contractAddress of the contract to claim your payment" />
          <form className="flex flex-col gap-[10px]">
            <input
              id="contractAddress"
              type="text"
              name="contractAddress"
              placeholder="Contract contractAddress"
              className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              value={contractAddress}
              onChange={(e) => handleContractAddressChange(e.target.value)}
            />
            <div className="flex">
              {validContractAddress ? (
                <Button type="active" text="find" icon="" action={() => handleFindContract(contractAddress)} />
              ) : (
                <Button type="disabled" text="Invalid address" icon="" />
              )}
            </div>
          </form>
        </div>
        <div>
          <Text type="h4" text="The last contracts you claimed" />
          <table className="flex flex-col gap-[10px]">
            <tr className="flex">
              <th className="w-[200px] flex">
                <Text type="overline" text="name" />
              </th>
              <th className="w-[300px] flex">
                <Text type="overline" text="contractAddress" />
              </th>
            </tr>
            <tr className="flex items-center">
              <td className="w-[200px] flex">
                <Text type="" text="name" />
              </td>
              <td className="w-[300px] flex">
                <Text type="" text="name" />
              </td>
              <td className="w-[100px] flex">
                <Button type="outlined" text="check" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
}
