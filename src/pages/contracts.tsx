import React from "react";
import Nav from "../components/nav";
import Text from "../components/generals/text";
import Button from "../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

export default function Contracts() {
  return (
    <main className={`w-screen flex ${archivo.className}`}>
      <Nav />
      <div className="w-8/12 min-h-screen mx-auto flex flex-col gap-[40px] mt-[100px]">
        <div className="w-[1200px] flex justify-between items-center">
          <Text type="h2" text="My contracts" />
          <Button type="active" text="create new contract" icon="" />
        </div>
        <div className="w-[600px]">
          <Text
            type=""
            text="These are your contracts, you can select one to inspect what's inside, edit them or add funds to them. If you don't have any contract, create one!"
          />
        </div>
        <table className="mt-[50px]">
          <tr className="flex gap-[50px] text-left">
            <th className="w-[150px]">
              <Text type="overline" text="contract name" />
            </th>
            <th className="w-[100px]">
              <Text type="overline" text="beneficiaries" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="periodicity" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="funds in contract" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="funds needed" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="next pay in (day)" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="network" />
            </th>
            <th className="w-[80px]">
              <Text type="overline" text="state" />
            </th>
          </tr>
          <tr className="flex gap-[50px] items-center">
            <td className="w-[150px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Button type="text" text="state" icon="" />
            </td>
            <td className="w-[100px]">ALERT</td>
          </tr>
          <tr className="flex gap-[50px] items-center bg-[#ECECEC]">
            <td className="w-[150px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[80px]">
              <Text type="" text="state" />
            </td>
            <td className="w-[100px]">
              <Button type="text" text="state" icon="" />
            </td>
            <td className="w-[100px]">ALERT</td>
          </tr>
        </table>
      </div>
    </main>
  );
}
