import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAddProduct.css';

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'plate' });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // ✅ Replaced localhost with relative path
    axios.get(`/api/products/${id}`)
      .then((res) => {
        const p = res.data;
        setForm({ name: p.name, price: p.price, description: p.description, category: p.category });
        setCurrentImage(p.image_url);
        setFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setFetching(false);
      });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('description', form.description);
    data.append('category', form.category);
    if (imageFile) data.append('image', imageFile);

    try {
      // ✅ Replaced localhost with relative path
      await axios.put(`/api/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ loading: false, error: null, success: true });
      setTimeout(() => navigate('/admin/products'), 1000);
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, error: 'Failed to update product.', success: false });
    }
  };

  if (fetching) return <div className="container"><p>Loading product...</p></div>;

  return (
    <div className="container admin-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="plate">Plate</option>
          <option value="apparel">Apparel</option>
        </select>

        <label>Price (Rs.)</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="4" />

        <label>Current Image</label>
        {currentImage && (
          /* ✅ Safe image path rendering */
          <img
            src={currentImage.startsWith('http') ? currentImage : currentImage}
            alt="Current"
            className="image-preview"
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}

        <label>Replace Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Updating...' : 'Update Product'}
        </button>

        {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'lightgreen' }}>Product updated! Redirecting...</p>}
      </form>
    </div>
  );
}