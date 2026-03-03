import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Cpu, Clock, Layers, Zap } from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();
  const locationData = useLocation();

  const mall = locationData.state || {
    name: "UB City Mall",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [floor, setFloor] = useState("F1");
  const [entryMinutes, setEntryMinutes] = useState(600); 
  const [exitMinutes, setExitMinutes] = useState(660); 
  const [showHeatmap, setShowHeatmap] = useState(false);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const adjustTime = (type, amount) => {
    if (type === "entry") {
      setEntryMinutes((prev) => Math.max(0, prev + amount));
      setSelectedSlot(null);
    } else {
      setExitMinutes((prev) => Math.max(entryMinutes + 10, prev + amount));
    }
  };

  const slots = useMemo(() => {
    if (!showHeatmap) return [];
    const hour = Math.floor(entryMinutes / 60);

    return Array.from({ length: 20 }, (_, i) => {
      let baseOccupancy;
      const clusterFactor = i >= 7 && i <= 12 ? 0.3 : 0;

      if (hour >= 17 && hour <= 21) baseOccupancy = 0.5 + Math.random() * 0.5;
      else if (hour >= 8 && hour <= 11) baseOccupancy = Math.random() * 0.4;
      else baseOccupancy = 0.3 + Math.random() * 0.5;

      const occupancy = Math.min(baseOccupancy + clusterFactor, 1);
      const permanentlyBlocked = i === 2 || i === 17;
      const predictedFull = occupancy > 0.75;

      return {
        id: `${floor}-A${i + 1}`,
        occupancy,
        unavailable: permanentlyBlocked || predictedFull,
        permanentlyBlocked
      };
    });
  }, [floor, entryMinutes, showHeatmap]);

  const duration = exitMinutes > entryMinutes ? ((exitMinutes - entryMinutes) / 60).toFixed(1) : null;

  const handleContinue = () => {
    navigate("/payment", {
      state: { 
        mall: mall.name, 
        slot: selectedSlot, 
        entryTime: formatTime(entryMinutes), 
        exitTime: formatTime(exitMinutes), 
        duration,
        amount: 120 
      }
    });
  };

  useEffect(() => {
    if (entryMinutes) {
      setShowHeatmap(true);
      setSelectedSlot(null);
    }
  }, [entryMinutes, floor]);

  return (
    <div className="min-h-screen bg-[#000d1a] text-white font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC HEADER */}
      <div className="relative h-80 w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          src={mall.image} 
          alt={mall.name} 
          className="w-full h-full object-cover opacity-40 grayscale-[30%]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000d1a]/20 via-[#000d1a]/60 to-[#000d1a]"></div>

        <div className="absolute top-12 left-6 right-6 flex justify-between items-center text-white">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <ChevronLeft size={20} className="text-[#00FFFF]" />
          </button>
          <div className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-full flex items-center gap-2">
            <Cpu size={12} className="text-[#00FFFF] animate-pulse" />
            <span className="text-[9px] font-black tracking-widest text-[#00FFFF]">OS v2.0 ACTIVE</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-8">
          <h1 className="text-4xl font-black tracking-tighter italic uppercase leading-none">
            {mall.name}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-[#00FFFF] animate-ping" />
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Grid Synchronization</p>
          </div>
        </div>
      </div>

      {/* UI FIX: Increased pb-52 to allow content to scroll above both the Initialize button AND Bottom Nav */}
      <div className="px-6 -mt-4 relative z-10 pb-52">

        {/* 2. DUAL TIME DIALS */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: "Arrival", time: entryMinutes, type: "entry" },
            { label: "Departure", time: exitMinutes, type: "exit" }
          ].map((dial) => (
            <div key={dial.label} className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-5">
              <p className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] mb-4 font-black text-center">{dial.label}</p>
              <div className="flex justify-between items-center bg-black/40 rounded-2xl p-1 border border-white/5">
                <button 
                  onClick={() => adjustTime(dial.type, -10)} 
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-[#00FFFF] transition"
                >
                  -
                </button>
                <span className="text-xl font-black tabular-nums text-[#00FFFF]">{formatTime(dial.time)}</span>
                <button 
                  onClick={() => adjustTime(dial.type, 10)} 
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-[#00FFFF] transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3. DURATION BADGE */}
        {duration && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 py-3 bg-gradient-to-r from-[#00FFFF]/10 to-transparent border-l-2 border-[#00FFFF] px-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <Clock size={14} className="text-[#00FFFF]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Protocol Duration</span>
            </div>
            <span className="text-sm font-black text-[#00FFFF]">{duration} HRS</span>
          </motion.div>
        )}

        {/* 4. FLOOR NAVIGATOR */}
        <div className="flex items-center gap-4 mb-8">
          <Layers size={16} className="text-zinc-500" />
          <div className="flex gap-3">
            {["F1", "F2", "F3"].map((f) => (
              <button
                key={f}
                onClick={() => { setFloor(f); setSelectedSlot(null); }}
                className={`px-5 py-2 rounded-xl font-black text-[10px] tracking-widest transition-all border ${
                  floor === f ? "bg-[#00FFFF] text-black border-[#00FFFF]" : "border-white/10 bg-white/5 text-zinc-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 5. GRID HEATMAP */}
        <AnimatePresence>
          {showHeatmap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-6 rounded-[2.5rem]"
            >
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Select Grid Unit</h2>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[8px] font-bold text-green-500 tracking-widest uppercase">Live Status</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {slots.map((slot) => {
                  const isDisabled = slot.unavailable;
                  let colorClass;
                  if (slot.permanentlyBlocked) colorClass = "bg-zinc-900 border-transparent text-zinc-800";
                  else if (slot.id === selectedSlot) colorClass = "bg-[#00FFFF] text-black border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.4)] scale-105 z-10";
                  else if (slot.occupancy < 0.3) colorClass = "bg-[#00FFFF]/5 border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10";
                  else if (slot.occupancy < 0.6) colorClass = "bg-orange-500/5 border-orange-500/20 text-orange-400";
                  else colorClass = "bg-red-500/5 border-red-500/20 text-red-500";

                  return (
                    <motion.div
                      key={slot.id}
                      whileTap={!isDisabled ? { scale: 0.95 } : {}}
                      onClick={() => !isDisabled && setSelectedSlot(slot.id)}
                      className={`h-20 rounded-2xl border flex flex-col items-center justify-center font-black transition-all duration-300 ${colorClass} ${isDisabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span className="text-[8px] opacity-40 mb-1">{slot.id.split('-')[0]}</span>
                      <span className="text-sm tracking-tighter">{slot.id.split('-')[1]}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* LEGEND HUD */}
              <div className="grid grid-cols-2 gap-y-4 mt-8 pt-6 border-t border-white/5 px-2">
                {[
                  { color: "bg-[#00FFFF]/20", label: "Optimal" },
                  { color: "bg-red-500/20", label: "High Load" },
                  { color: "bg-zinc-800", label: "Reserved" },
                  { color: "bg-[#00FFFF]", label: "Active" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-[8px] uppercase font-black text-zinc-500 tracking-widest">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div> {item.label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. GLOBAL CTA FIX: Moved to bottom-20 to sit exactly ABOVE the bottom navigation bar */}
      <div className="fixed bottom-20 left-0 right-0 p-6 z-[90] pointer-events-none">
        <motion.button
          disabled={!selectedSlot}
          whileHover={selectedSlot ? { scale: 1.02 } : {}}
          whileTap={selectedSlot ? { scale: 0.98 } : {}}
          onClick={handleContinue}
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all pointer-events-auto backdrop-blur-md ${
            selectedSlot 
              ? "bg-[#00FFFF] text-black shadow-[0_15px_40px_rgba(0,255,255,0.4)]" 
              : "bg-white/5 text-zinc-700 border border-white/5"
          }`}
        >
          {selectedSlot ? (
            <>
              <Zap size={16} fill="currentColor" /> 
              Initialize {selectedSlot}
            </>
          ) : (
            "Select Unit to Continue"
          )}
        </motion.button>
      </div>
    </div>
  );
}