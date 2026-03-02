import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, MapPin, Zap, Star, Bell, Search, Music, Trophy, ChevronRight } from "lucide-react";
import { api } from "../api/api"; //
import { logoutUser } from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [malls, setMalls] = useState([]); // Dynamic state
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch Live Data from Render
  useEffect(() => {
    const fetchMalls = async () => {
      try {
        console.log("Fetching from:", api.defaults.baseURL + "/api/slots"); // Debug log
        const response = await api.get("/api/slots");
        
        // Match the data from your MongoDB collection 'slot'
        setMalls(response.data);
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMalls();
    const timer = setInterval(() => setActiveTab((p) => (p + 1) % 3), 5000);
    return () => clearInterval(timer);
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
          <span className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            BENGALURU <ChevronRight size={14} className="text-[#00FFFF]" />
          </span>
        </div>
        <div className="flex gap-4 items-center">
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

      {/* --- UNLOCKED MALLS --- */}
      <section className="px-6 mt-12">
        <h2 className="text-sm font-black uppercase tracking-widest mb-6">Unlocked Malls</h2>
        <div className="space-y-4">
          {malls.length > 0 ? (
            malls.map((mall, idx) => (
              <motion.div
                key={mall._id || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate("/booking", { state: mall })}
                className="group bg-white/[0.03] border border-white/5 rounded-[2.2rem] p-4 flex items-center gap-5 hover:border-[#00FFFF]/20 transition-all cursor-pointer"
              >
                <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden border border-white/10 shrink-0">
                  <img src={mall.image} className="w-full h-full object-cover" alt={mall.name} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-[#00FFFF] transition-colors">{mall.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-gray-500">
                    <div className="flex items-center gap-1"><MapPin size={12} className="text-[#00FFFF]" /> {mall.distance}</div>
                    <div className="flex items-center gap-1 text-orange-400"><Star size={12} fill="currentColor" /> {mall.rating}</div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#000d1a] border border-white/10 rounded-full">
                    <div className={`w-1.5 h-1.5 rounded-full ${mall.status === "High Demand" ? "bg-red-500" : "bg-[#00FFFF]"}`} />
                    <span className="text-[8px] font-black uppercase text-gray-400">{mall.status}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10 uppercase tracking-widest text-xs">No active slots found in Bengaluru grid</div>
          )}
        </div>
      </section>

      {/* --- GLASS DOCK --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-20 bg-black/50 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 flex justify-around items-center z-[100]">
        <button className="text-[#00FFFF]"><Zap size={24} fill="currentColor" /></button>
        <button className="text-gray-500"><Ticket size={24} /></button>
        <button className="text-gray-500"><MapPin size={24} /></button>
        <button className="text-gray-500"><Star size={24} /></button>
      </div>
    </div>
  );
};

export default Dashboard;