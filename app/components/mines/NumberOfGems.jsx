function NumberOfGems({ value, setValue, disabled }) {
  return (
    <div
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      className='flex flex-col gap-1'
    >
      <label className='text-xs ml-3 font-semibold text-primary'>MINES</label>
      <div className=' w-full p-0.5 border-2 border-base-100/50 bg-base-200/40 rounded-2xl text-white grid grid-cols-4 gap-0.5'>
        {[4, 9, 16, 24].map((amount, index) => (
          <div
            key={amount}
            onClick={() => {
              setValue(amount);
            }}
            className={`h-12 w-full text-lg text-white font-semibold aspect-square flex items-center justify-center ${
              amount === value ? 'bg-primary' : 'bg-base-200/60'
            } ${
              index === 0 ? 'rounded-l-xl' : index === 3 ? 'rounded-r-xl' : ''
            }`}
          >
            {amount}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumberOfGems;
