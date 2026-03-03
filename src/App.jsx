import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import TicketQR from "./pages/TicketQR";
import MyBookings from "./pages/MyBookings";
import NavigatePage from "./pages/Navigate";
import Profile from "./pages/Profile"; // 👈 New Import
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      {/* Splash First */}
      <Route path="/" element={<Splash />} />

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

      <Route
        path="/my-bookings"
        element={
          <MainLayout>
            <MyBookings />
          </MainLayout>
        }
      />

      {/* Profile Route - Wrapped in MainLayout for the HUD Nav */}
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      {/* Full Screen Ticket */}
      <Route path="/ticket" element={<TicketQR />} />

      {/* Navigate Screen */}
      <Route path="/navigate" element={<NavigatePage />} />

      {/* Fallback → Redirect to Splash */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;