import React, { useState } from "react";
import { useWallet } from "useink";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

const WalletManager = () => {
  const { account, accounts, setAccount, connect, disconnect } = useWallet();
  const [show, setShow] = useState<boolean>(false);
  const handleAccount = (account: any) => {
    setAccount(account);
    setShow(!show);
  };
  return (
    <div className="h-[50px] md:h-[100px] flex">
      <div className="pl-4 pr-2 py-3 border-oppurple border-2 rounded-[5px] flex ml-auto mt-6 w-fit h-fit bg-[#FFFFFF] z-[100]">
        <div className="flex flex-col">
          <p className={show ? "mb-[10px]" : ""}>
            {account?.name} {account?.address}
          </p>

          {show && (
            <div className="flex flex-col gap-[10px]">
              {accounts?.map((a) => (
                <button
                  className="rounded hover:bg-opwhite p-1.5 text-left"
                  onClick={() => handleAccount(a)}
                >
                  {a?.name} {a?.address}
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
        <div
          className="cursor-pointer px-4 mt-1.5"
          onClick={() => setShow(!show)}
        >
          {show ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
    </div>
  );
};

export default WalletManager;
/*
{account &&
  accounts !== undefined &&
  accounts.map((a) => (
    <button onClick={() => setAccount(a)} disabled={account === a}>
      {a.name}
    </button>
  ))}
  */
