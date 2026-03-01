import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ArrowUpRight, Radio, LocateFixed } from "lucide-react";

const Navigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    mall: "Broadway",
    mallImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    lat: 13.0827,
    lng: 80.2707,
  };

  const [visible, setVisible] = useState(false);
  const [eta] = useState("6 mins");
  const [distance] = useState("3.2 km");

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const openGoogleMaps = () => {
    // Fixed the URL template literal
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${booking.lat},${booking.lng}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#001F3F] text-white flex flex-col items-center justify-center px-4 font-sans relative overflow-hidden">
      
      {/* HUD GRID OVERLAY */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)`, 
           backgroundSize: '40px 40px' }}></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        className="w-full max-w-md relative z-10"
      >
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-center mb-4 px-2">
           <div className="flex items-center gap-2">
              <Radio size={14} className="text-[#00FFFF] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFFF]">GPS Signal: Locked</span>
           </div>
           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">v2.0.4 - HUD Mode</span>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">

          {/* SIMULATED MAP PREVIEW */}
          <div className="relative h-64 w-full bg-[#001F3F] overflow-hidden">
            {/* Animated Route Path */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
                <motion.path 
                    d="M 50 250 Q 150 150 350 50" 
                    fill="transparent" 
                    stroke="#00FFFF" 
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>
            
            <img
              src={booking.mallImage}
              alt="mall"
              className="w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            
            {/* HUD Elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 border-2 border-[#00FFFF]/30 rounded-full flex items-center justify-center animate-spin-slow">
                    <ArrowUpRight size={32} className="text-[#00FFFF]" />
                </div>
                <div className="mt-4 px-4 py-1 bg-[#00FFFF] text-[#001F3F] text-[10px] font-black uppercase rounded-full">
                    Target: {booking.mall}
                </div>
            </div>

            <div className="absolute bottom-5 left-8 right-8 flex justify-between">
                <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Lat</p>
                    <p className="text-xs font-mono">{booking.lat}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Lng</p>
                    <p className="text-xs font-mono">{booking.lng}</p>
                </div>
            </div>
          </div>

          {/* TELEMETRY SECTION */}
          <div className="p-10 space-y-8 bg-gradient-to-b from-white/5 to-transparent">
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#00FFFF]/10 p-4 rounded-2xl border border-[#00FFFF]/20">
                  <LocateFixed size={20} className="text-[#00FFFF]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Distance</p>
                  <p className="text-xl font-black">{distance}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#00FFFF]/10 p-4 rounded-2xl border border-[#00FFFF]/20">
                  <Navigation size={20} className="text-[#00FFFF]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">ETA</p>
                  <p className="text-xl font-black text-[#00FFFF]">{eta}</p>
                </div>
              </div>
            </div>

            {/* PROGRESS TRACKER */}
            <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>Current Pos</span>
                    <span>Destination</span>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div 
                        animate={{ x: [-20, 300] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute h-full w-20 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"
                    />
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] uppercase font-black tracking-widest hover:bg-white/10 transition"
              >
                HUD Off
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openGoogleMaps}
                className="flex-[2] py-4 rounded-2xl bg-[#00FFFF] text-[#001F3F] font-black uppercase text-[11px] tracking-widest shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              >
                Initiate Pilot Link
              </motion.button>
            </div>

          </div>
        </div>

        {/* FOOTER ADVISORY */}
        <p className="text-center text-[10px] text-gray-600 mt-8 uppercase tracking-[0.2em] font-bold px-10 leading-relaxed">
            Please focus on the road. Slotify will notify you when you enter the mall perimeter.
        </p>
      </motion.div>
    </div>
  );
};

export default Navigate;