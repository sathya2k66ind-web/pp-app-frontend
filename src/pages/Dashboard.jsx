import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star, Bell, Search, Music, Trophy, ChevronRight, Activity, MapPin } from "lucide-react";
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
      location: "Phoenix Mall of Asia",
      tag: "50% OFF",
      icon: <Zap size={18} fill="currentColor" />,
      color: "from-purple-600/30 to-blue-500/30",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "E-Sports Qualifiers",
      location: "Nexus Mall",
      tag: "TOURNAMENT",
      icon: <Trophy size={18} fill="currentColor" />,
      color: "from-green-600/30 to-cyan-500/30",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const response = await api.get("/api/slots"); 
        setMalls(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Integration Error:", error);
        setMalls([]);
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
    <div className="min-h-screen bg-[#000d1a] text-white font-sans overflow-x-hidden relative">
      
      {/* 1. TOP HUD NAV */}
      <nav className="p-6 flex justify-between items-center sticky top-0 z-50 bg-[#000d1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify OS v2.0</span>
          <span className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            BENGALURU <ChevronRight size={14} className="text-[#00FFFF]" />
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div onClick={handleLogout} className="w-10 h-10 rounded-full border-2 border-[#00FFFF]/30 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Slotify" alt="User" />
          </div>
        </div>
      </nav>

      {/* 2. BENTO STATS */}
      <div className="px-6 mt-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-gradient-to-r from-[#00FFFF]/10 to-transparent border border-white/10 p-4 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Grids</p>
            <h4 className="text-2xl font-black text-[#00FFFF]">1,240 <span className="text-xs text-white/50">SLOTS</span></h4>
          </div>
          <Activity className="text-[#00FFFF] animate-pulse" size={24} />
        </div>
      </div>

      {/* 3. MESH GRADIENT EVENT SLIDER */}
      <section className="px-6 mt-8">
        <div className="relative h-60 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className={`absolute inset-0 rounded-[3rem] overflow-hidden p-8 flex flex-col justify-end bg-gradient-to-br ${liveEvents[activeTab].color} border border-white/10`}
            >
              <img src={liveEvents[activeTab].image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 grayscale" alt="Event" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-black mb-4 border border-[#00FFFF]/30">
                  <span className="text-[#00FFFF]">{liveEvents[activeTab].icon}</span>
                  {liveEvents[activeTab].tag}
                </div>
                <h3 className="text-4xl font-black uppercase italic leading-none">{liveEvents[activeTab].title}</h3>
                <p className="text-[10px] font-bold text-white/50 mt-2 flex items-center gap-1 uppercase tracking-widest italic"><MapPin size={10} /> {liveEvents[activeTab].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. MALL CARDS WITH HUD UI */}
      <section className="px-6 mt-12 mb-32">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#00FFFF]">Nearby Grids</h2>
          <div className="h-[1px] flex-1 bg-white/5 mx-4" />
        </div>

        <div className="space-y-6">
          {malls.length > 0 ? malls.map((mall, idx) => {
            const isBusy = mall.status === "High Demand" || mall.status === "Congested";
            const capacity = isBusy ? "88%" : "24%";
            
            return (
              <motion.div
                key={mall._id || idx}
                whileHover={{ y: -5 }}
                onClick={() => navigate("/booking", { state: mall })}
                className="relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-5 cursor-pointer group transition-all hover:bg-white/[0.06] hover:border-[#00FFFF]/30 shadow-xl"
              >
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                
                <div className="flex gap-5 items-center">
                  <div className="relative w-20 h-20 shrink-0">
                    <img src={mall.image} className="w-full h-full object-cover rounded-3xl grayscale-[50%] group-hover:grayscale-0 transition-all duration-500 shadow-lg border border-white/10" alt={mall.name} />
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-4 border-[#000d1a] ${isBusy ? "bg-red-500 shadow-[0_0_8px_red]" : "bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]"}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-[#00FFFF] transition-colors leading-none">{mall.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-orange-400">
                        <Star size={10} fill="currentColor" /> {mall.rating}
                      </div>
                    </div>
                    <p className="text-[9px] font-bold text-zinc-500 mt-1 uppercase tracking-widest">{mall.location} • {mall.distance}</p>

                    {/* Capacity HUD Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">
                        <span>Load Factor</span>
                        <span className={isBusy ? "text-red-400" : "text-[#00FFFF]"}>{capacity}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: capacity }}
                          viewport={{ once: true }}
                          className={`h-full rounded-full ${isBusy ? "bg-red-500 shadow-[0_0_8px_red]" : "bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }) : (
            <div className="text-center text-gray-500 py-10 font-bold uppercase tracking-widest text-xs border border-dashed border-white/10 rounded-[2.5rem]">No grid signals found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;