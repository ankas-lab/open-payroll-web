import React from "react";
import { Archivo, Podkova } from "next/font/google";
import { type } from "os";
const archivo = Archivo({ subsets: ["latin"] });
const podkova = Podkova({ subsets: ["latin"] });

interface ButtonProps {
  type?: string;
  text?: string;
  icon?: string | undefined;
  action?: any | undefined;
}

const index = ({ type, text, icon, action }: ButtonProps) => {
  return type === "active" ? (
    <button
      onClick={action}
      className={`text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon}
    </button>
  ) : type === "disabled" ? (
    <button
      disabled
      className={`text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opgray text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon}
    </button>
  ) : type === "outlined" ? (
    <button
      onClick={action}
      className={`text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[10px] px-[13px] bg-opwhite text-[14px] uppercase text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon}
    </button>
  ) : type === "text" ? (
    <button
      onClick={action}
      className={`text-center  flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon}
    </button>
  ) : type === "danger" ? (
    <button
      onClick={action}
      className={`text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opdanger text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon}
    </button>
  ) : (
    <button
      onClick={action}
      className={`text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon}
    </button>
  );
};

export default index;
