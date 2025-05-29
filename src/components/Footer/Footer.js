import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <h3>FAQs</h3>
        <p><strong>Q:</strong> How does this platform work?</p>
        <p><strong>A:</strong> It provides interactive learning, legal resources, and emergency contacts.</p>
      </div>

      <div className="footer-section">
        <h3>Need Help?</h3>
        <p>📞 <strong>Child Helpline:</strong> <a href="tel:1098">1098</a></p>
        <p>📞 <strong>Women Helpline:</strong> <a href="tel:181">181</a></p>
        <p>📞 <strong>Cyber Crime:</strong> <a href="tel:1930">1930</a></p>
        <p>📞 <strong>Police:</strong> <a href="tel:100">100</a></p>
      </div>

      <div className="footer-section">
        <h3>Useful Links</h3>
        <p><a href="https://www.unicef.org/child-protection" target="_blank" rel="noopener noreferrer">UNICEF - Child Protection</a></p>
        <p><a href="https://www.savethechildren.net/what-we-do/child-protection" target="_blank" rel="noopener noreferrer">Save the Children</a></p>
        <p><a href="https://www.childlineindia.org/" target="_blank" rel="noopener noreferrer">Childline India</a></p>
        <p><a href="https://ncpcr.gov.in/" target="_blank" rel="noopener noreferrer">National Commission for Protection of Child Rights</a></p>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:support@childrightsplatform.com">support@childrightsplatform.com</a></p>
        <p>Follow us: 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
