import { useEffect, useState } from "react";
import axios from "axios";

function RestaurantDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (orderId, status) => {
    axios
      .put(`http://localhost:8080/api/orders/${orderId}/status?status=${status}`)
      .then(() => {
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId
              ? { ...order, status }
              : order
          )
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍🍳 Restaurant Owner Dashboard</h2>

      {orders.map(order => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "8px"
          }}
        >
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>User:</b> {order.userName}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Status:</b> {order.status}</p>

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => updateStatus(order.id, "Preparing")}
              disabled={order.status !== "Pending"}
            >
              Mark as PREPARING
            </button>

            <button
              onClick={() => updateStatus(order.id, "Ready")}
              style={{ marginLeft: "10px" }}
              disabled={order.status !== "Preparing"}
            >
              Mark as READY
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantDashboard;
