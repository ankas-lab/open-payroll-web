import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { Archivo } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContract, useWallet } from 'useink';
import WalletManager from '@/components/walletManager';
const archivo = Archivo({ subsets: ['latin'] });
import metadata from '../../contract/open_payroll.json';

import Contract from '@/components/edit/baseContract';
import Multipliers from '@/components/edit/multipliers';
import Beneficiaries from '@/components/edit/beneficiaries';
import Forget from '@/components/edit/forget';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/generals/Loader';
import NotOwner from '@/components/contracts/NotOwner';
import { useGetOwner } from '@/hooks/useGetOwner';
import Link from 'next/link';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useLocalStorageData } from '@/hooks/useLocalStorageData';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoIosCopy } from 'react-icons/io';

export default function Edit() {
  const { account } = useWallet();
  //---------------------------------Get contract address---------------------------------
  const router = useRouter();
  const {
    query: { edit },
  } = router;
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');
  const [tab, setTab] = useState<string>('contract');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [forget, setForget] = useState<boolean>(false);
  //---------------------------------Get contract---------------------------------
  const { localStorageData } = useLocalStorageData(contractAddress);

  const _contract = useContract(contractAddress, metadata);
  const { owner } = useGetOwner(_contract);
  useEffect(() => {
    account === undefined && router.push('/');
  }, [account]);

  useEffect(() => {
    if (edit?.toString()) {
      setContractAddress(edit?.toString());
    }
  }, [edit]);

  useEffect(() => {
    if (_contract !== undefined) {
      setLoading('done');
    }
  }, [_contract]);

  //---------------------------------Copy to Clipboard---------------------------------
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    const textToCopy = contractAddress;
    textToCopy !== undefined && navigator.clipboard.writeText(textToCopy.toString());
    setCopied(true);
    toast('👍 Address copied');
    setTimeout(function () {
      setCopied(false);
    }, 5000);
  };

  return (
    <main className={account ? `flex flex-col md:flex-row ${archivo.className}` : `flex flex-col ${archivo.className}`}>
      <Nav />
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            border: '2px solid #25064C',
            padding: '16px',
            backgroundColor: '#F8F7FF',
            borderRadius: '5px',
            color: '#000000',
          },
        }}
      />
      {loading === 'loading' ? (
        <Loader />
      ) : (
        <div className="w-10/12 md:w-8/12 overflow-x-auto min-h-screen mx-auto flex flex-col gap-[40px] py-[10vh] md:py-0 md:pb-[20vh]">
          <div className="hidden md:flex h-[100px] justify-end">
            <WalletManager />
          </div>
          {_contract && owner !== undefined ? (
            owner === account?.address ? (
              <>
                {forget && <Forget _contractAddress={contractAddress} _setForget={setForget} />}
                <div className="flex flex-col gap-[40px]">
                  <Link href={`/contracts/${contractAddress}`}>
                    <BsFillArrowLeftCircleFill className="w-5 h-5 text-oppurple cursor-pointer" />
                  </Link>
                  <div className="flex justify-between items-baseline">
                    <div className="flex flex-col">
                      <Text
                        type="h2"
                        text={`Edit ${
                          localStorageData.name ||
                          localStorageData?.address.slice(0, 5) +
                            '...' +
                            localStorageData?.address.slice(
                              localStorageData?.address.length - 5,
                              localStorageData?.address.length,
                            )
                        }`}
                      />
                      <div className="flex items-center gap-2">
                        <Text type="overline" text={`${contractAddress}`} />
                        {copied ? (
                          <AiFillCheckCircle
                            className="text-opgreen cursor-pointer"
                            onClick={() => copyToClipboard()}
                          />
                        ) : (
                          <IoIosCopy className="text-oppurple cursor-pointer" onClick={() => copyToClipboard()} />
                        )}
                      </div>
                    </div>
                    <Button type="text" text="forget" action={() => setForget(true)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px]">
                    {tab === 'contract' ? (
                      <Button type="active" text="contract" action={() => setTab('contract')} />
                    ) : (
                      <Button type="outlined" text="contract" action={() => setTab('contract')} />
                    )}
                    {tab === 'multipliers' ? (
                      <Button type="active" text="multipliers" action={() => setTab('multipliers')} />
                    ) : (
                      <Button type="outlined" text="multipliers" action={() => setTab('multipliers')} />
                    )}
                    {tab === 'beneficiaries' ? (
                      <Button type="active" text="beneficiaries" action={() => setTab('beneficiaries')} />
                    ) : (
                      <Button type="outlined" text="beneficiaries" action={() => setTab('beneficiaries')} />
                    )}
                  </div>
                </div>
                {tab === 'contract' && <Contract _contractAddress={contractAddress} _contract={_contract} />}
                {tab === 'multipliers' && <Multipliers _contract={_contract} />}
                {tab === 'beneficiaries' && <Beneficiaries _contractAddress={contractAddress} _contract={_contract} />}
              </>
            ) : (
              <NotOwner />
            )
          ) : (
            <Loader />
          )}
        </div>
      )}
    </main>
  );
}
