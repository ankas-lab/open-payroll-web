import React from 'react';
import Text from '../generals/text';
import Button from '../generals/button';
import Link from 'next/link';

const NotBeneficiary = () => {
  return (
    <div>
      <Text type="h2" text="Opps!" />
      <div className="">
        <Text type="h4" text="It seems that you are not a beneficiary of this contract :(" />
        <div className="mt-5 w-6/12">
          <Link href={'/claim'} className="mt-5">
            <Button text="try again" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotBeneficiary;
