import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ArrowUpRight, Radio, LocateFixed, ChevronLeft, Shield } from "lucide-react";

const Navigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Integrated real data from Booking/Ticket state
  const booking = location.state?.booking || {
    mall: "Broadway Hub",
    mallImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    lat: "13.0827",
    lng: "80.2707",
    slot: "A-12"
  };

  const [visible, setVisible] = useState(false);
  const [eta] = useState("6 MINS");
  const [distance] = useState("3.2 KM");

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const openGoogleMaps = () => {
    // Fixed URL construction for real navigation
    const url = `https://www.google.com/maps/dir/?api=1&destination=${booking.lat},${booking.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white flex flex-col font-sans relative overflow-hidden">
      
      {/* 1. LAYERED BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#00FFFF 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}></div>
      
      {/* SCANLINE EFFECT */}
      <motion.div 
        animate={{ translateY: ["0%", "1000%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent z-0 pointer-events-none"
      />

      {/* 2. TOP HUD HEADER */}
      <div className="relative z-10 flex justify-between items-center p-8 pt-12">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <ChevronLeft size={20} className="text-[#00FFFF]" />
        </button>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
             <Radio size={14} className="text-[#00FFFF] animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFFF]">GPS: ACTIVE</span>
          </div>
          <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">SATELLITE SYNC: 98%</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        className="flex-1 px-6 pb-12 relative z-10 flex flex-col justify-between"
      >
        {/* 3. MAIN NAVIGATOR INTERFACE */}
        <div className="relative aspect-square w-full max-w-sm mx-auto group">
            {/* Corner Brackets */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#00FFFF] opacity-50" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#00FFFF] opacity-50" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#00FFFF] opacity-50" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#00FFFF] opacity-50" />

            <div className="w-full h-full rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/10 relative">
                {/* Visual Map Backdrop */}
                <div className="absolute inset-0 grayscale opacity-40 mix-blend-overlay">
                    <img src={booking.mallImage} className="w-full h-full object-cover" alt="Navigation context" />
                </div>
                
                {/* HUD Overlay Circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border border-[#00FFFF]/10 rounded-full animate-pulse" />
                    <div className="absolute w-48 h-48 border border-[#00FFFF]/5 rounded-full" />
                    
                    {/* Directional Arrow */}
                    <motion.div 
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-24 h-24 bg-[#00FFFF]/10 rounded-full flex items-center justify-center backdrop-blur-md border border-[#00FFFF]/30 shadow-[0_0_40px_rgba(0,255,255,0.2)]">
                            <ArrowUpRight size={40} className="text-[#00FFFF]" />
                        </div>
                        <div className="mt-6 text-center">
                            <h2 className="text-xl font-black uppercase italic tracking-tighter">{booking.mall}</h2>
                            <p className="text-[10px] text-[#00FFFF] font-black tracking-[0.4em] uppercase">Target Lock: {booking.slot}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Live Telemetry Glitch Effect */}
                <div className="absolute top-8 left-8">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Lat</p>
                    <p className="text-xs font-mono text-[#00FFFF] tabular-nums">{booking.lat}</p>
                </div>
                <div className="absolute top-8 right-8 text-right">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Lng</p>
                    <p className="text-xs font-mono text-[#00FFFF] tabular-nums">{booking.lng}</p>
                </div>
            </div>
        </div>

        {/* 4. TELEMETRY CARDS */}
        <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-2">
                    <LocateFixed size={14} className="text-zinc-500" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Distance</span>
                </div>
                <p className="text-2xl font-black italic">{distance}</p>
            </div>
            <div className="bg-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Navigation size={14} className="text-[#00FFFF]" />
                    <span className="text-[9px] font-black text-[#00FFFF] uppercase tracking-widest">Arrival</span>
                </div>
                <p className="text-2xl font-black italic text-[#00FFFF]">{eta}</p>
            </div>
        </div>

        {/* 5. PILOT CONTROLS */}
        <div className="mt-8 space-y-4">
            <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 py-5 rounded-[1.8rem] bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em]"
                >
                    Abort
                </button>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={openGoogleMaps}
                    className="flex-[2.5] py-5 rounded-[1.8rem] bg-[#00FFFF] text-[#000d1a] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,255,255,0.3)]"
                >
                    <Shield size={16} fill="currentColor" />
                    Pilot Link
                </motion.button>
            </div>
            
            <p className="text-center text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Eyes on the road. Haptic feedback will engage <br/> upon entering the proximity zone.
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Navigate;