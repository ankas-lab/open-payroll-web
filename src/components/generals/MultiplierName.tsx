import React from 'react';
import Text from '../../components/generals/text';
import { useBaseMultiplier } from '@/hooks/useBaseMultiplier';
import Loader from './Loader';

const MultiplierName = (multiplierId: any, _contract: any) => {
  const { baseMultiplier } = useBaseMultiplier(multiplierId._contract, multiplierId.multiplierId);

  return baseMultiplier !== undefined ? (
    <div className="capitalize">
      <Text type="" text={baseMultiplier.name || 'multiplier ' + multiplierId.multiplierId} />
    </div>
  ) : (
    <Loader />
  );
};

export default MultiplierName;
