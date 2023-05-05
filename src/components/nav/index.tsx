import React, { useEffect, useState } from "react";
import { OPPurple } from "../../assets/logo/OPPurple.jsx";
import Button from "../generals/button";
import { useRouter } from "next/router";

import { useInkathon } from "@scio-labs/use-inkathon";

const index = () => {
  const { connect, disconnect, activeAccount } = useInkathon();

  const router = useRouter();

  const [truncateActiveAccount, setTruncateActiveAccount] =
    React.useState<string>("");

  useEffect(() => {
    activeAccount
      ? console.log(activeAccount)
      : console.log("cuenta desactivada");
    activeAccount !== undefined &&
      setTruncateActiveAccount(
        activeAccount.address.toString().slice(0, 4) +
          "..." +
          activeAccount.address.toString().slice(-4)
      );
    activeAccount !== undefined && router.push("/contracts");
  }, [activeAccount]);

  useEffect(() => {
    connect !== undefined ? router.push("/contracts") : router.push("/");
  }, [connect]);

  return (
    //DESKTOP NO CONNECTED
    !activeAccount ? (
      <nav className="bg-opwhite flex justify-between w-full px-[40px] py-[20px] drop-shadow-md">
        <OPPurple width={50} height={46.6} />

        <Button
          type="active"
          text="connect wallet"
          icon=""
          action={() => connect?.(undefined, undefined)}
        />
      </nav>
    ) : (
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
          <Button
            type="active"
            text={truncateActiveAccount}
            icon=""
            action={disconnect}
          />
        </div>
      </nav>
    )
  );
  //DESKTOP CONNECTED
  /*
    
    */
};

export default index;

/*



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


*/
