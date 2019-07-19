import React from 'react';
import styles from './buttons.css';

const Buttons = ({ drawCard }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.button} onClick={() => drawCard(1)}>
        Hit
      </div>
      <div className={styles.button}>Stand</div>
    </div>
  );
};

export default Buttons;
