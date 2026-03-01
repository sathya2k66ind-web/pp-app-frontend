import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

const TicketQR = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    mall: "Broadway",
    mallImage:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3",
    slot: "F6",
    ticketNo: Math.floor(100000 + Math.random() * 900000),
    date: "Sat, 18 Oct, 2024",
    entryTime: "1:30 PM",
    amount: "30.00",
    lat: 13.0827,
    lng: 80.2707,
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden text-white px-4">

      {/* Animated Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse top-[-150px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse bottom-[-150px] right-[-100px]"></div>

      {/* Slide Animation */}
      <div
        className={`w-full max-w-md transition-all duration-700 transform ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }`}
      >

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={booking.mallImage}
              alt="mall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

            <div className="absolute bottom-5 left-5">
              <h2 className="text-2xl font-semibold tracking-wide">
                {booking.mall}
              </h2>
              <p className="text-sm text-gray-300">
                {booking.date}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 relative">

            {/* Floating Ticket Badge */}
            <div className="absolute -top-5 right-6 bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
              #{booking.ticketNo}
            </div>

            {/* Slot + Time */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">
                  Parking Slot
                </p>
                <h3 className="text-3xl font-semibold mt-1">
                  {booking.slot}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">
                  Entry Time
                </p>
                <h3 className="text-lg font-medium mt-1">
                  {booking.entryTime}
                </h3>
              </div>
            </div>

            {/* Glowing QR Section */}
            <div className="flex justify-center relative">

              <div className="absolute w-52 h-52 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>

              <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                <QRCodeCanvas
                  value={booking.ticketNo.toString()}
                  size={170}
                />
              </div>

            </div>

            {/* Amount */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Total Paid
              </p>
              <p className="text-lg font-semibold">
                ₹ {booking.amount}
              </p>
            </div>

            {/* Navigate Button */}
            <button
              onClick={() =>
                navigate("/navigate", { state: { booking } })
              }
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-medium hover:scale-105 transition-transform duration-300"
            >
              Navigate to Mall
            </button>

          </div>

          {/* Bottom Actions */}
          <div className="flex gap-4 p-4 bg-black/40">

            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition"
            >
              Done
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TicketQR;