import React, { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexto/TimerContext.jsx';
import "./estilos/Timer.css";


const Timer = ({ id }) => {
  const { timers, decrementTime, toggleTimer, removeTimer, resetTimer, remountTimer } = useContext(TimerContext);
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
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleRemove = () => {
    removeTimer(id);
  };


  const handleRemount = () => {
    const foundTimer = timers.find(t => t.id === id);
    if (foundTimer) {
      resetTimer(id);
      setIsRunning(true); // Forzar el reinicio del timer al remontarlo
    } else {
      remountTimer(id); // Llama a la función remountTimer con el ID correspondiente
    }
  };

    return (
      <div>
        {timer && timer.isVisible ? (
          <div>
            <h2>Timer {id}</h2>
            <p>Tiempo restante: {timer.timeLeft}</p>
            <button onClick={handleToggle}>{isRunning ? 'Detener' : 'Continuar'}</button>
            <button onClick={handleRemove}>Desmontar</button>
            <button onClick={handleRemount}>Reiniciar Timer</button>
          </div>
        ) : (
          <button onClick={() => remountTimer(id)}>Montar Timer</button>
        )}
      </div>
    );
  
  };
  
  export default Timer;
