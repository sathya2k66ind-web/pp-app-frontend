import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Camera, ChevronLeft, Save, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { api } from "../api/api";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "Aravind Swamy",
    email: "aravind.ux@slotify.com",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind",
    userId: "SLOT-8829"
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put("/api/user/update", userData); 
      // Replace alert with a smoother UI feedback if possible
      console.log("Profile Sync Complete");
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white font-sans p-6 relative overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[50%] bg-[#00FFFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-10 pt-4">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
           <ShieldCheck size={14} className="text-[#00FFFF]" />
           <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Secure Profile</span>
        </div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        
        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 rounded-[3rem] border-2 border-white/20 p-1 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
            >
              <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover rounded-[2.8rem]" />
            </motion.div>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 p-3 bg-white text-[#000d1a] rounded-2xl shadow-xl border border-white"
            >
              <Camera size={18} />
            </motion.button>
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">{userData.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles size={12} className="text-[#00FFFF]" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Premium Member</span>
          </div>
        </div>

        {/* PROFILE GLASS CARD */}
        <div className="bg-white/[0.06] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl mb-8">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div className="group transition-all">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1 mb-2">Display Name</p>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group-focus-within:border-[#00FFFF]/30 transition-all">
                <User size={18} className="text-white/40 group-focus-within:text-[#00FFFF]" />
                <input 
                  value={userData.name} 
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="bg-transparent w-full outline-none text-sm font-semibold text-white"
                />
              </div>
            </div>

            <div className="group opacity-60">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1 mb-2">Account Email</p>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <Mail size={18} className="text-white/40" />
                <input 
                  value={userData.email} 
                  disabled
                  className="bg-transparent w-full outline-none text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          {/* PERSONAL IDENTIFIER QR */}
          <div className="pt-6 border-t border-white/10 flex flex-col items-center">
            <div className="bg-white p-4 rounded-[2rem] shadow-2xl relative group">
              <div className="absolute inset-0 bg-[#00FFFF]/20 blur-2xl rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity" />
              <QRCodeCanvas 
                value={`USER-${userData.userId}`} 
                size={120} 
                fgColor="#000d1a"
                level="H"
              />
            </div>
            <p className="mt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Member ID: {userData.userId}</p>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-5 rounded-[2rem] font-bold text-sm uppercase tracking-[0.2em] transition-all shadow-xl ${
            loading
              ? "bg-white/10 text-white/20"
              : "bg-white text-[#000d1a] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          }`}
        >
          {loading ? "Syncing..." : "Save Protocol"}
        </motion.button>

        <p className="text-center mt-8 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em]">
            Syncs with Slotify Cloud Infrastructure
        </p>
      </div>
    </div>
  );
};

export default Profile;