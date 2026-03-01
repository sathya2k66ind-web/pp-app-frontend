import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  // 🔥 SLOTIFY SMART HEATMAP UI LOGIC
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
      state: { mall: mall.name, slot: selectedSlot, entryTime: formatTime(entryMinutes), exitTime: formatTime(exitMinutes), duration }
    });
  };

  useEffect(() => {
    if (entryMinutes) {
      setShowHeatmap(true);
      setSelectedSlot(null);
    }
  }, [entryMinutes, floor]);

  return (
    <div className="min-h-screen bg-[#001F3F] text-white font-sans pb-10">
      
      {/* HEADER SECTION */}
      <div className="relative h-72 w-full overflow-hidden">
        <img src={mall.image} alt={mall.name} className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001f3f]/50 to-[#001F3F]"></div>

        <div className="absolute bottom-8 left-8">
          <motion.button 
            onClick={() => navigate(-1)}
            className="text-[#00FFFF] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
          >
            ‹ Back to City
          </motion.button>
          <h1 className="text-4xl font-black tracking-tighter italic-none uppercase">
            {mall.name}
          </h1>
          <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">Secure Your Slot</p>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-10 max-w-4xl mx-auto">

        {/* TIME PICKER INTERFACE */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Entry Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 text-center transition-all hover:border-[#00FFFF]/30">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 font-bold">Arrival</p>
            <div className="flex justify-between items-center bg-[#001F3F] rounded-2xl p-2 border border-white/5">
              <button onClick={() => adjustTime("entry", -10)} className="w-10 h-10 flex items-center justify-center text-[#00FFFF] text-xl font-bold rounded-xl hover:bg-[#00FFFF]/10 transition">-</button>
              <span className="text-2xl font-black tabular-nums">{formatTime(entryMinutes)}</span>
              <button onClick={() => adjustTime("entry", 10)} className="w-10 h-10 flex items-center justify-center text-[#00FFFF] text-xl font-bold rounded-xl hover:bg-[#00FFFF]/10 transition">+</button>
            </div>
          </div>

          {/* Exit Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 text-center transition-all hover:border-[#00FFFF]/30">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 font-bold">Departure</p>
            <div className="flex justify-between items-center bg-[#001F3F] rounded-2xl p-2 border border-white/5">
              <button onClick={() => adjustTime("exit", -10)} className="w-10 h-10 flex items-center justify-center text-[#00FFFF] text-xl font-bold rounded-xl hover:bg-[#00FFFF]/10 transition">-</button>
              <span className="text-2xl font-black tabular-nums">{formatTime(exitMinutes)}</span>
              <button onClick={() => adjustTime("exit", 10)} className="w-10 h-10 flex items-center justify-center text-[#00FFFF] text-xl font-bold rounded-xl hover:bg-[#00FFFF]/10 transition">+</button>
            </div>
          </div>
        </div>

        {duration && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-2xl text-center text-[#00FFFF] text-xs font-bold uppercase tracking-[0.2em]"
          >
            Booking Duration: {duration} hours
          </motion.div>
        )}

        {/* FLOOR SELECTOR */}
        <div className="flex justify-center gap-4 mb-8">
          {["F1", "F2", "F3"].map((f) => (
            <button
              key={f}
              onClick={() => { setFloor(f); setSelectedSlot(null); }}
              className={`w-16 h-12 rounded-2xl font-black transition-all border ${
                floor === f ? "bg-[#00FFFF] text-[#001F3F] border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.3)]" : "border-white/10 bg-white/5 text-gray-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* SLOTIFY HEATMAP VIEW */}
        <AnimatePresence>
          {showHeatmap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white italic-none">Select your slot</h2>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-[#00FFFF] font-bold">AI PREDICTION ACTIVE</div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {slots.map((slot) => {
                  const isDisabled = slot.unavailable;
                  let colorClass;
                  if (slot.permanentlyBlocked) colorClass = "bg-gray-800 border-transparent text-gray-600";
                  else if (slot.id === selectedSlot) colorClass = "bg-[#00FFFF] text-[#001F3F] border-[#00FFFF] shadow-[0_0_25px_rgba(0,255,255,0.5)] scale-105";
                  else if (slot.occupancy < 0.3) colorClass = "bg-[#00FFFF]/10 border-[#00FFFF]/40 text-[#00FFFF] hover:bg-[#00FFFF]/20";
                  else if (slot.occupancy < 0.6) colorClass = "bg-orange-500/10 border-orange-500/40 text-orange-400";
                  else colorClass = "bg-red-500/10 border-red-500/40 text-red-500";

                  return (
                    <motion.div
                      key={slot.id}
                      whileTap={!isDisabled ? { scale: 0.9 } : {}}
                      onClick={() => !isDisabled && setSelectedSlot(slot.id)}
                      className={`h-20 rounded-2xl border flex flex-col items-center justify-center font-black transition-all duration-300 text-sm ${colorClass} ${isDisabled ? "opacity-20 cursor-not-allowed grayscale" : "cursor-pointer"}`}
                    >
                      <span className="text-[10px] opacity-60 mb-1">{slot.id.split('-')[0]}</span>
                      {slot.id.split('-')[1]}
                    </motion.div>
                  );
                })}
              </div>

              {/* LEGEND UI */}
              <div className="grid grid-cols-2 gap-y-4 mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                  <div className="w-3 h-3 bg-[#00FFFF]/20 border border-[#00FFFF]/40 rounded-full"></div> Available
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                  <div className="w-3 h-3 bg-red-500/20 border border-red-500/40 rounded-full"></div> Congested
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div> Reserved
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                  <div className="w-3 h-3 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF]"></div> Selected
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTINUE CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#001F3F] to-transparent">
          <motion.button
            disabled={!selectedSlot}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={handleContinue}
            className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest transition-all ${
              selectedSlot ? "bg-[#00FFFF] text-[#001F3F] shadow-[0_10px_40px_rgba(0,255,255,0.3)] scale-100" : "bg-white/5 text-gray-600 scale-95 opacity-50"
            }`}
          >
            {selectedSlot ? `Unlock Slot ${selectedSlot}` : "Select a Spot"}
          </motion.button>
        </div>

      </div>
    </div>
  );
}