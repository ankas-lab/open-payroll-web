import React, { useEffect, useState } from 'react';

import Text from '@/components/generals/text';
import Button from '@/components/generals/button';

const beneficiaryRow = (_contract: any, _beneficiaryAddress: string) => {
  return <tr className="flex gap-[20px] text-left w-12/12 items-center">row</tr>;
};

export default beneficiaryRow;
