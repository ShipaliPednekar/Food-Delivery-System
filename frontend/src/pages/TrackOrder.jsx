import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function TrackOrder() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch latest order every 5 seconds
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/orders/latest"
        );
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Order API Error:", err);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading order...</p>;
  if (!order) return <p>No active order found</p>;

  // 📊 Progress mapping
  const getProgress = (status) => {
    switch (status) {
      case "PENDING":
        return 20;
      case "PREPARING":
        return 40;
      case "READY":
        return 60;
      case "PICKED_UP":
        return 80;
      case "DELIVERED":
        return 100;
      default:
        return 0;
    }
  };

  const progressValue = getProgress(order.status);

  // 📍 Default fallback location (Bangalore)
  const location = order.deliveryLocation || {
    lat: 12.9716,
    lng: 77.5946,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Track Your Order</h2>

      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Customer:</b> {order.userName}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Total:</b> ₹{order.totalAmount}</p>

      {/* 🔵 Progress Bar */}
      <progress
        value={progressValue}
        max="100"
        style={{ width: "100%", height: "20px" }}
      />

      <p style={{ marginTop: "10px", fontSize: "16px" }}>
        {order.status === "PENDING" && "🛒 Order placed"}
        {order.status === "PREPARING" && "👨‍🍳 Food is being prepared"}
        {order.status === "READY" && "🍱 Food is ready"}
        {order.status === "PICKED_UP" && "🚴 Delivery partner is on the way"}
        {order.status === "DELIVERED" && "✅ Order delivered"}
      </p>

      {/* 🗺️ Live Location Map */}
      {order.status === "PICKED_UP" && (
        <>
          <h3 style={{ marginTop: "20px" }}>
            📍 Delivery Partner Live Location
          </h3>

          <MapContainer
            center={[location.lat, location.lng]}
            zoom={14}
            style={{
              height: "400px",
              width: "100%",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[location.lat, location.lng]}>
              <Popup>🚴 Delivery Partner</Popup>
            </Marker>
          </MapContainer>
        </>
      )}
    </div>
  );
}

export default TrackOrder;
