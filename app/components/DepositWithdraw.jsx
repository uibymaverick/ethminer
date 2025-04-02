import { useEffect, useState } from 'react';
import { useAccount, useSendTransaction, useBalance, useToken } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import Modal from './Modal';
import { availableTokens } from '../web3/constants';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SendToken from './SendToken';
import { Notify } from 'notiflix';
import { useGameContext } from '../games/layout';
function DepositWithdraw() {
  const { gameSettings, setGameSettings } = useGameContext();
  const [activeTab, setActiveTab] = useState(
    gameSettings.depositWithdrawModalType || 'deposit'
  );
  const [selectedToken, setSelectedToken] = useState(availableTokens[0]);
  const [fetching, setFetching] = useState(true);
  const [amount, setAmount] = useState('');
  const { address } = useAccount();

  const {
    data: hash,
    isPending,
    error,
    status,
    sendTransaction,
  } = useSendTransaction();

  const handleSubmit = async () => {
    if (!amount) return;

    try {
      sendTransaction({
        to: '0x37b990eA38F47812A8d8e4CC66F3e34B1abBB14b',
        value: parseEther(amount),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === 'success') {
      setGameSettings({
        ...gameSettings,
        depositWithdrawModalOpen: false,
      });
    } else if (status === 'error') {
      console.error(error.message);
      Notify.failure(error.message || 'Something went wrong');
    }
  }, [status]);

  return (
    <Modal
      open={gameSettings.depositWithdrawModalOpen}
      setOpen={() =>
        setGameSettings({
          ...gameSettings,
          depositWithdrawModalOpen: false,
        })
      }
      title={<h1 className='text-xl font-bold'>Account</h1>}
    >
      <div className='w-full flex flex-col gap-4 pt-2 h-full'>
        <div className='flex p-0.5 bg-base-100/50 rounded-2xl border-2 border-base-200'>
          {['deposit', 'withdraw'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-white font-semibold  rounded-xl py-3 ${
                activeTab === tab ? 'bg-info shadow-all-xl shadow-info/50' : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 'deposit' && (
          <>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <label className='block ml-2 text-sm font-semibold text-base-100'>
                  Select Token
                </label>
              </div>
              <div className='grid grid-cols-2 gap-1'>
                {fetching && (
                  <div className='w-full h-14 text-white/50 flex items-center justify-center col-span-2 bg-white/10 rounded-2xl'>
                    Fetching tokens...
                  </div>
                )}
                {availableTokens.map((token, index) => (
                  <TokenBalance
                    selectedToken={selectedToken}
                    onClick={() => setSelectedToken(token)}
                    key={index}
                    token={token}
                    address={address}
                    setFetching={setFetching}
                  />
                ))}
              </div>
              <div className='flex flex-col gap-1'>
                <label className='block ml-2 text-sm font-semibold text-base-100'>
                  Amount
                </label>
                <input
                  type='number'
                  className='w-full p-2 input'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder='Enter amount'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 mt-auto'>
              {selectedToken.address ? (
                <SendToken
                  token={selectedToken}
                  to={'0x37b990ea38f47812a8d8e4cc66f3e34b1abbb14b'}
                  amount={amount}
                  address={address}
                  disabled={!selectedToken}
                />
              ) : (
                <button
                  className='w-full py-2 button button-success'
                  onClick={handleSubmit}
                  disabled={isPending}
                >
                  {isPending ? 'Processing...' : 'Send'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default DepositWithdraw;

const TokenBalance = ({
  token,
  address,
  onClick,
  selectedToken,
  setFetching,
}) => {
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: token.address,
  });
  useEffect(() => {
    if (data?.formatted > 0) {
      setFetching(false);
    }
  }, [isLoading]);
  return (
    data?.formatted != 0 &&
    !isLoading && (
      <div
        onClick={() => {
          if (data?.formatted > 0) {
            onClick();
          }
        }}
        className={`flex relative border-2 items-center bg-base-200 rounded-2xl p-2 gap-3 cursor-pointer ${
          selectedToken.address === token.address
            ? 'border-success'
            : 'border-transparent'
        } ${data?.formatted == 0 && 'grayscale opacity-50'}`}
      >
        {selectedToken.address === token.address && (
          <CheckCircleIcon className='absolute left-0 top-0 w-6 h-6 text-success' />
        )}
        <img
          src={token?.logoURI}
          className='w-8 h-8 rounded-full'
          alt={token?.name}
        />
        <div className='flex flex-col'>
          <span className=' text-white/80 text-sm font-semibold whitespace-nowrap'>
            {token?.name}
          </span>
          {isError ? (
            <p>Error</p>
          ) : (
            <span className='text-xs font-medium text-white/50'>
              {data?.formatted > 0
                ? parseFloat(data?.formatted).toFixed(5)
                : '0.00'}{' '}
              {data?.symbol}
            </span>
          )}
        </div>
      </div>
    )
  );
};
