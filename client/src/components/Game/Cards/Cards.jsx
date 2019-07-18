import React from 'react';
import styles from './cards.css';
import Card from './Card/Card.jsx';

const Cards = ({ userDeck }) => {
  return (
    <div className={styles.cardsContainer}>
      {userDeck.map(card => {
        return <Card card={card} key={card.value} />;
      })}
    </div>
  );
};

export default Cards;
