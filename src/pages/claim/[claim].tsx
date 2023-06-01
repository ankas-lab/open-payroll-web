import React from "react";
import Nav from "../../components/nav";
import Text from "../../components/generals/text";
import Button from "../../components/generals/button";
import { Archivo, Podkova } from "next/font/google";
import WalletManager from "@/components/walletManager";
const archivo = Archivo({ subsets: ["latin"] });
const podkova = Podkova({ subsets: ["latin"] });

export default function Claim() {
  return (
    <main className={`flex flex-col md:flex-row ${archivo.className}`}>
      <Nav />
      <div className="w-10/12 md:w-8/12 overflow-x-scroll min-h-screen mx-auto flex flex-col gap-[20px] md:gap-[40px]">
        <WalletManager />
        <Text type="h2" text="Claiming in My contract" />
        <div className="">
          <Text type="h4" text="Yeah! You have funds to claim here!" />
          <Text
            type=""
            text="contract You can claim everything or choose when you want to claim, you can also add a name to the contract to easily identify it."
          />
        </div>
        <div className="flex">
          <div className="w-8/12 flex flex-col gap-[20px]">
            <Text type="h4" text="Contract data" />
            <form className="flex gap-[20px] items-center">
              <label
                className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}
              >
                Contract name
              </label>
              <input
                id="GET-name"
                type="text"
                name="name"
                placeholder="Contract name"
                className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
              />
            </form>
            <div className="grid grid-cols-4 gap-[20px]">
              <div className="">
                <Text type="h6" text="Base pay" />
                <Text type="" text="Base pay" />
              </div>
              {/* .map whit multipliers */}
              <div className="">
                <Text type="h6" text="Multiplier 1" />
                <Text type="" text="Multiplier 1" />
              </div>
              <div className="">
                <Text type="h6" text="Multiplier 2" />
                <Text type="" text="Multiplier 2" />
              </div>
              <div className="">
                <Text type="h6" text="Final pay" />
                <Text type="" text="Final pay" />
              </div>
              <div className="">
                <Text type="h6" text="Last claim" />
                <Text type="" text="Last claim" />
              </div>
              <div className="">
                <Text type="h6" text="Last mount claimed" />
                <Text type="" text="Last mount claimed" />
              </div>
              <div className="">
                <Text type="h6" text="In contract" />
                <Text type="" text="In contract" />
              </div>
            </div>
          </div>
          <div className="border border-oppurple rounded-lg mx-5"></div>
          <div className="w-4/12 flex flex-col gap-[10px]">
            <Text type="h6" text="Claim" />

            <form className="flex flex-col gap-[20px]">
              <div className="flex gap-[20px] items-center">
                <input
                  id="GET-name"
                  type="text"
                  name="name"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
                <label>of XXX POL</label>
              </div>
              {
                /*<Button type="active" text="claim" />*/
                <>
                  <Button type="disabled" text="claim" />
                  <Text
                    type=""
                    text="You still can't claim your payment, try again in X days. + ICONO"
                  />
                </>
              }
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
