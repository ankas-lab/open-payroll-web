import React, { useEffect, useRef, useState } from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInkathon } from "@scio-labs/use-inkathon";
import { CiMenuKebab } from "react-icons/ci";
const archivo = Archivo({ subsets: ["latin"] });

export default function Contract() {
  // Security
  const router = useRouter();
  const { isConnected, disconnect, activeAccount } = useInkathon();
  useEffect(() => {
    isConnected === false && router.push("/");
  }, [isConnected]);

  // Show menu
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(!showMenu);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] mt-[50px] md:mt-[100px]">
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="flex flex-col">
            <Text type="h2" text="Contract name" />
            <div className="flex items-center">
              <Text type="overline" text="address" />
              <Button type="text" text="copy icon" icon="" />
            </div>
          </div>
          <div className="flex gap-2 ml-auto mt-0 md:mt-4 relative">
            <div>
              <Button type="active" text="add funds" icon="" />
            </div>
            <div
              ref={menuRef}
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
            >
              {showMenu && (
                <div className="absolute right-0 pt-[10px] py-[5px] px-[5px] bg-opwhite border-2 border-oppurple rounded-[5px] flex flex-col gap-[16px] w-[300px]">
                  <Link
                    className={`hover:bg-oppurple hover:text-opwhite rounded-[3px] p-2 text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}
                    href="/edit"
                  >
                    <Text text="Edit" type="" />
                  </Link>
                </div>
              )}
              <div
                className={`text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[14px] px-[13px] bg-opwhite text-[14px] uppercase w-full justify-center `}
              >
                <CiMenuKebab />
              </div>
            </div>
          </div>
        </div>
        {/* CONTRACT INFO */}
        <div className="mt-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto gap-[20px]">
          <div className="capitalize">
            <Text type="overline" text="periodicity" />
            <Text type="" text="periodicity" />
          </div>
          <div className="capitalize">
            <Text type="overline" text="next pay in (days)" />
            <Text type="" text="periodicity" />
          </div>
          <div className="capitalize">
            <Text type="overline" text="beneficiaries" />
            <Text type="" text="periodicity" />
          </div>
          <div className="capitalize">
            <Text type="overline" text="base payment" />
            <Text type="" text="periodicity" />
          </div>
          <div className="capitalize">
            <Text type="overline" text="funds in contract" />
            <Text type="" text="periodicity" />
          </div>
          <div className="capitalize">
            <Text type="overline" text="total funds needed" />
            <Text type="" text="periodicity" />
          </div>
        </div>
        {/* BENEFICIARIES TABLE */}
        <div className="overflow-x-auto">
          <Text type="h4" text="Beneficiaries" />
          <table className="mt-[30px]">
            <tr className="flex gap-[50px] text-left px-2">
              <th className="w-[150px]">
                <Text type="overline" text="name" />
              </th>
              <th className="w-[150px]">
                <Text type="overline" text="address" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="multiplier 1" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="multiplier 2" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="final pay" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="total to claim" />
              </th>
              <th className="w-[100px]">
                <Text type="overline" text="last claim" />
              </th>
            </tr>
            <tr className="flex gap-[50px] items-center h-11 px-2">
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
            </tr>
            <tr className="flex gap-[50px] items-center h-11 px-2 bg-[#ECECEC]">
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[150px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
              <td className="w-[100px]">
                <Text type="" text="state" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
}
