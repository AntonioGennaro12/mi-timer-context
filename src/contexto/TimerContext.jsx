import React, { useState, useEffect, useContext, createContext } from 'react';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([
    { id: 0, timeLeft: 20, isRunning: true },
    { id: 1, timeLeft: 30, isRunning: true },
    { id: 2, timeLeft: 40, isRunning: true },
    { id: 3, timeLeft: 50, isRunning: true }
  ]);

  const decrementTime = (id) => {
    setTimers(prevTimers => {
      return prevTimers.map(timer => {
        if (timer.id === id && timer.isRunning && timer.timeLeft > 0) {
          return { ...timer, timeLeft: timer.timeLeft - 1 };
        }
        return timer;
      });
    });
  };

  const toggleTimer = (id) => {
    setTimers(prevTimers => {
      return prevTimers.map(timer => {
        if (timer.id === id) {
          return { ...timer, isRunning: !timer.isRunning };
        }
        return timer;
      });
    });
  };

  const removeTimer = (id) => {
    setTimers(prevTimers => {
      return prevTimers.filter(timer => timer.id !== id);
    });
  };

  return (
    <TimerContext.Provider value={{ timers, decrementTime, toggleTimer, removeTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };

