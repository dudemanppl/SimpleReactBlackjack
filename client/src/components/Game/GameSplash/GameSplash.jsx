import React from 'react';
import styles from './gameSplash.css';

const GameSplash = ({ startNewGame }) => {
  return (
    <div className={styles.splashContainer}>
      <div className={styles.logo}>Blackjack</div>
      <div className={styles.button} onClick={startNewGame}>
        Start a new game!
      </div>
    </div>
  );
};

export default GameSplash;
