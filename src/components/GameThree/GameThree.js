import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./GameThree.css";
import winSound from "../../assets/win.mp3";
import { db } from '../../firebase';
import { saveGameProgress } from "../utils/saveGameProgress"; // Adjust path if needed
import { auth } from "../../firebase";

// Call this when the game is completed:
const handleGameComplete = async () => {
  const user = auth.currentUser;
  if (user) {
    await saveGameProgress(user.uid, "survival");
  }
};

const GameThree = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    "Tap Water", "Filtered Water", "Boiled Water",
    "Rice", "Milk", "Fruits",
    "Health Insurance", "Vaccination", "Hospital Visit",
    "Home", "Safe House", "Tent"
  ]);

  const [matches, setMatches] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedbackColor, setFeedbackColor] = useState({});
  const [fact, setFact] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);

  const correctMatches = {
    "Tap Water": "Clean Water",
    "Filtered Water": "Clean Water",
    "Boiled Water": "Clean Water",
    "Rice": "Food",
    "Milk": "Food",
    "Fruits": "Food",
    "Health Insurance": "Healthcare",
    "Vaccination": "Healthcare",
    "Hospital Visit": "Healthcare",
    "Home": "Shelter",
    "Safe House": "Shelter",
    "Tent": "Shelter",
  };

  const facts = {
    "Tap Water": "Tap water, when safe, is a primary clean water source.",
    "Filtered Water": "Filtered water removes harmful contaminants.",
    "Boiled Water": "Boiling water kills bacteria and viruses.",
    "Rice": "Rice is a staple food for over half the world.",
    "Milk": "Milk provides calcium and essential nutrients.",
    "Fruits": "Fruits offer vitamins for growth and energy.",
    "Health Insurance": "Insurance helps families afford medical care.",
    "Vaccination": "Vaccines protect children from dangerous diseases.",
    "Hospital Visit": "Hospitals offer emergency and ongoing care.",
    "Home": "A home provides safety and comfort.",
    "Safe House": "Safe houses protect children in danger.",
    "Tent": "Tents can provide temporary shelter during crises.",
  };

  const categories = ["Clean Water", "Food", "Healthcare", "Shelter"];

  useEffect(() => {
    setItems(shuffle(items));
  }, []);

  useEffect(() => {
    if (Object.keys(matches).length === items.length) {
      setTimeout(() => {
        triggerWin();
      }, 500);
    }
  }, [matches]);

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (category) => {
    if (!draggedItem) return;

    const correctCategory = correctMatches[draggedItem];
    if (correctCategory === category) {
      setMatches((prev) => ({ ...prev, [draggedItem]: category }));
      setFeedbackColor((prev) => ({ ...prev, [draggedItem]: "green" }));
      setFact(facts[draggedItem]);
    } else {
      setFeedbackColor((prev) => ({ ...prev, [draggedItem]: "red" }));
      setFact("❌ Oops! Try again.");
    }

    setDraggedItem(null);
  };

  const triggerWin = () => {
    const audio = new Audio(winSound);
    audio.play();

    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 }
    });

    setGameCompleted(true);
    handleGameComplete();  // Save game progress when completed
  };

  const getDropZoneClass = (category) => {
    return `drop-zone ${category.toLowerCase().replace(/\s/g, "-")}`;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="game-container">
      <h1>Survival Rights - Drag and Drop</h1>
      <div className="dropzones">
        {categories.map((category) => (
          <div
            key={category}
            className={getDropZoneClass(category)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(category)}
          >
            <h3>{category}</h3>
            <div className="dropped-items">
              {Object.entries(matches)
                .filter(([item, cat]) => cat === category)
                .map(([item]) => (
                  <div key={item} className="matched-item">
                    {item}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="options-area">
        {items.map((item) => (
          !matches[item] && (
            <div
              key={item}
              className={`draggable ${feedbackColor[item]}`}
              draggable
              onDragStart={() => handleDragStart(item)}
            >
              {item}
            </div>
          )
        ))}
      </div>

      {fact && <div className="fact-box">💡 {fact}</div>}

      {gameCompleted && (
        <div className="win-popup">
          <h2>🎉 Congratulations!</h2>
          <p>You matched all the survival rights correctly.</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default GameThree;
