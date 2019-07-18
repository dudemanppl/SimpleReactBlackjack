import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './game.css';
import Buttons from './Buttons/Buttons.jsx';
import Cards from './Cards/Cards.jsx';

const Game = () => {
  const [deckID, setDeckID] = useState('new');
  const [userDeck, setUserDeck] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [cardSum, setCardSum] = useState(0);
  const deckOfCardsAPIURL = 'https://deckofcardsapi.com/api/deck';

  const getNewDeck = () => {
    const newDeckURL = `${deckOfCardsAPIURL}/new/shuffle/`;
    axios.get(newDeckURL).then(({ data }) => {
      setDeckID(data['deck_id']);
    });
  };

  const drawCard = num => {
    axios.get(`${deckOfCardsAPIURL}/${deckID}/draw/?count=${num}`).then(({ data }) => {
      const cards = data.cards.map(card => {
        return { image: card.image, value: card.value };
      });
      setUserDeck([...userDeck, ...cards]);
    });
  };

  // returns a number of current sum of players card
  const getCardSum = () => {
    return userDeck.reduce((acc, card) => {
      const { value } = card;
      if (value === 'JACK' || value === 'QUEEN' || value === 'KING') {
        return acc + 10;
      } else if (value === 'ACE') {
        // this isn't perfect...
        return acc + 11 <= 21 ? acc + 11 : acc + 1;
      } else {
        return acc + Number(value);
      }
    }, 0);
  };

  const startNewGame = () => {
    setGameStart(true);
    drawCard(2);
  };

  useEffect(() => getNewDeck(), []);

  useEffect(() => setCardSum(getCardSum()));

  return (
    <div className={styles.gameContainer}>
      {/* <div>{JSON.stringify(userDeck)}</div> */}
      <Cards userDeck={userDeck} />
      {!gameStart && <button onClick={startNewGame}>Start Game!</button>}
      {gameStart && <Buttons drawCard={drawCard} />}
    </div>
  );
};

export default Game;
