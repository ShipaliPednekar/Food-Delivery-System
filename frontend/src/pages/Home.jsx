import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Food Delivery App 🍕</h1>
      <Link to="/restaurants">View Restaurants</Link>
    </div>
  );
}

export default Home;
