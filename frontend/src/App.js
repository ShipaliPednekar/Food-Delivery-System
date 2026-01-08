import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Foods from "./pages/Foods";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";

import UserDashboard from "./pages/UserDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import OrderHistory from "./pages/OrderHistory";   // ✅ ADD THIS

import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 🔐 Login */}
        <Route path="/login" element={<Login />} />

        {/* 👤 USER */}
        <Route
          path="/"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/restaurants"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <Restaurants />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/foods/:restaurantId"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <Foods />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <Cart />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <Payment />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <OrderSuccess />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/track-order"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <TrackOrder />
            </ProtectedRoutes>
          }
        />

        {/* 🧑‍🍳 RESTAURANT */}
        <Route
          path="/restaurant-dashboard"
          element={
            <ProtectedRoutes allowedRoles={["RESTAURANT"]}>
              <RestaurantDashboard />
            </ProtectedRoutes>
          }
        />

        {/* ✅ RESTAURANT ORDER HISTORY */}
        <Route
          path="/order-history"
          element={
            <ProtectedRoutes allowedRoles={["RESTAURANT"]}>
              <OrderHistory />
            </ProtectedRoutes>
          }
        />

        {/* 🚴 DELIVERY */}
        <Route
          path="/delivery-dashboard"
          element={
            <ProtectedRoutes allowedRoles={["DELIVERY"]}>
              <DeliveryDashboard />
            </ProtectedRoutes>
          }
        />

        {/* 👤 USER DASHBOARD */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoutes allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
