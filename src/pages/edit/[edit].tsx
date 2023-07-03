import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { Archivo } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContract } from 'useink';
import WalletManager from '@/components/walletManager';
const archivo = Archivo({ subsets: ['latin'] });
import metadata from '../../contract/open_payroll.json';

import Contract from '@/components/edit/baseContract';
import Multipliers from '@/components/edit/multipliers';
import Beneficiaries from '@/components/edit/beneficiaries';
import { AiOutlineLoading } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/generals/Loader';

export default function Edit() {
  //---------------------------------Get contract address---------------------------------
  const router = useRouter();
  const {
    query: { edit },
  } = router;
  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<'loading' | 'done' | 'error'>('loading');
  const [tab, setTab] = useState<string>('contract');
  const [contractAddress, setContractAddress] = useState<string>('');
  //---------------------------------Get contract---------------------------------
  const _contract = useContract(contractAddress, metadata);

  // Tabs

  useEffect(() => {
    if (edit?.toString()) {
      setContractAddress(edit?.toString());
    }
  }, [edit]);

  useEffect(() => {
    if (_contract !== undefined) {
      setLoading('done');
      //console.log(_contract);
    }
  }, [_contract]);

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
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
        <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
          <div className="hidden md:flex h-[100px] justify-end">
            <WalletManager />
          </div>
          <div className="flex flex-col gap-[20px] justify-between md:w-10/12 lg:w-7/12">
            <Text type="h2" text="Edit contract" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
              {tab === 'contract' ? (
                <Button type="active" text="contract" icon="" action={() => setTab('contract')} />
              ) : (
                <Button type="outlined" text="contract" icon="" action={() => setTab('contract')} />
              )}
              {tab === 'multipliers' ? (
                <Button type="active" text="multipliers" icon="" action={() => setTab('multipliers')} />
              ) : (
                <Button type="outlined" text="multipliers" icon="" action={() => setTab('multipliers')} />
              )}
              {tab === 'beneficiaries' ? (
                <Button type="active" text="beneficiaries" icon="" action={() => setTab('beneficiaries')} />
              ) : (
                <Button type="outlined" text="beneficiaries" icon="" action={() => setTab('beneficiaries')} />
              )}
            </div>
          </div>
          {tab === 'contract' && <Contract _contractAddress={contractAddress} _contract={_contract} />}
          {tab === 'multipliers' && <Multipliers _contract={_contract} />}
          {tab === 'beneficiaries' && <Beneficiaries _contractAddress={contractAddress} _contract={_contract} />}
        </div>
      )}
    </main>
  );
}
