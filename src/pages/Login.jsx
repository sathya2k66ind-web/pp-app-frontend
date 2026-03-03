import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chrome, Facebook, Apple, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  const handleSocialLogin = (platform) => {
    setLoading(true);
    console.log(`Connecting to ${platform} protocol...`);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000d1a] relative overflow-hidden text-white font-sans p-6">
      
      {/* 1. DYNAMIC BACKGROUND NODES */}
      <div className="absolute w-[600px] h-[600px] bg-[#00FFFF]/5 rounded-full blur-[140px] -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#00FFFF]/5 rounded-full blur-[100px] -bottom-20 -right-20"></div>

      {/* 2. MAIN LOGIN CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={animate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 w-full max-w-md rounded-[3rem] p-8 md:p-12 shadow-2xl z-10"
      >
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 border-2 border-[#00FFFF]/30 rounded-2xl flex items-center justify-center relative mb-4 rotate-45 group hover:rotate-90 transition-transform duration-500">
             <div className="-rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-[#00FFFF]">
               <ShieldCheck size={32} />
             </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
            Slotify<span className="text-[#00FFFF]">.</span>
          </h1>
          <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em] mt-2">Biometric Entry Protocol</p>
        </div>

        {/* 3. FORM SECTION */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-[#00FFFF] transition-colors" size={18} />
            <input
              type="email"
              placeholder="NETWORK EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-[#00FFFF]/50 focus:bg-[#00FFFF]/5 text-sm font-bold tracking-widest placeholder-zinc-600 transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-[#00FFFF] transition-colors" size={18} />
            <input
              type="password"
              placeholder="ACCESS CODE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-[#00FFFF]/50 focus:bg-[#00FFFF]/5 text-sm font-bold tracking-widest placeholder-zinc-600 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00FFFF] text-black py-5 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Decrypting..." : "Initialize Session"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* 4. SOCIAL AUTH SEPARATOR */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]">
            <span className="bg-[#000d1a] px-4 text-zinc-600">External Handshake</span>
          </div>
        </div>

        {/* 5. SOCIAL GRID */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { name: "Google", icon: <Chrome size={20} />, id: "google" },
            { name: "Facebook", icon: <Facebook size={20} />, id: "fb" },
            { name: "Apple", icon: <Apple size={20} />, id: "apple" }
          ].map((social) => (
            <motion.button
              key={social.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSocialLogin(social.id)}
              className="flex items-center justify-center h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white/40 hover:text-[#00FFFF] hover:border-[#00FFFF]/30 hover:bg-[#00FFFF]/5 transition-all"
            >
              {social.icon}
            </motion.button>
          ))}
        </div>

        {/* FOOTER LINKS */}
        <div className="flex flex-col items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <p className="text-zinc-600">
            No Access Key? 
            <span 
              onClick={() => navigate("/register")}
              className="ml-2 text-[#00FFFF] cursor-pointer hover:underline"
            >
              Generate One
            </span>
          </p>
          <span className="text-zinc-700 cursor-pointer hover:text-zinc-400 transition">Troubleshoot Link</span>
        </div>
      </motion.div>

      {/* FOOTER BRANDING */}
      <p className="absolute bottom-8 text-[9px] font-black uppercase tracking-[0.8em] text-zinc-800 pointer-events-none">
        Secure Grid OS v4.0.2
      </p>
    </div>
  );
}