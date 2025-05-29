import React from "react";
import { Link } from "react-router-dom"; // 🔹 Add this line
import "./Protection.css";

const Protection = () => {
  return (
    <div className="education-container">
      {/* Education Section */}
      <div className="education-section">
        <br /><h2>PROTECTION</h2>
        <br /><br />
        <p>
        In the vibrant town of Nyay Nagar, lived Aarav, a 14-year-old boy who was rescued from child labor by activists invoking the Child Labour (Prohibition and Regulation) Act, ensuring his right to education and a safe childhood. Nearby, Meera, a 16-year-old girl, bravely escaped an abusive household and found refuge under the Protection of Children from Sexual Offences (POCSO) Act, which provided her with legal support and counseling. Across town, Ravi, a diligent consumer, purchased a faulty appliance and successfully claimed a refund through the Consumer Protection Act, 2019, highlighting his right to fair trade practices. Meanwhile, Anita, a young woman facing workplace harassment, found solace in the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, which safeguarded her dignity and ensured a secure work environment. Lastly, Kavya, concerned about her personal data being misused online, exercised her rights under the Information Technology Act, 2000, which addresses data protection and cybercrimes. Together, these individuals, empowered by the law, transformed Nyay Nagar into a community where justice and protection prevailed.
          </p>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://youtu.be/CW1drQ9MG1c?si=YCrUSTBTZSRI2dak"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-text">
          <p style={{ color: "white" }}>
            The video emphasizes the importance of recognizing and addressing child abuse, urging society to take responsibility for protecting children's rights and ensuring their safety. It highlights the lasting impact of abuse on children and calls for collective action to create a safer and more supportive environment for them.
          </p><br /><br />
          
          {/* 🔁 Replaced <a> with <Link> */}
          <Link
            to="/rights-quest"
            className="youtube-button"
          >
            Play Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Protection;
