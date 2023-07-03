import { useState, useEffect } from 'react';
import { useTx } from 'useink';
import { usePayrollContract } from '../hooks/usePayrollContract';
import { toast } from 'react-toastify';
import { isBroadcast, isErrored, isFinalized, isInBlock, isPendingSignature } from 'useink/utils';

export function useCreate() {
  //TODO logic to send contract

  return {};
}
