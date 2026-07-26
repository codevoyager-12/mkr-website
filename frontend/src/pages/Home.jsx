import { Link } from "react-router-dom";
import "./Home.css";
import heroImage from "../assets/hero.png";

export default function Home() {
  return (
    <div>

      {/* HERO */}
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="home-hero-overlay">
          <div className="container home-hero-content">
            <h1>
              DRIVE WITH <span>DISTINCTION</span>
            </h1>

            <p>
              Pakistan's premium destination for custom number plates,
              luxury car accessories and exclusive MKR apparel.
            </p>

            <div className="home-hero-buttons">
              <Link to="/customize" className="home-btn">
                Customize Plate
              </Link>

              <Link to="/shop" className="home-btn-outline">
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="home-why container">

        <h2>Why Choose MKR?</h2>

        <div className="home-why-grid">

          <div className="home-card">
            <h3>Premium Materials</h3>
            <p>
              Every plate is crafted using high-quality acrylic and aluminum
              for maximum durability and elegance.
            </p>
          </div>

          <div className="home-card">
            <h3>Fully Customized</h3>
            <p>
              Choose your own text, colors, fonts and finishing according
              to your vehicle style.
            </p>
          </div>

          <div className="home-card">
            <h3>Nationwide Delivery</h3>
            <p>
              Fast shipping across Pakistan with secure online payments.
            </p>
          </div>

        </div>

      </section>

      {/* FEATURED */}

      <section className="home-featured">

        <div className="container">

          <h2>Featured Categories</h2>

          <div className="home-featured-grid">

            <div className="home-feature-box">
              <h3>Custom Number Plates</h3>

              <p>
                Luxury black, gold, reflective, embossed and personalized
                plates.
              </p>

              <Link to="/customize">Explore →</Link>

            </div>

            <div className="home-feature-box">

              <h3>MKR Store</h3>

              <p>
                See some sample customised number plates that we have sold recently
              </p>

              <Link to="/shop">Shop Now →</Link>

            </div>

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section className="home-process container">

        <h2>How It Works</h2>

        <div className="home-steps">

          <div className="home-step">
            <span>1</span>
            <h4>Choose Design</h4>
            <p>Select your favorite style.</p>
          </div>

          <div className="home-step">
            <span>2</span>
            <h4>Customize</h4>
            <p>Add your text, colors and finish.</p>
          </div>

          <div className="home-step">
            <span>3</span>
            <h4>Checkout</h4>
            <p>Secure online payment.</p>
          </div>

          <div className="home-step">
            <span>4</span>
            <h4>Delivered</h4>
            <p>Receive your order anywhere in Pakistan.</p>
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="home-stats">

        <div className="container home-stats-grid">

          <div>
            <h2>5000+</h2>
            <p>Happy Customers</p>
          </div>

          <div>
            <h2>10000+</h2>
            <p>Plates Delivered</p>
          </div>

          <div>
            <h2>4.9★</h2>
            <p>Average Rating</p>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="home-testimonials container">

        <h2>Customer Reviews</h2>

        <div className="home-review-grid">

          <div className="home-review">
            <p>
              "Excellent quality and premium finishing. Exactly what I
              expected."
            </p>

            <h4>— Ahmed</h4>
          </div>

          <div className="home-review">
            <p>
              "Fast delivery and amazing customer service. Highly
              recommended!"
            </p>

            <h4>— Hamza</h4>
          </div>

          <div className="home-review">
            <p>
              "My customized plate completely changed the look of my car."
            </p>

            <h4>— Ali</h4>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="home-cta">

        <div className="container">

          <h2>Ready to Build Your Custom Plate?</h2>

          <p>
            Design your personalized premium number plate in just a few
            clicks.
          </p>

          <Link className="home-btn" to="/customize">
            Start Designing
          </Link>

        </div>

      </section>

    </div>
  );
}