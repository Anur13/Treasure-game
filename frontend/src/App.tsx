import React from 'react';
import 'modern-normalize/modern-normalize.css';
import { GameBoard } from './components/Gameboard/GameBoard';
import './common/_globals.scss';

function App() {
  return (
    <body>
      <div className="container">
        <GameBoard />
      </div>
    </body>
  );
}

export default App;
