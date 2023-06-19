import React from 'react';
import { Archivo, Podkova } from 'next/font/google';
import { MdAddCircle, MdCancel, MdDelete, MdMenu, MdOutlinePauseCircleFilled } from 'react-icons/md';
import { IoIosAlert, IoIosCopy } from 'react-icons/io';
import { CiMenuKebab } from 'react-icons/ci';
import { AiFillCheckCircle, AiFillEdit, AiOutlineLoading } from 'react-icons/ai';
import { TfiHandOpen } from 'react-icons/tfi';
import { FaFileContract } from 'react-icons/fa';
const archivo = Archivo({ subsets: ['latin'] });
const podkova = Podkova({ subsets: ['latin'] });

interface ButtonProps {
  type?: string;
  text?: string;
  icon?: string | undefined;
  action?: any | undefined;
}

const index = ({ type, text, icon, action }: ButtonProps) => {
  return type === 'active' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : type === 'disabled' ? (
    <button
      type="button"
      disabled
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opgray text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : type === 'outlined' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[10px] px-[13px] bg-opwhite text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : type === 'text' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center  flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : type === 'danger' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opdanger text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : type === 'text disabled' ? (
    <button
      type="button"
      onClick={action}
      disabled
      className={`items-center text-center border-2 border-opgray flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opgray font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : type === 'disabled outlined' ? (
    <button
      type="button"
      onClick={action}
      disabled
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opgray font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  ) : (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      {icon === 'delete' && <MdDelete className="w-5 h-5" />}
      {icon === 'add' && <MdAddCircle className="w-5 h-5" />}
      {icon === 'menu' && <MdMenu className="w-5 h-5" />}
      {icon === 'copy' && <IoIosCopy className="w-5 h-5" />}
      {icon === 'alert' && <IoIosAlert className="w-5 h-5" />}
      {icon === 'kebab' && <CiMenuKebab className="w-5 h-5" />}
      {icon === 'check' && <AiFillCheckCircle className="w-5 h-5" />}
      {icon === 'edit' && <AiFillEdit className="w-5 h-5" />}
      {icon === 'pause' && <MdOutlinePauseCircleFilled className="w-5 h-5" />}
      {icon === 'cancel' && <MdCancel className="w-5 h-5" />}
      {icon === 'contract' && <FaFileContract className="w-5 h-5" />}
      {/* FIXME find correct icon to 'claim' */}
      {icon === 'claim' && <TfiHandOpen className="w-5 h-5" />}
      {icon === 'loading' && <AiOutlineLoading className="w-5 h-5 animate-spin" />}
    </button>
  );
};

export default index;
