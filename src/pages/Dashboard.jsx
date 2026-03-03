import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, MapPin, Zap, Star, Bell, Search, Music, Trophy, ChevronRight } from "lucide-react";
import { api } from "../api/api"; 
import { logoutUser } from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [malls, setMalls] = useState([]); 
  const [loading, setLoading] = useState(true);

  const liveEvents = [
    {
      id: 1,
      title: "Neon Midnight Sale",
      location: "Phoenix Marketcity",
      tag: "50% OFF",
      icon: <Zap size={18} fill="currentColor" />,
      color: "from-purple-600 to-blue-500",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Underground Jazz Fest",
      location: "UB City Arena",
      tag: "LIVE NOW",
      icon: <Music size={18} fill="currentColor" />,
      color: "from-orange-600 to-red-500",
      image: "https://images.unsplash.com/photo-1514525253344-7814d999d641?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "E-Sports Qualifiers",
      location: "Nexus Mall",
      tag: "TOURNAMENT",
      icon: <Trophy size={18} fill="currentColor" />,
      color: "from-green-600 to-cyan-500",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const response = await api.get("/api/slots"); 
        setMalls(response.data);
      } catch (error) {
        console.error("Integration Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMalls();

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % liveEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [liveEvents.length]);

  const handleLogout = () => {
    if (window.confirm("Logout from Slotify?")) {
      logoutUser();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000d1a] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-[#00FFFF] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    // Changed pb-32 to pb-20 to align with the permanent bottom bar
    <div className="min-h-screen bg-[#000d1a] text-white pb-20 font-sans overflow-x-hidden relative">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="p-6 flex justify-between items-center sticky top-0 z-50 bg-[#000d1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify</span>
          <span className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            BENGALURU <ChevronRight size={14} className="text-[#00FFFF]" />
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative p-2.5 bg-white/5 rounded-full border border-white/10 cursor-pointer">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse shadow-[0_0_10px_#00FFFF]" />
          </div>
          <div 
            onClick={handleLogout}
            className="w-10 h-10 rounded-full border-2 border-[#00FFFF]/30 overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
          >
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Slotify" alt="User" />
          </div>
        </div>
      </nav>

      {/* 2. SEARCH BAR */}
      <div className="px-6 mt-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00FFFF] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Find your next destination..." 
            className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:border-[#00FFFF]/40 focus:bg-white/10 transition-all text-sm"
          />
        </div>
      </div>

      {/* 3. LIVE CITY PULSE (SLIDER) */}
      <section className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Live City Pulse</h2>
          <div className="flex gap-1.5">
            {liveEvents.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${activeTab === i ? "w-6 bg-[#00FFFF]" : "w-2 bg-white/10"}`} />
            ))}
          </div>
        </div>

        <div className="relative h-52 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute inset-0 rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-end bg-gradient-to-br ${liveEvents[activeTab].color} shadow-2xl shadow-black/50`}
            >
              <img src={liveEvents[activeTab].image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 grayscale-[20%]" alt="Event" />
              <div className="relative z-10">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-white/10"
                >
                  <span className="text-[#00FFFF]">{liveEvents[activeTab].icon}</span>
                  {liveEvents[activeTab].tag}
                </motion.div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">{liveEvents[activeTab].title}</h3>
                <p className="text-[10px] font-bold text-white/70 mt-2 flex items-center gap-1 uppercase tracking-[0.2em]">
                  <MapPin size={12} className="text-[#00FFFF]" /> {liveEvents[activeTab].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. UNLOCKED MALLS */}
      <section className="px-6 mt-12">
        <div className="flex justify-between items-center mb-6 px-1">
          <h2 className="text-sm font-black uppercase tracking-widest">Unlocked Malls</h2>
          <span className="text-[10px] font-black text-[#00FFFF] uppercase tracking-widest cursor-pointer hover:underline">View All</span>
        </div>

        <div className="space-y-4">
          {malls.length > 0 ? malls.map((mall, idx) => (
            <motion.div
              key={mall._id || idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/booking", { state: mall })}
              className="group bg-white/[0.03] border border-white/5 rounded-[2.2rem] p-4 flex items-center gap-5 hover:bg-white/[0.08] hover:border-[#00FFFF]/20 transition-all cursor-pointer"
            >
              <div className="relative w-24 h-24 rounded-[1.5rem] overflow-hidden shrink-0 border border-white/10">
                <img 
                  // Logic to fix UB City image if the DB link is broken
                  src={mall.name === "UB City Mall" && mall.image.includes("...") 
                    ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                    : mall.image
                  } 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0" 
                  alt={mall.name} 
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-[#00FFFF] transition-colors">{mall.name}</h3>
                
                <div className="flex items-center gap-4 mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-1"><MapPin size={12} className="text-[#00FFFF]" /> {mall.distance}</div>
                  <div className="flex items-center gap-1 text-orange-400"><Star size={12} fill="currentColor" /> {mall.rating}</div>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#000d1a] border border-white/10 rounded-full">
                  <div className={`w-1.5 h-1.5 rounded-full ${mall.status === "High Demand" ? "bg-red-500 animate-pulse shadow-[0_0_8px_red]" : mall.status === "Available" ? "bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" : "bg-orange-500"}`} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{mall.status}</span>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center text-gray-500 py-10 font-bold uppercase tracking-widest text-xs">No active slots found in Bengaluru grid</div>
          )}
        </div>
      </section>

      {/* Floating Glass Dock was removed to fix double dashboard issue */}
    </div>
  );
};

export default Dashboard;
