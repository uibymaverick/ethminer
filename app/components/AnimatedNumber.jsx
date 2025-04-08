import { memo, useEffect, useState } from 'react';

function AnimatedNumber({
  number = 0,
  speed = 10,
  startFromZero = false,
  animateOn = true,
  changeColor = false,
}) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [increasing, setIncreasing] = useState(false);

  useEffect(() => {
    if (number === 0 || number === null || number === undefined) return;
    const startNumber = startFromZero ? 0 : displayNumber;
    const difference = number - startNumber;
    if (difference === 0) return;

    setAnimating(true);
    setIncreasing(difference > 0);

    const totalSteps = 100;
    const increment = difference / 100;
    let currentStep = 0;

    setDisplayNumber(startNumber);

    const interval = setInterval(() => {
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setDisplayNumber(number);
        setAnimating(false);
        return;
      }

      setDisplayNumber((prev) => +(prev + increment).toFixed(2));
      currentStep++;
    }, speed); // Fixed 50ms interval for smooth animation

    return () => {
      clearInterval(interval);
      setAnimating(false);
    };
  }, [number, animateOn]);

  const textColor =
    changeColor && animating
      ? increasing
        ? 'text-success scale-110'
        : 'text-error scale-110'
      : '';

  return (
    <span className={`${textColor} transition-all duration-300`}>
      {displayNumber.toFixed(2)}
    </span>
  );
}

export default memo(AnimatedNumber);
