import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PharmacyLogin from './pages/PharmacyLogin';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import PharmacySignup from './pages/PharmacySignup';
import SearchMedicines from './pages/SearchMedicines';
import PharmacyDashboard from './pages/PharmacyDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeApp } from './utils/healthCheck';
import './App.css';

function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/userlogin" element={<UserLogin />} />
              <Route path="/usersignup" element={<UserSignup />} />
              <Route path="/pharmacylogin" element={<PharmacyLogin />} />
              <Route path="/pharmacysignup" element={<PharmacySignup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchMedicines />} />
              <Route path="/pharmacydashboard" element={
                <ProtectedRoute requiredRole="pharmacy">
                  <PharmacyDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
