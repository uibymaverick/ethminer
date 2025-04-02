function AmountInput({ value, setValue, disabled }) {
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
        <div className='absolute flex gap-0.5 top-0 right-0 p-1 h-full'>
          {['1/2', '2x', '5x'].map((amount) => (
            <div
              key={amount}
              onClick={() => {
                if (amount === '1/2') {
                  setValue(value / 2);
                } else if (amount === '2x') {
                  setValue(value * 2);
                } else if (amount === '5x') {
                  setValue(value * 5);
                }
              }}
              className={`bg-base-200/60 text-white font-semibold aspect-square flex items-center justify-center ${
                amount === '1/2'
                  ? 'rounded-l-xl'
                  : amount === '5x'
                  ? 'rounded-r-xl'
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
