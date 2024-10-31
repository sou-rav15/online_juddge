import React from 'react';
import { useTimer } from './TimerContext';
import './Timer.css'
const Timer = () => {
  const { time, active } = useTimer();

  return (
    <div>
      {active ? (
        <h2>Time Left: {time}s</h2>
      ) : (
        <h2>Timer is not running.</h2>
      )}
    </div>
  );
};

export default Timer;
