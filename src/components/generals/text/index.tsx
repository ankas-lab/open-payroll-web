import React from 'react';
import { Archivo, Podkova } from 'next/font/google';
const archivo = Archivo({ subsets: ['latin'] });
const podkova = Podkova({ subsets: ['latin'] });

const index = ({ type, text }: { type: string; text: string }) => {
  return type === 'h1' ? (
    <p className={`text-[82px] font-normal text-black tracking-[-1.5px] leading-[70px] ${podkova.className}`}>{text}</p>
  ) : type === 'h2' ? (
    <h2 className={`text-[51px] font-normal text-black tracking-[-0.5px] leading-[45px] ${podkova.className}`}>
      {text}
    </h2>
  ) : type === 'h3' ? (
    <h3 className={`text-[41px] font-normal text-black ${podkova.className}`}>{text}</h3>
  ) : type === 'h4' ? (
    <h4 className={`text-[29px] font-normal text-black tracking-[0.25px] ${podkova.className}`}>{text}</h4>
  ) : type === 'h5' ? (
    <h5 className={`text-[20px] font-normal text-black ${podkova.className}`}>{text}</h5>
  ) : type === 'h6' ? (
    <h6 className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}>{text}</h6>
  ) : type === 'overline' ? (
    <p className={`text-[10px] uppercase font-normal text-black tracking-[1.15px] ${archivo.className}`}>{text}</p>
  ) : type === 'caption' ? (
    <p className={`text-[12px] font-normal text-black tracking-[0.5px] ${archivo.className}`}>{text}</p>
  ) : (
    <p className={`text-[14px] font-normal text-black tracking-[0.25px] ${archivo.className}`}>{text}</p>
  );
};

export default index;
