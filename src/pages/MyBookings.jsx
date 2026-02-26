import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const now = new Date();

  const upcoming = bookings.filter(
    (b) => new Date(`${b.date} ${b.time}`) >= now
  );

  const past = bookings.filter(
    (b) => new Date(`${b.date} ${b.time}`) < now
  );

  const cancelBooking = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const updated = bookings.filter((b) => b.id !== id);

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-xl">No bookings yet</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-lime-400 hover:bg-lime-300 text-black px-6 py-3 rounded-xl font-semibold transition"
          >
            Book Now
          </button>
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4 text-lime-400">
            Upcoming
          </h2>
          <div className="grid gap-5">
            {upcoming.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                navigate={navigate}
                cancelBooking={cancelBooking}
              />
            ))}
          </div>
        </>
      )}

      {/* Past */}
      {past.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-400">
            Past
          </h2>
          <div className="grid gap-5">
            {past.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                navigate={navigate}
                cancelBooking={cancelBooking}
                isPast
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BookingCard({
  booking,
  navigate,
  cancelBooking,
  isPast = false,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">
            {booking.location}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {booking.date} • {booking.time}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            isPast
              ? "bg-gray-500/20 text-gray-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {isPast ? "Completed" : booking.status}
        </span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-lime-400 font-semibold">
          ₹ {booking.amount}
        </p>

        <div className="flex items-center gap-3">
          {!isPast && (
            <button
              onClick={() => navigate(`/ticket/${booking.id}`)}
              className="bg-lime-400 hover:bg-lime-300 text-black px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              View Ticket
            </button>
          )}

          {!isPast && (
            <button
              onClick={() => cancelBooking(booking.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;