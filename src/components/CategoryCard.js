import React from 'react';
import '../styles/CategoryCard.css';

const CategoryCard = ({ icon, title, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
    </div>
  );
};

export default CategoryCard;
