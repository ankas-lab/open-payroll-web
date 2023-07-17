import React from 'react';
import { Archivo, Podkova } from 'next/font/google';
import { MdAddCircle, MdCancel, MdDelete, MdMenu, MdOutlinePauseCircleFilled } from 'react-icons/md';
import { IoIosAlert, IoIosCopy, IoMdHand } from 'react-icons/io';
import { CiMenuKebab } from 'react-icons/ci';
import { AiFillCheckCircle, AiFillEdit, AiOutlineLoading } from 'react-icons/ai';
import { IoDocument } from 'react-icons/io5';
const archivo = Archivo({ subsets: ['latin'] });
const podkova = Podkova({ subsets: ['latin'] });

interface ButtonProps {
  type?:
    | 'active'
    | 'disabled'
    | 'outlined'
    | 'text'
    | 'danger'
    | 'text danger'
    | 'text disabled'
    | 'disabled outlined'
    | undefined;
  text?: string;
  icon?:
    | 'delete'
    | 'add'
    | 'menu'
    | 'copy'
    | 'alert'
    | 'kebab'
    | 'check'
    | 'edit'
    | 'pause'
    | 'cancel'
    | 'contract'
    | 'claim'
    | 'loading'
    | undefined;
  action?: any | undefined;
}

interface IconProps {
  icon?: string | undefined;
}

const Icon = ({ icon }: { icon: string | undefined }) => {
  if (icon === 'delete') return <MdDelete className="w-5 h-5" />;
  if (icon === 'add') return <MdAddCircle className="w-5 h-5" />;
  if (icon === 'menu') return <MdMenu className="w-5 h-5" />;
  if (icon === 'copy') return <IoIosCopy className="w-5 h-5" />;
  if (icon === 'alert') return <IoIosAlert className="w-5 h-5" />;
  if (icon === 'kebab') return <CiMenuKebab className="w-5 h-5" />;
  if (icon === 'check') return <AiFillCheckCircle className="w-5 h-5" />;
  if (icon === 'edit') return <AiFillEdit className="w-5 h-5" />;
  if (icon === 'pause') return <MdOutlinePauseCircleFilled className="w-5 h-5" />;
  if (icon === 'cancel') return <MdCancel className="w-5 h-5" />;
  if (icon === 'contract') return <IoDocument className="w-5 h-5" />;
  if (icon === 'claim') return <IoMdHand className="w-5 h-5" />;
  if (icon === 'loading') return <AiOutlineLoading className="w-5 h-5 animate-spin" />;
  return null;
};

const index = ({ type, text, icon, action }: ButtonProps) => {
  return type === 'active' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className} hover:bg-[#39047d] transition duration-200 hover:shadow`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'disabled' ? (
    <button
      type="button"
      disabled
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opgray text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'outlined' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center border-oppurple border-2 flex gap-[10px] rounded-[5px] py-[10px] px-[13px] bg-opwhite text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'text' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center  flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-oppurple font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'danger' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-opdanger text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'text danger' ? (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center  flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opdanger font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'text disabled' ? (
    <button
      type="button"
      onClick={action}
      disabled
      className={`items-center text-center border-2 border-opgray flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opgray font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : type === 'disabled outlined' ? (
    <button
      type="button"
      onClick={action}
      disabled
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[10px] px-[10px] text-[14px] uppercase w-full justify-center text-opgray font-normal tracking-[1.25px] ${archivo.className}`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  ) : (
    <button
      type="button"
      onClick={action}
      className={`items-center text-center flex gap-[10px] rounded-[5px] py-[12px] px-[15px] bg-oppurple text-[14px] uppercase w-full justify-center text-opwhite font-normal tracking-[1.25px] ${archivo.className} hover:bg-[#39047d] transition duration-200 hover:shadow`}
    >
      {text}
      <Icon icon={icon} />
    </button>
  );
};

export default index;
