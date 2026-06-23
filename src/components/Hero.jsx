import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>ShopSphere</h1>

      <p>
        Discover premium products with a modern shopping experience.
      </p>

      <Link to="/products">
        <button>Shop Now</button>
      </Link>
    </section>
  );
}

export default Hero;