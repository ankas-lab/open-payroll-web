import { useState, useEffect } from 'react';
import { useCall, useTx } from 'useink';
import { pickDecoded } from 'useink/utils';

export function useMultipliers(_contract: any) {
  const options = undefined;
  const [multipliersList, setMultipliersList] = useState<string[] | undefined>(undefined);
  const getMultipliersList = useCall(_contract, 'getMultipliersList');

  const addBaseMultiplier = useTx(_contract, 'addBaseMultiplier');
  const deactivateMultiplier = useTx(_contract, 'deactivateMultiplier');
  const deleteUnusedMultiplier = useTx(_contract, 'deleteUnusedMultiplier');

  const handleAddBaseMultiplier = (_newBaseMultiplier: string) => {
    addBaseMultiplier.signAndSend([_newBaseMultiplier], options, (result, api, error) => {
      console.log('hjksdajhkasdhjk');

      if (error) {
        console.log('error');

        console.error(JSON.stringify(error));
      }

      if (result) {
        console.log('result');

        console.log(JSON.stringify(result));
      }
    });
  };

  const handleDeactivateMultiplier = (_multiplierToDeactivate: string) => {
    deactivateMultiplier.signAndSend([_multiplierToDeactivate], options, (result, api, error) => {
      if (error) {
        console.log('error');

        console.error(JSON.stringify(error));
      }

      if (result) {
        console.log('result');

        console.log(JSON.stringify(result));
      }
    });
  };

  const handleDeleteUnusedMultipliers = (_multiplierToDelete: string) => {
    deleteUnusedMultiplier.signAndSend([_multiplierToDelete], options, (result, api, error) => {
      if (error) {
        console.log('error');

        console.error(JSON.stringify(error));
      }

      if (result) {
        console.log('result');

        console.log(JSON.stringify(result));
      }
    });
  };

  useEffect(() => {
    _contract && getMultipliersList.send();
  }, [_contract]);

  useEffect(() => {
    if (getMultipliersList.result?.ok) {
      const decodedMultiplierList = pickDecoded(getMultipliersList.result);

      setMultipliersList(decodedMultiplierList);
    }
  }, [getMultipliersList.result?.ok]);

  return { multipliersList, handleAddBaseMultiplier, handleDeactivateMultiplier, handleDeleteUnusedMultipliers };
}
