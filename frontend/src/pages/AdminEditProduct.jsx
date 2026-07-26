import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAddProduct.css';

const MAX_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB

// Helper to compress large image files before sending over network to Vercel
const compressImage = (file) => {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/') || file.size <= 300 * 1024) {
      return resolve(file);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.85
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'plate' });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
        setStatus({
          loading: false,
          error: `Image file must be less than 3 MB (Selected file: ${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select a smaller image.`,
          success: false,
        });
        setImageFile(null);
        e.target.value = '';
        return;
      }
      setStatus({ loading: false, error: null, success: false });
      const compressed = await compressImage(file);
      setImageFile(compressed);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('description', form.description);
    data.append('category', form.category);

    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await axios.put(`/api/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ loading: false, error: null, success: true });
      setTimeout(() => navigate('/admin/products'), 1000);
    } catch (err) {
      console.error('Update product error:', err);
      const serverMsg = err.response?.data?.error || err.message || 'Failed to update product.';
      setStatus({ loading: false, error: serverMsg, success: false });
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
          <img
            src={currentImage}
            alt="Current"
            className="image-preview"
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}

        <label>Replace Image (optional, Max size: 3 MB)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Updating...' : 'Update Product'}
        </button>

        {status.error && <p style={{ color: 'red', marginTop: '10px' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'lightgreen', marginTop: '10px' }}>Product updated! Redirecting...</p>}
      </form>
    </div>
  );
}