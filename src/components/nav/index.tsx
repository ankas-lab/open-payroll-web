import React, { useState } from "react";
import { OPPurple } from "../../assets/logo/OPPurple.jsx";
import { Archivo, Podkova } from "next/font/google";
import Button from "../generals/button";
const archivo = Archivo({ subsets: ["latin"] });
const podkova = Podkova({ subsets: ["latin"] });

const index = () => {
  const [show, setShow] = React.useState<boolean>(false);
  return (
    /*
    //DESKTOP NO CONNECTED
    <nav className="bg-opwhite flex justify-between w-full px-[40px] py-[20px] drop-shadow-md">
      <OPPurple width={50} height={46.6} />
      <Button type="active" text="connect wallet" icon="" />
      </nav>
      */
    //DESKTOP CONNECTED
    /*
    <nav className="bg-opwhite flex flex-col justify-between w-[330px] h-screen px-[40px] py-[20px] drop-shadow-md">
      <OPPurple width={50} height={46.6} />
      <div className="flex flex-col gap-[10px]">
        <div>
          <Button type="active" text="my contracts" icon="" />
        </div>
        <div>
          <Button type="active" text="claim" icon="" />
        </div>
      </div>
      <div>
        <Button type="active" text="0x00...0000" icon="" />
      </div>
    </nav>
    */
    //MOBILE
    <nav className="bg-opwhite w-full min-h-[60px] px-[20px] py-[10px] drop-shadow-md">
      <div className="flex justify-between">
        <OPPurple width={40} height={38.6} />

        <div onClick={() => setShow(!show)}>
          <Button type="text" text="menu" icon="" />
        </div>
      </div>
      <div className={show ? "h-screen" : "hidden"}></div>
    </nav>
  );
};

export default index;
