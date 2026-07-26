import { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
    city: '',
  });

  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    const plateItem = cart.find((item) => item.plate_text);

    try {
      // ✅ Changed from 'http://localhost:5000/api/orders' to relative path '/api/orders'
      const res = await axios.post('/api/orders', {
        ...form,
        items: cart,
        plate_text: plateItem?.plate_text || null,
        plate_color: plateItem?.plate_color || null,
        total,
      });

      setOrderId(res.data.orderId);
      clearCart();
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="container checkout-success">
        <div className="success-icon">✓</div>
        <h2>Order Received!</h2>
        <p className="order-id">Order ID: #{orderId}</p>
        <p>
          Thank you, {form.customer_name}! Our team has received your order details
          and will contact you shortly on <strong>{form.phone}</strong> to confirm
          payment and delivery.
        </p>
        <a href="/" className="btn">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          name="customer_name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Delivery Address"
          required
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <div className="order-summary">
          <h3>Total: Rs. {total}</h3>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Placing Order...' : 'Place Order (Pay via NayaPay)'}
        </button>
      </form>
    </div>
  );
}