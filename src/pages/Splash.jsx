import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-[#000d1a] flex flex-col items-center justify-center overflow-hidden font-sans relative">
      
      {/* 1. THE VOID: Clean Background with single deep glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#00FFFF]/10 blur-[140px] rounded-full" />

      {/* 2. THE BRAND: Flat, Modern, Sharp */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "-0.05em" }}
          animate={{ opacity: 1, letterSpacing: "0.02em" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center text-7xl font-black tracking-tighter text-white uppercase"
        >
          <span>SL</span>
          
          {/* THE ICON: Precision-engineered Glass Circle */}
          <div className="relative mx-4 w-20 h-20">
            {/* Inner Glowing Ring */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 border-[1px] border-white/20 rounded-full bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(0,255,255,0.15)]"
            />
            
            {/* The "O" Core: Minimalist Shackle Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                initial={{ height: "0%" }}
                animate={{ height: "40%" }}
                transition={{ delay: 2, duration: 1, ease: "circOut" }}
                className="w-[2px] bg-[#00FFFF] shadow-[0_0_15px_#00FFFF]"
               />
            </div>
          </div>

          <span>TIFY</span>
        </motion.div>

        {/* 3. SUBTEXT: Thin, spaced, elegant */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-6 text-[10px] font-medium text-white/40 uppercase tracking-[1em] ml-[1em]"
        >
          The City Unlocked
        </motion.p>
      </div>

      {/* 4. THE PROGRESS: Single, razor-thin line at the bottom */}
      <div className="absolute bottom-20 w-40 h-[1px] bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"
        />
      </div>

    </div>
  );
}