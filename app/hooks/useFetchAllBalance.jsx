import { useState, useEffect } from 'react';
import { fetchBalance } from '@wagmi/core';

export function useFetchAllBalance({ addresses }) {
  const [balances, setBalances] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!addresses || !addresses.length) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const balancePromises = addresses.map((address) =>
          fetchBalance({
            address: address,
          })
        );

        const results = await Promise.all(balancePromises);

        const balanceMap = addresses.reduce((acc, address, index) => {
          acc[address] = results[index];
          return acc;
        }, {});

        setBalances(balanceMap);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [addresses]);

  return { balances, isLoading, error };
}
