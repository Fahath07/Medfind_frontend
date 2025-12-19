import React, { useState, useEffect } from 'react';
import '../styles/PharmacyDashboard.css';
import medicineApi from '../api/medicines';
import pharmacyBg from '../pharmacy-dashboard-bg.jpeg';

const emptyForm = { name: '', sku: '', price: '', quantity: '' };

const PharmacyDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await medicineApi.getMedicines();
      setMedicines(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load medicines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const created = await medicineApi.createMedicine({
        name: form.name,
        sku: form.sku,
        price: parseFloat(form.price) || 0,
        quantity: parseInt(form.quantity, 10) || 0,
      });
      setMedicines((s) => [created, ...s]);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setError('Failed to add medicine');
    }
  };

  const handleDelete = async (id) => {
    try {
      await medicineApi.deleteMedicine(id);
      setMedicines((s) => s.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete');
    }
  };

  const changeQuantity = async (id, delta) => {
    try {
      const item = medicines.find((m) => String(m.id) === String(id));
      if (!item) return;
      const updated = await medicineApi.updateMedicine(id, { quantity: Math.max(0, (item.quantity || 0) + delta) });
      setMedicines((s) => s.map((m) => (m.id === updated.id ? updated : m)));
    } catch (err) {
      console.error(err);
      setError('Failed to update quantity');
    }
  };

  const startEdit = (med) => {
    setEditingId(med.id);
    setForm({ name: med.name || '', sku: med.sku || '', price: String(med.price || ''), quantity: String(med.quantity || '') });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      const updated = await medicineApi.updateMedicine(editingId, {
        name: form.name,
        sku: form.sku,
        price: parseFloat(form.price) || 0,
        quantity: parseInt(form.quantity, 10) || 0,
      });
      setMedicines((s) => s.map((m) => (m.id === updated.id ? updated : m)));
      setEditingId(null);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setError('Failed to save');
    }
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(150, 152, 159, 0.8), rgba(36, 34, 37, 0.8)), url('${pharmacyBg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="pharmacy-dashboard">
      <div className="dashboard-hero" style={heroStyle}>
        <div className="container">
          <div className="dashboard-header">
            <h1>Pharmacy Dashboard</h1>
            <p>Add medicines and manage stock levels</p>
          </div>
        </div>
      </div>
      <div className="container">

      <section className="add-section card">
        <h2>{editingId ? 'Edit Medicine' : 'Add Medicine'}</h2>
        <form onSubmit={editingId ? saveEdit : handleAdd} className="add-form">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Medicine name" required />
          <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU (optional)" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" />
          <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editingId ? 'Save' : 'Add'}</button>
            {editingId && <button type="button" className="btn" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="list-section">
        <h2>Medicines ({medicines.length})</h2>
        {error && <div className="error">{error}</div>}
        {loading ? (
          <p className="muted">Loading…</p>
        ) : medicines.length === 0 ? (
          <p className="muted">No medicines yet — add one above.</p>
        ) : (
          <table className="med-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m.id} className={m.quantity === 0 ? 'out-of-stock' : ''}>
                  <td>{m.name}</td>
                  <td>{m.sku || '-'}</td>
                  <td>{m.price ? `$${Number(m.price).toFixed(2)}` : '-'}</td>
                  <td>{m.quantity}</td>
                  <td className="actions">
                    <button className="btn" onClick={() => changeQuantity(m.id, -1)} aria-label={`Decrease ${m.name}`}>-</button>
                    <button className="btn" onClick={() => changeQuantity(m.id, 1)} aria-label={`Increase ${m.name}`}>+</button>
                    <button className="btn" onClick={() => startEdit(m)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(m.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
