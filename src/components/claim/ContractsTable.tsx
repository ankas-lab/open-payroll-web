import React, { useContext, useState, useEffect } from 'react';
import Text from '../../components/generals/text';
import Button from '../../components/generals/button';
import { DappContext } from '@/context';
import { useWallet } from 'useink';
import Link from 'next/link';

const ContractsTable = () => {
  const { account } = useWallet();
  const context = useContext(DappContext);
  const { allContractsCanClaim, addressToShort } = context!;

  const [myContracts, setMyContracts] = useState<any | undefined>();

  const getMyContracts = () => {
    console.log(allContractsCanClaim);

    const myContracts = allContractsCanClaim.filter((c) => c.claimer === account?.address);
    setMyContracts(myContracts);
  };

  useEffect(() => {
    account && allContractsCanClaim && getMyContracts();
  }, [account, allContractsCanClaim]);

  const ContractRow = (contract: any) => {
    return (
      <tr className="flex items-center">
        <td className="w-[200px] flex capitalize">
          <Text type="" text={contract.contract.name || 'Contract'} />
        </td>
        <td className="w-[300px] flex">
          <Text type="" text={addressToShort(contract.contract.contractAddress)} />
        </td>
        <td className="w-[100px] flex">
          <Link href={`claim/${contract.contract.contractAddress}`}>
            <Button type="outlined" text="claim" />
          </Link>
        </td>
      </tr>
    );
  };

  return (
    myContracts?.length > 0 && (
      <div className="flex flex-col gap-[20px]">
        <Text type="h4" text="The last contracts you claimed" />
        <table className="flex flex-col gap-[10px]">
          <tr className="flex">
            <th className="w-[200px] flex">
              <Text type="overline" text="name" />
            </th>
            <th className="w-[300px] flex">
              <Text type="overline" text="contract Address" />
            </th>
          </tr>
          {myContracts.map((c: any) => (
            <ContractRow key={c} contract={c} />
          ))}
        </table>
      </div>
    )
  );
};

export default ContractsTable;
