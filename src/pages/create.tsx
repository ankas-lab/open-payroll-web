import React from "react";
import Nav from "../components/nav";
import Text from "../components/generals/text";
import Button from "../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
const podkova = Podkova({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

export default function Create() {
  return (
    <main className={`w-screen flex ${archivo.className}`}>
      {/*<Nav />*/}
      <div className="w-8/12 min-h-screen mx-auto flex flex-col gap-[40px] mt-[100px]">
        <div>
          <div className="flex justify-between items-center">
            <Text type="h2" text="Confirm the contract" />
            <Text type="h6" text="final" />
          </div>
          <div className="w-[600px]">
            <Text
              type=""
              text="Make sure that all the data you entered is correct to finish."
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-8/12">
            <form>
              <Text type="h4" text="Contract" />
              <div className="grid grid-cols-2 gap-[20px]">
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
              </div>
              <Text type="h4" text="Multipliers" />
              <div className="grid grid-cols-2 gap-[20px]">
                <input
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
                <input
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
                <input
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
                <input
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
                <input
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
              <Text type="h4" text="Beneficiaries" />
              <div className="flex flex-col gap-[10px]">
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
                    <Text type="overline" text="total multipliers" />
                  </div>
                  <div className="w-2/12">
                    <Text type="overline" text="final pay" />
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
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
                      <Text type="" text="2.30" />
                    </div>
                    <div className="w-2/12">
                      <Text type="" text="000 DOT" />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-2 rounded my-[10px] w-full"></hr>
              <div className="flex justify-between px-5">
                <Text type="h4" text="Total pay" />
                <Text type="h4" text="000 DOT" />
              </div>
            </form>
          </div>
          <div className="h-full border rounded-md border-oppurple mx-5"></div>
          <div className="w-3/12">
            <Text type="h4" text="Funds" />
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <Text type="h6" text="Minimum funds necesaries" />
                <Text type="" text="000 DOT" />

                <Button type="outlined" text="add funds" icon="+" action />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <Button type="outlined" text="back" icon="+" action />
          <Button type="active" text="next" icon="+" action />
        </div>
      </div>
    </main>
  );
}

{
  /*CREATE CONTRACT*/
}
{
  /*
        <div>
          <div className="w-[1200px] flex justify-between items-center">
            <Text type="h2" text="Create contract" />
            <Text type="h6" text="1/4" />
          </div>
          <div className="w-[600px]">
            <Text
              type=""
              text="We are going to create the contract with which you will pay your beneficiaries."
            />
          </div>
        </div>
        <form className="w-4/12 flex flex-col gap-[20px]">
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
       */
}
{
  /*CREATE MULTIPLIERS*/
}
{
  /*
        <div>
          <div className="w-[1200px] flex justify-between items-center">
            <Text type="h2" text="Create multipliers" />
            <Text type="h6" text="2/4" />
          </div>
          <div className="w-[600px]">
            <Text
              type=""
              text={`Now it's time to create the base salary multipliers, for example "seniority", "antiquity", etc. Then you can assign a number for each type of multipliers.`}
            />
          </div>
        </div>
        <form className="w-4/12 ">
          <div className="flex flex-col gap-[20px]">
            <label
              className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}
            >
              Multipliers
            </label>
            <div className="flex gap-[10px]">
              <input
                id="GET-name"
                type="text"
                name="name"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
              <Button type="text" text="d i" icon="" />
            </div>
            <div className="flex gap-[10px]">
              <input
                id="GET-name"
                type="text"
                name="name"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
              <Button type="text" text="d i" icon="" />
            </div>
          </div>
        </form>
        <div>
          <Button type="outlined" text="add other" icon="+" />
        </div>
        */
}
{
  /*CREATE BENEFICIARIES*/
}
{
  /*
        <div>
          <div className="w-[1200px] flex justify-between items-center">
            <Text type="h2" text="Create beneficiaries" />
            <Text type="h6" text="2/4" />
          </div>
          <div className="w-[600px]">
            <Text
              type=""
              text="Now it's time for the beneficiaries, add their wallets and corresponding multipliers."
            />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <Text type="h6" text="Base payment" />
          <Text type="h6" text="000 DOT" />
        </div>
        <div className="flex flex-col gap-[10px]">
 
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
              <Text type="overline" text="total multipliers" />
            </div>
            <div className="w-2/12">
              <Text type="overline" text="final pay" />
            </div>
            <div className="w-2/12"></div>
          </div>
          <form className="flex flex-col gap-[5px]">

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
                <Text type="" text="2.30" />
              </div>
              <div className="w-2/12">
                <Text type="" text="000 DOT" />
              </div>
              <div className="w-2/12">
                <Button type="text" text="DI" icon="" />
              </div>
            </div>
          </form>
          <hr className="border-2 rounded my-[10px] w-10/12 "></hr>
          <div className="flex w-9/12 justify-between px-1">
            <Text type="h4" text="Total pay" />
            <Text type="h4" text="000 DOT" />
          </div>
          <div>
            <Button type="outlined" text="add other" icon="+" />
          </div>
        </div>
      */
}
{
  /*
        <div>
          <div className="w-[1200px] flex justify-between items-center">
            <Text type="h2" text="Add funds (optional)" />
            <Text type="h6" text="4/4" />
          </div>
          <div className="w-[600px]">
            <Text
              type=""
              text={`Add funds to your contract, you can do it now or later. Remember that if your contract does not have sufficient funds you will not be able to pay your beneficiaries.`}
            />
          </div>
        </div>
        <div>
          <Text type="h4" text="My contract" />
          <Button type="text" text="copy contract address" icon="+" />
        </div>
        <div className="flex gap-[50px]">
          <div className="flex flex-col gap-[10px]">
            <Text type="h6" text="In contract" />
            <Text type="" text="000 DOT" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text type="h6" text="Total required" />
            <Text type="" text="000 DOT" />
          </div>
        </div>
        <div>
          <Button type="active" text="add funds" icon="+" />
        </div>
    */
}
