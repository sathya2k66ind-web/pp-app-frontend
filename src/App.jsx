import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import TicketQR from "./pages/TicketQR";
import MyBookings from "./pages/MyBookings";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main App Routes */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/booking"
        element={
          <MainLayout>
            <Booking />
          </MainLayout>
        }
      />

      <Route
        path="/payment"
        element={
          <MainLayout>
            <Payment />
          </MainLayout>
        }
      />

      <Route
        path="/success"
        element={
          <MainLayout>
            <Success />
          </MainLayout>
        }
      />

      <Route path="/ticket" element={<TicketQR />} />

      <Route
        path="/my-bookings"
        element={
          <MainLayout>
            <MyBookings />
          </MainLayout>
        }
      />

      {/* Default */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;