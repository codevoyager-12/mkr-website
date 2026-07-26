import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h2>Your Cart</h2>
      {cart.map((item, i) => (
        <div className="cart-item" key={i}>
          <div>
            <p>{item.name}</p>
            {item.plate_color && <small>Color: {item.plate_color}</small>}
          </div>
          <div className="cart-item-right">
            <span>Rs. {item.price}</span>
            <button onClick={() => removeFromCart(i)}>✕</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: Rs. {total}</h3>
        <Link to="/checkout" className="btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
}