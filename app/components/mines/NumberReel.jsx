function NumberReel({ result, active }) {
  const multipliers = result?.multipliers || [];

  return (
    <div
      style={{
        maskImage:
          multipliers?.length == 0
            ? 'none'
            : 'linear-gradient(to right,black 0%, black 80%, transparent)',
      }}
      className='relative h-4 w-5/6 overflow-hidden'
    >
      <div
        className='flex absolute top-1/2 -translate-y-1/2 transition-transform duration-300'
        style={{
          transform: `translateX(-${active * 80}px)`,
        }}
      >
        {multipliers.map((multiplier, index) => (
          <div
            key={index}
            style={{
              transform: `scale(${1 - (index - active) / 10})`,
            }}
            className={`w-20 flex items-center justify-center text-lg font-bold  ${
              index === active ? 'text-success' : 'text-white/50'
            } `}
          >
            {multiplier}x
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumberReel;
