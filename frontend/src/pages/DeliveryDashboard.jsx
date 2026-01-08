import { useEffect, useState } from "react";
import axios from "axios";

function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:8080/api/orders/${id}/status?status=${status}`)
      .then(() => {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id ? { ...o, status } : o
          )
        );
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚴 Delivery Partner Dashboard</h2>

      {orders.length === 0 && <p>No orders assigned</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>User:</b> {order.userName}</p>
          <p><b>Status:</b> {order.status}</p>

          {order.status === "ASSIGNED" && (
            <button onClick={() => updateStatus(order.id, "PICKED_UP")}>
              Picked Up
            </button>
          )}

          {order.status === "PICKED_UP" && (
            <button onClick={() => updateStatus(order.id, "DELIVERED")}>
              Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default DeliveryDashboard;
