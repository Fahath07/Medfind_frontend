const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      console.log('Backend health check:', data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

export const initializeApp = async () => {
  const isBackendHealthy = await checkBackendHealth();
  
  if (!isBackendHealthy) {
    console.warn('Backend is not responding. Some features may not work.');
  }
  
  return isBackendHealthy;
};