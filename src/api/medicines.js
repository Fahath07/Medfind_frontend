const BASE = process.env.REACT_APP_API_BASE + '/medicines' || 'http://localhost:5000/api/medicines';

async function request(path = '', options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    headers,
    ...options,
  });
  
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`API error ${res.status}: ${text}`);
    err.status = res.status;
    throw err;
  }
  
  return res.status === 204 ? null : res.json();
}

export async function getMedicines() {
  return request('');
}

export async function getMedicine(id) {
  return request(`/${id}`);
}

export async function createMedicine(data) {
  return request('', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateMedicine(id, data) {
  return request(`/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function deleteMedicine(id) {
  return request(`/${id}`, { method: 'DELETE' });
}

const medicineApi = {
  getMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};

export default medicineApi;
