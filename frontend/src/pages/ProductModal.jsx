import { useEffect } from "react";
import "./ProductModal.css";

export default function ProductModal({ product, onClose, onAddToCart }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const imageSrc = product.image_url
    ? product.image_url.startsWith("http")
      ? product.image_url
      : product.image_url
    : "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="modal-body">
          <div className="modal-image-wrap">
            {imageSrc ? (
              <img src={imageSrc} alt={product.name} />
            ) : (
              <div className="modal-no-image">No image available</div>
            )}
          </div>

          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            <p className="modal-price">Rs. {product.price}</p>

            <button
              className="btn"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}