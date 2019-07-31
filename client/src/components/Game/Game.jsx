import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { gameContainer } from './game.css';
import GameSplash from './GameSplash/GameSplash.jsx';
import LowerUI from './LowerUI/LowerUI.jsx';
import Cards from './Cards/Cards.jsx';

const Game = () => {
  const [deckID, setDeckID] = useState('new');
  const [userDeck, setUserDeck] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [userCardSum, setUserCardSum] = useState(0);
  const [roundWinner, setRoundWinner] = useState('');
  const deckOfCardsAPIURL = 'https://deckofcardsapi.com/api/deck';

  // gets new deck on new game
  useEffect(() => {
    getNewDeck();
  }, []);

  // runs sum checker every time userDeck is updated
  useEffect(() => {
    const setSum = async () => {
      const sum = await getCardSum(userDeck);
      setUserCardSum(sum);
    };
    setSum();
  }, [userDeck]);

  const getNewDeck = async () => {
    const newDeckURL = `${deckOfCardsAPIURL}/new/`;
    const { data } = await axios.get(newDeckURL);
    const newDeckID = await data['deck_id'];
    setDeckID(newDeckID);
  };

  // makes api call to get a certain amount of cards, returns concatenated array
  const drawCard = (num, deck = []) => {
    return new Promise(async resolve => {
      const {
        data: { cards }
      } = await axios.get(`${deckOfCardsAPIURL}/${deckID}/draw/?count=${num}`);

      resolve([...deck, ...cards.map(({ image, value }) => ({ image, value }))]);
    });
  };

  // returns a number of current sum of players card
  const getCardSum = deck => {
    return new Promise(async resolve => {
      const sum = await deck.reduce((acc, card) => {
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
  const startNewGame = async () => {
    setRoundWinner('');
    setGameStart(true);
    const newDeck = await drawCard(2);
    setUserDeck(newDeck);
  };

  // very rudimentary dealer logic...
  const dealer = async () => {
    let dealerDeck = await drawCard(2);
    let dealerCardSum = await getCardSum(dealerDeck);

    while (dealerCardSum >= 20) {
      dealerDeck = await drawCard(1, dealerDeck);
    }
    const winner = await findWinner(dealerCardSum);
    setRoundWinner(winner);
  };

  const findWinner = dealerCardSum => {
    return new Promise(resolve => {
      if (dealerCardSum <= 21) {
        if (dealerCardSum > userCardSum) {
          resolve('Dealer');
        } else if (dealerCardSum < userCardSum) {
          resolve('User');
        } else {
          resolve('Draw');
        }
      } else {
        resolve('User');
      }
    });
  };

  return (
    <div className={gameContainer}>
      <Cards userDeck={userDeck} />
      {!gameStart && <GameSplash startNewGame={startNewGame} />}
      {gameStart && (
        <LowerUI
          drawCard={drawCard}
          userCardSum={userCardSum}
          userDeck={userDeck}
          setUserDeck={setUserDeck}
          dealer={dealer}
          startNewGame={startNewGame}
          roundWinner={roundWinner}
        />
      )}
    </div>
  );
};

export default Game;
