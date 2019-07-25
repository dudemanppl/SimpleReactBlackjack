import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './game.css';
import GameSplash from './GameSplash/GameSplash.jsx';
import LowerUI from './LowerUI/LowerUI.jsx';
import Cards from './Cards/Cards.jsx';

const Game = () => {
  const [deckID, setDeckID] = useState('new');
  const [userDeck, setUserDeck] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [userCardSum, setUserCardSum] = useState(0);
  const [dealerCardSum, setDealerCardSum] = useState(0);
  const [roundWinner, setRoundWinner] = useState('');
  const deckOfCardsAPIURL = 'https://deckofcardsapi.com/api/deck';

  const getNewDeck = () => {
    const newDeckURL = `${deckOfCardsAPIURL}/new/shuffle/`;
    axios.get(newDeckURL).then(({ data }) => {
      setDeckID(data['deck_id']);
    });
  };

  // makes api call to get a certain amount of cards, returns data wrangled array with image and value, runs callback to set deck
  const drawCard = (num, deck) => {
    return new Promise(resolve => {
      axios.get(`${deckOfCardsAPIURL}/${deckID}/draw/?count=${num}`).then(({ data }) => {
        const cards = data.cards.map(card => {
          return { image: card.image, value: card.value };
        });
        resolve([...deck, ...cards]);
      });
    });
  };

  // returns a number of current sum of players card
  const getCardSum = deck => {
    return new Promise(resolve => {
      const sum = deck.reduce((acc, card) => {
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

      resolve(sum);
    });
  };

  // sets conditonal rendering of game to show up, draws 2 cards from the deck
  const startNewGame = () => {
    setGameStart(true);
    drawCard(2, userDeck).then(newDeck => {
      setUserDeck(newDeck);
    });
  };

  // very rudimentary dealer logic...
  const dealer = () => {
    drawCard(2, dealerDeck).then(deck => {
      setDealerDeck(deck);
    });
    // if (dealerCardSum >= 20) {
    //   findWinner();
    // } else {
    //   // while (dealerCardSum < 20) {
    //   //   drawCard(1, setDealerDeck, dealerDeck);
    //   // }
    //   findWinner();
    // }
  };

  const findWinner = () => {
    if (dealerCardSum <= 21) {
      if (dealerCardSum > userCardSum) {
        setRoundWinner('Dealer');
      } else if (dealerCardSum < userCardSum) {
        setRoundWinner('User');
      } else {
        setRoundWinner('Draw');
      }
    } else {
      setRoundWinner('User');
    }
  };

  // gets new deck on new game
  useEffect(() => getNewDeck(), []);

  // runs sum checker every time userDeck is updated
  useEffect(() => {
    getCardSum(userDeck).then(sum => {
      setUserCardSum(sum);
    });
  }, [userDeck]);

  useEffect(() => {
    getCardSum(dealerDeck).then(sum => {
      setDealerCardSum(sum);
    });
    console.log(dealerCardSum);
  }, [dealerDeck]);

  return (
    <div className={styles.gameContainer}>
      <Cards userDeck={userDeck} />
      {!gameStart && <GameSplash startNewGame={startNewGame} />}
      {gameStart && (
        <LowerUI
          drawCard={drawCard}
          userCardSum={userCardSum}
          userDeck={userDeck}
          setUserDeck={setUserDeck}
          dealer={dealer}
        />
      )}
    </div>
  );
};

export default Game;
