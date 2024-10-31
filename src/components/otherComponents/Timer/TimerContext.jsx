import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(0); // Start with 0 instead of NaN
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);

  const startTimer = (duration) => {
    setTime(Number(duration) || 0); // Ensure duration is a number
    setActive(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setActive(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setActive(false);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // Cleanup timer on unmount
  }, []);

  return (
    <TimerContext.Provider value={{ time, active, startTimer, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// const TimerContext = createContext();

// export const useTimer = () => useContext(TimerContext);

// export const TimerProvider = ({ children }) => {
//   const [time, setTime] = useState(0);
//   const [active, setActive] = useState(false);
//   const timerRef = useRef(null);

//   const startTimer = (duration) => {
//     const endTime = Date.now() + duration * 1000;
//     localStorage.setItem('endTime', endTime); // Save end time to localStorage
//     setTime(duration);
//     setActive(true);
    
//     timerRef.current = setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timerRef.current);
//           setActive(false);
//           localStorage.removeItem('endTime'); // Clear end time
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//   };

//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//     setActive(false);
//     localStorage.removeItem('endTime');
//   };

//   useEffect(() => {
//     // Check if there’s a timer in progress when the component mounts
//     const savedEndTime = localStorage.getItem('endTime');
//     if (savedEndTime) {
//       const remainingTime = Math.floor((savedEndTime - Date.now()) / 1000);
//       if (remainingTime > 0) {
//         startTimer(remainingTime);
//       } else {
//         stopTimer();
//       }
//     }

//     return () => clearInterval(timerRef.current);
//   }, []);

//   return (
//     <TimerContext.Provider value={{ time, active, startTimer, stopTimer }}>
//       {children}
//     </TimerContext.Provider>
//   );
// };

