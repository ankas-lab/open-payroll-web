import React, { useEffect, useState } from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo } from "next/font/google";
import { useRouter } from "next/router";
const archivo = Archivo({ subsets: ["latin"] });
import { useWallet } from "useink";
import WalletManager from "@/components/walletManager";

export default function Claim() {
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    !account && router.push("/");
  }, [account]);

  const [address, setAddress] = useState<string>("");

  const handleFindContract = (address: string) => {
    console.log(address);
  };

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px]">
        <WalletManager />
        <Text type="h2" text="Contracts you can claim" />
        <div className="max-w-[400px] flex flex-col gap-[10px]">
          <Text type="h4" text="Find new contract" />
          <Text
            type=""
            text="Enter the address of the contract to claim your payment"
          />
          <form className="flex flex-col gap-[10px]">
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Contract address"
              className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex">
              {address.length > 0 ? (
                <Button
                  type="active"
                  text="find"
                  icon=""
                  action={() => handleFindContract(address)}
                />
              ) : (
                <Button
                  type="disabled"
                  text="find"
                  icon=""
                  action={() => handleFindContract(address)}
                />
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
                <Text type="overline" text="address" />
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
