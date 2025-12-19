import React from 'react';
import '../styles/About.css';
import aboutBg from '../about-background.jpeg';

const About = () => {
  const headerStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(75, 75, 75, 0.85) 0%, rgba(8, 7, 9, 0.85) 100%), url('${aboutBg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="about-page">
      <div className="about-header" style={headerStyle}>
        <div className="container">
          <h1>About MedFind</h1>
          <p>Your trusted medicine search platform</p>
        </div>
      </div>

      <div className="container">
        <section className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              MedFind is dedicated to making healthcare more accessible by connecting patients 
              with nearby pharmacies. We understand that finding the right medicine at the right 
              time can be challenging, which is why we've created a platform that simplifies 
              this process.
            </p>
          </div>

          <div className="about-section">
            <h2>How We Help</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">🔍</div>
                <h3>Easy Search</h3>
                <p>Search for any medicine with our user-friendly interface</p>
              </div>
              <div className="feature">
                <div className="feature-icon">📍</div>
                <h3>Location-Based</h3>
                <p>Find pharmacies near your location with real-time availability</p>
              </div>
              <div className="feature">
                <div className="feature-icon">✅</div>
                <h3>Verified Pharmacies</h3>
                <p>All listed pharmacies are verified and trusted partners</p>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Fast Results</h3>
                <p>Get instant results and save time on your medicine search</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Choose MedFind?</h2>
            <ul className="benefits-list">
              <li>Comprehensive database of medicines and pharmacies</li>
              <li>Real-time availability updates</li>
              <li>User-friendly and responsive design</li>
              <li>Trusted by thousands of users</li>
              <li>Free to use platform</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;