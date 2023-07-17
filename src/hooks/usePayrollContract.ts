/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  useCall,
  useApi,
  ChainContract,
  useCallSubscription,
  useBlockHeader,
  useChainDecimals,
  useTokenSymbol,
} from 'useink';
import {
  decimalToPlanck,
  pickDecoded,
  planckToDecimal,
  planckToDecimalFormatted,
  stringNumberToBN,
} from 'useink/utils';

interface BaseMultipliers {
  Id: string;
  Name: string;
}

export function usePayrollContract(contract: ChainContract<any> | undefined) {
  const blockHeader = useBlockHeader();
  const decimals = useChainDecimals('rococo-contracts-testnet');
  const token = useTokenSymbol('rococo-contracts-testnet');

  const [contractBalance, setContractBalance] = useState<undefined | string | any>(undefined);
  const [rawContractBalance, setRawContractBalance] = useState<undefined | number>(undefined);
  const [periodicity, setPeriodicity] = useState<undefined | number | string>(undefined);
  const [totalDebts, setTotalDebts] = useState<undefined | string>(undefined);
  const [rawTotalDebts, setRawTotalDebts] = useState<undefined | string>(undefined);

  const [nextBlockPeriod, setNextBlockPeriod] = useState<undefined | string>(undefined);
  const [contractState, setContractState] = useState<undefined | boolean>(undefined);
  const [amountBeneficiaries, setAmountBeneficiaries] = useState<undefined | number>(undefined);
  const [listBeneficiaries, setListBeneficiaries] = useState<undefined | string[]>(undefined);
  const [multipliersIdList, setMultipliersIdList] = useState<undefined | string[]>(undefined);
  const [baseMultipliers, setBaseMultipliers] = useState<undefined | BaseMultipliers[]>(undefined);
  const [basePayment, setBasePayment] = useState<undefined | any>(undefined);
  const [rawBasePayment, setRawBasePayment] = useState<undefined | any>(undefined);
  const [unclaimBeneficiaries, setUnclaimBeneficiaries] = useState<undefined | any>(undefined);

  //---------------------------------Api---------------------------------
  const api = useApi('rococo-contracts-testnet');

  //---------------------------------Get from contract---------------------------------
  const getListBeneficiaries = useCallSubscription<string[]>(contract, 'getListBeneficiaries');
  const getNextBlockPeriod = useCallSubscription<any>(contract, 'getNextBlockPeriod');
  const getContractBalance = useCallSubscription<any>(contract, 'getContractBalance');
  const getTotalDebts = useCallSubscription<any>(contract, 'getTotalDebts');
  const getPeriodicity = useCallSubscription<number>(contract, 'getPeriodicity');
  const getBasePayment = useCallSubscription<any>(contract, 'getBasePayment');
  const getMultipliersList = useCallSubscription<any>(contract, 'getMultipliersList');
  const isPaused = useCallSubscription<boolean>(contract, 'isPaused');
  const getCountOfUnclaimBeneficiaries = useCallSubscription(contract, 'getCountOfUnclaimBeneficiaries');
  const getBaseMultiplier = useCall<any>(contract, 'getBaseMultiplier');

  useEffect(() => {
    if (getCountOfUnclaimBeneficiaries.result?.ok) {
      const decodedData = pickDecoded(getCountOfUnclaimBeneficiaries.result);
      setUnclaimBeneficiaries(decodedData);
    }
  }, [getCountOfUnclaimBeneficiaries.result]);

  useEffect(() => {
    if (getContractBalance.result?.ok) {
      const data = pickDecoded(getContractBalance.result!);
      const dataToNumber = parseInt(data?.replace(/,/g, ''));
      setRawContractBalance(dataToNumber);
      setContractBalance(
        planckToDecimal(dataToNumber, { api: api?.api, decimals: decimals })?.toFixed(2) + ' ' + token!,
      );
    }
  }, [getContractBalance.result]);

  useEffect(() => {
    if (getPeriodicity.result?.ok) {
      const data = pickDecoded(getPeriodicity.result)!;
      const periodicityToNumber = parseInt(String(data).replace(/,/g, ''));

      periodicityToNumber >= 7200 && setPeriodicity(`${(periodicityToNumber / 7200).toFixed(0)} days`);
      periodicityToNumber < 7200 &&
        periodicityToNumber >= 300 &&
        setPeriodicity(`${(periodicityToNumber / 300).toFixed(0)} hours`);
      periodicityToNumber <= 300 && setPeriodicity(`${(periodicityToNumber / 5).toFixed(0)} minutes`);
    }
  }, [getPeriodicity.result]);

  useEffect(() => {
    if (getListBeneficiaries.result?.ok) {
      let data = pickDecoded(getListBeneficiaries.result!);
      setAmountBeneficiaries(data?.length);
      setListBeneficiaries(data);
    }
  }, [getListBeneficiaries.result]);

  useEffect(() => {
    if (getTotalDebts.result && api?.api) {
      let data = stringNumberToBN(pickDecoded(getTotalDebts.result!));
      setTotalDebts(planckToDecimal(data, { api: api?.api, decimals: decimals })?.toFixed(2) + ' ' + token!);
    }
  }, [getTotalDebts.result, api?.api]);

  useEffect(() => {
    if (getBasePayment.result && api?.api) {
      let data = stringNumberToBN(pickDecoded(getBasePayment.result!));
      setRawBasePayment(data);
      setBasePayment(planckToDecimal(data, { api: api?.api, decimals: decimals })?.toFixed(2) + ' ' + token!);
    }
  }, [getBasePayment.result, api?.api]);

  useEffect(() => {
    const searchBaseMultipliers = async (multipliers: any) => {
      let localBaseMultipliers = [];
      let a_async = await getBaseMultiplier.send(multipliers[0]);
      let a = pickDecoded(a_async);
      localBaseMultipliers.push(a);
      setBaseMultipliers(localBaseMultipliers);
    };

    if (getMultipliersList.result) {
      let data = pickDecoded(getMultipliersList.result!);
      setMultipliersIdList(data);
      searchBaseMultipliers(data);
    }
  }, [getMultipliersList.result]);

  useEffect(() => {
    if (getNextBlockPeriod.result) {
      let getNextBlockPeriodValueString = pickDecoded(getNextBlockPeriod.result);
      let nextBlockPeriod = stringNumberToBN(getNextBlockPeriodValueString).words[0];

      nextBlockPeriod - blockHeader?.blockNumber! >= 7200 &&
        setNextBlockPeriod(`${((nextBlockPeriod - blockHeader?.blockNumber!) / 7200).toFixed(0)} days`);
      nextBlockPeriod - blockHeader?.blockNumber! <= 7200 &&
        nextBlockPeriod - blockHeader?.blockNumber! >= 300 &&
        setNextBlockPeriod(`${((nextBlockPeriod - blockHeader?.blockNumber!) / 300).toFixed(0)} hours`);
      nextBlockPeriod - blockHeader?.blockNumber! <= 300 &&
        setNextBlockPeriod(`${((nextBlockPeriod - blockHeader?.blockNumber!) / 5).toFixed(0)} minutes`);
    }
  }, [getNextBlockPeriod.result]);

  useEffect(() => {
    if (getMultipliersList.result?.ok) {
      let data = pickDecoded(getMultipliersList.result!);
      setMultipliersIdList(data);
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
    nextBlockPeriod,
    amountBeneficiaries,
    listBeneficiaries,
    basePayment,
    rawBasePayment,
    multipliersIdList,
    baseMultipliers,
    unclaimBeneficiaries,
    rawContractBalance,
  };
}
