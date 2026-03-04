import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, ChevronRight, XCircle, Ticket } from "lucide-react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming you have a backend, you'd fetch from API here
    // For now, pulling from localStorage to maintain your existing logic
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const now = new Date();

  // Updated filter logic to be more robust with Date objects
  const upcoming = bookings.filter((b) => new Date(b.date) >= now);
  const past = bookings.filter((b) => new Date(b.date) < now);

  const cancelBooking = (id) => {
    if (window.confirm("Abort this reservation sequence?")) {
      const updated = bookings.filter((b) => b.id !== id);
      localStorage.setItem("bookings", JSON.stringify(updated));
      setBookings(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white font-sans relative overflow-hidden">
      {/* HUD Background Decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#00FFFF 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}></div>

      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate("/dashboard")}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#00FFFF]"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Your Hangar</h1>
            <p className="text-[10px] font-black text-[#00FFFF] tracking-[0.3em] uppercase mt-1">Reservation Logs</p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-md"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket size={30} className="text-zinc-600" />
            </div>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No Active Signals</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-8 px-8 py-4 bg-[#00FFFF] text-[#000d1a] rounded-2xl font-black uppercase text-xs tracking-widest"
            >
              Initialize Search
            </button>
          </motion.div>
        )}

        <div className="space-y-12">
          {upcoming.length > 0 && (
            <BookingSection title="Active Trajectories" count={upcoming.length}>
              {upcoming.map((b, i) => (
                <BookingCard 
                  key={b.id} 
                  booking={b} 
                  navigate={navigate} 
                  cancelBooking={cancelBooking} 
                  delay={i * 0.1}
                />
              ))}
            </BookingSection>
          )}

          {past.length > 0 && (
            <BookingSection title="Archive" count={past.length} isPast>
              {past.map((b, i) => (
                <BookingCard 
                  key={b.id} 
                  booking={b} 
                  navigate={navigate} 
                  isPast 
                  delay={i * 0.1}
                />
              ))}
            </BookingSection>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingSection({ title, count, children, isPast }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] ${isPast ? 'text-zinc-600' : 'text-[#00FFFF]'}`}>
          {title}
        </h2>
        <span className="text-[10px] font-mono text-zinc-500 opacity-50">0{count}</span>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function BookingCard({ booking, navigate, cancelBooking, isPast, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`relative group p-6 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-300 ${
        isPast 
          ? "bg-white/[0.02] border-white/5 grayscale" 
          : "bg-white/[0.04] border-white/10 hover:border-[#00FFFF]/30 shadow-xl"
      }`}
    >
      {/* Card Decoration */}
      {!isPast && (
        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse shadow-[0_0_10px_#00FFFF]" />
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-zinc-500 mb-1">
            <MapPin size={12} className={isPast ? "" : "text-[#00FFFF]"} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {booking.location || "Central Mall"}
            </span>
          </div>
          <h3 className="text-xl font-black tracking-tighter uppercase italic">
            Slot {booking.slot || "A-01"}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-black tabular-nums tracking-tighter">₹{booking.amount}</p>
          <p className="text-[9px] font-bold text-zinc-600 uppercase">Paid via {booking.method || 'GPay'}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8 py-4 border-y border-white/5">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-zinc-500" />
          <span className="text-xs font-bold font-mono">{booking.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-zinc-500" />
          <span className="text-xs font-bold font-mono">{booking.time}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isPast ? (
          <>
            <button
              onClick={() => navigate(`/ticket`, { state: { booking } })}
              className="flex-1 bg-white/5 hover:bg-[#00FFFF] hover:text-[#000d1a] border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Ticket size={14} />
              Digital Pass
            </button>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-zinc-600 hover:text-red-500 transition-colors"
            >
              <XCircle size={20} />
            </button>
          </>
        ) : (
          <div className="w-full py-3 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
             <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Trajectory Completed</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MyBookings;