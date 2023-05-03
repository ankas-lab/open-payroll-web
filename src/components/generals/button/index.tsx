import React from "react";
import { Archivo, Podkova } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });
const podkova = Podkova({ subsets: ["latin"] });

const index = ({
  type,
  text,
  icon,
}: {
  type: string;
  text: string;
  icon: string;
}) => {
  return type === "active" ? (
    <button
      className={`flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
    </button>
  ) : type === "disabled" ? (
    <button
      disabled
      className={`flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opgray text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
    </button>
  ) : type === "outlined" ? (
    <button
      className={`border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[10px] px-[13px] bg-opwhite text-[14px] uppercase text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
    </button>
  ) : type === "text" ? (
    <button
      className={` flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opwhite text-[14px] uppercase text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
    </button>
  ) : type === "danger" ? (
    <button
      className={`flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opdanger text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
    </button>
  ) : (
    <button
      className={`flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
    </button>
  );
};

export default index;
