import { useState } from 'react';
import axios from 'axios';
import './AdminAddProduct.css';

export default function AdminAddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'plate' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    if (!imageFile) {
      setStatus({ loading: false, error: 'Please select an image.', success: false });
      return;
    }

    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('description', form.description);
    data.append('category', form.category);
    data.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ loading: false, error: null, success: true });
      setForm({ name: '', price: '', description: '', category: 'plate' });
      setImageFile(null);
      setPreview(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, error: 'Failed to add product.', success: false });
    }
  };

  return (
    <div className="container admin-form">
      <h2>Add New Product</h2>
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

        <label>Product Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Uploading...' : 'Add Product'}
        </button>

        {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'lightgreen' }}>Product added successfully!</p>}
      </form>
    </div>
  );
}