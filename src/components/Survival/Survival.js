import React from "react";
import "./Survival.css";
import { Link } from "react-router-dom";

const Survival = () => {
  return (
    <div className="education-container">
      {/* Education Section */}
      <div className="education-section">
      <br/><h2>SURVIVAL</h2><br/><br/>
        <p>
        Survival rights are fundamental to every child's well-being, ensuring they have access to necessities like food, clean water, healthcare, and a safe environment to grow and thrive. 
        These rights are essential because without them, children are vulnerable to malnutrition, diseases, and life-threatening conditions that can severely impact their physical and mental development. 
        Providing proper healthcare and nutrition not only helps children survive but also strengthens their ability to learn, develop skills, and contribute to society as they grow.  
        A child’s right to survival goes beyond just staying alive; it includes protection from harm, abuse, and neglect, ensuring they grow up in a secure and nurturing environment. 
        Governments, organizations, and communities must work together to create policies and systems that guarantee every child has access to medical care, vaccinations, and proper nutrition, regardless of their economic background. 
        When survival rights are neglected, children face extreme hardships that can limit their potential and perpetuate cycles of poverty and suffering.  
        Ensuring survival rights is not just a moral obligation but a crucial step toward building a stronger and healthier society. 
        When children have access to basic needs and protection, they grow into resilient individuals who can contribute to their communities and create a better future. 
        It is the collective responsibility of families, governments, and global institutions to uphold and protect these rights, ensuring that no child is deprived of the chance to live a healthy and fulfilling life.
        </p>
      </div>
      
      {/* Video Section */}
      <div className="video-section">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/wIUVIzOu0c4"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-text">
          <p style={{color: "white"}}>
            Education is a fundamental right that empowers children and helps
            them grow into informed individuals. It opens doors to
            opportunities and paves the way for a better future.
          </p>
          <Link to="/survival/game" className="youtube-button">
            Play Game
          </Link> {/* ✅ Replaces old anchor tag */}
        </div>
      </div>
    </div>
  );
};

export default Survival;
