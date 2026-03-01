import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, MapPin, Zap, Bell, Search, 
  Filter, ChevronRight, Activity, Star, TrendingUp 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Premium", "Nearby", "Events", "Valet"];

  const trendingMalls = [
    { id: "ub-city", name: "UB CITY", dist: "0.8km", load: 85, price: "₹60/hr", rating: 4.9, img: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?auto=format&fit=crop&q=80&w=800" },
    { id: "phoenix", name: "PHOENIX", dist: "2.4km", load: 30, price: "₹40/hr", rating: 4.7, img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800" },
  ];

  const nearbyMalls = [
    { id: "nexus", name: "NEXUS", dist: "4.1km", load: 60, price: "₹50/hr", rating: 4.5, img: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&q=80&w=800" },
    { id: "mantri", name: "MANTRI", dist: "5.5km", load: 45, price: "₹30/hr", rating: 4.2, img: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-[#000d1a] text-white pb-32 font-sans selection:bg-[#00FFFF] selection:text-black">
      
      {/* HEADER SECTION */}
      <header className="p-6 flex justify-between items-center sticky top-0 z-50 bg-[#000d1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify</span>
          <span className="text-lg font-black tracking-tighter flex items-center gap-2">
            BENGALURU <ChevronRight size={14} className="text-[#00FFFF]" />
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <Search size={22} className="text-gray-400" />
          <div className="relative p-2 bg-white/5 rounded-full border border-white/10">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00FFFF] rounded-full" />
          </div>
        </div>
      </header>

      {/* CATEGORY BAR */}
      <div className="flex gap-4 overflow-x-auto px-6 py-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              activeCategory === cat 
              ? "bg-[#00FFFF] text-[#001F3F] border-[#00FFFF]" 
              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SECTION 1: TRENDING NOW (Horizontal Scroll) */}
      <section className="mt-4">
        <div className="flex justify-between items-center px-6 mb-4">
          <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <TrendingUp size={16} className="text-[#00FFFF]" /> Trending Now
          </h2>
          <span className="text-[10px] font-bold text-[#00FFFF] uppercase tracking-widest">See All</span>
        </div>

        <div className="flex gap-6 overflow-x-auto px-6 pb-4 no-scrollbar">
          {trendingMalls.map((mall) => (
            <motion.div
              key={mall.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/booking", { state: mall })}
              className="relative w-72 shrink-0 group cursor-pointer"
            >
              <div className="relative h-96 rounded-[2rem] overflow-hidden border border-white/10">
                <img src={mall.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={mall.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold">{mall.rating}</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">{mall.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold text-[#00FFFF] bg-[#00FFFF]/10 px-2 py-1 rounded border border-[#00FFFF]/20">
                      {mall.price}
                    </span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                      {mall.dist}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: NEARBY SPOTS (Vertical High-Detail List) */}
      <section className="mt-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <MapPin size={16} className="text-[#00FFFF]" /> Nearby Your Grid
          </h2>
        </div>

        <div className="space-y-6">
          {nearbyMalls.map((mall) => (
            <motion.div
              key={mall.id}
              whileHover={{ x: 5 }}
              onClick={() => navigate("/booking", { state: mall })}
              className="flex items-center gap-5 p-4 bg-white/5 rounded-[2rem] border border-white/5 hover:border-[#00FFFF]/20 transition-all cursor-pointer"
            >
              <img src={mall.img} className="w-24 h-24 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all" alt={mall.name} />
              
              <div className="flex-1">
                <h3 className="font-black text-lg uppercase tracking-tight">{mall.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-[10px] font-bold text-[#00FFFF]">{mall.price}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{mall.dist}</span>
                </div>
                
                {/* Capacity HUD */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${mall.load}%` }}
                      className={`h-full ${mall.load > 70 ? 'bg-red-500' : 'bg-[#00FFFF]'}`}
                    />
                  </div>
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{mall.load}% Full</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLOATING GLASS NAVIGATION (DOCK) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-20 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-6 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <button className="flex flex-col items-center gap-1 text-[#00FFFF]">
           <Zap size={24} fill="currentColor" />
           <span className="text-[8px] font-black uppercase tracking-widest">Explore</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500">
           <Ticket size={24} />
           <span className="text-[8px] font-black uppercase tracking-widest">Tickets</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500">
           <Star size={24} />
           <span className="text-[8px] font-black uppercase tracking-widest">Points</span>
        </button>
      </motion.div>

    </div>
  );
};

export default Dashboard;