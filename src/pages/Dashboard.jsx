import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, MapPin, Zap, Flame, Star, Bell, Search, Music, Trophy } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // 🔥 LIVE CITY PULSE (SLIDING EVENTS)
  const liveEvents = [
    {
      id: 1,
      title: "Neon Midnight Sale",
      location: "Phoenix Marketcity",
      tag: "50% OFF",
      icon: <Zap size={18} />,
      color: "from-purple-600 to-blue-500",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      id: 2,
      title: "Underground Jazz Fest",
      location: "UB City Arena",
      tag: "LIVE NOW",
      icon: <Music size={18} />,
      color: "from-orange-600 to-red-500",
      image: "https://images.unsplash.com/photo-1514525253344-7814d999d641"
    },
    {
      id: 3,
      title: "E-Sports Qualifiers",
      location: "Nexus Mall",
      tag: "TOURNAMENT",
      icon: <Trophy size={18} />,
      color: "from-green-600 to-cyan-500",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
    }
  ];

  // 🏙️ PREMIUM MALL DIRECTORY
  const malls = [
    {
      id: "ub-city",
      name: "UB City Mall",
      distance: "0.8 km",
      rating: 4.9,
      status: "High Demand",
      image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301"
    },
    {
      id: "phoenix",
      name: "Phoenix Marketcity",
      distance: "2.4 km",
      rating: 4.7,
      status: "Available",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      id: "nexus",
      name: "Nexus Koramangala",
      distance: "4.1 km",
      rating: 4.5,
      status: "Congested",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      id: "mantri",
      name: "Mantri Square",
      distance: "5.5 km",
      rating: 4.2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f"
    }
  ];

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % liveEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#001F3F] text-white pb-24 font-sans">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="p-6 flex justify-between items-center bg-gradient-to-b from-[#001F3F] to-transparent sticky top-0 z-50 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify</span>
          <span className="text-xl font-black italic-none tracking-tighter">BENGALURU</span>
        </div>
        <div className="flex gap-4">
          <div className="p-3 bg-white/5 rounded-full border border-white/10 relative">
            <Bell size={20} />
            <div className="absolute top-3 right-3 w-2 h-2 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF]" />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00FFFF]/30 shadow-lg">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Slotify" alt="User" />
          </div>
        </div>
      </nav>

      {/* 2. SEARCH BAR */}
      <div className="px-6 mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#00FFFF] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Find your next destination..." 
            className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:border-[#00FFFF]/50 focus:bg-white/10 transition-all text-sm"
          />
        </div>
      </div>

      {/* 3. LIVE CITY PULSE (SLIDER) */}
      <div className="px-6 mb-10 overflow-hidden">
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Live City Pulse</h2>
          <div className="flex gap-1">
            {liveEvents.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${activeTab === i ? "w-6 bg-[#00FFFF]" : "w-2 bg-white/10"}`} />
            ))}
          </div>
        </div>

        <div className="relative h-48 w-full group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`absolute inset-0 rounded-[2.5rem] overflow-hidden p-6 flex flex-col justify-end bg-gradient-to-br ${liveEvents[activeTab].color}`}
            >
              <img src={liveEvents[activeTab].image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" alt="Event" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                  {liveEvents[activeTab].icon}
                  {liveEvents[activeTab].tag}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none">{liveEvents[activeTab].title}</h3>
                <p className="text-xs font-bold text-white/70 mt-1 flex items-center gap-1 uppercase tracking-widest">
                  <MapPin size={12} /> {liveEvents[activeTab].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. MALL LIST (THE GRID) */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest italic-none">Unlocked Malls</h2>
          <span className="text-[10px] font-bold text-[#00FFFF] uppercase tracking-widest cursor-pointer">View All</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {malls.map((mall) => (
            <motion.div
              key={mall.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/booking", { state: mall })}
              className="group bg-white/5 border border-white/5 rounded-[2rem] p-4 flex items-center gap-5 hover:bg-white/10 hover:border-[#00FFFF]/20 transition-all cursor-pointer"
            >
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img src={mall.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={mall.name} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-[#00FFFF] transition-colors">{mall.name}</h3>
                </div>
                
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <div className="flex items-center gap-1"><MapPin size={10} className="text-[#00FFFF]" /> {mall.distance}</div>
                  <div className="flex items-center gap-1 text-orange-400"><Star size={10} fill="currentColor" /> {mall.rating}</div>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#001F3F] border border-white/5 rounded-lg">
                  <div className={`w-1.5 h-1.5 rounded-full ${mall.status === "High Demand" ? "bg-red-500 animate-pulse" : mall.status === "Available" ? "bg-[#00FFFF]" : "bg-orange-500"}`} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{mall.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. BOTTOM NAVIGATION DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-20 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 flex justify-around items-center px-4 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button className="flex flex-col items-center gap-1 text-[#00FFFF]">
          <div className="p-3 bg-[#00FFFF]/10 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.1)]"><Zap size={22} fill="currentColor" /></div>
        </button>
        <button className="text-gray-500 hover:text-white transition-colors">
          <Ticket size={22} />
        </button>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MapPin size={22} />
        </button>
        <button className="text-gray-500 hover:text-white transition-colors">
          <Star size={22} />
        </button>
      </div>

    </div>
  );
};

export default Dashboard;