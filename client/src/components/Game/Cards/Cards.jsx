import React from 'react';
import styles from './cards.css';
import Card from './Card/Card.jsx';

const Cards = ({ userDeck }) => {
  return (
    <div className={styles.cardsContainer}>
      {userDeck.map(card => (
        <Card card={card} key={card.image} />
      ))}
    </div>
  );
};

export default Cards;
