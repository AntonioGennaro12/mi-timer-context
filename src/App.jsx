import React from 'react';
import Timer from './componentes/Timer.jsx';
import { TimerProvider } from './contexto/TimerContext.jsx';
import './App.css'

const App = () => {
  return (
    <TimerProvider>
      {/* Aquí otros componentes de la aplicación */}
      <div className="cont-timer">
        <Timer id={0} />
      </div>
      <div className="cont-timer">
        <Timer id={1} />
      </div>
      <div className="cont-timer">
        <Timer id={2} />
      </div>
      <div className="cont-timer">
        <Timer id={3} />
      </div>
      <div className="cont-timer">
        <Timer id={4} />
      </div>
      <div className="cont-timer">
        <Timer id={5} />
      </div>
      <div className="cont-timer">
        <Timer id={6} />
      </div>
      <div className="cont-timer">
        <Timer id={7} />
      </div>
      <div className="cont-timer">
        <Timer id={8} />
      </div>
      <div className="cont-timer">
        <Timer id={9} />
      </div>
      <div className="cont-timer">
        <Timer id={10} />
      </div>
      <div className="cont-timer">
        <Timer id={11} />
      </div>
      {/* ...otros timers con diferentes índices */}
      
    </TimerProvider>
  );
};

export default App;
