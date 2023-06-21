import { useState, useEffect, useContext } from 'react';
import { useCall, useApi, ChainContract } from 'useink';
import { pickDecoded, planckToDecimalFormatted, stringNumberToBN } from 'useink/utils';
import { DappContext } from '@/context';

import { BN } from 'bn.js';

export function usePayrollContract(contract: ChainContract<any> | undefined) {
  // TODO: ChainContract<ContractPromise> | undefined

  const [contractBalance, setContractBalance] = useState<undefined | string>(undefined);
  const [periodicity, setPeriodicity] = useState<undefined | number>(undefined);
  const [totalDebts, setTotalDebts] = useState<undefined | string>(undefined);
  const [nextBlockPeriodInDays, setNextBlockPeriodInDays] = useState<undefined | number>(undefined);
  const [contractState, setContractState] = useState<undefined | boolean>(undefined);
  const [amountBeneficiaries, setAmountBeneficiaries] = useState<undefined | number>(undefined);
  const [listBeneficiaries, setListBeneficiaries] = useState<undefined | string[]>(undefined);
  const [multipliersIdList, setMultipliersIdList] = useState<undefined | string[]>(undefined);
  const [baseMultipliers, setBaseMultipliers] = useState<undefined | any>(undefined);
  const [basePayment, setBasePayment] = useState<undefined | any>(undefined);
  const [rawBasePayment, setRawBasePayment] = useState<undefined | any>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getListBeneficiaries = useCall<string[]>(contract, 'getListBeneficiaries');
  const getNextBlockPeriod = useCall<any>(contract, 'getNextBlockPeriod');
  const getContractBalance = useCall<any>(contract, 'getContractBalance');
  const getTotalDebts = useCall<any>(contract, 'getTotalDebts');
  const getPeriodicity = useCall<number>(contract, 'getPeriodicity');
  const getBasePayment = useCall<any>(contract, 'getBasePayment');
  const getMultipliersList = useCall<any>(contract, 'getMultipliersList');
  const isPaused = useCall<boolean>(contract, 'isPaused');
  const getMultipliersList = useCall<any>(contract, 'getMultipliersList');
  const getBaseMultiplier = useCall<any>(contract, 'getBaseMultiplier');

  useEffect(() => {
    getListBeneficiaries.send();
    getContractBalance.send();
    getNextBlockPeriod.send();
    getTotalDebts.send();
    getPeriodicity.send();
    getBasePayment.send();
    getMultipliersList.send();
    isPaused.send();
    return () => {};
  }, [contract?.contract]);

  useEffect(() => {
    if (getContractBalance.result) {
      let data = stringNumberToBN(pickDecoded(getContractBalance.result!));
      setContractBalance(planckToDecimalFormatted(data, api?.api));
    }
  }, [getContractBalance.result]);

  useEffect(() => {
    if (getPeriodicity.result) {
      setPeriodicity(Number(pickDecoded(getPeriodicity.result!)));
    }
  }, [getPeriodicity.result]);

  useEffect(() => {
    if (getListBeneficiaries.result) {
      let data = pickDecoded(getListBeneficiaries.result!);
      setAmountBeneficiaries(Number(data?.length));
      setListBeneficiaries(data);
    }
  }, [getListBeneficiaries.result]);

  useEffect(() => {
    if (getTotalDebts.result && api?.api) {
      let data = stringNumberToBN(pickDecoded(getTotalDebts.result!));
      // TODO: format millions
      setTotalDebts(planckToDecimalFormatted(data, api.api));
    }
  }, [getTotalDebts.result, api?.api]);

  useEffect(() => {
    if (getBasePayment.result && api?.api) {
      let data = stringNumberToBN(pickDecoded(getBasePayment.result!));
      setRawBasePayment(data);
      // TODO: format millions
      setBasePayment(planckToDecimalFormatted(data, api.api));
    }
  }, [getBasePayment.result, api?.api]);

  useEffect(() => {
    const searchBaseMultipliers = async (multipliers:any) => {
      let localBaseMultipliers = [];
      let a_async = await getBaseMultiplier.send(multipliers[0])
      let a = pickDecoded(a_async)
      localBaseMultipliers.push(a);
      setBaseMultipliers(localBaseMultipliers);
      console.log("Awaiteeeeeed")
      console.log(a)
    };
      
    if (getMultipliersList.result) {
      let data = pickDecoded(getMultipliersList.result!);
      setMultipliersIdList(data);
      searchBaseMultipliers(data);
    }
  }, [getMultipliersList.result]);

  useEffect(() => {
    console.log("AAAAAbaseMultipliersAAAA")
    console.log(baseMultipliers)
  }, [baseMultipliers]);

  useEffect(() => {
    if (getNextBlockPeriod.result && periodicity) {
      let getNextBlockPeriodValueString = pickDecoded(getNextBlockPeriod.result!)?.toString();
      if (getNextBlockPeriodValueString) {
        let getNextBlockPeriodValuePlainBN = stringNumberToBN(getNextBlockPeriodValueString);
        let totalBlocks = getNextBlockPeriodValuePlainBN.div(new BN(periodicity));
        let totalBlocksInDays = totalBlocks.div(new BN(7200));
        // TODO: less than a day if days < 0
        setNextBlockPeriodInDays(totalBlocksInDays.toNumber());
      }
    }
  }, [getNextBlockPeriod.result]);

  useEffect(() => {
    if (getMultipliersList.result?.ok) {
      let data = pickDecoded(getMultipliersList.result!);
      setMultipliersList(data);
    }
  }, [getMultipliersList.result?.ok]);

  useEffect(() => {
    if (isPaused.result) {
      let data = Boolean(pickDecoded(getTotalDebts.result!)).valueOf();
      setContractState(data);
    }
  }, [isPaused.result]);

  return {
    contractState,
    contractBalance,
    periodicity,
    totalDebts,
    nextBlockPeriodInDays,
    amountBeneficiaries,
    listBeneficiaries,
    basePayment,
    rawBasePayment,
    multipliersIdList,
    baseMultipliers,
  };
}
