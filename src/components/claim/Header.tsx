import React, { useContext } from 'react';
import Text from '../generals/text';
import { DappContext } from '@/context';

const Header = () => {
  const context = useContext(DappContext);
  const { addressToShort, contractCanClaimFromLocalStorage } = context!;
  return (
    contractCanClaimFromLocalStorage && (
      <div>
        {' '}
        <Text
          type="h2"
          text={`Claiming in ${
            contractCanClaimFromLocalStorage.name || addressToShort(contractCanClaimFromLocalStorage.contractAddress)
          } `}
        />
        <div className="">
          <Text type="h4" text="Yeah! You have funds to claim here!" />
          <Text
            type=""
            text="contract You can claim everything or choose when you want to claim, you can also add a name to the contract to easily identify it."
          />
        </div>
      </div>
    )
  );
};

export default Header;
