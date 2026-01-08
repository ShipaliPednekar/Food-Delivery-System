import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = user?.role;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      {/* 🔹 App Title */}
      <h2>🍕 Food Delivery App</h2>

      {/* 🔹 Navigation */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        
        {/* 👤 USER NAV */}
        {role === "USER" && (
          <>
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/cart" style={{ fontWeight: "bold" }}>
              🛒 Cart ({totalItems})
            </Link>
          </>
        )}

        {/* 🏪 RESTAURANT OWNER NAV */}
        {role === "RESTAURANT" && (
          <Link to="/restaurant-dashboard">
            Restaurant Dashboard
          </Link>
        )}

        {/* 🚴 DELIVERY PARTNER NAV */}
        {role === "DELIVERY" && (
          <Link to="/delivery-dashboard">
            Delivery Dashboard
          </Link>
        )}

        {/* 🔐 AUTH ACTIONS */}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <span style={{ fontSize: "14px" }}>
              👤 {user.email} ({role})
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "#e63946",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
 