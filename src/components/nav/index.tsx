import React, { useEffect, useState } from "react";
import { OPPurple } from "../../assets/logo/OPPurple.jsx";
import Button from "../generals/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useInkathon } from "@scio-labs/use-inkathon";
import Link from "next/link.js";

const index = () => {
  const { connect, disconnect, activeAccount } = useInkathon();

  const pathname = usePathname();

  const router = useRouter();

  const [truncateActiveAccount, setTruncateActiveAccount] =
    React.useState<string>("");
  const [showMenu, setshowMenu] = React.useState<boolean>(false);

  const openCloseMenu = () => {
    setshowMenu(!showMenu);
  };

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
  }, [activeAccount]);

  return (
    //NO CONNECTED
    !activeAccount ? (
      <nav className="bg-opwhite flex justify-between items-center w-full h-fit py-[10px] px-[20px] drop-shadow-md">
        <div className="flex md:hidden">
          <OPPurple width={40} height={36.6} />
        </div>
        <div className="hidden md:flex">
          <OPPurple width={50} height={46.6} />
        </div>
        <div>
          <Button
            type="active"
            text="connect wallet"
            icon=""
            action={() => connect?.(undefined, undefined)}
          />
        </div>
      </nav>
    ) : (
      //CONNECTED
      <nav className="bg-opwhite flex flex-col md:flex-row w-full md:w-3/12 lg:w-2/12 h-fit md:h-screen py-[10px] px-[20px] md:px-[40px] md:py-[20px] drop-shadow-md">
        <div className="w-full flex md:flex-col justify-between items-center">
          <div className="flex md:hidden">
            <OPPurple width={40} height={36.6} />
          </div>
          <div className="hidden md:flex">
            <OPPurple width={50} height={46.6} />
          </div>
          <div className="hidden md:flex md:flex-col gap-[10px]">
            <Link href="/contracts">
              {pathname === "/contracts" ? (
                <Button type="active" text="my contracts" icon="" />
              ) : (
                <Button type="outlined" text="my contracts" icon="" />
              )}
            </Link>
            <Link href="/claim">
              {pathname === "/claim" ? (
                <Button type="active" text="claim" icon="" />
              ) : (
                <Button type="outlined" text="claim" icon="" />
              )}
            </Link>
          </div>
          <div className="hidden md:flex">
            <Button
              type="active"
              text={truncateActiveAccount}
              icon=""
              action={disconnect}
            />
          </div>
          <div className="flex md:hidden">
            <Button type="active" text="" icon="menu" action={openCloseMenu} />
          </div>
        </div>
        {showMenu && (
          <div className="w-full h-[91vh] flex flex-col justify-between">
            <div></div>
            <div className="flex flex-col gap-[20px]">
              <Link href="/contracts" onClick={openCloseMenu}>
                {pathname === "/contracts" ? (
                  <Button type="active" text="my contracts" icon="" />
                ) : (
                  <Button type="outlined" text="my contracts" icon="" />
                )}
              </Link>
              <Link href="/claim" onClick={openCloseMenu}>
                {pathname === "/claim" ? (
                  <Button type="active" text="claim" icon="" />
                ) : (
                  <Button type="outlined" text="claim" icon="" />
                )}
              </Link>
            </div>
            <div className="flex">
              <Button
                type="active"
                text={truncateActiveAccount}
                icon=""
                action={disconnect}
              />
            </div>
          </div>
        )}
      </nav>
    )
  );
};

export default index;
