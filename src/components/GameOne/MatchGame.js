import React, { useEffect, useState } from "react";
import Card from "./Cards.js";
import "./MatchGame.css";
import winSound from "../../assets/win.mp3";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { saveGameProgress } from "../utils/saveGameProgress";
import { auth } from "../../firebase";

const initialPairs = [
  { id: 1, type: "Right", content: "Right to Education Act (RTE), 2009", pairId: "education" },
  { id: 2, type: "Description", content: "Guarantees free and compulsory education to all children aged 6 to 14 in India.", pairId: "education" },
  { id: 3, type: "Right", content: "Individuals with Disabilities Education Act (IDEA)", pairId: "protection" },
  { id: 4, type: "Description", content: "Ensures students with disabilities receive free, appropriate public education with tailored support.", pairId: "protection" },
  { id: 5, type: "Right", content: "Title IX of the Education Amendments, 1972", pairId: "survival" },
  { id: 6, type: "Description", content: "Prohibits gender-based discrimination in educational institutions receiving federal funding", pairId: "survival" },
  { id: 7, type: "Right", content: "Sarva Shiksha Abhiyan (SSA)", pairId: "participation" },
  { id: 8, type: "Description", content: "A nationwide program aimed at universalizing elementary education and improving school access and quality.", pairId: "participation" },
  { id: 9, type: "Right", content: "Every Student Succeeds Act (ESSA), 2015", pairId: "identity" },
  { id: 10, type: "Description", content: "Gives states more control over education standards while promoting equity and support for struggling schools.", pairId: "identity" },
];

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MatchGame = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const navigate = useNavigate();
  const winAudio = new Audio(winSound);

  useEffect(() => {
    setCards(shuffle(initialPairs.map(card => ({ ...card, matched: false }))));
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.pairId === choiceTwo.pairId && choiceOne.id !== choiceTwo.id) {
        setCards(prev =>
          prev.map(card =>
            card.pairId === choiceOne.pairId ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setGameWon(true);
      winAudio.play();
      handleGameComplete();
    }
  }, [cards]);

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const startNewGame = () => {
    setCards(shuffle(initialPairs.map(card => ({ ...card, matched: false }))));
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameWon(false);
    setDisabled(false);
  };

  const handleGameComplete = async () => {
    const user = auth.currentUser;
    if (user) {
      await saveGameProgress(user.uid, "education");
    }
  };

  return (
    <div className="game-container">
      <h2>🎯 Match the Right!</h2><br/><br/>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      {gameWon && (
        <>
          <Confetti />
          <div className="popup">
            <h2>🎉 You Matched All Rights!</h2>
            <button onClick={startNewGame}>Play Again</button>
            <button onClick={() => navigate("/education")}>Back to Education</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchGame;
