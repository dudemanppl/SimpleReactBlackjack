import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './game.css';
import GameSplash from './GameSplash/GameSplash.jsx';
import LowerUI from './LowerUI/LowerUI.jsx';
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

  // makes api call to get a certain amount of cards, returns data wrangled array with image and value
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

  // sets conditonal rendering of game to show up, draws 2 cards from the deck
  const startNewGame = () => {
    setGameStart(true);
    drawCard(2);
  };

  // gets new deck on new game
  useEffect(() => getNewDeck(), []);

  // runs sum checker every time userDeck is updated
  useEffect(() => setCardSum(getCardSum()), [userDeck]);

  return (
    <div className={styles.gameContainer}>
      <Cards userDeck={userDeck} />
      {!gameStart && <GameSplash startNewGame={startNewGame} />}
      {gameStart && <LowerUI drawCard={drawCard} cardSum={cardSum} />}
    </div>
  );
};

export default Game;
