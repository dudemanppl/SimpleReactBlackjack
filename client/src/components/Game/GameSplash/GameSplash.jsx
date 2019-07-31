import React from 'react';
import { splashContainer, logo, button } from './gameSplash.css';

const GameSplash = ({ getNewDeck }) => {
  return (
    <div className={splashContainer}>
      <div className={logo}>Blackjack</div>
      <div className={button} onClick={getNewDeck}>
        Start a new game!
      </div>
    </div>
  );
};

export default GameSplash;
