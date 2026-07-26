import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";
import "./Shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  // Selected product for the enlarged modal view
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    // ✅ Changed to relative path so Vercel proxies it to the backend automatically
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error: ", err);
        setError("Could not load products. Is the server running?");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      name: product.name,
      price: Number(product.price),
    });

    setSuccessMessage(`${product.name} successfully added to cart!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  if (loading)
    return (
      <div className="container">
        <p>Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div className="container">
      <h2 className="shop-title">Shop</h2>

      {/* Success Notification */}
      {successMessage && (
        <div className="cart-success">
          {successMessage}
        </div>
      )}

      {products.length === 0 ? (
        <p>No products found in the database.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div
              className="product-card"
              key={p.id || p._id}
              onClick={() => setSelectedProduct(p)}
              style={{ cursor: "pointer" }}
            >
              {/* ✅ Removed http://localhost:5000 from image URL */}
              <img
                src={p.image_url ? (p.image_url.startsWith("http") ? p.image_url : `${p.image_url}`) : ""}
                alt={p.name}
                onError={(e) => (e.target.style.display = "none")}
              />

              <h3>{p.name}</h3>

              <p>{p.description}</p>

              <div className="price-row">
                <span>Rs. {p.price}</span>

                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation(); // don't trigger the modal when adding to cart
                    handleAddToCart(p);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enlarged product view */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}