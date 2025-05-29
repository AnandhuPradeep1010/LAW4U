import React, { useEffect, useState } from "react";
import "./Main.css";
import law1 from "../../assets/law1.jpeg";
import law2 from "../../assets/law2.jpeg";
import law3 from "../../assets/law3.jpeg";
import law4 from "../../assets/law4.jpeg";

const Main = () => {
  const [posters, setPosters] = useState([
    {
      imageUrl: law1,
      heading: "Right to Education",
      details: "Every child has the right to quality education.",
      uploaderName: "Admin"
    },
    {
      imageUrl: law2,
      heading: "Protection from Exploitation",
      details: "Children should be protected from harmful work.",
      uploaderName: "Admin"
    },
    {
      imageUrl: law3,
      heading: "Right to Play",
      details: "Every child deserves time to play and enjoy.",
      uploaderName: "Admin"
    },
    {
      imageUrl: law4,
      heading: "Right to Be Heard",
      details: "Children have the right to express themselves.",
      uploaderName: "Admin"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        posters.length > 0 ? (prevIndex + 1) % posters.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [posters]);

  return (
    <div className="main">
      <div>
        <h1>Law4U</h1>
        <p>
        Our gamified platform is designed to teach children about their rights in a fun and engaging way. Through interactive games like "Match the Right!", kids can easily learn and remember important concepts. The platform uses colorful visuals, simple language, and playful challenges to keep children interested and involved. It's a creative approach to make learning about rights not just educational, but also enjoyable and memorable.
        </p>
        <br /><br /><br /><br />
      </div>
      <div className="carousel">
        {posters.length === 0 ? (
          <div className="no-posters">📢 No posters are uploaded yet.</div>
        ) : (
          <div className="poster-wrapper">
            <button
              className="nav-button left"
              onClick={() =>
                setCurrentIndex((currentIndex - 1 + posters.length) % posters.length)
              }
            >
              {"<"}
            </button>

            <div className="poster-hover-container">
              <img
                src={posters[currentIndex].imageUrl}
                alt="Poster"
                className="poster-image"
              />
              <div className="poster-info">
                <h2>{posters[currentIndex].heading}</h2>
                <p>{posters[currentIndex].details}</p>
                <span className="uploader">
                  Uploaded by: {posters[currentIndex].uploaderName || "Anonymous"}
                </span>
              </div>
            </div>

            <button
              className="nav-button right"
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % posters.length)
              }
            >
              {">"}
            </button>
          </div>
        )}
      </div>

      <div className="features">
        <h3>Platform Features</h3>
        <ul>
          <li>🎮 Real-life scenario gameplay</li>
          <li>📚 Modular learning</li>
          <li>🖥️ Easy UI</li>
          <li>🤝 Community collaboration</li>
          <li>⚖️ Rights organizations integration</li>
        </ul>
      </div>

      <div className="faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          <div className="faq-item">
            <details>
              <summary>What is this platform?</summary>
              <p>Educates children on their rights via games.</p>
            </details>
          </div>
          <div className="faq-item">
            <details>
              <summary>Who can use it?</summary>
              <p>Children, educators, child rights groups.</p>
            </details>
          </div>
          <div className="faq-item">
            <details>
              <summary>Is it free?</summary>
              <p>Yes!</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
