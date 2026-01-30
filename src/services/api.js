const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://medfind-backend-1.onrender.com/api';

// Test connection function
const testConnection = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://medfind-backend-1.onrender.com'}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

class ApiService {
  async login(email, password) {
    try {
      // Test connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('Cannot connect to server. Please check if the backend is running on https://medfind-backend-1.onrender.com');
      }
      
      console.log('Attempting login with URL:', `${API_BASE_URL}/auth/login`);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running on https://medfind-backend-1.onrender.com');
      }
      throw error;
    }
  }

  async register(name, email, password) {
    try {
      console.log('Attempting registration with URL:', `${API_BASE_URL}/auth/register`);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  }

  async pharmacyLogin(email, password) {
    try {
      console.log('Attempting pharmacy login with URL:', `${API_BASE_URL}/auth/pharmacy/login`);
      const response = await fetch(`${API_BASE_URL}/auth/pharmacy/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Pharmacy login response status:', response.status);
      const data = await response.json();
      console.log('Pharmacy login response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Pharmacy login failed');
      }
      return data;
    } catch (error) {
      console.error('Pharmacy login error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  }

  async searchMedicines(name) {
    try {
      console.log('Searching medicines with URL:', `${API_BASE_URL}/medicines/search?name=${encodeURIComponent(name)}`);
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${API_BASE_URL}/medicines/search?name=${encodeURIComponent(name)}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log('Search response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Backend unavailable');
      }
      
      const data = await response.json();
      console.log('Search response data:', data);
      return data;
    } catch (error) {
      console.error('Backend search failed, using local data:', error);
      
      // Fallback to local data
      try {
        const response = await fetch('/medicines.json');
        const medicines = await response.json();
        
        // Filter medicines by name (case insensitive)
        const filtered = medicines.filter(medicine => 
          medicine.name.toLowerCase().includes(name.toLowerCase())
        );
        
        console.log('Local search results:', filtered);
        return filtered;
      } catch (localError) {
        console.error('Local search also failed:', localError);
        throw new Error('Search unavailable');
      }
    }
  }

  async submitContact(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async registerPharmacy(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/pharmacy/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.ownerName || formData.name,
          email: formData.email,
          password: formData.password,
          pharmacyName: formData.pharmacyName,
          phone: formData.phone,
          address: formData.address,
          location: formData.location
        })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Pharmacy registration failed');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;