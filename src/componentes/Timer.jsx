import React, { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexto/TimerContext.jsx';
import "./estilos/Timer.css";

const Timer = ({ id }) => {
  const { timers, decrementTime, toggleTimer, removeTimer } = useContext(TimerContext);
  const timer = timers.find(t => t.id === id);
  const [isRunning, setIsRunning] = useState(timer?.isRunning || false);

  useEffect(() => {
    let interval;
    if (isRunning && timer?.timeLeft > 0) {
      interval = setInterval(() => {
        decrementTime(id);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [id, isRunning, timer, decrementTime]);

  const handleToggle = () => {
    toggleTimer(id);
    setIsRunning(!isRunning);
  };

  const handleRemove = () => {
    removeTimer(id);
  };

  const handleRemount = () => {
    const foundTimer = timers.find(t => t.id === id);
    if (foundTimer) {
      setIsRunning(foundTimer.isRunning);
      decrementTime(id, foundTimer.duration); // Reiniciar el tiempo restante al valor inicial
    }
  };

    return (
      <div>
        {!timer && (
          <button onClick={handleRemount}>Montar Timer</button>
        )}
        {timer && (
          <div>
            <h2>Timer {id}</h2>
            <p>Tiempo restante: {timer.timeLeft}</p>
            <button onClick={handleToggle}>{isRunning ? 'Detener' : 'Continuar'}</button>
            <button onClick={handleRemove}>Desmontar</button>
            <button onClick={handleRemount}>Montar timer</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Timer;

/*
import React, { useContext, useEffect } from 'react';
import { TimerContext } from '../contexto/TimerContext.jsx';
import "./estilos/Timer.css";

const Timer = ({ id }) => {
  const { timers, decrementTime, toggleTimer, removeTimer } = useContext(TimerContext);
  const timer = timers.find(t => t.id === id);

  useEffect(() => {
    const interval = setInterval(() => {
      decrementTime(id);
    }, 1000);

    return () => clearInterval(interval);
  }, [id, decrementTime]);

  const handleToggle = () => {
    toggleTimer(id);
  };

  const handleRemove = () => {
    removeTimer(id);
  };

  if (!timer) {
    return null;
  }

  return (
    <div>
      <h2>Timer {id}</h2>
      <p>Tiempo restante: {timer.timeLeft}</p>
      <button onClick={handleToggle}>{timer.isRunning ? 'Detener' : 'Continuar'}</button>
      <button onClick={handleRemove}>Quitar</button>
    </div>
  );
};

export default Timer;
*/
