import React from 'react';
import classNames from 'classnames';
import styles from './lowerUI.css';

const LowerUI = ({ drawCard, cardSum }) => {
  return (
    <div>
      {cardSum <= 21 ? (
        <div className={styles.buttonContainer}>
          <div
            className={classNames(styles.lowerText, styles.animated)}
            onClick={() => drawCard(1)}
          >
            Hit
          </div>
          <div className={classNames(styles.lowerText, styles.animated)}>Stand</div>
        </div>
      ) : (
        <div className={classNames(styles.lowerText, styles.bust)}>Bust!</div>
      )}
    </div>
  );
};

export default LowerUI;
