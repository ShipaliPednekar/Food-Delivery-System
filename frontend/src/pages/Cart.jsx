import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    // 🚨 EMPTY CART CHECK
    if (cartItems.length === 0) {
      alert("🛒 Cart is empty. Please add items before placing order.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/orders", {
        userName: "Guest",
        foodIds: cartItems.map((item) => item.id),
        totalAmount: total,
        status: "PLACED",
      });

      clearCart();
      navigate("/payment");
    } catch (error) {
      alert("❌ Failed to place order");
    }
  };

  return (
    <div>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item) => (
        <div key={item.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <button onClick={() => decreaseQty(item.id)}>-</button>
          <span style={{ margin: "0 10px" }}>{item.quantity}</span>
          <button onClick={() => increaseQty(item.id)}>+</button>

          <p>Total: ₹{item.price * item.quantity}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder} style={{ marginTop: "10px" }}>
        ✅ Place Order
      </button>
    </div>
  );
}

export default Cart;
