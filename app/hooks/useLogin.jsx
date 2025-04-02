'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSignMessage } from 'wagmi';
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import Notify from '../components/Notification';
import { useGameContext } from '../games/layout';

export function useLogin() {
  const gameContext = useGameContext();
  const { disconnect } = useDisconnect();
  const [status, setStatus] = useState('idle');
  const { isConnected, address } = useAccount();
  const { connectors, connect, error, status: connectStatus } = useConnect();

  const {
    data,
    status: signStatus,
    signMessage,
    variables,
  } = useSignMessage({
    onError: (error) => {
      console.error(error);
      Notify.failure(error.message || 'Failed to sign message');
      disconnect();
    },
  });

  const connectWallet = useCallback(
    async (connector) => {
      connect({ connector });
      setStatus('connecting');
    },
    [connectors]
  );

  useEffect(() => {
    if (connectStatus === 'success') {
      signMessageForLogin();
      setStatus('signing-message');
    } else if (connectStatus === 'error') {
      disconnect();
      setStatus('idle');
      Notify.failure('Failed to connect to wallet');
    }
  }, [connectStatus]);

  const login = useCallback(async () => {
    if (!address) return null;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: address,
            signature: data,
            message: variables?.message,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        Notify.success(responseData.message || 'Logged in successfully');
        gameContext.setAuthData(responseData.data);
        localStorage.setItem('authData', JSON.stringify(responseData.data));
        console.log(responseData.data);
        setStatus('idle');
      } else {
        disconnect();
        Notify.failure(responseData.message || 'Failed to login');
        setStatus('idle');
      }
    } catch (error) {
      console.error(error);
      Notify.failure(error.message || 'Failed to login');
      disconnect();
      setStatus('idle');
      return null;
    }
  }, [address, signStatus, data, variables]);

  useEffect(() => {
    if (signStatus === 'success') {
      login();
      setStatus('logging-in');
    } else if (signStatus === 'error') {
      disconnect();
      setStatus('idle');
      Notify.failure('Failed to sign message');
    }
  }, [signStatus]);

  const signMessageForLogin = useCallback(async () => {
    if (!address) return null;
    try {
      signMessage({
        account: address,
        message: JSON.stringify({
          text: `Log me in ${address}`,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.error(error);
      Notify.failure(error.message || 'Failed to sign message');
      disconnect();
      return null;
    }
  }, [address, signMessage, disconnect]);

  return {
    connectWallet,
    status,
    connectors,
  };
}
