import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <div className="container"><h2>Product not found</h2></div>;
  }

  const isInCart = cart.some((item) => item.id === product.id);

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart(product);
    }
    navigate("/checkout");
  };

  return (
    <div className="container">
      <div className="details-container">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-content">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="desc">{product.description}</p>
          <div className="price">₹{product.price.toLocaleString()}</div>
          
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            {!isInCart && (
              <button onClick={() => addToCart(product)}>Add To Cart</button>
            )}
            <button 
              onClick={handleBuyNow} 
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            >
              {isInCart ? "Proceed to Checkout" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;