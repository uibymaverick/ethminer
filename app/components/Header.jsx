'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  UserIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import Modal from './Modal';
import EthLogo from './EthLogo';
import DepositWithdraw from './DepositWithdraw';
import { useLogin } from '../hooks/useLogin';
import { useGameContext } from '../games/layout';
import { icons } from '../web3/constants';
import AnimatedNumber from './AnimatedNumber';
import ProfileModal from './ProfileModal';

function Header() {
  const { authData, balance, gameSettings, setGameSettings } = useGameContext();

  const { isConnected } = useAccount();

  const { connectWallet, status, connectors } = useLogin();

  useEffect(() => {
    if (status === 'idle' || status === 'connecting') {
      setGameSettings({ ...gameSettings, signInModalOpen: false });
    } else {
      setGameSettings({ ...gameSettings, signInModalOpen: true });
    }
  }, [status]);

  return (
    <>
      <header className='z-50 flex gap-1 justify-between items-center w-full'>
        {isConnected && authData ? (
          <>
            {/* <button
              onClick={() => {
                disconnect();
              }}
              className='button button-sm flex items-center gap-2'
            >
              <WalletIcon className='w-4 h-4 -ml-2' />
              {address.slice(0, 6)}...{address.slice(-4)}
            </button> */}
            <div className='flex items-center gap-1'>
              <EthLogo className='w-8 h-8' />
              <h1 className=' font-bold text-white'>ETHMINER</h1>
            </div>

            <div
              onClick={() =>
                setGameSettings({
                  ...gameSettings,
                  depositWithdrawModalOpen: true,
                })
              }
              className={`button button-sm ml-auto flex  items-center gap-2`}
            >
              <AnimatedNumber number={balance} />
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center gap-1'>
              <EthLogo className='w-8 h-8' />
              <h1 className=' font-bold text-white'>ETHMINER</h1>
            </div>

            <button
              className={`button ml-auto button-info button-sm`}
              onClick={() =>
                setGameSettings({
                  ...gameSettings,
                  signInModalOpen: true,
                })
              }
              disabled={status !== 'idle'}
            >
              {status === 'idle' ? 'Sign In' : 'Signing In...'}
            </button>
          </>
        )}
        <button
          onClick={() => {
            setGameSettings({
              ...gameSettings,
              sound: !gameSettings.sound,
            });
          }}
          className='rounded-lg button button-icon'
        >
          {gameSettings.sound ? (
            <SpeakerWaveIcon className='text-primary w-6 h-6' />
          ) : (
            <SpeakerXMarkIcon className='text-white/50 w-6 h-6' />
          )}
        </button>
        {isConnected && (
          <button
            onClick={() => {
              setGameSettings({
                ...gameSettings,
                profileModalOpen: true,
              });
            }}
            className='rounded-lg button button-icon'
          >
            <UserIcon className='text-primary w-6 h-6' />
          </button>
        )}
      </header>
      {isConnected && (
        <>
          <DepositWithdraw
            open={gameSettings.depositWithdrawModalOpen}
            setOpen={() =>
              setGameSettings({
                ...gameSettings,
                depositWithdrawModalOpen: false,
              })
            }
          />
          <ProfileModal
            open={gameSettings.profileModalOpen}
            setOpen={() =>
              setGameSettings({ ...gameSettings, profileModalOpen: false })
            }
          />
        </>
      )}

      <Modal
        hFit
        open={gameSettings.signInModalOpen}
        setOpen={() =>
          setGameSettings({
            ...gameSettings,
            signInModalOpen: false,
          })
        }
        important
        title='Sign In'
      >
        <div className='flex flex-col gap-2 pt-2'>
          {status === 'idle' &&
            connectors.map(
              (connector, index) =>
                connector.name !== 'Injected' && (
                  <button
                    className={`button `}
                    key={index}
                    onClick={() => connectWallet(connector)}
                    disabled={status !== 'idle'}
                  >
                    <div className=' relative overflow-visible'>
                      <img
                        src={icons[connector.name]}
                        alt={connector.name}
                        className='w-8 h-8'
                      />
                      <img
                        src={icons[connector.name]}
                        alt={connector.name}
                        className='w-8 h-8 absolute top-0 left-0 blur-lg'
                      />
                    </div>

                    {status === 'idle' ? connector.name : 'Signing In...'}
                  </button>
                )
            )}
          {status === 'signing-message' && (
            <div className='text-sm font-medium text-white/80 p-2'>
              Please sign the message in your wallet to authenticate.
            </div>
          )}
          {status === 'logging-in' && (
            <div className='text-sm font-medium text-white/80 p-2'>
              Fetching your account data
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Header;
