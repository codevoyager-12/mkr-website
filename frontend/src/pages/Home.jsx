import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [stats, setStats] = useState({
    satisfied_customers: "5000+",
    plates_manufactured: "10000+",
    average_rating: "4.9★",
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch dynamic site stats managed by Admin
    axios.get("/api/stats")
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch((err) => console.error("Stats error:", err));

    // Fetch dynamic customer reviews with screenshots managed by Admin
    axios.get("/api/reviews")
      .then((res) => {
        if (Array.isArray(res.data)) setReviews(res.data);
      })
      .catch((err) => console.error("Reviews error:", err));
  }, []);

  return (
    <div className="home-3d-wrapper">
      {/* LUXURY AUTOMOTIVE HERO SECTION */}
      <section className="home-hero-3d">
        <div className="home-hero-glow-gold"></div>

        <div className="container home-hero-grid">
          <div className="home-hero-text">
            <div className="home-badge-3d">
              <span className="pulse-dot"></span> MKR LUXURY AUTOMOTIVE EDITION
            </div>

            <h1>
              DRIVE WITH <br />
              <span className="text-glow-gold">PURE DISTINCTION</span>
            </h1>

            <p>
              Pakistan's premier destination for custom Yellow & Gold 3D number plates,
              sleek acrylic frames, and exclusive luxury MKR automotive apparel.
            </p>

            <div className="home-hero-buttons">
              <Link to="/customize" className="home-btn-3d">
                <span>Customize 3D Plate</span>
              </Link>

              <Link to="/shop" className="home-btn-outline-3d">
                Explore Collection →
              </Link>
            </div>
          </div>

          <div className="home-hero-visual-3d">
            <div className="card-3d-frame">
              <img
                src="/yellow-mkr-plate.jpg"
                alt="Yellow MKR Custom 3D Number Plate"
                className="hero-3d-image"
              />
              <div className="card-3d-badge">MKR YELLOW EDITION</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="home-why container">
        <div className="section-title-3d">
          <h2>Why Choose MKR?</h2>
          <p className="section-subtitle">Crafted with precision engineering and luxury automotive aesthetics</p>
        </div>

        <div className="home-why-grid">
          <div className="home-card-3d carbon-panel">
            <div className="card-icon-3d">🏎️</div>
            <h3>Premium 3D Materials</h3>
            <p>
              Every plate is precision-crafted using laser-cut acrylic, aircraft aluminum,
              and 3D embossed finishings for ultimate durability.
            </p>
          </div>

          <div className="home-card-3d carbon-panel">
            <div className="card-icon-3d">🚘</div>
            <h3>Custom Embossed Designs</h3>
            <p>
              Choose custom yellow plates, gold/black metallic frames,
              and bespoke finishes tailored specifically for your vehicle.
            </p>
          </div>

          <div className="home-card-3d carbon-panel">
            <div className="card-icon-3d">📦</div>
            <h3>Nationwide Express Delivery</h3>
            <p>
              Fast and secure insured shipping across Pakistan with live order tracking and verification.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="home-featured">
        <div className="container">
          <div className="section-title-3d">
            <h2>Featured Collections</h2>
          </div>

          <div className="home-featured-grid">
            <div className="home-feature-card-3d carbon-panel">
              <div className="feature-card-content">
                <span className="feature-tag">MKR SIGNATURE</span>
                <h3>Custom Yellow & Gold Plates</h3>
                <p>
                  Luxury yellow, black, gold, embossed, and custom-engraved license plates.
                </p>
                <Link to="/customize" className="feature-link-3d">
                  Start Designing <span>→</span>
                </Link>
              </div>
            </div>

            <div className="home-feature-card-3d store-card carbon-panel">
              <div className="feature-card-content">
                <span className="feature-tag">MKR STORE</span>
                <h3>MKR Signature Store</h3>
                <p>
                  Explore recently delivered custom plates and exclusive MKR racing apparel.
                </p>
                <Link to="/shop" className="feature-link-3d">
                  Browse Shop <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SITE STATS MANAGED BY ADMIN */}
      <section className="home-stats-3d">
        <div className="container home-stats-grid">
          <div className="stat-card-3d carbon-panel">
            <h2>{stats.satisfied_customers || "5000+"}</h2>
            <p>Satisfied Customers</p>
          </div>

          <div className="stat-card-3d carbon-panel">
            <h2>{stats.plates_manufactured || "10000+"}</h2>
            <p>Plates Manufactured</p>
          </div>

          <div className="stat-card-3d carbon-panel">
            <h2>{stats.average_rating || "4.9★"}</h2>
            <p>Average Customer Rating</p>
          </div>
        </div>
      </section>

      {/* DYNAMIC CUSTOMER REVIEWS & SCREENSHOTS MANAGED BY ADMIN */}
      {reviews.length > 0 && (
        <section className="home-testimonials container">
          <div className="section-title-3d">
            <h2>Customer Verification & Reviews</h2>
            <p className="section-subtitle">Verified feedback and customer screenshots managed by MKR Admin</p>
          </div>

          <div className="home-review-grid">
            {reviews.map((rev) => (
              <div className="home-review-card-3d carbon-panel" key={rev.id}>
                {rev.screenshot_url && (
                  <div className="review-screenshot-box">
                    <img src={rev.screenshot_url} alt="Customer Proof" className="review-screenshot-img" />
                  </div>
                )}
                <div className="stars">
                  {"★".repeat(Math.round(rev.rating || 5))}
                  <span className="rating-number">{rev.rating} ★</span>
                </div>
                <p>"{rev.review_text}"</p>
                <h4>— {rev.customer_name}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="home-cta-3d">
        <div className="container cta-box-3d carbon-panel">
          <h2>READY TO CUSTOMIZE YOUR VEHICLE?</h2>
          <p>Design your Yellow MKR custom plate in under 2 minutes with live instant preview.</p>
          <Link to="/customize" className="home-btn-3d">
            <span>Start Designing Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
}