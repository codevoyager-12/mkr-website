import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Customize.css";

const PLATE_COLORS = [
  { name: "Classic White", bg: "#f5f5f5" },
  { name: "Jet Black", bg: "#111111" },
  { name: "Gold Edition", bg: "#d4af37" },
  { name: "Silver Metallic", bg: "#bdbdbd" },
];

const TEXT_COLORS = [
  { name: "Black", color: "#000000" },
  { name: "White", color: "#ffffff" },
  { name: "Gold", color: "#d4af37" },
  { name: "Silver", color: "#e0e0e0" },
  { name: "Red", color: "#d62828" },
];

export default function Customize() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [plateText, setPlateText] = useState("MKR-786");
  const [plateColor, setPlateColor] = useState(0);
  const [textColor, setTextColor] = useState(0);
  const [gelFinish, setGelFinish] = useState(false);
  const [quantity, setQuantity] = useState(1);

  let price = 3600;

  // Gel Finish Price
  if (gelFinish) price += 500;

  const total = price * quantity;

  const handleAdd = () => {
    addToCart({
      name: `Custom Plate (${plateText})`,
      price: total,
      plate_text: plateText,
      plate_color: PLATE_COLORS[plateColor].name,
      text_color: TEXT_COLORS[textColor].name,
      gel_finish: gelFinish,
      quantity,
    });

    navigate("/cart");
  };

  return (
    <div className="container customize-page">
      <h1>Design Your Premium Number Plate</h1>

      <p className="subtitle">
        Personalize your plate exactly the way you want.
      </p>

      <div className="customize-grid">
        {/* Preview */}
        <div className="preview-section">
          <h2>Live Preview</h2>

          <div
            className="plate-preview"
            style={{
              background: PLATE_COLORS[plateColor].bg,
              color: TEXT_COLORS[textColor].color,
            }}
          >
            {plateText || "YOUR TEXT"}
          </div>

          <div className="preview-info">
            <p>
              <strong>Plate Color:</strong>{" "}
              {PLATE_COLORS[plateColor].name}
            </p>

            <p>
              <strong>Text Color:</strong>{" "}
              {TEXT_COLORS[textColor].name}
            </p>

            <p>
              <strong>Gel Finish:</strong>{" "}
              {gelFinish ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="control-group">
            <label>Plate Text</label>

            <input
              maxLength={10}
              value={plateText}
              onChange={(e) =>
                setPlateText(e.target.value.toUpperCase())
              }
              placeholder="ABC-123"
            />
          </div>

          {/* Plate Color */}
          <div className="control-group">
            <label>Plate Color</label>

            <div className="color-options">
              {PLATE_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  className={`color-swatch ${
                    plateColor === i ? "active" : ""
                  }`}
                  style={{ background: c.bg }}
                  onClick={() => setPlateColor(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Text Color */}
          <div className="control-group">
            <label>Text Color</label>

            <div className="color-options">
              {TEXT_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  className={`color-swatch ${
                    textColor === i ? "active" : ""
                  }`}
                  style={{ background: c.color }}
                  onClick={() => setTextColor(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Gel Finish */}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={gelFinish}
                onChange={() => setGelFinish(!gelFinish)}
              />
              Gel Finish (+Rs.500)
            </label>
          </div>

          {/* Quantity */}
          <div className="control-group">
            <label>Quantity</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
            />
          </div>

          {/* Summary */}
          <div className="summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Price Per Plate</span>
              <span>Rs. {price}</span>
            </div>

            <div className="summary-row">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <button
            className="btn add-cart-btn"
            onClick={handleAdd}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Benefits */}
      <section className="benefits">
        <div className="benefit-card">
          <h3>Premium Acrylic</h3>
          <p>Scratch-resistant, long-lasting quality.</p>
        </div>

        <div className="benefit-card">
          <h3>Weather Resistant</h3>
          <p>Designed for Pakistan's climate.</p>
        </div>

        <div className="benefit-card">
          <h3>Fast Delivery</h3>
          <p>Nationwide shipping in 3–5 business days.</p>
        </div>

        <div className="benefit-card">
          <h3>Secure Payments</h3>
          <p>NayaPay, Bank Transfer & Cash on Delivery.</p>
        </div>
      </section>
    </div>
  );
}