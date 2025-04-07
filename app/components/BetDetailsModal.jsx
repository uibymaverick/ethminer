import { useState, useEffect } from 'react';
import { useGameContext } from '../games/layout';
import Modal from './Modal';
import { useSetState } from '@mantine/hooks';
import CopyButton from './CopyButton';

function BetDetailsModal({ betId, setOpen, open }) {
  const { authData } = useGameContext();
  const [betDetails, setBetDetails] = useSetState({
    data: {},
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!authData) return;
    if (!open) return;
    const fetchBets = async () => {
      try {
        setBetDetails({ loading: true, data: {}, error: null });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/round/details-by-bet-id?betId=${betId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: authData?.token,
            },
          }
        );
        const data = await res.json();
        setBetDetails({
          data: data?.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error(error);
        setBetDetails({ error: error.message, data: {}, loading: false });
      } finally {
        setBetDetails({ loading: false });
      }
    };
    fetchBets();
  }, [open]);

  return (
    <Modal
      hFit
      open={open}
      setOpen={() => setOpen(false)}
      title={<h1 className='text-xl font-bold'>Bet Details</h1>}
    >
      <div className='w-full h-full flex flex-col gap-2 py-2'>
        {betDetails.data && (
          <>
            {[
              {
                label: 'Bet ID',
                value: betDetails.data._id,
              },
              {
                label: 'Round ID',
                value: betDetails.data.roundId,
              },
            ].map((item) => (
              <div className='flex gap-1 px-4 justify-between text-xs'>
                <label className=' text-white/50'>{item.label}</label>
                <div className=' text-white'>#{item.value}</div>
              </div>
            ))}

            {[
              {
                label: 'Server Seed',
                value: betDetails.data.serverSeed,
              },
              {
                label: 'Client Seed',
                value: betDetails.data.clientSeed,
              },
            ].map((item) => (
              <div className='w-full px-4 py-2 flex items-center text-xs bg-base-200/40 rounded-xl justify-between'>
                <div className='flex flex-col gap-1'>
                  <label className='block text-xs text-white/50'>
                    {item.label}
                  </label>
                  <span className='truncate text-white'>{item.value}</span>
                </div>
                <CopyButton text={item.value} size={6} />
              </div>
            ))}

            {/* {betDetails.data.data?.mines && (
              <div className='flex flex-col gap-1'>
                <label className='block ml-2 text-sm font-semibold text-base-100'>
                  Mine Positions
                </label>
                <div className='w-full p-2 input'>
                  {betDetails.data.data.mines.join(', ')}
                </div>
              </div>
            )} */}
          </>
        )}

        {betDetails.loading && (
          <div className='flex text-xl font-bold text-white justify-center items-center'>
            <span className='opacity-50'>Loading</span>
          </div>
        )}
        {betDetails.error && (
          <div className='flex text-xl font-bold text-error justify-center items-center'>
            <span className='opacity-50'>{betDetails.error}</span>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BetDetailsModal;
