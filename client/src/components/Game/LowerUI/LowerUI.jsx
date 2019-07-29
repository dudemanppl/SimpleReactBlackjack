import React from 'react';
import classNames from 'classnames';
import styles from './lowerUI.css';

const LowerUI = ({ drawCard, userCardSum, setUserDeck, userDeck, dealer }) => {
  return (
    <div>
      {userCardSum <= 21 ? (
        <div className={styles.buttonContainer}>
          <div
            className={classNames(styles.lowerText, styles.animated)}
            onClick={() => drawCard(1, userDeck).then(deck => setUserDeck(deck))}
          >
            Hit
          </div>
          <div className={classNames(styles.lowerText, styles.animated)} onClick={dealer}>
            Stand
          </div>
        </div>
      ) : (
        <div className={styles.lowerText}>Bust!</div>
      )}
    </div>
  );
};

export default LowerUI;
