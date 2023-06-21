import React from 'react';
import Text from '@/components/generals/text';
import Button from '@/components/generals/button';
import { useBeneficiaries } from '@/hooks/useBeneficiaries';
import { usePayrollContract } from '@/hooks/usePayrollContract';

import BeneficiaryRow from '@/components/edit/beneficiaries/beneficiaryRow';
import MultiplierHeaderCell from '@/components/contracts/multiplierHeaderCell';

interface ContractProps {
  _contract: any | undefined;
  _contractAddress: string | undefined;
}

const index = ({ _contract, _contractAddress }: ContractProps) => {
  const { beneficiaries } = useBeneficiaries(_contract);
  const {
    contractState,
    contractBalance,
    periodicity,
    totalDebts,
    nextBlockPeriodInDays,
    amountBeneficiaries,
    basePayment,
    listBeneficiaries,
    multipliersList,
  } = usePayrollContract(_contract);

  return (
    <div className="w-10/12 flex flex-col gap-[20px]">
      <div className="">
        <Text type="h4" text="Beneficiaries" />
        <Text
          type=""
          text="These are all the beneficiaries that exist in your contract, you can add, delete or edit them."
        />
      </div>
      <div className="overflow-x-scroll">
        <table className="mt-5">
          <tbody>
            <tr className="flex gap-[50px] text-left px-2">
              <th className="w-[50px]"></th>
              <th className="w-[150px]">
                <Text type="overline" text="name" />
              </th>
              <th className="w-[150px]">
                <Text type="overline" text="address" />
              </th>
              {multipliersList !== undefined &&
                multipliersList.map((m: string) => <MultiplierHeaderCell key={m} contract={_contract} mult={m} />)}
              <th className="w-[100px]">
                <Text type="overline" text="final pay" />
              </th>
            </tr>
            {listBeneficiaries &&
              amountBeneficiaries &&
              amountBeneficiaries > 0 &&
              listBeneficiaries.map((address: string, index: number) => (
                <BeneficiaryRow
                  key={index}
                  indexBeneficiary={index}
                  beneficiaryAddress={address}
                  contract={_contract}
                />
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <Button type="outlined" text="add other" icon="add" />
      </div>
      <div>
        <Button type="active" text="confirm update" icon="" />
      </div>
    </div>
  );
};

export default index;
