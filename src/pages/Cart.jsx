import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "30px", fontWeight: "800" }}>My Shopping Cart</h1>

      {cart.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "50px 20px",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.08)"
        }}>
          <p style={{ fontSize: "1.2rem", color: "#94a3b8", marginBottom: "20px" }}>Your cart is empty.</p>
          <Link to="/products">
            <button>Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "4px" }}>{item.name}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{item.category}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                  <span style={{ fontWeight: "700", color: "#38bdf8", fontSize: "1.1rem" }}>
                    ₹{item.price.toLocaleString()}
                  </span>
                  <button
                    className="secondary-btn"
                    onClick={() => removeFromCart(index)}
                    style={{ padding: "8px 14px", fontSize: "0.85rem", color: "#ef4444" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 style={{ fontWeight: "700" }}>Total: ₹{total.toLocaleString()}</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "20px" }}>Shipping & taxes calculated at checkout.</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
              <Link to="/products">
                <button className="secondary-btn">Continue Shopping</button>
              </Link>
              <Link to="/checkout">
                <button>Proceed to Payment</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;