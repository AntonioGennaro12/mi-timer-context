import React from 'react';
import Timer from './componentes/Timer.jsx';
import { TimerProvider } from './contexto/TimerContext.jsx';
import './App.css'

const App = () => {
  return (
    <TimerProvider>
      {/* Aquí otros componentes de la aplicación */}
      <div id="mi-titulo">
        <h1>TABLERO DE TIMERS DE USUARIO</h1>
      </div>
      <div id="mis-timers">
        <Timer id={0} />
        <Timer id={1} />
        <Timer id={2} />
        <Timer id={3} />
        <Timer id={4} />
        <Timer id={5} />
        <Timer id={6} />
        <Timer id={7} />
        <Timer id={8} />
        <Timer id={9} />
        <Timer id={10} />
        <Timer id={11} />
        {/* ...otros timers con diferentes índices */}
      </div>
    </TimerProvider>
  );
};

export default App;
