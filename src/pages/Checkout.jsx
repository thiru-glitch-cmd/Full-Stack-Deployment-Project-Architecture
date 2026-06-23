import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const shipping = subtotal > 50000 ? 0 : 499;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate Payment Gateway call (e.g. Razorpay/Stripe checkout API latency)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedRef = "SSP-" + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(generatedRef);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="container">
        <div className="success-card">
          <div className="success-icon-wrapper">✓</div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase. Your payment was processed successfully.</p>
          <div>Order Reference:</div>
          <div className="order-ref">{orderRef}</div>
          <div>
            <Link to="/products">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="container">
        <div className="spinner-container">
          <div className="spinner"></div>
          <h2>Processing Payment...</h2>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>Please do not close this window or refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Secure Checkout</h1>

      {cart.length === 0 ? (
        <div className="success-card">
          <h3>Your cart is empty.</h3>
          <p style={{ marginTop: "10px" }}>Add items to your cart before proceeding to checkout.</p>
          <Link to="/products">
            <button>Go to Products</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePayment} className="checkout-grid">
          {/* Shipping & Payment Form */}
          <div className="checkout-form-section">
            <h3 style={{ marginBottom: "20px", fontWeight: "700" }}>Billing & Shipping Details</h3>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Delivery Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
              />
            </div>

            <div className="form-group-row" style={{ marginBottom: "30px" }}>
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New Delhi"
                />
              </div>
              <div>
                <label className="form-label">ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="110001"
                />
              </div>
            </div>

            <h3 style={{ margin: "30px 0 20px 0", fontWeight: "700" }}>Payment Information</h3>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                required
                pattern="\d{16}"
                maxLength="16"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="4111222233334444"
              />
            </div>

            <div className="form-group-row">
              <div>
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  required
                  pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                  maxLength="5"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  required
                  pattern="\d{3}"
                  maxLength="3"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary-section">
            <h3 style={{ marginBottom: "20px", fontWeight: "700" }}>Order Summary</h3>

            <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "20px" }}>
              {cart.map((item, index) => (
                <div key={index} className="summary-row" style={{ fontSize: "0.95rem" }}>
                  <span>{item.name}</span>
                  <span style={{ fontWeight: "600" }}>₹{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span style={{ color: "#94a3b8" }}>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span style={{ color: "#94a3b8" }}>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
            </div>

            <div className="summary-row">
              <span style={{ color: "#94a3b8" }}>GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>

            <div className="summary-row total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>

            <button type="submit" style={{ width: "100%", marginTop: "30px", padding: "14px" }}>
              Pay ₹{grandTotal.toLocaleString()}
            </button>

            <p style={{ color: "#64748b", fontSize: "0.8rem", textAlign: "center", marginTop: "15px" }}>
              🔒 SSL Encrypted & Secure Simulated Payment Gateway.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Checkout;
