import { useGameContext } from '@/app/games/layout';

function AmountInput({ value, setValue, disabled }) {
  const { balance } = useGameContext();
  return (
    <div
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      className='flex flex-col gap-1'
    >
      <label className='text-xs ml-3 font-semibold text-success'>AMOUNT</label>
      <div className='relative w-full'>
        <input
          type='text'
          className='input w-full text-lg'
          placeholder='Enter amount'
          value={value}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setValue(value);
          }}
        />
        <div className='absolute grid grid-cols-2 gap-0.5 top-0 right-0 p-1 h-full'>
          {['1/2', '2x', 'Min', 'Max'].map((amount) => (
            <div
              key={amount}
              onClick={() => {
                if (amount === '1/2') {
                  setValue(value / 2);
                } else if (amount === '2x') {
                  setValue(value * 2);
                } else if (amount === 'Min') {
                  setValue(1);
                } else if (amount === 'Max') {
                  setValue(Number(balance.toFixed(2)));
                }
              }}
              className={`bg-base-200 active:scale-[99%] px-4 text-white font-semibold flex items-center justify-center ${
                amount === 'Max'
                  ? 'rounded-br-xl'
                  : amount === '2x'
                  ? 'rounded-tr-xl'
                  : ''
              }`}
            >
              {amount}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AmountInput;
