import React from "react";
import Nav from "../components/nav";
import Text from "../components/generals/text";
import Button from "../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

export default function Edit() {
  return (
    <main className={`w-screen flex ${archivo.className}`}>
      <Nav />
      <div className="w-8/12 min-h-screen mx-auto flex flex-col gap-[40px] mt-[100px]">
        {/*Title + tabs*/}
        <div className="flex flex-col justify-between">
          <Text type="h2" text="Edit contract" />
          <div className="flex gap-[10px]">
            <Button type="active" text="contract" icon="" />
            <Button type="active" text="multipliers" icon="" />
            <Button type="active" text="beneficiaries" icon="" />
          </div>
        </div>
        {/*Contract*/}
        {/*
        <div className="w-8/12">
          <Text type="h4" text="Contract" />
          <Text type="" text="These are the basic data of your contract" />
          <form className="grid grid-cols-2 gap-[20px]">
            <div className="flex flex-col ">
              <label
                className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
              >
                Contract name
              </label>
              <input
                id="GET-name"
                type="text"
                name="name"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label
                className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
              >
                Base pay
              </label>
              <input
                id="GET-name"
                type="number"
                name="name"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label
                className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
              >
                Periodicity
              </label>
              <select
                name="select"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-2"
              >
                <option value="value1">Value 1</option>
                <option value="value2" selected>
                  Value 2
                </option>
                <option value="value3">Value 3</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[10px] ${podkova.className}`}
              >
                Email
              </label>
              <input
                id="GET-name"
                type="email"
                name="name"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
            </div>
          </form>
        </div>
        */}
        {/*Multipliers*/}
        {/*
        <div className="w-10/12 flex flex-col gap-[20px]">
          <div className="w-[600px]">
            <Text type="h4" text="Multipliers" />
            <Text
              type=""
              text="These are the multipliers of your contract, you can create new ones, pause them or delete them.
To eliminate a multiplier it is necessary that it be paused for a period."
            />
          </div>
          
          <div className="flex flex-col gap-[10px]">
            <Text type="h6" text="Active" />
            <form className="flex flex-col">
              <div className="grid grid-cols-2 gap-[40px]">
                <div className="flex gap-[10px]">
                  <input
                    id="GET-name"
                    type="text"
                    name="name"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                  />
                  <Button type="text" text="pause" icon="" />
                </div>
                <div className="flex gap-[10px]">
                  <input
                    id="GET-name"
                    type="text"
                    name="name"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                  />
                  <Button type="text" text="pause" icon="" />
                </div>
              </div>
            </form>
            <div>
              <Button type="outlined" text="add other" icon="" />
            </div>
          </div>
          
          <div className="flex flex-col gap-[10px]">
            <Text type="h6" text="Paused" />
            <form className="flex flex-col">
              <div className="grid grid-cols-2 gap-[40px]">
                <div className="flex gap-[10px]">
                  <input
                    id="GET-name"
                    type="text"
                    name="name"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                  />
                  <Button type="text" text="delete" icon="" />
                </div>
                <div className="flex gap-[10px]">
                  <input
                    id="GET-name"
                    type="text"
                    name="name"
                    className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                  />
                  <Button type="text" text="delete" icon="" />
                </div>
              </div>
            </form>
          </div>
        </div>
        */}
        {/*Beneficiaries*/}
        <div className="w-10/12 flex flex-col gap-[20px]">
          <div className="w-[600px]">
            <Text type="h4" text="Beneficiaries" />
            <Text
              type=""
              text="These are all the beneficiaries that exist in your contract, you can add, delete or edit them."
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            {/* Beneficiarie header row */}
            <div className="flex gap-[20px] text-left w-12/12">
              <div className="w-2/12">
                <Text type="overline" text="name" />
              </div>
              <div className="w-2/12">
                <Text type="overline" text="address" />
              </div>
              <div className="w-2/12">
                <Text type="overline" text="multiplier 1" />
              </div>
              <div className="w-2/12">
                <Text type="overline" text="multiplier 2" />
              </div>
              <div className="w-2/12">
                <Text type="overline" text="final pay" />
              </div>
              <div className="w-2/12"></div>
            </div>
            <form className="flex flex-col gap-[5px]">
              {/* Beneficiarie row */}
              <div className="flex gap-[20px] text-left w-12/12 items-center">
                <div className="w-2/12">
                  <input className="w-full bg-opwhite border-2 rounded-[5px] p-1" />
                </div>
                <div className="w-2/12">
                  <input className="w-full bg-opwhite border-2 rounded-[5px] p-1" />
                </div>
                <div className="w-2/12">
                  <input className="w-full bg-opwhite border-2 rounded-[5px] p-1" />
                </div>
                <div className="w-2/12">
                  <input className="w-full bg-opwhite border-2 rounded-[5px] p-1" />
                </div>
                <div className="w-2/12">
                  <Text type="" text="000 DOT" />
                </div>
                <div className="w-2/12">
                  <Button type="text" text="delete" icon="" />
                </div>
              </div>
            </form>
            <hr className="border-2 rounded my-[10px] w-10/12 "></hr>
            <div className="flex w-9/12 justify-between px-1">
              <Text type="h4" text="Total pay" />
              <Text type="h4" text="000 DOT" />
            </div>
          </div>

          <div>
            <Button type="outlined" text="add other" icon="" />
          </div>
        </div>

        <div>
          <Button type="active" text="confirm update" icon="" />
        </div>
      </div>
    </main>
  );
}
