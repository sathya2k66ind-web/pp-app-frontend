import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from Dashboard
  const { name, distance, slots } = location.state || {};

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  // If page refreshed and no state exists
  if (!name) {
    return (
      <div className="text-white">
        <p>No booking data found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-lime-400 text-black px-4 py-2 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-zinc-400 text-sm hover:text-white"
      >
        ← Back
      </button>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {name}
        </h1>
        <p className="text-zinc-400 text-sm">
          {distance} • {slots} slots available
        </p>
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700"
        />
      </div>

      {/* Time Slots */}
      <div>
        <h2 className="text-sm text-zinc-400 mb-3">Available Slots</h2>

        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 rounded-xl text-sm font-medium transition ${
                selectedSlot === slot
                  ? "bg-lime-400 text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Parking Fee</span>
          <span>₹50</span>
        </div>

        <div className="flex justify-between font-semibold text-white mt-2">
          <span>Total</span>
          <span>₹50</span>
        </div>
      </div>

      {/* Continue to Payment Button */}
      <button
        disabled={!selectedSlot || !selectedDate}
        onClick={() =>
          navigate("/payment", {
            state: {
              name,
              distance,
              selectedSlot,
              date: selectedDate,
            },
          })
        }
        className={`w-full py-3 rounded-xl font-semibold transition ${
          selectedSlot && selectedDate
            ? "bg-lime-400 text-black"
            : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
        }`}
      >
        Continue to Payment
      </button>

    </div>
  );
};

export default Booking;