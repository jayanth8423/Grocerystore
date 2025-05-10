import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, increment, decrement } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  const totalBill = cart.reduce(
    (sum, item) => sum + item.quantity * item.pprs,
    0
  );

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <h2 className="text-center text-2xl font-bold mb-6">🛍️ Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.pid} className="cart-item-card">
            <img
              src={`http://localhost:8080/${item.pimg}`}
              alt={item.pname}
              className="cart-img-small"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-placeholder.png";
              }}
            />
            <h3 className="text-lg font-semibold capitalize">{item.pname}</h3>
            <p className="text-green-700 font-medium">Price: ₹{item.pprs}</p>
            <div className="quantity-control">
              <button onClick={() => decrement(item.pid)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.pid)}>+</button>
            </div>
            <p>Total: ₹{item.quantity * item.pprs}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <h3 className="text-xl font-bold text-gray-800">🧾 Total Bill: ₹{totalBill}</h3>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
        >
          ✅ Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
