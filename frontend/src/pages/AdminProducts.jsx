import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminProducts.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    // ✅ Replaced localhost with relative path
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      // ✅ Replaced localhost with relative path
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="admin-header">
        <h2>Manage Products</h2>
        <Link to="/admin/add-product" className="btn">+ Add New Product</Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                {/* ✅ Removed hardcoded localhost */}
                <img
                  src={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : p.image_url) : ''}
                  alt={p.name}
                  className="admin-thumb"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>Rs. {p.price}</td>
              <td className="actions-cell">
                <Link to={`/admin/edit-product/${p.id}`} className="btn-small">Edit</Link>
                <button className="btn-small btn-danger" onClick={() => handleDelete(p.id, p.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}