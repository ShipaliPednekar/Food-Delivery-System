import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Get role from storage
  const role = localStorage.getItem("role"); // USER / RESTAURANT / DRIVER

  useEffect(() => {
    // ❌ Block restaurant & driver
    if (role !== "USER") {
      navigate("/unauthorized");
      return;
    }

    axios
      .get("/api/restaurants")
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load restaurants");
        setLoading(false);
      });
  }, [role, navigate]);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏪 Restaurants For You</h2>

      {restaurants.length === 0 && <p>No restaurants found</p>}

      {restaurants.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <Link to={`/foods/${r.id}`} style={{ textDecoration: "none", color: "#000" }}>
            <h3>{r.name}</h3>
          </Link>

          <p>📍 {r.location}</p>
          <p>🍽️ {r.cuisine}</p>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;
