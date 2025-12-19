import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';
import logo from '../../medfind-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <img src={logo} alt="MedFind" className="brand-logo" />
            <span className="sr-only">MedFind</span>
          </Link>
          
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to={user ? "/search" : "/userlogin"} onClick={() => setIsOpen(false)}>Search Medicines</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            {user && user.role === 'pharmacy' && (
              <li><Link to="/pharmacydashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
            )}
            {!user ? (
              <>
                <li><Link to="/userlogin" className="user-login-btn" onClick={() => setIsOpen(false)}>User Login</Link></li>
                <li><Link to="/pharmacylogin" className="pharmacy-login-btn" onClick={() => setIsOpen(false)}>Pharmacy Login</Link></li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout ({user.name})</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
