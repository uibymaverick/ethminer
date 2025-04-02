const EthLogo = (props) => {
  const { grayscale, ...rest } = props;
  return (
    <>
      {grayscale ? (
        <svg
          width={494}
          height={494}
          viewBox='0 0 494 494'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...rest}
        >
          <path
            d='M246.953 0L243.642 11.2567V337.901L246.953 341.207L398.578 251.582L246.953 0Z'
            fill='#343434'
          />
          <path
            d='M246.955 0L95.3301 251.582L246.955 341.208V182.665V0Z'
            fill='#8C8C8C'
          />
          <path
            d='M246.953 369.915L245.087 372.19V488.548L246.953 494L398.668 280.336L246.953 369.915Z'
            fill='#3C3C3B'
          />
          <path
            d='M246.955 493.998V369.914L95.3301 280.334L246.955 493.998Z'
            fill='#8C8C8C'
          />
          <path
            d='M246.953 341.206L398.575 251.583L246.953 182.665V341.206Z'
            fill='#141414'
          />
          <path
            d='M95.3311 251.583L246.953 341.206V182.666L95.3311 251.583Z'
            fill='#393939'
          />
        </svg>
      ) : (
        <svg
          width={12}
          height={12}
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...rest}
        >
          <path
            d='M6.00077 11.9341V8.95649L2.31738 6.80249L6.00077 11.9341Z'
            fill='#F0CDC2'
            stroke='#1616B4'
            strokeWidth={0.0659341}
            strokeLinejoin='round'
          />
          <path
            d='M6.0127 11.9341V8.95649L9.69606 6.80249L6.0127 11.9341Z'
            fill='#C9B3F5'
            stroke='#1616B4'
            strokeWidth={0.0659341}
            strokeLinejoin='round'
          />
          <path
            d='M6.00005 8.21646V4.41626L2.27441 6.08456L6.00005 8.21646Z'
            fill='#88AAF1'
            stroke='#1616B4'
            strokeWidth={0.0659341}
            strokeLinejoin='round'
          />
          <path
            d='M6.0127 8.21646V4.41626L9.73835 6.08456L6.0127 8.21646Z'
            fill='#C9B3F5'
            stroke='#1616B4'
            strokeWidth={0.0659341}
            strokeLinejoin='round'
          />
          <path
            d='M2.27441 6.08445L6.00004 0.065918V4.41616L2.27441 6.08445Z'
            fill='#F0CDC2'
            stroke='#1616B4'
            strokeWidth={0.0659341}
            strokeLinejoin='round'
          />
          <path
            d='M9.73833 6.08445L6.0127 0.065918V4.41616L9.73833 6.08445Z'
            fill='#B8FAF6'
            stroke='#1616B4'
            strokeWidth={0.0659341}
            strokeLinejoin='round'
          />
        </svg>
      )}
    </>
  );
};
export default EthLogo;
