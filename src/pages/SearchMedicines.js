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
    backgroundImage: `linear-gradient(135deg, rgba(86, 86, 86, 0.85) 0%, rgba(109, 105, 105, 0.85) 100%), url('${searchBg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(false);
    try {
      console.log('Searching for:', searchTerm);
      const results = await ApiService.searchMedicines(searchTerm);
      console.log('Search results:', results);
      
      // Handle different response formats
      const medicines = Array.isArray(results) ? results : (results.medicines || results.data || []);
      setSearchResults(medicines);
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setSearched(true);
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
            {loading && <p>Searching...</p>}
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((medicine, index) => (
                  <div key={medicine._id || medicine.id || index} className="medicine-card">
                    <h3>{medicine.name}</h3>
                    <p className="category">Category: {medicine.category}</p>
                    <p className="price">Price: ₹{medicine.price}</p>
                    <p className="quantity">Available: {medicine.quantity} units</p>
                    
                    {medicine.pharmacies && medicine.pharmacies.length > 0 && (
                      <div className="pharmacies">
                        <h4>Available at:</h4>
                        {medicine.pharmacies.map((pharmacy, pharmIndex) => (
                          <div key={pharmIndex} className="pharmacy-item">
                            <div className="pharmacy-name">{pharmacy.name}</div>
                            <div className="pharmacy-address">📍 {pharmacy.address}</div>
                            <div className="pharmacy-contact">📞 {pharmacy.contact}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No medicines found for "{searchTerm}". </p>
                
               
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMedicines;
