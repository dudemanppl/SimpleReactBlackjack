import React from 'react';
import { cardContainer, card } from './card.css';

const Card = ({ card: { image } }) => {
  return (
    <div className={cardContainer}>
      <img className={card} src={image} />
    </div>
  );
};

export default Card;
