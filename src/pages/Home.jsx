import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  return (
    <>
      <Hero />

      <div className="container">
        <h2>Featured Products</h2>

        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;