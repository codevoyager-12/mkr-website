import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Customize.css";

const PLATE_COLORS = [
  { name: "Yellow MKR Edition", bg: "#f1c40f", border: "#d4af37", text: "#000000" },
  { name: "Jet Black", bg: "#0d0d0d", border: "#d4af37", text: "#f1d97a" },
  { name: "Gold Edition", bg: "#d4af37", border: "#f5d76e", text: "#000000" },
  { name: "Classic White", bg: "#f5f5f5", border: "#cccccc", text: "#111111" },
  { name: "Silver Metallic", bg: "#c0c0c0", border: "#ffffff", text: "#000000" },
];

const TEXT_COLORS = [
  { name: "Black", color: "#000000" },
  { name: "Gold", color: "#d4af37" },
  { name: "White", color: "#ffffff" },
  { name: "Silver", color: "#e0e0e0" },
  { name: "Red", color: "#d62828" },
];

export default function Customize() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [plateText, setPlateText] = useState("MKR");
  const [cityText, setCityText] = useState("PAKISTAN");
  const [plateColor, setPlateColor] = useState(0); // Default to Yellow MKR Edition
  const [textColor, setTextColor] = useState(0);
  const [gelFinish, setGelFinish] = useState(true);
  const [quantity, setQuantity] = useState(1);

  let price = 3600;
  if (gelFinish) price += 500;
  const total = price * quantity;

  const handleAdd = () => {
    addToCart({
      name: `Custom Plate (${plateText})`,
      price: total,
      plate_text: `${plateText} (${cityText})`,
      plate_color: PLATE_COLORS[plateColor].name,
      text_color: TEXT_COLORS[textColor].name,
      gel_finish: gelFinish,
      quantity,
    });

    navigate("/cart");
  };

  return (
    <div className="container customize-page">
      <div className="customize-header">
        <span className="badge-3d-tag">CUSTOMIZABLE EDITION</span>
        <h1>Design Your Custom Plate</h1>
        <p className="subtitle">
          Personalize your luxury 3D number plate with live instant preview.
        </p>
      </div>

      <div className="customize-grid">
        {/* PREVIEW SECTION */}
        <div className="preview-section glass-panel">
          <h3>Live Plate Preview</h3>

          <div
            className="plate-preview-box-large"
            style={{
              backgroundColor: PLATE_COLORS[plateColor].bg,
              borderColor: PLATE_COLORS[plateColor].border,
              color: TEXT_COLORS[textColor].color,
            }}
          >
            <div className="plate-top-city">{cityText || "PAKISTAN"}</div>
            <div className="plate-main-number">{plateText || "MKR"}</div>
          </div>

          <div className="preview-spec-list">
            <p><strong>Finish:</strong> {PLATE_COLORS[plateColor].name}</p>
            <p><strong>Text Color:</strong> {TEXT_COLORS[textColor].name}</p>
            <p><strong>3D Gel Embossing:</strong> {gelFinish ? "Yes (+Rs. 500)" : "Standard"}</p>
          </div>
        </div>

        {/* CONTROLS PANEL */}
        <div className="controls glass-panel">
          <h3>Customization Options</h3>

          {/* Plate Main Text */}
          <div className="control-group">
            <label>Plate Number Text (Max 8 Chars)</label>
            <input
              maxLength={8}
              value={plateText}
              onChange={(e) => setPlateText(e.target.value.toUpperCase())}
              placeholder="MKR"
              className="text-input-3d"
            />
          </div>

          {/* City / Top Text */}
          <div className="control-group">
            <label>City / Top Header Text</label>
            <input
              maxLength={12}
              value={cityText}
              onChange={(e) => setCityText(e.target.value.toUpperCase())}
              placeholder="PAKISTAN"
              className="text-input-3d"
            />
          </div>

          {/* Plate Color */}
          <div className="control-group">
            <label>Plate Base Finish ({PLATE_COLORS[plateColor].name})</label>
            <div className="color-options">
              {PLATE_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  className={`color-swatch ${plateColor === i ? "active" : ""}`}
                  style={{ background: c.bg, borderColor: c.border }}
                  onClick={() => setPlateColor(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Text Color */}
          <div className="control-group">
            <label>Embossed Text Color ({TEXT_COLORS[textColor].name})</label>
            <div className="color-options">
              {TEXT_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  className={`color-swatch ${textColor === i ? "active" : ""}`}
                  style={{ background: c.color }}
                  onClick={() => setTextColor(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Gel Finish Checkbox */}
          <div className="checkbox-group">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={gelFinish}
                onChange={() => setGelFinish(!gelFinish)}
              />
              <span className="checkmark"></span>
              3D Gel Acrylic Embossing (+Rs. 500)
            </label>
          </div>

          {/* Quantity */}
          <div className="control-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="text-input-3d qty-input"
            />
          </div>

          {/* Summary */}
          <div className="summary-3d">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Unit Price</span>
              <span>Rs. {price}</span>
            </div>
            <div className="summary-row">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="summary-row total">
              <span>Total Price</span>
              <span className="total-gold">Rs. {total}</span>
            </div>
          </div>

          <button className="btn add-cart-btn-3d" onClick={handleAdd}>
            🛒 Add Plate To Cart
          </button>
        </div>
      </div>
    </div>
  );
}