import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
         
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@medfind.com</p>
            <p>Phone: +91 6369386812</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>MedFind : Search medicines near you instantly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
