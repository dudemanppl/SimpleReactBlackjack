import React from 'react';
import { splashContainer, logo, button } from './gameSplash.css';

const GameSplash = ({ startNewGame }) => {
  return (
    <div className={splashContainer}>
      <div className={logo}>Blackjack</div>
      <div className={button} onClick={startNewGame}>
        Start a new game!
      </div>
    </div>
  );
};

export default GameSplash;
