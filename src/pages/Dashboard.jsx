// ... (keep imports same)

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [malls, setMalls] = useState([]); 
  const [loading, setLoading] = useState(true);

  // ... (keep liveEvents same)

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const response = await api.get("/api/slots"); 
        // Force check if data is an array to prevent crashes
        setMalls(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Integration Error:", error);
        setMalls([]); // Clear malls on error to show the empty state message
      } finally {
        // Ensure loading always ends
        setTimeout(() => setLoading(false), 500); 
      }
    };
    fetchMalls();

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % liveEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000d1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#00FFFF] border-t-transparent rounded-full shadow-[0_0_15px_#00FFFF]"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFFF] animate-pulse">Initializing Grid...</span>
        </div>
      </div>
    );
  }

  return (
    // Ensure relative and min-h-screen are present to prevent "void" look
    <div className="min-h-screen bg-[#000d1a] text-white pb-32 font-sans overflow-x-hidden relative">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="p-6 flex justify-between items-center sticky top-0 z-50 bg-[#000d1a]/90 backdrop-blur-2xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify</span>
          <span className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            BENGALURU <ChevronRight size={14} className="text-[#00FFFF]" />
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative p-2.5 bg-white/5 rounded-full border border-white/10">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse shadow-[0_0_10px_#00FFFF]" />
          </div>
          <div onClick={handleLogout} className="w-10 h-10 rounded-full border-2 border-[#00FFFF]/30 overflow-hidden cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Slotify" alt="User" />
          </div>
        </div>
      </nav>

      {/* 2. SEARCH BAR */}
      <div className="px-6 mt-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search malls or areas..." 
            className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:border-[#00FFFF]/40 transition-all text-sm"
          />
        </div>
      </div>

      {/* 3. LIVE CITY PULSE */}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className={`absolute inset-0 rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-end bg-gradient-to-br ${liveEvents[activeTab].color}`}
            >
              <img src={liveEvents[activeTab].image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" alt="Event" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-white/10">
                  <span className="text-[#00FFFF]">{liveEvents[activeTab].icon}</span>
                  {liveEvents[activeTab].tag}
                </div>
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
      <section className="px-6 mt-12 pb-10">
        <div className="flex justify-between items-center mb-6 px-1">
          <h2 className="text-sm font-black uppercase tracking-widest">Unlocked Malls</h2>
          <span className="text-[10px] font-black text-[#00FFFF] uppercase tracking-widest">View All</span>
        </div>

        <div className="space-y-4">
          {malls.length > 0 ? malls.map((mall, idx) => (
            <motion.div
              key={mall._id || idx}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/booking", { state: mall })}
              className="group bg-white/[0.03] border border-white/5 rounded-[2.2rem] p-4 flex items-center gap-5 hover:bg-white/[0.08] transition-all"
            >
              <div className="relative w-24 h-24 rounded-[1.5rem] overflow-hidden shrink-0 border border-white/10">
                <img 
                  src={mall.name === "UB City Mall" && mall.image.includes("...") 
                    ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                    : mall.image
                  } 
                  className="w-full h-full object-cover" 
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
                  <div className={`w-1.5 h-1.5 rounded-full ${mall.status === "High Demand" ? "bg-red-500" : "bg-[#00FFFF]"}`} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{mall.status}</span>
                </div>
              </div>
            </motion.div>
          )) : (
            // Visual feedback for empty state
            <div className="bg-white/5 border border-dashed border-white/10 rounded-[2rem] py-20 flex flex-col items-center justify-center text-center px-10">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-600">
                  <Search size={24} />
               </div>
               <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No active slots found in Bengaluru grid</p>
               <button onClick={() => window.location.reload()} className="mt-4 text-[#00FFFF] text-[10px] font-black uppercase tracking-widest border-b border-[#00FFFF]">Retry Connection</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
