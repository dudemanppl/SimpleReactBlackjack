import React from 'react';
import classNames from 'classnames';
import { buttonContainer, lowerText, options, animated, button } from './lowerUI.css';

const LowerUI = ({
  drawCard,
  userCardSum,
  setUserDeck,
  userDeck,
  dealer,
  startNewGame,
  roundWinner
}) => {
  return (
    <div>
      {userCardSum <= 21 && !roundWinner && (
        <div className={buttonContainer}>
          <div
            className={classNames(lowerText, animated, button)}
            onClick={() => drawCard(1, userDeck).then(deck => setUserDeck(deck))}
          >
            Hit
          </div>
          <div
            className={classNames(lowerText, animated, button)}
            onClick={() => {
              dealer();
            }}
          >
            Stand
          </div>
        </div>
      )}
      {userCardSum > 21 && !roundWinner && (
        <div className={classNames(buttonContainer, options)}>
          <div className={lowerText}>Bust!</div>
          <div className={classNames(animated, lowerText, options)} onClick={startNewGame}>
            Draw again
          </div>
        </div>
      )}
      {!!roundWinner && (
        <div className={classNames(buttonContainer, options)}>
          <div className={lowerText}>{`${roundWinner} has won!`}</div>
          <div className={classNames(animated, lowerText, options)} onClick={startNewGame}>
            Draw again
          </div>
        </div>
      )}
    </div>
  );
};

export default LowerUI;
