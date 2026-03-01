import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Booking() {
  const navigate = useNavigate();
  const locationData = useLocation();

  const mall = locationData.state || {
    name: "UB City Mall",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [floor, setFloor] = useState("F1");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");

  // 🔥 Generate heatmap slots
  const slots = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const occupancy = Math.random(); // 0 - 1
      return {
        id: `${floor}-A${i + 1}`,
        occupancy
      };
    });
  }, [floor]);

  const getHeatColor = (value) => {
    if (value < 0.3) return "bg-green-500";
    if (value < 0.6) return "bg-yellow-400";
    return "bg-red-500";
  };

  const getHeatGlow = (value) => {
    if (value < 0.3) return "shadow-green-500/40";
    if (value < 0.6) return "shadow-yellow-400/40";
    return "shadow-red-500/40";
  };

  const calculateDuration = () => {
    if (!entryTime || !exitTime) return null;
    const start = new Date(`2024-01-01T${entryTime}`);
    const end = new Date(`2024-01-01T${exitTime}`);
    const diff = (end - start) / (1000 * 60 * 60);
    return diff > 0 ? diff : null;
  };

  const duration = calculateDuration();

  const handleContinue = () => {
    if (!selectedSlot || !entryTime || !exitTime) return;

    navigate("/payment", {
      state: {
        mall: mall.name,
        slot: selectedSlot,
        entryTime,
        exitTime,
        duration
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* HEADER IMAGE */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={mall.image}
          alt={mall.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black"></div>

        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold">{mall.name}</h1>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">

        <h2 className="text-xl font-semibold mb-4">Select Entry & Exit Time</h2>

        {/* ENTRY & EXIT TIME */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-400">Entry Time</label>
            <input
              type="time"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:border-lime-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Exit Time</label>
            <input
              type="time"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:border-lime-400 outline-none"
            />
          </div>
        </div>

        {duration && (
          <div className="mb-6 p-4 bg-lime-400/10 border border-lime-400/30 rounded-xl text-sm">
            Duration: <span className="font-semibold">{duration} hours</span>
          </div>
        )}

        {/* FLOOR SELECTOR */}
        <div className="flex gap-4 mb-6">
          {["F1", "F2"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFloor(f);
                setSelectedSlot(null);
              }}
              className={`px-4 py-2 rounded-xl border transition ${
                floor === f
                  ? "bg-lime-400 text-black border-lime-400"
                  : "border-white/20 bg-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Smart Heatmap Slot Selection
        </h2>

        {/* HEATMAP GRID */}
        <motion.div
          layout
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
        >
          <div className="grid grid-cols-5 gap-4">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              const heatColor = getHeatColor(slot.occupancy);
              const heatGlow = getHeatGlow(slot.occupancy);

              return (
                <motion.div
                  key={slot.id}
                  whileTap={{ scale: 0.95 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-4 rounded-xl text-center font-semibold cursor-pointer transition shadow-lg ${heatColor} ${heatGlow}
                    ${isSelected ? "ring-4 ring-white scale-105" : ""}
                  `}
                >
                  {slot.id}
                </motion.div>
              );
            })}
          </div>

          {selectedSlot && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleContinue}
              className="mt-6 w-full bg-lime-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Continue with {selectedSlot}
            </motion.button>
          )}
        </motion.div>

        {/* HEATMAP LEGEND */}
        <div className="flex gap-6 mt-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            Low Occupancy
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            Medium
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            High Occupancy
          </div>
        </div>

      </div>
    </div>
  );
}