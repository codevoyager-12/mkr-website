import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminAddProduct.css';
import './AdminProducts.css';

export default function AdminCustomization() {
  const [basePrice, setBasePrice] = useState(3600);
  const [plateColors, setPlateColors] = useState([]);
  const [textColors, setTextColors] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  // New color inputs
  const [newPlateName, setNewPlateName] = useState('');
  const [newPlateBg, setNewPlateBg] = useState('#f1c40f');
  const [newPlateBorder, setNewPlateBorder] = useState('#d4af37');

  const [newTextName, setNewTextName] = useState('');
  const [newTextColor, setNewTextColor] = useState('#000000');

  // New addon option inputs
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [newOptionPrice, setNewOptionPrice] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/customization');
      if (res.data) {
        setBasePrice(res.data.base_price || 3600);
        setPlateColors(res.data.plate_colors || []);
        setTextColors(res.data.text_colors || []);
        setExtraOptions(res.data.extra_options || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch customization settings error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveAll = async (e) => {
    if (e) e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await axios.put('/api/customization', {
        base_price: Number(basePrice) || 3600,
        plate_colors: plateColors,
        text_colors: textColors,
        extra_options: extraOptions,
      });

      setStatus({ loading: false, error: null, success: true });
    } catch (err) {
      console.error('Save customization settings error:', err);
      const msg = err.response?.data?.error || err.message || 'Failed to save customization settings.';
      setStatus({ loading: false, error: msg, success: false });
    }
  };

  // Add Plate Color
  const handleAddPlateColor = () => {
    if (!newPlateName) return alert('Enter plate color name.');
    setPlateColors([
      ...plateColors,
      { name: newPlateName, bg: newPlateBg, border: newPlateBorder, text: '#000000' },
    ]);
    setNewPlateName('');
  };

  const handleRemovePlateColor = (index) => {
    if (plateColors.length <= 1) return alert('At least 1 plate color is required.');
    setPlateColors(plateColors.filter((_, i) => i !== index));
  };

  // Add Text Color
  const handleAddTextColor = () => {
    if (!newTextName) return alert('Enter text color name.');
    setTextColors([...textColors, { name: newTextName, color: newTextColor }]);
    setNewTextName('');
  };

  const handleRemoveTextColor = (index) => {
    if (textColors.length <= 1) return alert('At least 1 text color is required.');
    setTextColors(textColors.filter((_, i) => i !== index));
  };

  // Add Addon Option
  const handleAddExtraOption = () => {
    if (!newOptionLabel || !newOptionPrice) return alert('Enter option label and price.');
    const optId = 'opt_' + Date.now();
    setExtraOptions([
      ...extraOptions,
      { id: optId, label: newOptionLabel, price: Number(newOptionPrice) || 0 },
    ]);
    setNewOptionLabel('');
    setNewOptionPrice('');
  };

  const handleRemoveExtraOption = (index) => {
    setExtraOptions(extraOptions.filter((_, i) => i !== index));
  };

  if (loading) return <div className="container" style={{ padding: '60px 0' }}><p>Loading settings...</p></div>;

  return (
    <div className="container admin-form" style={{ padding: '40px 24px 80px' }}>
      <div className="admin-header">
        <h2>Customization Settings & Pricing</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/products" className="btn-small">Manage Products</Link>
          <Link to="/admin/reviews" className="btn-small">Manage Reviews</Link>
          <Link to="/admin/stats" className="btn-small">Manage Stats</Link>
        </div>
      </div>

      <form onSubmit={handleSaveAll} style={{ maxWidth: '800px' }}>
        {/* BASE PRICE */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Base Plate Pricing</h3>
          <label>Standard Plate Base Price (Rs.)</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
          />
        </div>

        {/* PLATE COLORS MANAGEMENT */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Plate Base Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {plateColors.map((col, idx) => (
              <div key={idx} style={{ background: 'rgba(7,9,14,0.8)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: col.bg, border: `2px solid ${col.border}` }}></span>
                  <span style={{ fontSize: '0.9rem', color: '#fff' }}>{col.name}</span>
                </div>
                <button type="button" className="btn-small btn-danger" style={{ padding: '4px 8px' }} onClick={() => handleRemovePlateColor(idx)}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
            <input type="text" placeholder="Color Name (e.g. Neon Yellow)" value={newPlateName} onChange={(e) => setNewPlateName(e.target.value)} style={{ flex: 1, minWidth: '150px' }} />
            <label style={{ margin: 0, fontSize: '0.8rem' }}>Bg Color: <input type="color" value={newPlateBg} onChange={(e) => setNewPlateBg(e.target.value)} style={{ width: '40px', padding: 0, height: '30px' }} /></label>
            <label style={{ margin: 0, fontSize: '0.8rem' }}>Border: <input type="color" value={newPlateBorder} onChange={(e) => setNewPlateBorder(e.target.value)} style={{ width: '40px', padding: 0, height: '30px' }} /></label>
            <button type="button" className="btn-small" onClick={handleAddPlateColor}>+ Add Color</button>
          </div>
        </div>

        {/* TEXT COLORS MANAGEMENT */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Embossed Text Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {textColors.map((col, idx) => (
              <div key={idx} style={{ background: 'rgba(7,9,14,0.8)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: col.color, border: '1px solid #fff' }}></span>
                  <span style={{ fontSize: '0.9rem', color: '#fff' }}>{col.name}</span>
                </div>
                <button type="button" className="btn-small btn-danger" style={{ padding: '4px 8px' }} onClick={() => handleRemoveTextColor(idx)}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
            <input type="text" placeholder="Text Color Name (e.g. Metallic Gold)" value={newTextName} onChange={(e) => setNewTextName(e.target.value)} style={{ flex: 1, minWidth: '150px' }} />
            <label style={{ margin: 0, fontSize: '0.8rem' }}>Color: <input type="color" value={newTextColor} onChange={(e) => setNewTextColor(e.target.value)} style={{ width: '40px', padding: 0, height: '30px' }} /></label>
            <button type="button" className="btn-small" onClick={handleAddTextColor}>+ Add Text Color</button>
          </div>
        </div>

        {/* EXTRA ADDON CHECKBOXES & PRICES */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Custom Addon Checkboxes & Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {extraOptions.map((opt, idx) => (
              <div key={idx} style={{ background: 'rgba(7,9,14,0.8)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{opt.label}</span>
                  <span style={{ color: '#d4af37', marginLeft: '12px', fontWeight: 'bold' }}>+Rs. {opt.price}</span>
                </div>
                <button type="button" className="btn-small btn-danger" onClick={() => handleRemoveExtraOption(idx)}>Remove Option</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
            <input type="text" placeholder="Addon Label (e.g. Reflective Border)" value={newOptionLabel} onChange={(e) => setNewOptionLabel(e.target.value)} style={{ flex: 2, minWidth: '180px' }} />
            <input type="number" placeholder="Price (Rs.)" value={newOptionPrice} onChange={(e) => setNewOptionPrice(e.target.value)} style={{ flex: 1, minWidth: '100px' }} />
            <button type="button" className="btn-small" onClick={handleAddExtraOption}>+ Add Checkbox Option</button>
          </div>
        </div>

        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Saving Settings...' : 'Save & Publish Customization Settings'}
        </button>

        {status.error && <p style={{ color: 'red', marginTop: '10px' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'lightgreen', marginTop: '10px' }}>Customization settings published live to customer customize page!</p>}
      </form>
    </div>
  );
}
