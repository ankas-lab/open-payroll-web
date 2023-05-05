import React from "react";
import Nav from "../components/nav";
import Text from "../components/generals/text";
import Button from "../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

export default function Contract() {
  return (
    <main className={`w-screen flex ${archivo.className}`}>
      <Nav />
      <div className="w-8/12 min-h-screen mx-auto flex flex-col gap-[40px] mt-[100px]">
        <div>
          <div className="flex justify-between items-center">
            <Text type="h2" text="Contract name" />
            <div className="flex gap-2">
              <Button type="active" text="add funds" icon="" />
              <Button type="outlined" text="menu" icon="" />
            </div>
          </div>
          <div className="w-[600px] flex items-center">
            <Text type="overline" text="address" />
            <Button type="text" text="copy icon" icon="" />
          </div>
        </div>
        <table>
          <tr className="flex gap-[50px] text-left">
            <th className="w-[100px]">
              <Text type="overline" text="periodicity" />
            </th>
            <th className="w-[120px]">
              <Text type="overline" text="next pay in (days)" />
            </th>
            <th className="w-[100px]">
              <Text type="overline" text="beneficiaries" />
            </th>
            <th className="w-[100px]">
              <Text type="overline" text="base payment" />
            </th>
            <th className="w-[150px]">
              <Text type="overline" text="funds in contract" />
            </th>
            <th className="w-[150px]">
              <Text type="overline" text="total funds needed" />
            </th>
          </tr>
          <tr className="flex gap-[50px] items-center">
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[120px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[150px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[150px]">
              <Text type="" text="state" />
            </td>
          </tr>
        </table>

        <div>
          <Text type="h4" text="Beneficiaries" />
          <table className="mt-[10px]">
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
