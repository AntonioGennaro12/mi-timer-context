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
      {/* ...otros timers con diferentes índices */}
      
    </TimerProvider>
  );
};

export default App;
