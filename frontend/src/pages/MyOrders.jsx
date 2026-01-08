import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>📦 My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid gray", margin: 10 }}>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>

          {order.items.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
