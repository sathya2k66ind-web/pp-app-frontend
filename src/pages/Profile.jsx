import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Car, ShieldCheck, Camera, ChevronLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "User Name",
    email: "user@slotify.com",
    vehicleNumber: "KA-01-HH-1234",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Slotify"
  });

  // Save functionality to update MongoDB
  const handleSave = async () => {
    setLoading(true);
    try {
      // Endpoint should match your backend structure
      await api.put("/api/user/update", userData); 
      alert("Profile Sync Complete");
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white font-sans p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full border border-white/10">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black italic tracking-tighter uppercase">User Protocol</h1>
      </div>

      {/* Profile Avatar Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full border-4 border-[#00FFFF]/20 overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)]">
            <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 p-3 bg-[#00FFFF] text-black rounded-full shadow-lg hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>
        <h2 className="mt-4 text-2xl font-black uppercase tracking-tight">{userData.name}</h2>
        <span className="text-[10px] font-bold text-[#00FFFF] tracking-[0.3em] uppercase opacity-70">Verified Pilot</span>
      </div>

      {/* Bento Grid Inputs */}
      <div className="space-y-4">
        <div className="bg-white/[0.03] border border-white/10 p-4 rounded-[2rem] flex items-center gap-4 focus-within:border-[#00FFFF]/50 transition-all">
          <User className="text-[#00FFFF]" size={20} />
          <div className="flex-1">
            <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">Full Name</p>
            <input 
              value={userData.name} 
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="bg-transparent w-full outline-none text-sm font-bold"
            />
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-4 rounded-[2rem] flex items-center gap-4">
          <Mail className="text-[#00FFFF]" size={20} />
          <div className="flex-1">
            <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">Email Sync</p>
            <input 
              value={userData.email} 
              disabled
              className="bg-transparent w-full outline-none text-sm font-bold opacity-50"
            />
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-4 rounded-[2rem] flex items-center gap-4 focus-within:border-[#00FFFF]/50 transition-all">
          <Car className="text-[#00FFFF]" size={20} />
          <div className="flex-1">
            <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">Vehicle ID</p>
            <input 
              value={userData.vehicleNumber} 
              onChange={(e) => setUserData({...userData, vehicleNumber: e.target.value})}
              className="bg-transparent w-full outline-none text-sm font-bold uppercase"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        className="w-full mt-10 bg-[#00FFFF] text-black font-black uppercase py-5 rounded-[2rem] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,255,255,0.2)]"
      >
        <Save size={20} />
        {loading ? "Syncing..." : "Update Protocol"}
      </motion.button>
    </div>
  );
};

export default Profile;