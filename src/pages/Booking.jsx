import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Booking() {
  const navigate = useNavigate();
  const locationData = useLocation();

  const mall = locationData.state || {
    name: "UB City Mall",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [floor, setFloor] = useState("F1");
  const [entryMinutes, setEntryMinutes] = useState(600); // 10:00 AM default
  const [exitMinutes, setExitMinutes] = useState(660); // 11:00 AM default
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Convert minutes to HH:MM
  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const adjustTime = (type, amount) => {
    if (type === "entry") {
      setEntryMinutes((prev) => Math.max(0, prev + amount));
    } else {
      setExitMinutes((prev) => Math.max(entryMinutes + 10, prev + amount));
    }
  };

  // 🔥 Smart Mock Heatmap Logic
  const slots = useMemo(() => {
    if (!showHeatmap) return [];

    const hour = Math.floor(entryMinutes / 60);

    return Array.from({ length: 20 }, (_, i) => {
      let occupancy;

      // Busy evening simulation
      if (hour >= 17 && hour <= 21) {
        occupancy = Math.random() * 0.7 + 0.3;
      }
      // Light morning
      else if (hour >= 8 && hour <= 11) {
        occupancy = Math.random() * 0.4;
      }
      // Normal afternoon
      else {
        occupancy = Math.random() * 0.8;
      }

      return {
        id: `${floor}-A${i + 1}`,
        occupancy,
        unavailable: occupancy > 0.8
      };
    });
  }, [floor, entryMinutes, showHeatmap]);

  const getHeatColor = (value) => {
    if (value < 0.3) return "bg-green-500";
    if (value < 0.6) return "bg-yellow-400";
    return "bg-red-500";
  };

  const duration =
    exitMinutes > entryMinutes
      ? ((exitMinutes - entryMinutes) / 60).toFixed(1)
      : null;

  const handleContinue = () => {
    navigate("/payment", {
      state: {
        mall: mall.name,
        slot: selectedSlot,
        entryTime: formatTime(entryMinutes),
        exitTime: formatTime(exitMinutes),
        duration
      }
    });
  };

  useEffect(() => {
    if (entryMinutes) setShowHeatmap(true);
  }, [entryMinutes]);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
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

        {/* 🔥 MODERN TIME PICKER */}
        <h2 className="text-xl font-semibold mb-4">
          Select Entry & Exit Time
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* Entry */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Entry Time
            </p>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => adjustTime("entry", -10)}
                className="bg-white/10 px-4 py-2 rounded-xl"
              >
                -
              </button>

              <span className="text-2xl font-semibold">
                {formatTime(entryMinutes)}
              </span>

              <button
                onClick={() => adjustTime("entry", 10)}
                className="bg-white/10 px-4 py-2 rounded-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Exit */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Exit Time
            </p>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => adjustTime("exit", -10)}
                className="bg-white/10 px-4 py-2 rounded-xl"
              >
                -
              </button>

              <span className="text-2xl font-semibold">
                {formatTime(exitMinutes)}
              </span>

              <button
                onClick={() => adjustTime("exit", 10)}
                className="bg-white/10 px-4 py-2 rounded-xl"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {duration && (
          <div className="mb-8 p-4 bg-lime-400/10 border border-lime-400/30 rounded-xl text-sm">
            Duration:{" "}
            <span className="font-semibold">
              {duration} hours
            </span>
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

        {/* 🔥 HEATMAP */}
        <AnimatePresence>
          {showHeatmap && !selectedSlot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl"
            >
              <h2 className="text-xl font-semibold mb-4">
                AI Occupancy Prediction
              </h2>

              <div className="grid grid-cols-5 gap-4">
                {slots.map((slot) => {
                  const isDisabled = slot.unavailable;

                  return (
                    <motion.div
                      key={slot.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        !isDisabled && setSelectedSlot(slot.id)
                      }
                      className={`p-4 rounded-xl text-center font-semibold transition
                        ${getHeatColor(slot.occupancy)}
                        ${
                          isDisabled
                            ? "opacity-30 cursor-not-allowed"
                            : "cursor-pointer"
                        }
                      `}
                    >
                      {slot.id}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTINUE BUTTON */}
        {selectedSlot && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="mt-6 w-full bg-lime-400 text-black py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Continue with {selectedSlot}
          </motion.button>
        )}

      </div>
    </div>
  );
}