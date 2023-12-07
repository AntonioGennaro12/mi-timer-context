import React, { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexto/TimerContext.jsx';
import "./estilos/Timer.css";

  const Timer = ({ id }) => {
  const { timers, toggleTimer, removeTimer, resetTimer, remountTimer } = useContext(TimerContext);
  const timer = timers.find(t => t.id === id);

  const handleToggle = () => {
    if (timer.timeLeft > 0) {
      toggleTimer(id);
    } else {
      remountTimer(id);
    }
  };

  const handleRemove = () => {
    removeTimer(id);
  };

  const handleCambioDuracion = (event) => {
    timer.duration = event.target.value;
  };

  const handleStartStop = () => {
    if (!timer.isRunning) {
      // Si no está corriendo, se verifica si está en el valor máximo o detenido
      if (timer.timeLeft === timer.duration) {
        resetTimer(id); // Reiniciar si está en el máximo
      } else {
        toggleTimer(id); // Continuar si está detenido
      }
    } else {
      toggleTimer(id); // Detener si está en marcha
    }
  };

  const handleRestart = () => {
    resetTimer(id); // Reiniciar desde el valor máximo
  };

  return (
    <div className="cont-timer">
      {timer && timer.isVisible ? (
        <div id="mi-timer" style={{ backgroundColor: timer.timeLeft === 0 ? 'red' : timer.timeLeft < timer.duration ? 'yellow' : 'lightgreen'}}>
          <h2>Timer {id+1}</h2>
          <p>Corriendo: {timer.isRunning && timer.timeLeft !== timer.duration && timer.timeLeft !== 0 ? 'Sí' : 'No'}</p>
          <p>Duración: {timer.duration} </p>
          <input type="number" placeholder="Nueva duración" onChange={handleCambioDuracion} style={{ width:'120px'}}/>
          <p>Tiempo restante: {timer.timeLeft}</p>
          <button onClick={handleStartStop}>{timer.isRunning ? 'Detener' : 'Iniciar'}</button>
          <button onClick={handleRemove}>Desmontar</button>
          <button onClick={handleRestart}>Reiniciar Timer</button>
        </div>
      ) : (
        <button onClick={() => remountTimer(id)} style={{ width:'100px'}}>Montar Timer</button>
      )}
    </div>
  );
};

export default Timer;
