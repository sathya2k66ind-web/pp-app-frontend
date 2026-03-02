import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, MapPin, Zap, Star, Bell, Search, ChevronRight, Trophy } from "lucide-react";
import { api } from "../api/api"; //
import { logoutUser } from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);

  // 🔄 Fetch Live Data from Render
  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const response = await api.get("/api/slots");
        setMalls(response.data);
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMalls();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Logout from Slotify?")) logoutUser();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000d1a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#00FFFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000d1a] text-white pb-32 font-sans overflow-x-hidden">
      {/* --- NAV BAR --- */}
      <nav className="p-6 flex justify-between items-center sticky top-0 z-50 bg-[#000d1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify</span>
          <span className="text-xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
            BENGALURU <ChevronRight size={14} className="text-[#00FFFF]" />
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <Bell size={20} className="text-gray-400" />
          <div onClick={handleLogout} className="w-10 h-10 rounded-full border-2 border-[#00FFFF]/30 overflow-hidden cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Slotify" alt="User" />
          </div>
        </div>
      </nav>

      {/* --- SEARCH --- */}
      <div className="px-6 mt-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input type="text" placeholder="Find your next destination..." className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:border-[#00FFFF]/40" />
        </div>
      </div>

      {/* --- LIVE CITY PULSE (EVENTS) --- */}
      <section className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Live City Pulse</h2>
          <div className="flex gap-1">
            {[0, 1].map((i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${activeBanner === i ? "w-4 bg-[#00FFFF]" : "w-2 bg-white/10"}`} />
            ))}
          </div>
        </div>
        
        <div className="relative h-48 rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff87] to-[#60efff] opacity-90" />
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale group-hover:scale-110 transition-transform duration-700" 
            alt="Event"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                <Trophy size={10} /> Tournament
              </span>
            </div>
            <h3 className="text-2xl font-black italic uppercase leading-none mb-1">E-Sports Qualifiers</h3>
            <p className="text-[10px] font-bold text-black/60 flex items-center gap-1 uppercase tracking-tighter">
              <MapPin size={10} /> Nexus Mall, Koramangala
            </p>
          </div>
        </div>
      </section>

      {/* --- UNLOCKED MALLS --- */}
      <section className="px-6 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest">Unlocked Malls</h2>
          <span className="text-[10px] font-black text-[#00FFFF] uppercase tracking-tighter cursor-pointer">View All</span>
        </div>
        
        <div className="space-y-4">
          {malls.length > 0 ? (
            malls.map((mall, idx) => (
              <motion.div
                key={mall._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate("/booking", { state: mall })}
                className="group bg-white/[0.03] border border-white/5 rounded-[2.2rem] p-4 flex items-center gap-5 hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div className="w-24 h-24 rounded-[1.8rem] overflow-hidden border border-white/10 shrink-0">
                  <img src={mall.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={mall.name} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-[#00FFFF] transition-colors">{mall.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-gray-400">
                    <div className="flex items-center gap-1"><MapPin size={12} className="text-[#00FFFF]" /> {mall.distance}</div>
                    <div className="flex items-center gap-1 text-orange-400"><Star size={12} fill="currentColor" /> {mall.rating}</div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/5 rounded-full">
                    <div className={`w-1.5 h-1.5 rounded-full ${mall.status === "High Demand" ? "bg-red-500" : "bg-[#00FFFF]"}`} />
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">{mall.status}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
              <p className="text-gray-600 uppercase tracking-[0.2em] text-[10px] font-black">No active slots found in grid</p>
            </div>
          )}
        </div>
      </section>

      {/* --- FLOATING NAVIGATION --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-20 bg-black/40 backdrop-blur-3xl rounded-[2.8rem] border border-white/10 flex justify-around items-center z-[100] shadow-2xl">
        <button className="text-[#00FFFF] drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"><Zap size={24} fill="currentColor" /></button>
        <button className="text-gray-500 hover:text-white transition-colors"><Ticket size={24} /></button>
        <button className="text-gray-500 hover:text-white transition-colors"><MapPin size={24} /></button>
        <button className="text-gray-500 hover:text-white transition-colors"><Star size={24} /></button>
      </div>
    </div>
  );
};

export default Dashboard;
