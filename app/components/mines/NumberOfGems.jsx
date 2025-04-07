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
      <div className=' w-full p-0.5 border-2 border-base-200 rounded-2xl text-white grid grid-cols-4 gap-0.5'>
        {[3, 8, 15, 24].map((amount, index) => (
          <div
            key={amount}
            onClick={() => {
              setValue(amount);
            }}
            className={`h-12 w-full active:scale-[99%] text-lg text-white font-semibold aspect-square flex items-center justify-center ${
              amount === value ? 'bg-primary' : 'bg-base-200'
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
