import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // 🔔 Simulating payment success
    alert("💳 Payment Successful!");
    navigate("/order-success");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💳 Payment</h2>

      <p>Select Payment Method:</p>

      <div>
        <label>
          <input type="radio" name="payment" defaultChecked /> UPI
        </label><br/>
        <label>
          <input type="radio" name="payment" /> Credit / Debit Card
        </label><br/>
        <label>
          <input type="radio" name="payment" /> Cash on Delivery
        </label>
      </div>

      <br />
      <button onClick={handlePayment}>✅ Pay Now</button>
    </div>
  );
}

export default Payment;
