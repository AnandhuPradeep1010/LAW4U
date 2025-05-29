import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topics.css";

const topics = [
  {
    title: "EDUCATION",
    icon: "📚",
    description: "Access quality education, learning resources, and skill-building programs to empower the next generation.",
    url: "/education",
    media: "https://www.youtube.com/embed/HYzUzZARjRw" // Video link
  },
  {
    title: "PROTECTION",
    icon: "🛡️",
    description: "Learn about child protection laws, rights, and the importance of a safe and nurturing environment for children.",
    url: "/protection",
    media: "https://www.youtube.com/embed/wIUVIzOu0c4" // Image placeholder
  },
  {
    title: "SURVIVAL",
    icon: "🌍",
    description: "Ensure every child has access to basic necessities like food, clean water, healthcare, and a secure home.",
    url: "/survival",
    media: "https://www.youtube.com/embed/HYzUzZARjRw" // Image placeholder
  }
];

const Topics = () => {
  const navigate = useNavigate();

  return (
    <div className="topics">
      <h2>Explore Key Topics</h2>
      <p>Select a topic to learn more and support children's well-being.</p>
      <div className="cards">
        {topics.map((topic, index) => (
          <div key={index} className="card" onClick={() => navigate(topic.url)}>
            <h4>{topic.icon} {topic.title}</h4>
            <p>{topic.description}</p>
            <div className="media">
              {topic.media.includes("youtube") ? (
                <iframe
                  src={topic.media}
                  title={topic.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={topic.media} alt={topic.title} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
