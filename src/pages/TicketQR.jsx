import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

const TicketQR = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    mall: "Broadway",
    mallImage:
      "https://images.unsplash.com/photo-1582045250700-39c4a3c1b4f4",
    slot: "F6",
    ticketNo: Math.floor(100000 + Math.random() * 900000),
    date: "Sat, 18 Oct, 2024",
    entryTime: "1:30 PM",
    amount: "30.00",
  };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">

      <div
        className={`w-full max-w-md bg-gradient-to-br from-[#0f0f0f] to-[#111827] rounded-3xl border border-lime-400/20 shadow-2xl overflow-hidden transition-all duration-700 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >

        {/* Header */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center text-black font-bold">
            ⚡
          </div>
          <h2 className="text-lg font-semibold tracking-wide">
            PARK PULSE
          </h2>
        </div>

        {/* Mall Info */}
        <div className="p-4 flex gap-4 items-center border-b border-white/10">
          <img
            src={booking.mallImage}
            alt="mall"
            className="w-24 h-20 object-cover rounded-xl"
          />
          <div>
            <h3 className="text-2xl font-bold text-lime-400">
              {booking.mall}
            </h3>
            <p className="text-sm text-gray-400">1 Slot (P/A)</p>
            <p className="text-sm text-gray-300 mt-1">
              {booking.date}
            </p>
          </div>
        </div>

        {/* QR Section */}
        <div className="p-4 border-b border-white/10">

          <div className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/10">

            <div className="bg-lime-300 p-3 rounded-xl">
              <QRCodeCanvas
                value={booking.ticketNo.toString()}
                size={120}
              />
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Parking ticket (1)
              </p>

              <h3 className="text-3xl font-bold text-lime-400 mt-1">
                Slot : {booking.slot}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Ticket no. : {booking.ticketNo}
              </p>

              <p className="text-xs text-lime-400 mt-2 cursor-pointer hover:underline">
                Tap to see more
              </p>
            </div>

          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Ticket confirmation is sent to your verified GMAIL account
          </p>
        </div>

        {/* Entry Time */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h4 className="text-lg text-gray-300">
            Entry time
          </h4>

          <div className="flex items-center gap-3">
            <div className="h-6 w-[2px] bg-lime-400"></div>
            <span className="text-xl font-semibold">
              {booking.entryTime}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <h4 className="text-gray-300">
            Total Amount :
          </h4>

          <span className="text-lime-400 font-bold text-lg">
            ₹ {booking.amount}
          </span>
        </div>

        {/* Buttons */}
        <div className="p-4 flex gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-white/10 py-3 rounded-full text-gray-300 hover:bg-white/20 transition"
          >
            CANCEL
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-lime-400 text-black font-semibold py-3 rounded-full hover:scale-105 transition"
          >
            DONE
          </button>

        </div>

      </div>
    </div>
  );
};

export default TicketQR;