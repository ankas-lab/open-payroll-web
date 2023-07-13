import React, { useState } from 'react';
import { useWallet, useInstalledWallets } from 'useink';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Archivo } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });
import Text from '../../components/generals/text';

const Index = () => {
  const { account, accounts, isConnected, setAccount, connect, disconnect } = useWallet();
  const wallets = useInstalledWallets();
  const [showWallets, setShowWallets] = useState(false);
  const [show, setShow] = useState<boolean>(false);

  const handleAccount = (account: any) => {
    setAccount(account);
    setShow(!show);
  };

  if (isConnected)
    return (
      <div className="flex absolute w-full md:w-fit">
        <div
          className={
            show
              ? 'pl-4 pr-2 py-3 border-oppurple border-2 rounded-[5px] flex ml-auto mt-6 w-full md:w-fit h-fit bg-[#FFFFFF] justify-between md:justify-normal z-50'
              : 'pl-4 items-center pr-2 py-3 border-oppurple border-2 rounded-[5px] flex ml-auto mt-6 w-full md:w-fit h-fit bg-[#FFFFFF] justify-between md:justify-normal z-50'
          }
        >
          <div className="flex flex-col w-full">
            <p
              className={
                show
                  ? `text-[14px] uppercase p-4 w-full cursor-pointer text-oppurple font-normal tracking-[1.25px] rounded ${archivo.className} hover:bg-oppurple hover:text-opwhite transition duration-200`
                  : `text-[14px] uppercase w-full cursor-pointer text-oppurple font-normal tracking-[1.25px] rounded ${archivo.className} hover:bg-oppurple hover:text-opwhite transition duration-200`
              }
            >
              {account?.name} ({account?.address.slice(0, 5)}...
              {account?.address.slice(account?.address.length - 5, account?.address.length)})
            </p>
            {show && (
              <div className="flex flex-col gap-[10px] mt-[10px]">
                <div className="border-oppurple border w-full"></div>
                {accounts?.map((a) => (
                  <div
                    key={a}
                    className={`text-[14px] uppercase w-full p-4 cursor-pointer text-oppurple font-normal tracking-[1.25px] rounded ${archivo.className} hover:bg-oppurple hover:text-opwhite transition duration-200`}
                    onClick={() => handleAccount(a)}
                  >
                    {a?.name} ({account?.address.slice(0, 5)}...
                    {a?.address.slice(a?.address.length - 5, a?.address.length)})
                  </div>
                ))}
                <button
                  className={`items-center text-center bg-oppurple p-1.5 flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
                  onClick={disconnect}
                >
                  disconnect
                </button>
              </div>
            )}
          </div>
          <div className="cursor-pointer px-4 mt-1.5" onClick={() => setShow(!show)}>
            {show ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div
        className={
          showWallets
            ? 'pl-4 pr-2 py-3 border-oppurple border-2 rounded-[5px] flex ml-auto mt-6 w-full md:w-fit h-fit bg-[#FFFFFF] justify-between md:justify-normal z-50'
            : 'cursor-pointer pl-4 pr-2 py-3 border-oppurple border-2 rounded-[5px] flex ml-auto mt-6 w-full md:w-fit h-fit bg-oppurple text-opwhite justify-between md:justify-normal z-50'
        }
      >
        <div className="flex w-full">
          {showWallets ? (
            <div className="flex w-full">
              <ul className="flex flex-col">
                {wallets.map((w: any) => (
                  <li key={w.title}>
                    <p
                      onClick={() => connect(w.extensionName)}
                      className={`text-[14px] uppercase w-full p-4 cursor-pointer text-oppurple font-normal tracking-[1.25px] rounded ${archivo.className} hover:bg-oppurple hover:text-opwhite transition duration-200`}
                    >
                      Connect to {w.title}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="p-2 cursor-pointer">
                <FaAngleUp onClick={() => setShowWallets(false)} />
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center" onClick={() => setShowWallets(true)}>
              <p
                className={`items-center text-center bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
              >
                connect
              </p>
              <div className="p-2 cursor-pointer">
                <FaAngleDown />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /*
  const { account, accounts, setAccount, connect, disconnect } = useWallet();
  const [show, setShow] = useState<boolean>(false);

  const handleAccount = (account: any) => {
    setAccount(account);
    setShow(!show);
  };

  const wallets = useInstalledWallets();

  return (
    <div className="flex absolute w-full md:w-fit">
      <div className="pl-4 pr-2 py-3 border-oppurple border-2 rounded-[5px] flex ml-auto mt-6 w-full md:w-fit h-fit bg-[#FFFFFF] justify-between md:justify-normal z-50">
        <div className="flex flex-col w-full">
          <p className={show ? 'mb-[10px]' : ''}>
            {account?.name} ({account?.address.slice(0, 5)}...
            {account?.address.slice(account?.address.length - 5, account?.address.length)})
          </p>
          {show && (
            <div className="flex flex-col gap-[10px] border-t-2 border-t-oppurple">
              {accounts?.map((a) => (
                <button key={a} className="rounded hover:bg-opwhite p-1.5 text-left" onClick={() => handleAccount(a)}>
                  {a?.name} ({account?.address.slice(0, 5)}...
                  {a?.address.slice(a?.address.length - 5, a?.address.length)})
                </button>
              ))}
              <button
                className={`items-center text-center bg-oppurple p-1.5 flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
                onClick={disconnect}
              >
                disconnect
              </button>
            </div>
          )}
        </div>
        <div className="cursor-pointer px-4 mt-1.5" onClick={() => setShow(!show)}>
          {show ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
    </div>
  );
  */
};

export default Index;
