import { memo, useEffect, useState } from 'react';

function AnimatedNumber({
  number = 0,
  speed = 10,
  startFromZero = false,
  animateOn = true,
}) {
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (number === 0 || number === null || number === undefined) return;
    const startNumber = startFromZero ? 0 : displayNumber;
    const difference = number - startNumber;
    if (difference === 0) return;
    const increment = difference / 10; // Calculate increment as difference/10
    const totalSteps = 10; // Fixed 10 steps
    let currentStep = 0;

    setDisplayNumber(startNumber);

    const interval = setInterval(() => {
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setDisplayNumber(number);
        return;
      }

      setDisplayNumber((prev) => +(prev + increment).toFixed(2));
      currentStep++;
    }, speed); // Fixed 50ms interval for smooth animation

    return () => clearInterval(interval);
  }, [number, animateOn]);

  return <>{displayNumber.toFixed(2)}</>;
}

export default memo(AnimatedNumber);
