import React from 'react';
import styles from './card.css';

const Card = ({ card: { image } }) => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.card} src={image} />
    </div>
  );
};

export default Card;
