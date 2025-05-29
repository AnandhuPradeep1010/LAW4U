import React from "react";
import MatchGame from "./MatchGame";

const GamePage = () => {
  return (
    <div className="game-container" style={{background: "linear-gradient(to bottom, #f9d401 50%, white 50%), linear-gradient(to top, #00bbf0 50%, white 50%)",  padding: "30px", textAlign: "center" }}>
      <h1>🎯 Match the Right!</h1>
      <MatchGame />
    </div>
  );
};

export default GamePage;
