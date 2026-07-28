import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Customize.css";

const DEFAULT_PLATE_COLORS = [
  { name: "Yellow MKR Edition", bg: "#f1c40f", border: "#d4af37", text: "#000000" },
  { name: "Jet Black", bg: "#0d0d0d", border: "#d4af37", text: "#f1d97a" },
  { name: "Gold Edition", bg: "#d4af37", border: "#f5d76e", text: "#000000" },
  { name: "Classic White", bg: "#f5f5f5", border: "#cccccc", text: "#111111" },
  { name: "Silver Metallic", bg: "#c0c0c0", border: "#ffffff", text: "#000000" },
];

const DEFAULT_TEXT_COLORS = [
  { name: "Black", color: "#000000" },
  { name: "Gold", color: "#d4af37" },
  { name: "White", color: "#ffffff" },
  { name: "Silver", color: "#e0e0e0" },
  { name: "Red", color: "#d62828" },
];

export default function Customize() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [plateText, setPlateText] = useState("MKR-786");
  const [plateColorIdx, setPlateColorIdx] = useState(0);
  const [textColorIdx, setTextColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Dynamic admin customization settings
  const [basePrice, setBasePrice] = useState(3600);
  const [plateColors, setPlateColors] = useState(DEFAULT_PLATE_COLORS);
  const [textColors, setTextColors] = useState(DEFAULT_TEXT_COLORS);
  const [extraOptions, setExtraOptions] = useState([
    { id: "gel_finish", label: "3D Gel Acrylic Embossing", price: 500 }
  ]);
  const [selectedAddons, setSelectedAddons] = useState({ gel_finish: true });

  useEffect(() => {
    // Fetch live customization settings managed by Admin
    axios.get("/api/customization")
      .then((res) => {
        if (res.data) {
          if (res.data.base_price) setBasePrice(Number(res.data.base_price));
          if (Array.isArray(res.data.plate_colors) && res.data.plate_colors.length > 0) {
            setPlateColors(res.data.plate_colors);
          }
          if (Array.isArray(res.data.text_colors) && res.data.text_colors.length > 0) {
            setTextColors(res.data.text_colors);
          }
          if (Array.isArray(res.data.extra_options)) {
            setExtraOptions(res.data.extra_options);
            // Default select first addon if exists
            const initialSelection = {};
            res.data.extra_options.forEach((opt) => {
              initialSelection[opt.id] = true;
            });
            setSelectedAddons(initialSelection);
          }
        }
      })
      .catch((err) => console.error("Fetch customization error:", err));
  }, []);

  const handleToggleAddon = (optId) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  // Calculate Unit Price
  let unitPrice = basePrice;
  extraOptions.forEach((opt) => {
    if (selectedAddons[opt.id]) {
      unitPrice += Number(opt.price) || 0;
    }
  });

  const total = unitPrice * quantity;

  const currentPlateColor = plateColors[plateColorIdx] || plateColors[0] || DEFAULT_PLATE_COLORS[0];
  const currentTextColor = textColors[textColorIdx] || textColors[0] || DEFAULT_TEXT_COLORS[0];

  const handleAdd = () => {
    const selectedAddonLabels = extraOptions
      .filter((opt) => selectedAddons[opt.id])
      .map((opt) => `${opt.label} (+Rs. ${opt.price})`)
      .join(", ");

    addToCart({
      name: `Custom Plate (${plateText})`,
      price: total,
      plate_text: plateText,
      plate_color: currentPlateColor.name,
      text_color: currentTextColor.name,
      addons: selectedAddonLabels || "Standard",
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
              backgroundColor: currentPlateColor.bg,
              borderColor: currentPlateColor.border,
              color: currentTextColor.color,
            }}
          >
            <div className="plate-main-number">{plateText || "YOUR TEXT"}</div>
          </div>

          <div className="preview-spec-list">
            <p><strong>Finish:</strong> {currentPlateColor.name}</p>
            <p><strong>Text Color:</strong> {currentTextColor.name}</p>
            <p>
              <strong>Selected Addons:</strong>{" "}
              {extraOptions.filter((opt) => selectedAddons[opt.id]).map((opt) => opt.label).join(", ") || "None"}
            </p>
          </div>
        </div>

        {/* CONTROLS PANEL */}
        <div className="controls glass-panel">
          <h3>Customization Options</h3>

          {/* SINGLE INPUT FOR PLATE NUMBER TEXT ONLY */}
          <div className="control-group">
            <label>Plate Number Text</label>
            <input
              maxLength={10}
              value={plateText}
              onChange={(e) => setPlateText(e.target.value.toUpperCase())}
              placeholder="ABC-123"
              className="text-input-3d"
            />
          </div>

          {/* Plate Color */}
          <div className="control-group">
            <label>Plate Base Finish ({currentPlateColor.name})</label>
            <div className="color-options">
              {plateColors.map((c, i) => (
                <button
                  key={c.name + i}
                  className={`color-swatch ${plateColorIdx === i ? "active" : ""}`}
                  style={{ background: c.bg, borderColor: c.border }}
                  onClick={() => setPlateColorIdx(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Text Color */}
          <div className="control-group">
            <label>Embossed Text Color ({currentTextColor.name})</label>
            <div className="color-options">
              {textColors.map((c, i) => (
                <button
                  key={c.name + i}
                  className={`color-swatch ${textColorIdx === i ? "active" : ""}`}
                  style={{ background: c.color }}
                  onClick={() => setTextColorIdx(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* DYNAMIC EXTRA ADDON CHECKBOXES MANAGED BY ADMIN */}
          {extraOptions.length > 0 && (
            <div className="control-group">
              <label>Available Addons & Finishes</label>
              <div className="checkbox-list">
                {extraOptions.map((opt) => (
                  <div className="checkbox-group" key={opt.id}>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={!!selectedAddons[opt.id]}
                        onChange={() => handleToggleAddon(opt.id)}
                      />
                      <span className="checkmark"></span>
                      {opt.label} (+Rs. {opt.price})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              <span>Rs. {unitPrice}</span>
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