'use client';
import { memo, useCallback } from 'react';
import { useSetState } from '@mantine/hooks';
import Mines from '../components/mines/Mines';
import { getBetPayload, getResultFromResponse } from './functions';
import { Notify } from 'notiflix';
import { useGameContext } from './layout';
import { apiEndPoints } from './constants';
import useSound from '../hooks/useSound';
import { useAccount } from 'wagmi';
function page() {
  const { authData, updateBalance, gameSettings, setGameSettings } =
    useGameContext();
  const { isConnected } = useAccount();
  const { playSound } = useSound();
  const [betData, setBetData] = useSetState({
    amount: '1',
  });
  const [result, setResult] = useSetState({
    isPlaying: false,
    placingBet: false,
    roundId: null,
    betId: null,
    betAmount: null,
  });

  const placeBetRequest = useCallback(async () => {
    try {
      if (!isConnected) {
        setGameSettings({
          ...gameSettings,
          signInModalOpen: true,
        });
        return;
      }
      setResult({
        isPlaying: false,
        placingBet: true,
      });
      const clientSeed = gameSettings.clientSeed;
      const payload = getBetPayload('mines', clientSeed, betData);
      const response = await fetch(`${apiEndPoints.place_bet}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authData.token,
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();

      if (responseData.success) {
        setResult(getResultFromResponse(responseData.data));
        playSound('bet');
      } else {
        throw new Error(responseData.message || 'Failed to place bet');
      }
    } catch (error) {
      console.error('Error placing bet:', error);
      Notify.failure(error.message || 'Failed to place bet');

      setResult({
        isPlaying: false,
        placingBet: false,
        roundId: null,
        betId: null,
        betAmount: null,
      });
    }
    updateBalance();
  }, [betData, authData]);

  return (
    <>
      <Mines
        result={result}
        setResult={setResult}
        placeBet={placeBetRequest}
        betData={betData}
        setBetData={setBetData}
      />
    </>
  );
}

export default memo(page);
