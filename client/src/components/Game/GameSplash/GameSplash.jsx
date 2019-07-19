import React from 'react';
import styles from './gameSplash.css';

const GameSplash = ({ startNewGame }) => {
  return (
    <div className={styles.button} onClick={startNewGame}>
      Start a new game!
    </div>
  );
};

export default GameSplash;
