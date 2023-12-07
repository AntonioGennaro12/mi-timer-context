import React, { useState, useEffect, useContext, createContext } from 'react';
const TimerContext = createContext();

const TimerProvider = ({ children }) => {
    const initialTimers = [  // Inicialización de Timers 
      { id:  0, duration: 20, timeLeft: 20, isRunning: false, isVisible: true },
      { id:  1, duration: 25, timeLeft: 25, isRunning: false, isVisible: true },
      { id:  2, duration: 30, timeLeft: 30, isRunning: false, isVisible: true },
      { id:  3, duration: 35, timeLeft: 35, isRunning: false, isVisible: true },
      { id:  4, duration: 40, timeLeft: 40, isRunning: false, isVisible: true },
      { id:  5, duration: 45, timeLeft: 45, isRunning: false, isVisible: true },
      { id:  6, duration: 50, timeLeft: 50, isRunning: false, isVisible: true },
      { id:  7, duration: 55, timeLeft: 55, isRunning: false, isVisible: true },
      { id:  8, duration: 60, timeLeft: 60, isRunning: false, isVisible: true },
      { id:  9, duration: 65, timeLeft: 65, isRunning: false, isVisible: true },
      { id: 10, duration: 70, timeLeft: 70, isRunning: false, isVisible: true },
      { id: 11, duration: 75, timeLeft: 75, isRunning: false, isVisible: true }
    ];
  
  const [timers, setTimers] = useState(initialTimers);

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
  const startInterval = () => {
    return setInterval(() => {
      setTimers(prevTimers => {
        return prevTimers.map(timer => {
          if (timer.isRunning && timer.timeLeft > 0) {
            return { ...timer, timeLeft: timer.timeLeft - 1 };
          }
          if (timer.isRunning && timer.timeLeft === 0) {
            return { ...timer, isVisible: true, isRunning: false }; 
          }
          return timer;
        });
      });
    }, 1000);
  };

  // Configura un Time interval unico para que todos los timers lo utilicen y no se produzcan corrimeintos
    const interval = startInterval();
    setIntervalId(interval); // Guarda el ID del intervalo

    // Cuando la página se va a cerrar o recargar
    const handleUnload = () => {
      clearInterval(intervalId); // Detiene el intervalo al cerrar la aplicación
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval); // Detiene el intervalo al desmontar el componente
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

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
      return prevTimers.map(timer => {
        if (timer.id === id) {
          return { ...timer, isVisible: false };
        }
        return timer;
      });
    });
  };

  const resetTimer = (id) => {  // NO SE UTILIZA
    setTimers(prevTimers => {
      return prevTimers.map(timer => {
        if (timer.id === id) {
          return { ...timer, timeLeft: timer.duration, isRunning: true, isVisible: true };
        }
        return timer;
      });
    });
  }; 

  const remountTimer = (id) => {
    const foundTimer = timers.find(t => t.id === id);
    if (foundTimer) {
      const updatedTimers = timers.map(timer => {
        if (timer.id === id) {
          return { ...timer, timeLeft: timer.duration, isRunning: false, isVisible: true };
        }
        return timer;
      });
      setTimers(updatedTimers);
    }
  };

  return (
    <TimerContext.Provider value={{ timers, /*decrementTime,*/ toggleTimer, removeTimer, resetTimer, remountTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
