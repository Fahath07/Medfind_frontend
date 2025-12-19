import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CategoryCard from '../components/CategoryCard';
import '../styles/Home.css';
import homeBg from '../home-background.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const categories = [
    { icon: '💊', title: 'Tablets' },
    { icon: '🧪', title: 'Syrups' },
    { icon: '🩹', title: 'First Aid' },
    { icon: '💪', title: 'Health Supplements' }
  ];

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(117, 119, 125, 0.8), rgba(27, 26, 27, 0.8)), url('${homeBg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="home">
  <section className="hero" style={heroStyle}>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Find Medicines Near You Instantly</h1>
              <p className="hero-subtitle">
                Search thousands of trusted pharmacies and get real-time availability of medicines in your area
              </p>
              <button 
                className="btn btn-primary btn-large" 
                onClick={() => {
                  if (user) {
                    navigate('/search');
                  } else {
                    navigate('/userlogin');
                  }
                }}
              >
                Search Medicines
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-intro">
        <div className="container">
          <h2 className="section-title">About MedFind</h2>
          <p className="brand-description">
            MedFind is your trusted platform for finding medicines across verified pharmacies. 
            We connect you with reliable medical shops, ensuring easy access to essential medications. 
            Our user-friendly platform provides fast results, helping you locate medicines when you need them most.
          </p>
        </div>
      </section>

      <section className="section categories">
        <div className="container">
          <h2 className="section-title">Product Categories</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                onClick={() => navigate('/search')}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
