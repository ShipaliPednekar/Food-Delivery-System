import { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/restaurant/orders/history")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>📜 Order History</h2>

      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Date:</b> {order.createdAt}</p>

            {order.items.map(item => (
              <p key={item.id}>
                {item.name} × {item.quantity}
              </p>
            ))}

            <h4>Total: ₹{order.totalAmount}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
