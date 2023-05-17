import React from "react";
import { Archivo, Podkova } from "next/font/google";
import {
  MdAddCircle,
  MdDelete,
  MdMenu,
  MdOutlinePauseCircleFilled,
} from "react-icons/md";
import { IoIosAlert, IoIosCopy } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
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
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === "delete" && <MdDelete className="w-5 h-5" />}
      {icon === "add" && <MdAddCircle className="w-5 h-5" />}
      {icon === "menu" && <MdMenu className="w-5 h-5" />}
      {icon === "copy" && <IoIosCopy className="w-5 h-5" />}
      {icon === "alert" && <IoIosAlert className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "loading" && (
        <AiOutlineLoading className="w-5 h-5 animate-spin" />
      )}
    </button>
  ) : type === "disabled" ? (
    <button
      type="button"
      disabled
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opgray text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === "delete" && <MdDelete className="w-5 h-5" />}
      {icon === "add" && <MdAddCircle className="w-5 h-5" />}
      {icon === "menu" && <MdMenu className="w-5 h-5" />}
      {icon === "copy" && <IoIosCopy className="w-5 h-5" />}
      {icon === "alert" && <IoIosAlert className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "pause" && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
    </button>
  ) : type === "outlined" ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[10px] px-[13px] bg-opwhite text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === "delete" && <MdDelete className="w-5 h-5" />}
      {icon === "add" && <MdAddCircle className="w-5 h-5" />}
      {icon === "menu" && <MdMenu className="w-5 h-5" />}
      {icon === "copy" && <IoIosCopy className="w-5 h-5" />}
      {icon === "alert" && <IoIosAlert className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "pause" && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
    </button>
  ) : type === "text" ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center  flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === "delete" && <MdDelete className="w-5 h-5" />}
      {icon === "add" && <MdAddCircle className="w-5 h-5" />}
      {icon === "menu" && <MdMenu className="w-5 h-5" />}
      {icon === "copy" && <IoIosCopy className="w-5 h-5" />}
      {icon === "alert" && <IoIosAlert className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "pause" && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
    </button>
  ) : type === "danger" ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opdanger text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === "delete" && <MdDelete className="w-5 h-5" />}
      {icon === "add" && <MdAddCircle className="w-5 h-5" />}
      {icon === "menu" && <MdMenu className="w-5 h-5" />}
      {icon === "copy" && <IoIosCopy className="w-5 h-5" />}
      {icon === "alert" && <IoIosAlert className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "pause" && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
    </button>
  ) : (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === "delete" && <MdDelete className="w-5 h-5" />}
      {icon === "add" && <MdAddCircle className="w-5 h-5" />}
      {icon === "menu" && <MdMenu className="w-5 h-5" />}
      {icon === "copy" && <IoIosCopy className="w-5 h-5" />}
      {icon === "alert" && <IoIosAlert className="w-5 h-5" />}
      {icon === "kebab" && <CiMenuKebab className="w-5 h-5" />}
      {icon === "pause" && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
    </button>
  );
};

export default index;
