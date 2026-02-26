import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const TicketQR = () => {
  const navigate = useNavigate();

  // Get bookings from localStorage
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Get latest booking
  const booking =
    bookings.length > 0
      ? bookings[bookings.length - 1]
      : {
          id: "PP" + Math.floor(Math.random() * 100000),
          location: "Central Parking",
          date: new Date().toLocaleDateString(),
          time: "10:00 AM",
        };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="bg-white text-black w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">

        {/* Top Section */}
        <div className="bg-lime-400 p-6 text-center">
          <h2 className="text-xl font-bold">
            Park Pulse Ticket
          </h2>
        </div>

        {/* Ticket Body */}
        <div className="p-6 text-center space-y-4">

          <div>
            <h3 className="text-lg font-bold">
              {booking.location}
            </h3>
            <p className="text-sm text-gray-600">
              {booking.date} • {booking.time}
            </p>
          </div>

          <div className="flex justify-center">
            <QRCodeCanvas value={booking.id} size={180} />
          </div>

          <p className="text-xs text-gray-500">
            Booking ID: {booking.id}
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="p-4 bg-gray-100 flex justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="text-sm text-lime-600 font-semibold"
          >
            My Bookings
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketQR;