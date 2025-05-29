import React from "react";
import "./Cards.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) handleChoice(card);
  };

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="inner">
        <div className="front-text">{card.content}</div>
        <div className="back" />
      </div>
    </div>
  );
};

export default Card;
