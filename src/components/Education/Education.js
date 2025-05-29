import React from "react";
import "./Education.css";
import { Link } from "react-router-dom"; // 👈 Add this

const Education = () => {
  return (
    <div className="education-container">
      <div className="education-section">
        <br /><h2>EDUCATION</h2><br /><br />
        <p>
        In the village of Shikshapur, a bright girl named Ananya finally got to attend school when the Right to Education Act ensured free and compulsory education for all children aged 6 to 14. In the same school, Rahul, a boy with a hearing disability, received personalized support under the Individuals with Disabilities Education Act, allowing him to learn like everyone else. When Sara joined and was told girls couldn’t play sports, her teacher reminded the school of Title IX, which guarantees equal rights regardless of gender, and she soon became the football team captain. The school's overall condition improved thanks to Sarva Shiksha Abhiyan, which brought better infrastructure, trained teachers, and more students into classrooms. Years later, with the help of the Every Student Succeeds Act, the school continued to support struggling students and maintained high standards, ensuring every child in Shikshapur had a fair chance to succeed.        </p>
      </div>

      <div className="video-section">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://youtu.be/dj2dBLi7zvQ?si=W2NN_zxX5wKcP7Di"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-text">
          <p style={{ color: "white" }}>
            Education is a fundamental right...
          </p>
          <Link to="/match-the-right" className="youtube-button"> {/* 👈 Updated button */}
            Play Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Education;
