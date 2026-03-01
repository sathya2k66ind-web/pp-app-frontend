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
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-4 overflow-hidden">

      {/* Slide Animation Wrapper */}
      <div
        className={`w-full max-w-md transform transition-all duration-700 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >

        {/* Main Card */}
        <div className="bg-[#111111] rounded-3xl shadow-2xl overflow-hidden border border-white/10">

          {/* Mall Image Header */}
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={booking.mallImage}
              alt="mall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute bottom-4 left-5">
              <h2 className="text-2xl font-semibold tracking-wide">
                {booking.mall}
              </h2>
              <p className="text-sm text-gray-300">
                {booking.date}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* Slot Info */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">
                  Parking Slot
                </p>
                <h3 className="text-3xl font-semibold mt-1">
                  {booking.slot}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">
                  Entry Time
                </p>
                <h3 className="text-lg font-medium mt-1">
                  {booking.entryTime}
                </h3>
              </div>
            </div>

            {/* QR Section */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <QRCodeCanvas
                  value={booking.ticketNo.toString()}
                  size={170}
                />
              </div>
            </div>

            {/* Ticket Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Ticket No
              </p>
              <p className="tracking-widest text-sm mt-1">
                {booking.ticketNo}
              </p>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <p className="text-gray-400">
                Total Amount
              </p>
              <p className="text-lg font-semibold">
                ₹ {booking.amount}
              </p>
            </div>

          </div>

          {/* Bottom Buttons */}
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