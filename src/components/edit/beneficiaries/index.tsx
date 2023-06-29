import React, { useState, useEffect } from 'react';
import Text from '@/components/generals/text';
import Button from '@/components/generals/button';
import { usePayrollContract } from '@/hooks/usePayrollContract';

import BeneficiaryRow from '@/components/edit/beneficiaries/beneficiaryRow';
import MultiplierHeaderCell from '@/components/contracts/multiplierHeaderCell';
import AddBeneficiaryRow from './AddBeneficiaryRow';
import { useAddBeneficiary } from '@/hooks/useAddBeneficiary';

interface ContractProps {
  _contract: any | undefined;
  _contractAddress: string | undefined;
}

const Index = ({ _contract, _contractAddress }: ContractProps) => {
  const [showAddBeneficiary, setShowAddBeneficiary] = useState<boolean>(false);

  const { isAdded, handleAddBeneficiary, isProcessing } = useAddBeneficiary(_contract);

  const { amountBeneficiaries, listBeneficiaries, multipliersIdList, basePayment } = usePayrollContract(_contract);

  useEffect(() => {
    isAdded === true && setShowAddBeneficiary(false);
  }, [isAdded]);

  return (
    <div className="w-12/12 flex flex-col gap-[20px]">
      <div className="flex justify-between items-baseline">
        <div className="">
          <Text type="h4" text="Beneficiaries" />
          <Text
            type=""
            text="These are all the beneficiaries that exist in your contract, you can add, delete or edit them."
          />
        </div>
        <div className="">
          <Text type="h5" text="Base payment" />
          <Text type="" text={basePayment} />
        </div>
      </div>
      <div className="overflow-x-auto">
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
              {multipliersIdList !== undefined &&
                multipliersIdList.map((m: string) => (
                  <MultiplierHeaderCell key={m} contract={_contract} multiplierId={m} />
                ))}
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
                  contractAddress={_contractAddress}
                  multipliersIdList={multipliersIdList}
                />
              ))}
            {showAddBeneficiary && (
              <AddBeneficiaryRow
                contract={_contract}
                multipliersIdList={multipliersIdList}
                contractAddress={_contractAddress!}
                show={setShowAddBeneficiary}
                handleAddBeneficiary={handleAddBeneficiary}
                isProcessing={isProcessing}
              />
            )}
          </tbody>
        </table>
      </div>

      <div>
        <Button
          type={showAddBeneficiary ? 'disabled' : 'outlined'}
          text="add other"
          icon="add"
          action={() => setShowAddBeneficiary(true)}
        />
      </div>
    </div>
  );
};

export default Index;
