import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 User Dashboard</h2>
      <hr />

      <ul style={{ lineHeight: "2" }}>
        <li>
          <Link to="/restaurants">🍽️ View Restaurants</Link>
        </li>
        <li>
          <Link to="/cart">🛒 View Cart</Link>
        </li>
        <li>
          <Link to="/track-order">📦 Track Order</Link>
        </li>
        <li>
            <Link to="/Order Food"> Order Food</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserDashboard;
