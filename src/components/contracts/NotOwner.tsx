import React, { useEffect, useState, useRef, useContext } from 'react';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { useContract, useWallet } from 'useink';
import Link from 'next/link';

const NotOwner = () => {
  return (
    <div className="flex flex-col gap-[40px]">
      <Text type="h1" text="You are not the contract owner" />
      <Text
        type=""
        text="Go back to your contracts list and choose one of your own, or change the account you are using to access the contract!"
      />
      <div className="md:w-4/12">
        <Link href={'/contracs'}>
          <Button type="active" text="go to my contracts" />
        </Link>
      </div>
    </div>
  );
};

export default NotOwner;
