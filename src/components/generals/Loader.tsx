import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const Loader = () => {
  return (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="animate-spin m-auto" />
    </div>
  );
};

export default Loader;
