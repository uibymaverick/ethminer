import { useAccount, useDisconnect } from 'wagmi';
import Modal from './Modal';
import CopyButton from './CopyButton';
import { useGameContext } from '../games/layout';
import {
  ArrowPathIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';
function ProfileModal() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { balance, gameSettings, setGameSettings } = useGameContext();
  const { disconnect } = useDisconnect();

  return (
    <Modal
      important
      open={gameSettings.profileModalOpen}
      setOpen={() =>
        setGameSettings({ ...gameSettings, profileModalOpen: false })
      }
      title={<h1 className='text-xl font-bold'>Account</h1>}
    >
      <div className='w-full flex flex-col gap-4 pt-2 h-full'>
        <div className='flex flex-col gap-1'>
          <label className='block ml-2 text-sm font-semibold text-base-100'>
            Your Wallet Address
          </label>
          <div className='w-full p-2 input flex items-center justify-between'>
            {address?.slice(0, 6)}...{address?.slice(-6)}
            <CopyButton text={address} size={6} />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='block ml-2 text-sm font-semibold text-base-100'>
            Account Balance
          </label>
          <div className='flex items-center gap-2'>
            <div className='w-full p-2 input'>{balance?.toLocaleString()}</div>
            <button
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  depositWithdrawModalOpen: true,
                  depositWithdrawModalType: 'Deposit',
                  profileModalOpen: false,
                });
              }}
              className='rounded-lg button button-success'
            >
              Deposit
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='block ml-2 text-sm font-semibold text-base-100'>
            Your Client Seed
          </label>{' '}
          <div className='flex items-center gap-2'>
            <input
              type='text'
              className='w-full p-2 input'
              value={gameSettings.clientSeed}
              onChange={(e) => {
                setGameSettings({
                  ...gameSettings,
                  clientSeed: e.target.value,
                });
              }}
            />
            <button
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  clientSeed: CryptoJS.lib.WordArray.random(8).toString(),
                });
              }}
              className='rounded-lg button'
            >
              <ArrowPathIcon className='w-6 h-6' />
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='block ml-2 text-sm font-semibold text-base-100'>
            Settings
          </label>{' '}
          <div className='flex items-center gap-2'>
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

            <button
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  music: !gameSettings.music,
                });
              }}
              className='rounded-lg relative button button-icon'
            >
              {gameSettings.music ? (
                <MusicalNoteIcon className='text-primary w-6 h-6' />
              ) : (
                <MusicalNoteIcon className='text-white/50 w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setGameSettings({
              ...gameSettings,
              profileModalOpen: false,
            });
            localStorage.clear();

            disconnect();
            router.push('/');
          }}
          className='rounded-lg mt-auto button button-error'
        >
          Log Out
        </button>
      </div>
    </Modal>
  );
}

export default ProfileModal;
