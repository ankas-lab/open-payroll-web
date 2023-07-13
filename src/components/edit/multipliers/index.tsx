import React, { useState, useEffect } from 'react';
import Text from '../../generals/text';
import Button from '../../generals/button';
import { useMultipliers } from '@/hooks/useMultipliers';
import MultiplierInput from './multiplierIntput';
import { useAddMultiplier } from '@/hooks/useAddMultiplier';
import Loader from '@/components/generals/Loader';

interface ContractProps {
  _contract: any | undefined;
}

const Index = ({ _contract }: ContractProps) => {
  const [createNewMultuplier, setCreateNewMultuplier] = useState(false);
  const [newMultuplier, setNewMultuplier] = useState<string | undefined>(undefined);

  const { multipliersIdList } = useMultipliers(_contract);

  const { handleAddBaseMultiplier, isAdded, isAdding } = useAddMultiplier(_contract);

  useEffect(() => {
    isAdded && setCreateNewMultuplier(false);
  }, [isAdded]);

  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="">
        <Text type="h4" text="Multipliers" />
        <Text
          type=""
          text="These are the multipliers of your contract, you can create new ones, pause them or delete them.
To eliminate a multiplier it is necessary that it be paused for a period."
        />
      </div>

      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Text type="h5" text="My multipliers" />
          <div className="grid grid-cols-1 w-full gap-[10px]">
            {multipliersIdList !== undefined ? (
              multipliersIdList?.map((m: any) => (
                <MultiplierInput key={m} _contract={_contract} _multiplier={m} _active={true} />
              ))
            ) : (
              <Loader />
            )}
            {createNewMultuplier && (
              <form className="flex gap-[10px]">
                {isAdding ? (
                  <input
                    placeholder="Name"
                    type="text"
                    disabled
                    className=" bg-opwhite border-2 border-opgray rounded-[5px] py-1.5 px-1.5 w-full"
                  />
                ) : (
                  <input
                    placeholder="Name"
                    type="text"
                    className=" bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                    onChange={(e) => setNewMultuplier(e.target.value)}
                  />
                )}

                <div className="flex">
                  {isAdding ? (
                    <Button type="disabled outlined" text="" icon="loading" />
                  ) : (
                    <>
                      <Button
                        type={newMultuplier !== undefined && !isAdding ? 'text' : 'disabled outlined'}
                        icon="check"
                        action={() => handleAddBaseMultiplier(newMultuplier!)}
                      />
                      <Button type="text danger" text="" icon="cancel" action={() => setCreateNewMultuplier(false)} />
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <Button
            type={createNewMultuplier ? 'disabled' : 'outlined'}
            text="add a new multiplier"
            icon="add"
            action={() => setCreateNewMultuplier(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
