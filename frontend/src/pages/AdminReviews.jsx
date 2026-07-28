import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminAddProduct.css';
import './AdminProducts.css';

const MAX_SIZE_BYTES = 3 * 1024 * 1024; // 3MB

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState('5.0');
  const [reviewText, setReviewText] = useState('');
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch reviews error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
        setStatus({
          loading: false,
          error: `Screenshot size must be less than 3 MB (Selected file: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
          success: false,
        });
        setScreenshotFile(null);
        setPreview(null);
        e.target.value = '';
        return;
      }
      setStatus({ loading: false, error: null, success: false });
      setScreenshotFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setScreenshotFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    if (!customerName || !reviewText) {
      setStatus({ loading: false, error: 'Customer name and review text are required.', success: false });
      return;
    }

    const data = new FormData();
    data.append('customer_name', customerName);
    data.append('rating', rating);
    data.append('review_text', reviewText);
    if (screenshotFile) {
      data.append('screenshot', screenshotFile);
    }

    try {
      await axios.post('/api/reviews', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ loading: false, error: null, success: true });
      setCustomerName('');
      setRating('5.0');
      setReviewText('');
      setScreenshotFile(null);
      setPreview(null);
      if (e.target && e.target.reset) e.target.reset();
      fetchReviews();
    } catch (err) {
      console.error('Add review error:', err);
      const msg = err.response?.data?.error || err.message || 'Failed to add review.';
      setStatus({ loading: false, error: msg, success: false });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await axios.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Delete review error:', err);
      alert('Failed to delete review.');
    }
  };

  return (
    <div className="container admin-form">
      <div className="admin-header">
        <h2>Manage Customer Reviews & Screenshots</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/products" className="btn-small">Manage Products</Link>
          <Link to="/admin/stats" className="btn-small">Manage Site Stats</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <h3>Add Customer Review</h3>

        <label>Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="e.g. Ahmed K."
          required
        />

        <label>Star Rating (1.0 to 5.0)</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5.0">5.0 ★★★★★</option>
          <option value="4.9">4.9 ★★★★★</option>
          <option value="4.8">4.8 ★★★★★</option>
          <option value="4.5">4.5 ★★★★☆</option>
          <option value="4.0">4.0 ★★★★☆</option>
        </select>

        <label>Review Text</label>
        <textarea
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter customer feedback / testimonial..."
          required
        />

        <label>Customer Screenshot / Proof (Optional, Max 3 MB)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="Screenshot Preview" className="image-preview" />
        )}

        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Adding Review...' : 'Publish Review'}
        </button>

        {status.error && <p style={{ color: 'red', marginTop: '10px' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'lightgreen', marginTop: '10px' }}>Review published successfully!</p>}
      </form>

      <h3>Published Reviews ({reviews.length})</h3>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Screenshot</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.screenshot_url ? (
                      <img src={r.screenshot_url} alt="Proof" className="admin-thumb" />
                    ) : (
                      <span style={{ color: '#888' }}>No Image</span>
                    )}
                  </td>
                  <td><strong>{r.customer_name}</strong></td>
                  <td><span style={{ color: '#d4af37' }}>{r.rating} ★</span></td>
                  <td style={{ maxWidth: '300px' }}>{r.review_text}</td>
                  <td>
                    <button className="btn-small btn-danger" onClick={() => handleDelete(r.id, r.customer_name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
