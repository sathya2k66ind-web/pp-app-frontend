import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, MapPin, Zap, Bell, Search, 
  Layers, Filter, ChevronRight, Activity 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const malls = [
    { id: "ub-city", name: "UB City", dist: "0.8km", load: 85, price: "₹60/hr", img: "https://images.unsplash.com/photo-1567449303078-57ad995bd301" },
    { id: "phoenix", name: "Phoenix", dist: "2.4km", load: 30, price: "₹40/hr", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3" },
    { id: "nexus", name: "Nexus", dist: "4.1km", load: 60, price: "₹50/hr", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  ];

  return (
    <div className="min-h-screen bg-[#000d1a] text-white pb-32 overflow-hidden font-sans">
      
      {/* 1. THE "AMBIENT NEON" BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#00FFFF]/10 to-transparent pointer-events-none" />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-[#00FFFF]/20 blur-[120px] rounded-full"
      />

      {/* 2. DYNAMIC HEADER */}
      <header className="p-8 flex justify-between items-end relative z-10">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FFFF] mb-1"
          >
            System Active
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter"
          >
            Slotify <span className="text-stroke text-transparent border-white">HUB</span>
          </motion.h1>
        </div>
        <motion.div whileTap={{ scale: 0.9 }} className="relative p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#00FFFF] rounded-full animate-ping" />
        </motion.div>
      </header>

      {/* 3. SEARCH & FILTERS (SLEEK GLASS) */}
      <section className="px-8 mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search Perimeter..." 
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-[#00FFFF]/40 transition-all text-sm backdrop-blur-md"
            />
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-[#00FFFF]">
            <Filter size={20} />
          </button>
        </div>
      </section>

      {/* 4. LIVE CAPACITY HEATMAP (THE "COMPLEX" FEATURE) */}
      <section className="px-8 mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-[#00FFFF]" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Live Grid Capacity</h2>
        </div>
        <div className="grid grid-cols-7 gap-2 h-16">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: [0.2, Math.random() + 0.5, 0.2] }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity }}
              className={`rounded-t-sm ${i % 3 === 0 ? 'bg-[#00FFFF]' : 'bg-white/10'}`}
              style={{ opacity: 0.2 + (i * 0.05) }}
            />
          ))}
        </div>
      </section>

      {/* 5. THE STAGGERED LIST (ELITE CARDS) */}
      <section className="px-8 space-y-6">
        {malls.map((mall, index) => (
          <motion.div
            key={mall.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredId(mall.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => navigate("/booking", { state: mall })}
            className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-5 cursor-pointer overflow-hidden transition-all hover:bg-white/[0.07] hover:border-[#00FFFF]/30"
          >
            {/* Animated Background Highlight */}
            <AnimatePresence>
              {hoveredId === mall.id && (
                <motion.div 
                  layoutId="hoverBg"
                  className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 to-transparent z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 flex items-center gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <img src={mall.img} alt="" className="w-full h-full object-cover rounded-[1.8rem] grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute -bottom-2 -right-2 bg-[#00FFFF] text-[#001F3F] p-1.5 rounded-lg">
                  <Layers size={14} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black uppercase tracking-tighter italic">{mall.name}</h3>
                  <span className="text-[10px] font-bold text-[#00FFFF]">{mall.price}</span>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                    <MapPin size={12} /> {mall.dist}
                  </div>
                  <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${mall.load}%` }}
                      className={`h-full ${mall.load > 70 ? 'bg-red-500' : 'bg-[#00FFFF]'}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500">{mall.load}%</span>
                </div>
              </div>
              
              <ChevronRight className="text-gray-700 group-hover:text-[#00FFFF] transition-colors" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* 6. THE FLOATING GLASS DOCK */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-20 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100]"
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#00FFFF] shadow-[0_0_10px_#00FFFF]" />
        {[Zap, Ticket, MapPin, Layers].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -5, color: "#00FFFF" }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 transition-colors ${i === 0 ? 'text-[#00FFFF]' : 'text-gray-500'}`}
          >
            <Icon size={24} strokeWidth={i === 0 ? 3 : 2} />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;