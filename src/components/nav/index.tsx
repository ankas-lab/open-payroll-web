import React, { useEffect, useState } from 'react';
import { OPPurple } from '../../assets/logo/OPPurple.jsx';
import Button from '../generals/button';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import Link from 'next/link.js';
import { useWallet, useAllWallets } from 'useink';
import WalletManager from '@/components/walletManager';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

const Index = () => {
  const { account, accounts, setAccount, connect, disconnect } = useWallet();

  const pathname = usePathname();
  const [showMenu, setshowMenu] = React.useState<boolean>(false);
  const [closeLateralNav, setCloseLateralNav] = React.useState<boolean>(false);
  const openCloseMenu = () => {
    setshowMenu(!showMenu);
  };

  return (
    //NO CONNECTED
    account === undefined ? (
      <nav className="bg-opwhite flex justify-between items-center w-full h-fit py-[10px] px-[20px] drop-shadow-md top-0 left-0 sticky">
        <Link href={'/'}>
          <div className="flex md:hidden">
            <OPPurple width={40} height={36.6} />
          </div>
        </Link>
        <Link href={'/'}>
          <div className="hidden md:flex">
            <OPPurple width={50} height={46.6} />
          </div>
        </Link>
        <div>
          <Button text="connect" action={connect('polkadot-js')} />
        </div>
      </nav>
    ) : (
      //CONNECTED
      <nav
        className={
          closeLateralNav
            ? 'bg-opwhite flex flex-col md:flex-row w-full md:w-1/12 lg:w-1/12 h-fit md:h-screen py-[10px] px-[20px] md:px-[40px] md:py-[20px] drop-shadow-md top-0 left-0 sticky'
            : 'bg-opwhite flex flex-col md:flex-row w-full md:w-3/12 lg:w-2/12 h-fit md:h-screen py-[10px] px-[20px] md:px-[40px] md:py-[20px] drop-shadow-md top-0 left-0 sticky'
        }
      >
        <div className="w-full flex md:flex-col justify-between items-center">
          <div className="flex md:hidden">
            <Link href={'/'}>
              <OPPurple width={40} height={36.6} />
            </Link>
          </div>
          <div className="hidden md:flex">
            <Link href={'/'}>
              <OPPurple width={50} height={46.6} />
            </Link>
          </div>
          {closeLateralNav ? (
            <div className="hidden md:flex md:flex-col gap-[10px]">
              <Link href="/contracts">
                {pathname === '/contracts' ? (
                  <Button type="active" text="" icon="contract" />
                ) : (
                  <Button type="text" text="" icon="contract" />
                )}
              </Link>
              <Link href="/claim">
                {pathname === '/claim' ? (
                  <Button type="active" text="" icon="claim" />
                ) : (
                  <Button type="text" text="" icon="claim" />
                )}
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex md:flex-col gap-[10px]">
              <Link href="/contracts">
                {pathname === '/contracts' ? (
                  <Button type="active" text="my contracts" icon="" />
                ) : (
                  <Button type="outlined" text="my contracts" icon="" />
                )}
              </Link>
              <Link href="/claim">
                {pathname === '/claim' ? (
                  <Button type="active" text="claim" icon="" />
                ) : (
                  <Button type="outlined" text="claim" icon="" />
                )}
              </Link>
            </div>
          )}
          {closeLateralNav ? (
            <div className="hidden md:flex">
              <BsFillArrowRightCircleFill
                className="w-5 h-5 text-oppurple cursor-pointer"
                onClick={() => {
                  setCloseLateralNav(false);
                }}
              />
            </div>
          ) : (
            <div className="hidden md:flex">
              <BsFillArrowLeftCircleFill
                className="w-5 h-5 text-oppurple cursor-pointer"
                onClick={() => {
                  setCloseLateralNav(true);
                }}
              />
            </div>
          )}

          <div className="flex md:hidden">
            <Button type="active" text="" icon="menu" action={openCloseMenu} />
          </div>
        </div>
        {showMenu && (
          <div className="w-full h-[91vh] flex flex-col justify-around">
            <WalletManager />
            <div className="flex flex-col gap-[20px]">
              <Link href="/contracts" onClick={openCloseMenu}>
                {pathname === '/contracts' ? (
                  <Button type="active" text="my contracts" icon="" />
                ) : (
                  <Button type="outlined" text="my contracts" icon="" />
                )}
              </Link>
              <Link href="/claim" onClick={openCloseMenu}>
                {pathname === '/claim' ? (
                  <Button type="active" text="claim" icon="" />
                ) : (
                  <Button type="outlined" text="claim" icon="" />
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    )
  );
};

export default Index;
