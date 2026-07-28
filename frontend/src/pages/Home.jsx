import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-3d-wrapper">
      {/* AUTOMOTIVE HERO SECTION */}
      <section className="home-hero-3d">
        <div className="home-hero-glow-gold"></div>

        <div className="container home-hero-grid">
          <div className="home-hero-text">
            <div className="home-badge-3d">
              <span className="pulse-dot"></span> MKR SIGNATURE AUTOMOTIVE EDITION
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
            <h3>Toyota Fortuner 3D Preview</h3>
            <p>
              Visualize your custom plate mounted directly on a 3D White Toyota Fortuner
              model before placing your order.
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
                  Start Designing on 3D Fortuner <span>→</span>
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

      {/* PROCESS */}
      <section className="home-process container">
        <div className="section-title-3d">
          <h2>How It Works</h2>
        </div>

        <div className="home-steps-3d">
          <div className="home-step-3d carbon-panel">
            <div className="step-num-3d">01</div>
            <h4>Select Plate Color</h4>
            <p>Choose Yellow MKR, Classic Black, or Gold finish.</p>
          </div>

          <div className="home-step-3d carbon-panel">
            <div className="step-num-3d">02</div>
            <h4>Personalize Text</h4>
            <p>Add your custom plate number, city, and 3D embossing text.</p>
          </div>

          <div className="home-step-3d carbon-panel">
            <div className="step-num-3d">03</div>
            <h4>Preview on 3D Fortuner</h4>
            <p>View your custom plate mounted on a 3D White Toyota Fortuner model.</p>
          </div>

          <div className="home-step-3d carbon-panel">
            <div className="step-num-3d">04</div>
            <h4>Delivered to Door</h4>
            <p>Receive your custom 3D plate anywhere in Pakistan.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats-3d">
        <div className="container home-stats-grid">
          <div className="stat-card-3d carbon-panel">
            <h2>5,000+</h2>
            <p>Satisfied Drivers</p>
          </div>

          <div className="stat-card-3d carbon-panel">
            <h2>10,000+</h2>
            <p>Plates Hand-Crafted</p>
          </div>

          <div className="stat-card-3d carbon-panel">
            <h2>4.9 / 5.0</h2>
            <p>Customer Rating</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-testimonials container">
        <div className="section-title-3d">
          <h2>Customer Reviews</h2>
        </div>

        <div className="home-review-grid">
          <div className="home-review-card-3d carbon-panel">
            <div className="stars">★★★★★</div>
            <p>"The yellow MKR plate quality is insane. Looks super aggressive on my SUV!"</p>
            <h4>— Ahmed K.</h4>
          </div>

          <div className="home-review-card-3d carbon-panel">
            <div className="stars">★★★★★</div>
            <p>"Loved the 3D Fortuner preview tool. The physical plate matched the 3D view perfectly."</p>
            <h4>— Hamza R.</h4>
          </div>

          <div className="home-review-card-3d carbon-panel">
            <div className="stars">★★★★★</div>
            <p>"Super easy to customize online and the gold embossing looks unbelievable in person."</p>
            <h4>— Ali M.</h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta-3d">
        <div className="container cta-box-3d carbon-panel">
          <h2>READY TO CUSTOMIZE YOUR VEHICLE?</h2>
          <p>Design your Yellow MKR custom plate in under 2 minutes with 3D Toyota Fortuner preview.</p>
          <Link to="/customize" className="home-btn-3d">
            <span>Customize on 3D Fortuner</span>
          </Link>
        </div>
      </section>
    </div>
  );
}