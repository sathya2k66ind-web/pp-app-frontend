import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-[#0b0b0c] px-6 py-10">

      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Bookings
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              Manage and review your parking reservations
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 border border-zinc-800 px-5 py-2.5 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            Dashboard
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-zinc-800 rounded-2xl bg-zinc-900/40"
          >
            <p className="text-lg text-zinc-400">
              No bookings yet
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 border border-zinc-700 px-6 py-3 rounded-xl text-sm hover:bg-zinc-800 transition"
            >
              Book Parking
            </button>
          </motion.div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <Section title="Upcoming">
            {upcoming.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                navigate={navigate}
                cancelBooking={cancelBooking}
              />
            ))}
          </Section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <Section title="Past">
            {past.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                navigate={navigate}
                cancelBooking={cancelBooking}
                isPast
              />
            ))}
          </Section>
        )}

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-medium tracking-wide">
          {title}
        </h2>
        <div className="h-px bg-zinc-800 mt-3" />
      </div>

      <div className="grid gap-6">
        {children}
      </div>
    </motion.div>
  );
}

function BookingCard({
  booking,
  navigate,
  cancelBooking,
  isPast = false,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900/60 backdrop-blur-xl"
    >

      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-base font-medium">
            {booking.location}
          </h3>
          <p className="text-sm text-zinc-500 mt-2">
            {booking.date} • {booking.time}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full border ${
            isPast
              ? "border-zinc-700 text-zinc-500"
              : "border-zinc-600 text-zinc-300"
          }`}
        >
          {isPast ? "Completed" : booking.status}
        </span>
      </div>

      <div className="mt-6 flex justify-between items-center">

        <p className="text-sm text-zinc-400">
          ₹ {booking.amount}
        </p>

        {!isPast && (
          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(`/ticket/${booking.id}`)}
              className="border border-zinc-700 px-4 py-2 rounded-xl text-sm hover:bg-zinc-800 transition-all duration-200"
            >
              View Ticket
            </button>

            <button
              onClick={() => cancelBooking(booking.id)}
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Cancel
            </button>

          </div>
        )}

      </div>

    </motion.div>
  );
}

export default MyBookings;