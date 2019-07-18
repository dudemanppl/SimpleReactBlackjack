import React from 'react';
import styles from './buttons.css';

const Buttons = ({ drawCard }) => {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => drawCard(1)}>Hit</button>
      <button>Stand</button>
    </div>
  );
};

export default Buttons;
