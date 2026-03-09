import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();
  const [bootStatus, setBootStatus] = useState("Initializing System...");

  useEffect(() => {
    // Cyberpunk Boot Sequence Labels
    const sequence = [
      { time: 800, label: "Syncing Neural Link..." },
      { time: 2000, label: "Authorizing grid access..." },
      { time: 3200, label: "Deploying decryption bridge..." },
      { time: 4200, label: "Welcome, Pilot." },
    ];

    sequence.forEach((step) => {
      setTimeout(() => setBootStatus(step.label), step.time);
    });

    const timer = setTimeout(() => {
      navigate("/login");
    }, 5500); // 5.5 Seconds for a premium "Boot" feel

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-[#000d1a] flex flex-col items-center justify-center overflow-hidden font-sans relative">
      
      {/* 1. LAYERED BACKGROUNDS (Depth & Contrast) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
           style={{ backgroundImage: `radial-gradient(#00FFFF 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}></div>
      
      {/* Deep Neon Bloom (Pulsing Ambient) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-[#00FFFF] blur-[150px] rounded-full z-0" 
      />

      {/* 2. MAIN LOGO ON GLASS PANEL */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center p-12 rounded-[3.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group"
      >
        {/* Glass Specular Glint (Diagonal Highlight) */}
        <motion.div 
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 3, delay: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[20deg]"
        />

        {/* HUD Elements (Glass Etching) */}
        <div className="absolute -inset-1 border-l border-t border-[#00FFFF]/30 w-10 h-10 rounded-tl-[3rem] opacity-70" />
        <div className="absolute -inset-1 -bottom-1 border-r border-b border-[#00FFFF]/30 w-10 h-10 ml-auto mt-auto rounded-br-[3rem] opacity-70" />

        {/* Wordmark: slotify (Extreme Inner Glow) */}
        <div className="flex items-center text-8xl font-black tracking-tighter text-white italic relative">
          <span>SL</span>
          
          {/* THE HERO 'O' (Unlocked Animation) */}
          <motion.div 
            animate={{ 
              rotateY: [0, 360],
              borderColor: ["#00FFFF", "#ffffff", "#00FFFF"] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="relative mx-3 w-24 h-24 border-4 border-[#00FFFF] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.4),inset_0_0_20px_rgba(0,255,255,0.4)] bg-white/5"
          >
            {/* Padlock Shackle */}
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: -10 }}
              transition={{ delay: 4, type: "spring", stiffness: 200, damping: 12 }}
              className="absolute -top-7 w-12 h-12 border-t-4 border-l-4 border-r-4 border-[#00FFFF] rounded-t-full shadow-[0_-5px_15px_rgba(0,255,255,0.2)]"
            >
              <div className="absolute top-0 right-1.5 w-2 h-4 bg-[#000d1a]" />
            </motion.div>

            {/* Internal Car Icon (Electric Pulse) */}
            <div className="w-10 h-14 bg-white rounded-lg relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.5)]">
               <div className="absolute top-2 left-1.5 right-1.5 h-5 bg-[#000d1a] rounded-sm" />
               <div className="absolute bottom-2 left-2.5 w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-ping shadow-[0_0_8px_#00FFFF]" />
            </div>
          </motion.div>

          {/* Chromatic Aberration Text Layer */}
          <div className="absolute inset-0 text-[#ff00ff] opacity-10 blur-[2px] z-0">
             <span>SL</span> <span className="relative mx-3 w-24 h-24"></span> <span>TIFY</span>
          </div>
          <div className="absolute inset-0 text-[#00FFFF] opacity-10 blur-[2px] z-0">
             <span>SL</span> <span className="relative mx-3 w-24 h-24"></span> <span>TIFY</span>
          </div>

          <span className="relative z-10">TIFY</span>
        </div>

        {/* 3. SUBTEXT & STATUS */}
        <div className="mt-14 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-[12px] font-black text-[#00FFFF] uppercase tracking-[0.8em] mb-4 shadow-[0_0_10px_#00FFFF]"
          >
            The City, Unlocked.
          </motion.h2>

          {/* Boot Status Labels (Glass Monospace) */}
          <AnimatePresence mode="wait">
            <motion.p
              key={bootStatus}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-[9px] text-white/50 uppercase tracking-[0.3em] bg-black/40 px-3 py-1 rounded-md border border-white/5"
            >
              {bootStatus}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 4. SCANNER LINE EFFECT */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFFF]/50 to-transparent z-10"
      />

      {/* 5. BOTTOM GLASS LOADING SPINNER */}
      <div className="absolute bottom-16 flex items-center justify-center p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl">
        <svg className="w-14 h-14 rotate-[-90deg]">
          <circle 
            cx="28" cy="28" r="24" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="transparent" 
            className="text-white/5" 
          />
          <motion.circle 
            cx="28" cy="28" r="24" 
            stroke="#00FFFF" 
            strokeWidth="3" 
            fill="transparent" 
            strokeDasharray="150.8"
            initial={{ strokeDashoffset: 150.8 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="shadow-[0_0_15px_#00FFFF]"
          />
        </svg>
      </div>
    </div>
  );
}