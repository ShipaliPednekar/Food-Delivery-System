import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Foods() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/foods/${restaurantId}`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [restaurantId]);

  return (
    <div>
      <h2>🍽️ Food Menu</h2>

      {foods.map((food) => (
        <div
          key={food.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{food.name}</h3>
          <p>₹{food.price}</p>

          <button
            onClick={() => {
              addToCart(food);
              navigate("/cart"); // ✅ redirect
            }}
          >
            ➕ Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Foods;
