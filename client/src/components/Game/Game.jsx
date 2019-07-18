import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './game.css';

const Game = () => {
  const [deckID, setDeckID] = useState('new');
  const [userDeck, setUserDeck] = useState([]);
  const deckOfCardsAPIURL = 'https://deckofcardsapi.com/api/deck/';

  const getNewDeck = () => {
    const newDeckURL = `${deckOfCardsAPIURL}new/shuffle/`;
    axios.get(newDeckURL).then(({ data }) => {
      setDeckID(data['deck_id']);
    });
  };

  useEffect(() => getNewDeck(), []);

  return (
    <div className={styles.gameContainer}>
      <div>{deckID}</div>
      <button>Draw</button>
    </div>
  );
};

export default Game;
