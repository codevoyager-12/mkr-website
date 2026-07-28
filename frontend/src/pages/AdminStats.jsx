import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminAddProduct.css';

export default function AdminStats() {
  const [satisfiedCustomers, setSatisfiedCustomers] = useState('5000+');
  const [platesManufactured, setPlatesManufactured] = useState('10000+');
  const [averageRating, setAverageRating] = useState('4.9★');
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/stats');
      if (res.data) {
        setSatisfiedCustomers(res.data.satisfied_customers || '5000+');
        setPlatesManufactured(res.data.plates_manufactured || '10000+');
        setAverageRating(res.data.average_rating || '4.9★');
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await axios.put('/api/stats', {
        satisfied_customers: satisfiedCustomers,
        plates_manufactured: platesManufactured,
        average_rating: averageRating,
      });

      setStatus({ loading: false, error: null, success: true });
    } catch (err) {
      console.error('Update stats error:', err);
      const msg = err.response?.data?.error || err.message || 'Failed to update stats.';
      setStatus({ loading: false, error: msg, success: false });
    }
  };

  return (
    <div className="container admin-form">
      <div className="admin-header">
        <h2>Manipulate & Update Site Statistics</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/products" className="btn-small">Manage Products</Link>
          <Link to="/admin/reviews" className="btn-small">Manage Reviews</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Homepage Statistics Counter</h3>

        <label>Satisfied Customers Display Text</label>
        <input
          type="text"
          value={satisfiedCustomers}
          onChange={(e) => setSatisfiedCustomers(e.target.value)}
          placeholder="e.g. 5000+ or 7500+"
          required
        />

        <label>Plates Manufactured / Delivered Display Text</label>
        <input
          type="text"
          value={platesManufactured}
          onChange={(e) => setPlatesManufactured(e.target.value)}
          placeholder="e.g. 10000+ or 15000+"
          required
        />

        <label>Average Customer Rating Display Text</label>
        <input
          type="text"
          value={averageRating}
          onChange={(e) => setAverageRating(e.target.value)}
          placeholder="e.g. 4.9★ or 5.0★"
          required
        />

        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Updating Stats...' : 'Save & Display On Website'}
        </button>

        {status.error && <p style={{ color: 'red', marginTop: '10px' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'lightgreen', marginTop: '10px' }}>Stats updated successfully! They are now live on the homepage.</p>}
      </form>
    </div>
  );
}
