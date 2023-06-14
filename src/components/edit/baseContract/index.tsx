import React, { useEffect, useState } from 'react';

import Text from '@/components/generals/text';
import Button from '@/components/generals/button';

import { Podkova } from 'next/font/google';
const podkova = Podkova({ subsets: ['latin'] });
import { AiOutlineLoading } from 'react-icons/ai';

import { useApi, useCall, useTx, useChainDecimals } from 'useink';
import {
  bnToBalance,
  pickDecoded,
  isBroadcast,
  isFinalized,
  isInBlock,
  isPendingSignature,
  isErrored,
} from 'useink/utils';

interface ContractProps {
  _contract: any | undefined;
}

const Index = ({ _contract }: ContractProps) => {
  //---------------------------------Get from contract---------------------------------
  // ⌚ Get periodicity from contract
  //const getPeriodicity = useCall<any | undefined>(_contract, 'getPeriodicity');
  //
  //---------------------------------Handles---------------------------------
  //const handlePeriodicityChange = (e: any) => {
  //TODO Fix this to convert the value to the correct format
  //  setNewPeriodicity(e.target.value);
  //};
  //const handleUpdatePeriodicity = () => updatePeriodicityTx.signAndSend([newPeriodicity]);
  //---------------------------------Contract interactions---------------------------------
  const _api = useApi('rococo-contracts-testnet');
  const _chainDecimals = useChainDecimals(_contract?.chainId);
  const getBasePayment = useCall(_contract, 'getBasePayment');
  const getPeriodicity = useCall(_contract, 'getPeriodicity');

  //---------------------------------Contract interactions---------------------------------
  const [basePayment, setBasePayment] = useState<string | undefined>(undefined);
  const [newBasePayment, setNewBasePayment] = useState<number | bigint | undefined>(undefined);
  const [periodicityType, setPeriodicityType] = useState<'fixed' | 'custom'>('fixed');
  const [periodicity, setPeriodicity] = useState<any | undefined>(undefined);
  const [newPeriodicity, setNewPeriodicity] = useState<any | undefined>(undefined);

  const options = undefined;

  //TODO change buttons

  const updateBasePaymentTx = useTx(_contract, 'updateBasePayment');

  const handleInputNewBasePayment = (e: any) => {
    const b = e.target.value * 10 ** _chainDecimals!;
    setNewBasePayment(b);
  };

  const handleUpdateBasePayment = () => {
    updateBasePaymentTx.signAndSend([newBasePayment], options, (result: any, _api, error: any) => {
      if (error) {
        console.error(JSON.stringify(error));
      }

      if (!result?.status.isInBlock) return;

      const events = [];
      let slug = '';

      // Collect Contract emitted events
      result?.contractEvents?.forEach(({ event, args }) => {
        slug = args[0].toHuman()?.toString() || '';
        events.push({
          name: event.identifier,
          message: `${event.docs.join()}`,
        });
      });
    });
  };

  const updatePeriodicityTx = useTx(_contract, 'updatePeriodicity');

  const handleInputNewPeriodicity = (e: any) => {
    setNewPeriodicity(e.target.value);
  };

  const handleUpdatePeriodicity = () => {
    updatePeriodicityTx.signAndSend([newPeriodicity]);
  };

  useEffect(() => {
    if (_contract !== undefined) {
      getBasePayment.send();
      getPeriodicity.send();
    }
  }, [_contract]);

  useEffect(() => {
    if (getBasePayment.result?.ok && _chainDecimals) {
      const decoded = pickDecoded(getBasePayment.result);
      const decodedToNumber = parseInt(decoded);
      const decodedNumberWithDecimals = decodedToNumber * 10 ** _chainDecimals;
      const toBalance = bnToBalance(_api?.api, BigInt(decodedNumberWithDecimals));
      const finalBasePayment = parseInt(toBalance.toHuman().slice(0, -4)).toFixed(2);
      setBasePayment(finalBasePayment);
    }
  }, [getBasePayment.result?.ok]);

  useEffect(() => {
    if (getPeriodicity.result?.ok) {
      const decoded = pickDecoded(getPeriodicity.result);
      decoded === '7200' || decoded === '36000' || decoded === '216000'
        ? setPeriodicityType('fixed')
        : setPeriodicityType('custom');
      setPeriodicity(decoded);
    }
  }, [getPeriodicity.result?.ok]);

  useEffect(() => {
    // Customize messages
    if (isPendingSignature(updateBasePaymentTx)) {
      console.log({ type: updateBasePaymentTx.status, message: `Please sign the transaction in your wallet` });
    }

    if (isBroadcast(updateBasePaymentTx)) {
      console.log({
        type: updateBasePaymentTx.status,
        message: 'Flip transaction has been broadcast!',
      });
    }

    if (isInBlock(updateBasePaymentTx)) {
      console.log({
        type: updateBasePaymentTx.status,
        message: 'Transaction is in the block.',
      });
    }

    if (isErrored(updateBasePaymentTx)) {
      console.log({ type: updateBasePaymentTx.status, message: `Error` });
    }

    if (isFinalized(updateBasePaymentTx)) {
      console.log({ type: updateBasePaymentTx.status, message: `The transaction has been finalized.` });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBasePaymentTx.status]);

  useEffect(() => {
    // Customize messages
    if (isPendingSignature(updatePeriodicityTx)) {
      console.log({ type: updatePeriodicityTx.status, message: `Please sign the transaction in your wallet` });
    }

    if (isBroadcast(updatePeriodicityTx)) {
      console.log({
        type: updatePeriodicityTx.status,
        message: 'Flip transaction has been broadcast!',
      });
    }

    if (isInBlock(updatePeriodicityTx)) {
      console.log({
        type: updatePeriodicityTx.status,
        message: 'Transaction is in the block.',
      });
    }

    if (isErrored(updatePeriodicityTx)) {
      console.log({ type: updateBasePaymentTx.status, message: `Error` });
    }

    if (isFinalized(updatePeriodicityTx)) {
      console.log({ type: updatePeriodicityTx.status, message: `The transaction has been finalized.` });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePeriodicityTx.status]);

  return (
    <div className="w-full md:w-8/12 flex flex-col gap-[20px]">
      <div>
        <Text type="h4" text="Contract" />
        <Text type="" text="These are the basic data of your contract." />
      </div>
      <form className="">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <Text type="h5" text="Off chain" />
            <div className="flex gap-[10px]">
              <div className="flex flex-col ">
                <label className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] ${podkova.className}`}>
                  Contract name
                </label>
                <input
                  id="contractName"
                  type="text"
                  name="contractName"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
              <div className="flex flex-col">
                <label className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5px] ${podkova.className}`}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text type="h5" text="On chain" />
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <label
                  className={`text-[17px] font-normal text-black tracking-[0.15px] mb-[5
          px] ${podkova.className}`}
                >
                  Base payment
                </label>
                {getBasePayment.result?.ok ? (
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-opwhite border-2 border-oppurple rounded-[5px] flex py-1.5 px-1.5">
                      <input
                        placeholder={basePayment}
                        id="basePayment"
                        type="number"
                        name="basePayment"
                        className="p-0 m-0 bg-opwhite ring-0 focus:ring-0"
                        onChange={(e) => handleInputNewBasePayment(e)}
                      />
                      ROC
                    </div>
                    <Button
                      type={newBasePayment !== undefined ? 'active' : 'disabled'}
                      text="Update"
                      action={() => handleUpdateBasePayment()}
                    />
                  </div>
                ) : (
                  <div className="flex w-full min-h-screen">
                    <AiOutlineLoading className="animate-spin m-auto" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-[10px]">
                <label className={`text-[17px] font-normal text-black tracking-[0.15px] ${podkova.className}`}>
                  Periodicity
                </label>
                {getPeriodicity.result?.ok ? (
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-[10px]">
                      {periodicityType === 'fixed' ? (
                        <Button type="active" text="fixed" action={() => setPeriodicityType('fixed')} />
                      ) : (
                        <Button type="outlined" text="fixed" action={() => setPeriodicityType('fixed')} />
                      )}
                      {periodicityType === 'custom' ? (
                        <Button type="active" text="custom" action={() => setPeriodicityType('custom')} />
                      ) : (
                        <Button type="outlined" text="custom" action={() => setPeriodicityType('custom')} />
                      )}
                    </div>
                    <div className="flex">
                      {periodicityType === 'fixed' ? (
                        <select
                          name="periodicity"
                          onChange={(e) => {
                            handleInputNewPeriodicity(e);
                          }}
                          className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-1.5 flex"
                        >
                          <option value="7200">Daily</option>

                          <option value="36000">Weekly</option>

                          <option value="216000">Monthly</option>
                        </select>
                      ) : (
                        <input
                          placeholder={`${periodicity} blocks`}
                          type="number"
                          name="periodicity"
                          className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex"
                          onChange={(e) => {
                            handleInputNewPeriodicity(e);
                          }}
                        />
                      )}
                    </div>
                    <Button
                      type={newPeriodicity === undefined ? 'disabled' : 'active'}
                      text="update"
                      action={() => handleUpdatePeriodicity()}
                    />
                  </div>
                ) : (
                  <div className="flex w-full min-h-screen">
                    <AiOutlineLoading className="animate-spin m-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Index;
