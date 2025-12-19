import React, { useState } from 'react';
import ApiService from '../services/api';
import '../styles/SearchMedicines.css';
import searchBg from '../search-background.jpeg';

const SearchMedicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const headerStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(172, 175, 190, 0.85) 0%, rgba(4, 4, 4, 0.85) 100%), url('${searchBg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const results = await ApiService.searchMedicines(searchTerm);
      setSearchResults(results);
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-medicines">
      <div className="search-header" style={headerStyle}>
        <div className="container">
          <h1>Search Medicines</h1>
          <p>Find your required medicines at nearby pharmacies</p>
        </div>
      </div>

      <div className="container">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter medicine name (e.g., Paracetamol, Aspirin)"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {searched && (
          <div className="results-section">
            <h2>Search Results for "{searchTerm}"</h2>
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((medicine) => (
                  <div key={medicine._id} className="medicine-card">
                    <h3>{medicine.name}</h3>
                    <p className="category">Category: {medicine.category}</p>
                    <div className="pharmacies">
                      <h4>Available at:</h4>
                      {medicine.pharmacies.map((pharmacy, index) => (
                        <div key={index} className="pharmacy-item">
                          <span className="pharmacy-name">{pharmacy.pharmacyName}</span>
                          <span className="location">📍 {pharmacy.location}</span>
                          <span className={`availability ${pharmacy.available ? 'in-stock' : 'out-of-stock'}`}>
                            {pharmacy.available ? '✓ In Stock' : '✗ Out of Stock'}
                          </span>
                          {pharmacy.price && <span className="price">₹{pharmacy.price}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No medicines found for "{searchTerm}". Try a different search term.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMedicines;
