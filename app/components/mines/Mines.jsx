'use client';
import { useCallback, useEffect } from 'react';
import { useListState, useSetState } from '@mantine/hooks';
import NumberOfGems from './NumberOfGems';
import AmountInput from '../AmountInput';
import EthLogo from '../EthLogo';
import { apiEndPoints } from '@/app/games/constants';
import { useGameContext } from '@/app/games/layout';
import useSound from '@/app/hooks/useSound';
import NumberReel from './NumberReel';

function Mines({ betData, setBetData, result, setResult, placeBet }) {
  const { playSound } = useSound();
  const { authData, updateBalance } = useGameContext();
  const [containers, containersHandlers] = useListState([
    {
      id: 0,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 1,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 2,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 3,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 4,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 5,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 6,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 7,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 8,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 9,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 10,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 11,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 12,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 13,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 14,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 15,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 16,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 17,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 18,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 19,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 20,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 21,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 22,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 23,
      status: 'idle',
      isSelected: false,
    },
    {
      id: 24,
      status: 'idle',
      isSelected: false,
    },
  ]);
  const [gameState, setGameState] = useSetState({
    isChecking: false,
    isCashingOut: false,
    currentMultiplier: 1,
    nextMultiplier: 1,
    active: 0,
  });

  useEffect(() => {
    setBetData({
      mines: 3,
    });
  }, []);

  useEffect(() => {
    if (result.isPlaying) {
      containersHandlers.apply((item, index) => {
        return {
          id: index,
          status: 'idle',
          isSelected: false,
        };
      });
      setGameState({
        active: 0,
      });
    }
  }, [result.isPlaying]);

  const checkMine = useCallback(
    async (index) => {
      if (
        !result.isPlaying ||
        gameState.isChecking ||
        gameState.isCashingOut ||
        containers[index].isSelected
      )
        return;
      playSound('check');
      setGameState({
        isChecking: true,
      });
      containersHandlers.setItem(index, {
        ...containers[index],
        isSelected: true,
      });
      const payload = {
        betId: result?.betId,
        option: index.toString(),
      };
      const response = await fetch(`${apiEndPoints.choose_option}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authData.token,
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();

      if (responseData.data.status === 'CONTINUE') {
        containersHandlers.setItem(index, {
          id: index,
          status: 'gem',
          isSelected: true,
        });
        setGameState({
          isChecking: false,
          currentMultiplier: gameState.currentMultiplier + 1,
          nextMultiplier: gameState.nextMultiplier + 1,
        });
        playSound('gems');
        setGameState({
          active: gameState.active + 1,
        });
      } else if (responseData.data.status === 'LOST') {
        containersHandlers.apply((item, index) => {
          return {
            id: item.id,
            status: responseData.data.grid[index] === 'D' ? 'gem' : 'mine',
            isSelected: item.isSelected,
          };
        });
        setGameState({
          isChecking: false,
          nextMultiplier: 0,
          currentMultiplier: 0,
        });
        setResult({
          isPlaying: false,
          roundId: null,
          betId: null,
          betAmount: null,
        });
        playSound('mines');
      } else if (responseData.data.status === 'WON') {
        containersHandlers.apply((item, index) => {
          return {
            id: item.id,
            status: responseData.data.grid[index] === 'D' ? 'gem' : 'mine',
            isSelected: item.isSelected,
          };
        });
        setGameState({
          isChecking: false,
          nextMultiplier: 0,
          currentMultiplier: 0,
        });
        playSound('win');
      }
    },
    [containersHandlers, result.isPlaying, authData]
  );

  const cashout = useCallback(async () => {
    if (!result.isPlaying) return;
    setGameState({
      isCashingOut: true,
    });
    const payload = {
      betId: result?.betId,
    };
    const response = await fetch(`${apiEndPoints.cashout}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authData.token,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (responseData.success) {
      containersHandlers.apply((item, index) => {
        return {
          id: index,
          status: responseData.data.grid[index] === 'D' ? 'gem' : 'mine',
          isSelected: item.isSelected,
        };
      });
      setGameState({
        isCashingOut: false,
        currentMultiplier: 0,
        nextMultiplier: 0,
      });
      setResult({
        isPlaying: false,
        roundId: null,
        betId: null,
        betAmount: null,
      });
      updateBalance();
      playSound('win');
    } else {
      Notify.failure('Failed to cash out');
      setGameState({
        isCashingOut: false,
      });
    }
  }, [containersHandlers, result.isPlaying]);

  return (
    <>
      <div className='gap-2 flex-grow items-center justify-center flex flex-col'>
        <NumberReel result={result} active={gameState.active} />
        <div
          className={`relative grid grid-cols-5 overflow-hidden rounded-sm bg-base-200/80 p-0.5 gap-0.5 w-5/6 aspect-square ${
            result.isPlaying ? 'animate__animated animate__headShake' : ''
          }`}
        >
          {containers?.map((container) => (
            <div
              key={container.id}
              onClick={() => checkMine(container.id)}
              className={`w-full z-50 relative rounded-xs  flex items-center justify-center h-full ${
                container.isSelected ? 'bg-transparent' : 'bg-base-300'
              } ${
                container.isSelected && container.status === 'idle'
                  ? 'animate__animated animate__headShake animate__infinite bg-base-200'
                  : ' '
              }`}
            >
              <div className='absolute w-[70%] h-[70%] top-1/2 left-1/2 bg-transparent -translate-x-1/2 -translate-y-1/2'>
                {container.status === 'idle' ? (
                  <></>
                ) : container.status === 'gem' ? (
                  <EthLogo className='w-full h-full animate__animated animate__zoomIn animate__faster' />
                ) : (
                  <EthLogo
                    grayscale
                    className='w-full h-full animate__animated animate__zoomIn animate__faster'
                  />
                )}
              </div>
            </div>
          ))}
          <span className='absolute top-0 left-0 w-full aspect-square z-0 bg-info blur-2xl animate-[spin_5s_linear_infinite] origin-bottom-right'></span>
          <span className='absolute top-0 right-0 w-full aspect-square z-0 bg-error blur-2xl animate-[spin_6s_linear_infinite] origin-bottom-left'></span>
          <span className='absolute bottom-0 left-0 w-full aspect-square z-0 bg-success blur-2xl animate-[spin_7s_linear_infinite] origin-top-right'></span>
          <span className='absolute bottom-0 right-0 w-full aspect-square z-0 bg-info blur-2xl animate-[spin_8s_linear_infinite] origin-top-left'></span>
          <span className='absolute top-0 left-1/2 -translate-x-1/2 w-full aspect-square z-0 bg-error blur-2xl animate-[spin_9s_linear_infinite] origin-bottom-left'></span>
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square z-0 bg-warning blur-2xl animate-[spin_10s_linear_infinite] origin-center'></span>
          <span className='absolute top-0 left-0 w-full aspect-square z-0 bg-primary blur-2xl animate-[spin_4s_linear_infinite] origin-center'></span>
          <span className='absolute bottom-0 right-0 w-full aspect-square z-0 bg-info blur-2xl animate-[spin_7s_linear_infinite] origin-center'></span>
          <span className='absolute top-0 right-0 w-full aspect-square z-0 bg-success blur-2xl animate-[spin_8s_linear_infinite] origin-bottom'></span>
          <span className='absolute bottom-0 left-0 w-full aspect-square z-0 bg-error blur-2xl animate-[spin_5s_linear_infinite] origin-top'></span>
        </div>
      </div>
      <NumberOfGems
        disabled={result.isPlaying}
        value={betData.mines}
        setValue={(value) => setBetData({ mines: value })}
      />
      <AmountInput
        disabled={result.isPlaying}
        value={betData.amount}
        setValue={(value) => setBetData({ amount: value })}
      />
      <div className='flex gap-2'>
        {result.isPlaying ? (
          <>
            <button
              className='button button-primary w-full'
              onClick={() => cashout()}
              disabled={
                gameState.isCashingOut ||
                gameState.isChecking ||
                !containers.some((c) => c.isSelected == true)
              }
            >
              COLLECT
            </button>
            <button
              className='button w-full'
              onClick={() => {
                const availableTiles = containers
                  .filter((c) => !c.isSelected)
                  .map((c) => c.id);
                const randomIndex =
                  availableTiles[
                    Math.floor(Math.random() * availableTiles.length)
                  ];
                checkMine(randomIndex);
              }}
              disabled={gameState.isChecking || gameState.isCashingOut}
            >
              PICK RANDOM
            </button>
          </>
        ) : (
          <button
            className='button button-gradient w-full'
            disabled={result.placingBet}
            onClick={placeBet}
          >
            START GAME
          </button>
        )}
      </div>
    </>
  );
}

export default Mines;
