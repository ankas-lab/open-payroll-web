import React, { useContext, useEffect } from 'react';
import Link from 'next/link.js';

import Nav from '@/components/nav';
import Text from '@/components/generals/text';
import Button from '@/components/generals/button';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });
import WalletManager from '@/components/walletManager';
import { ToastContainer } from 'react-toastify';

import { Error404svg } from '@/assets/Error404';

const Error404 = () => {
  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <ToastContainer />
      <div className="w-10/12 md:w-8/12 min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[0px]">
        <div className="hidden md:flex h-[100px] justify-end">
          <WalletManager />
        </div>
        <div className="flex flex-col">
          <Text type="h2" text="Error 404" />
          <Text type="h6" text="Sorry friend, this page does not exist" />
        </div>
        <div className="md:w-[600px]">
          <div className="flex ">
            <Error404svg />
          </div>
          <div className="mt-10 w-5/12">
            <Link href={'/'}>
              <Button text="go home" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Error404;
