import React, { useEffect, useState, useRef, useContext } from 'react';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { useContract, useWallet } from 'useink';
import Link from 'next/link';

const NotOwner = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <Text type="h1" text="You do not own the contract" />
      <Text
        type=""
        text="Go back to your list of contracts and choose one you own or change the account you are trying to use to access the contract!"
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
