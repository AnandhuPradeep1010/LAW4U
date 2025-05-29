import React, { useState, useEffect, useRef } from "react";
import "./GameTwo.css";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import winSound from "../../assets/win.mp3";
import { saveGameProgress } from "../utils/saveGameProgress";
import { auth } from "../../firebase";

const story = [
  {
    story: "You are at school and see a friend being bullied.",
    question: "What should you do?",
    options: [
      { text: "Tell a teacher or adult", isCorrect: true },
      { text: "Ignore it and walk away", isCorrect: false },
    ],
  },
  {
    story: "You see a stranger trying to talk to kids at the park.",
    question: "What should you do?",
    options: [
      { text: "Talk to the stranger", isCorrect: false },
      { text: "Inform your parents or a trusted adult", isCorrect: true },
    ],
  },
  {
    story: "Someone online asks you for your home address.",
    question: "What should you do?",
    options: [
      { text: "Share it since they’re friendly", isCorrect: false },
      { text: "Never share personal info online", isCorrect: true },
    ],
  },
  {
    story: "You see a child working in a factory.",
    question: "What’s the right action?",
    options: [
      { text: "Report it to child helpline or authorities", isCorrect: true },
      { text: "Take a photo and post it online", isCorrect: false },
    ],
  },
  {
    story: "A family member makes you uncomfortable with touch.",
    question: "What should you do?",
    options: [
      { text: "Stay silent to avoid trouble", isCorrect: false },
      { text: "Tell a trusted adult immediately", isCorrect: true },
    ],
  },
  {
    story: "Your school has no safe drinking water.",
    question: "What is your right?",
    options: [
      { text: "To demand clean water and safety", isCorrect: true },
      { text: "To skip school", isCorrect: false },
    ],
  }
];

const GameTwo = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playConfetti, setPlayConfetti] = useState(false);
  const winAudioRef = useRef(null);
  const navigate = useNavigate();
  const currentScene = story[currentLevel];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentLevel]);

  useEffect(() => {
    if (gameCompleted && winAudioRef.current) {
      winAudioRef.current.play();
      setPlayConfetti(true);
      handleGameComplete();
    }
  }, [gameCompleted]);

  const handleAnswer = (option) => {
    if (option.isCorrect) {
      if (currentLevel + 1 < story.length) {
        setCurrentLevel(currentLevel + 1);
        setShowWrongMessage(false);
      } else {
        setGameCompleted(true);
      }
    } else {
      setShowWrongMessage(true);
      setTimeout(() => {
        setCurrentLevel(0);
        setShowWrongMessage(false);
      }, 1000);
    }
  };

  const handleGameComplete = async () => {
    const user = auth.currentUser;
    if (user) {
      await saveGameProgress(user.uid, "protection");
    }
  };

  const handleGoBack = () => {
    navigate("/protection");
  };

  return (
    <div className="game-container">
      <audio ref={winAudioRef} src={winSound} preload="auto" />
      {playConfetti && <Confetti />}
      {gameCompleted ? (
        <div className="congrats-screen">
          <h1>🎉 Congratulations! 🎉</h1>
          <p>You completed the Rights Adventure Quest!</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="game-content">
          <div className="level-indicator">Level {currentLevel + 1} of {story.length}</div>
          <p className="story">{currentScene.story}</p>
          <h3 className="question">{currentScene.question}</h3>
          <div className="options">
            {currentScene.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>{option.text}</button>
            ))}
          </div>
          {showWrongMessage && <p className="wrong-message">❌ Try Again!</p>}
        </div>
      )}
    </div>
  );
};

export default GameTwo;
