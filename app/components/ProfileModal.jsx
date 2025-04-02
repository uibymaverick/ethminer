import { useAccount, useDisconnect } from 'wagmi';
import Modal from './Modal';
import CopyButton from './CopyButton';
import { useGameContext } from '../games/layout';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { randomId } from '@mantine/hooks';

function ProfileModal() {
  const { address, isConnected } = useAccount();
  const { balance, gameSettings, setGameSettings } = useGameContext();
  const { disconnect } = useDisconnect();

  return (
    <Modal
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
                  depositWithdrawModalType: 'deposit',
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
                  clientSeed: randomId().slice(8, 16),
                });
              }}
              className='rounded-lg button'
            >
              <ArrowPathIcon className='w-6 h-6' />
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
