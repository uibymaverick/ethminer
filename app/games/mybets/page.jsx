'use client';
import { useEffect } from 'react';
import { useGameContext } from '../layout';
import { useSetState } from '@mantine/hooks';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import BetDetailsModal from '@/app/components/BetDetailsModal';
function page() {
  const { authData } = useGameContext();
  const [bets, setBets] = useSetState({
    data: [],
    loading: false,
    error: null,
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
  });
  const [selectedBet, setSelectedBet] = useSetState({
    id: null,
    open: false,
  });

  useEffect(() => {
    if (!authData) return;
    const fetchBets = async () => {
      try {
        setBets({ loading: true, data: [], error: null });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/games/my-bets`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: authData?.token,
            },
            body: JSON.stringify({
              pageNumber: bets.pageNumber,
              pageSize: bets.pageSize,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        setBets({
          data: data?.data?.orders,
          totalCount: data?.data?.totalCount,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error(error);
        setBets({ error: error.message, data: [], loading: false });
      } finally {
        setBets({ loading: false });
      }
    };
    fetchBets();
  }, [authData, bets.pageNumber]);

  const totalPages = Math.ceil(bets.totalCount / bets.pageSize);

  return (
    <>
      <div className='w-full flex-1 overflow-y-auto flex flex-col'>
        <div
          style={{
            maskImage:
              bets?.data?.length == 0
                ? 'none'
                : 'linear-gradient(to bottom,transparent 0%, black 5%, black 95%, transparent)',
          }}
          className='w-full flex-1 overflow-y-auto flex flex-col gap-2 py-8'
        >
          {bets?.data?.length === 0 && !bets.loading && !bets.error ? (
            <div className='flex text-xl font-bold text-white justify-center items-center'>
              <span className='opacity-50'>No bets found</span>
            </div>
          ) : (
            bets?.data?.map((bet) => (
              <div
                key={bet._id}
                className='w-full relative bg-base-200/40 border-2 border-base-200/20 text-white rounded-xl flex flex-col'
              >
                <button
                  onClick={() => {
                    setSelectedBet({ id: bet._id, open: true });
                  }}
                  className='absolute z-50 top-1 right-1 text-xs text-primary bg-primary/10 px-3 py-1 rounded-lg'
                >
                  Details
                </button>
                <div className='flex flex-col text-xs px-3 py-2 '>
                  <span className={`font-semibold opacity-70`}>
                    #{bet?._id}
                  </span>
                  <span className='opacity-50'>
                    {new Date(bet.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className='grid grid-cols-3 gap-1 p-1 justify-between items-center'>
                  {[
                    {
                      label: 'BET AMOUNT',
                      value: bet.betAmount.toFixed(2),
                      color: 'text-white',
                    },
                    {
                      label: 'ODDS',
                      value: bet.odds.toFixed(2),
                      color: 'text-white',
                    },
                    {
                      label: bet.status === 'WON' ? 'WIN' : 'LOSS',
                      value:
                        bet.status === 'WON'
                          ? bet.winAmount.toFixed(2)
                          : bet.betAmount.toFixed(2),
                      color:
                        bet.status === 'WON' ? 'text-success' : 'text-error',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className='flex flex-col px-3 py-1 items-center rounded-lg flex-1 bg-base-200/40'
                    >
                      <span className='text-[10px] opacity-50'>
                        {item.label}
                      </span>
                      <span className={`text-xs font-semibold ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          {bets.loading && (
            <div className='flex text-xl font-bold text-white justify-center items-center'>
              <span className='opacity-50'>Loading</span>
            </div>
          )}
          {bets.error && (
            <div className='flex text-xl font-bold text-error justify-center items-center'>
              <span className='opacity-50'>{bets.error}</span>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className='flex px-2 font-medium text-sm text-white gap-2 py-1'>
          <span className='px-3 py-1 opacity-70'>
            Page {bets.pageNumber} of {totalPages}
          </span>
          <button
            onClick={() =>
              setBets({ pageNumber: Math.max(1, bets.pageNumber - 1) })
            }
            disabled={bets.pageNumber === 1}
            className='px-3 py-1 flex items-center ml-auto text-primary disabled:opacity-50'
          >
            <ChevronLeftIcon className='w-5 h-5' />
            Previous
          </button>
          <button
            onClick={() =>
              setBets({ pageNumber: Math.min(totalPages, bets.pageNumber + 1) })
            }
            disabled={bets.pageNumber === totalPages}
            className='px-3 flex items-center py-1 text-primary disabled:opacity-50'
          >
            Next <ChevronRightIcon className='w-5 h-5' />
          </button>
        </div>
      </div>
      <BetDetailsModal
        betId={selectedBet.id}
        setOpen={(x) => {
          setSelectedBet({ ...selectedBet, open: x });
        }}
        open={selectedBet.open}
      />
    </>
  );
}

export default page;
