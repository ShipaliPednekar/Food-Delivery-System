import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // ✅ USER ONLY fields
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [foodPreference, setFoodPreference] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handleLogin = () => {
    if (!email || !role) {
      alert("Please fill required fields");
      return;
    }

    // ✅ Validate USER extra fields
    if (role === "USER") {
      if (!age || !gender || !foodPreference || !cuisine) {
        alert("Please fill all user details");
        return;
      }

      // store preferences
      localStorage.setItem("age", age);
      localStorage.setItem("gender", gender);
      localStorage.setItem("foodPreference", foodPreference);
      localStorage.setItem("cuisine", cuisine);
    }

    // store auth data
    login(email, role);
    localStorage.setItem("role", role);

    // navigation
    if (role === "USER") navigate("/");
    if (role === "RESTAURANT") navigate("/restaurant-dashboard");
    if (role === "DELIVERY") navigate("/delivery-dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🍔 Yummy</h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ROLE */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="RESTAURANT">Restaurant Owner</option>
          <option value="DELIVERY">Delivery Partner</option>
        </select>

        {/* ✅ USER ONLY FIELDS */}
        {role === "USER" && (
          <>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
            >
              <option value="">Food Preference</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
            </select>

            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="">Favorite Cuisine</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="Fast Food">Fast Food</option>
            </select>
          </>
        )}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
