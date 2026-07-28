import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-3d-wrapper">
      {/* 3D HERO SECTION */}
      <section className="home-hero-3d">
        <div className="home-hero-glow-cyan"></div>
        <div className="home-hero-glow-gold"></div>

        <div className="container home-hero-grid">
          <div className="home-hero-text">
            <div className="home-badge-3d">
              <span className="pulse-dot"></span> 8K OCTANE DESIGNED AUTOMOTIVE ART
            </div>

            <h1>
              DRIVE WITH <br />
              <span className="text-glow-gold">3D DISTINCTION</span>
            </h1>

            <p>
              Pakistan's premier destination for custom metallic 3D number plates,
              sleek acrylic frames, and exclusive luxury MKR automotive apparel.
            </p>

            <div className="home-hero-buttons">
              <Link to="/customize" className="home-btn-3d">
                <span>Customize 3D Plate</span>
                <i className="btn-glow-effect"></i>
              </Link>

              <Link to="/shop" className="home-btn-outline-3d">
                Explore Collection →
              </Link>
            </div>
          </div>

          <div className="home-hero-visual-3d">
            <div className="card-3d-frame">
              <img
                src="/3d-hero.jpg"
                alt="3D Custom Number Plate Emblem"
                className="hero-3d-image"
              />
              <div className="card-3d-reflection"></div>
              <div className="card-3d-badge">OCTANE 8K RENDERED</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="home-why container">
        <div className="section-title-3d">
          <h2>Why Choose MKR?</h2>
          <p className="section-subtitle">Crafted with precision engineering and futuristic design aesthetics</p>
        </div>

        <div className="home-why-grid">
          <div className="home-card-3d">
            <div className="card-icon-3d">💎</div>
            <h3>Premium 3D Materials</h3>
            <p>
              Every plate is precision-crafted using laser-cut acrylic, aircraft aluminum,
              and metallic 3D finishings for ultimate durability.
            </p>
          </div>

          <div className="home-card-3d">
            <div className="card-icon-3d">⚡</div>
            <h3>Fully Customized</h3>
            <p>
              Choose custom embossed 3D lettering, gold/cyan neon accent frames,
              and bespoke finishes tailored for your vehicle.
            </p>
          </div>

          <div className="home-card-3d">
            <div className="card-icon-3d">🚀</div>
            <h3>Nationwide Express Delivery</h3>
            <p>
              Fast and secure insured shipping across Pakistan with live order tracking and verification.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="home-featured">
        <div className="container">
          <div className="section-title-3d">
            <h2>Featured Collections</h2>
          </div>

          <div className="home-featured-grid">
            <div className="home-feature-card-3d">
              <div className="feature-card-content">
                <span className="feature-tag">CUSTOM EDITION</span>
                <h3>Custom 3D Plates</h3>
                <p>
                  Luxury black, gold, reflective, embossed, and custom-engraved license plates.
                </p>
                <Link to="/customize" className="feature-link-3d">
                  Start Designing <span>→</span>
                </Link>
              </div>
            </div>

            <div className="home-feature-card-3d store-card">
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
          <div className="home-step-3d">
            <div className="step-num-3d">01</div>
            <h4>Select Style</h4>
            <p>Choose your base plate dimensions, color & background texture.</p>
          </div>

          <div className="home-step-3d">
            <div className="step-num-3d">02</div>
            <h4>Personalize Text</h4>
            <p>Add your custom plate number, city, and 3D embossing text.</p>
          </div>

          <div className="home-step-3d">
            <div className="step-num-3d">03</div>
            <h4>Secure Checkout</h4>
            <p>Place your order with NayaPay or direct online payment.</p>
          </div>

          <div className="home-step-3d">
            <div className="step-num-3d">04</div>
            <h4>Delivered to Door</h4>
            <p>Receive your custom 3D plate anywhere in Pakistan.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats-3d">
        <div className="container home-stats-grid">
          <div className="stat-card-3d">
            <h2>5,000+</h2>
            <p>Satisfied Drivers</p>
          </div>

          <div className="stat-card-3d">
            <h2>10,000+</h2>
            <p>Plates Hand-Crafted</p>
          </div>

          <div className="stat-card-3d">
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
          <div className="home-review-card-3d">
            <div className="stars">★★★★★</div>
            <p>"The 3D metallic plate quality is insane. Gives my car a whole new aggressive look!"</p>
            <h4>— Ahmed K.</h4>
          </div>

          <div className="home-review-card-3d">
            <div className="stars">★★★★★</div>
            <p>"Fast delivery to Lahore and top-notch packaging. Will definitely order again."</p>
            <h4>— Hamza R.</h4>
          </div>

          <div className="home-review-card-3d">
            <div className="stars">★★★★★</div>
            <p>"Super easy to customize online and the gold embossing looks unbelievable in person."</p>
            <h4>— Ali M.</h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta-3d">
        <div className="container cta-box-3d">
          <h2>READY TO UPGRADE YOUR VEHICLE?</h2>
          <p>Design your custom 3D metallic plate in under 2 minutes with live instant preview.</p>
          <Link to="/customize" className="home-btn-3d">
            <span>Build Your Plate Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
}