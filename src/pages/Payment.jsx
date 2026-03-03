import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation to pull real data
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Lock,
  Unlock,
  ChevronLeft,
  ShieldCheck,
  Zap
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pulling amount from Booking state or defaulting to 120
  const bookingData = location.state || {};
  const amount = bookingData.amount || 120;

  const paymentMethods = [
    { id: "upi", label: "UPI Instant", icon: <Smartphone size={18} />, provider: "PhonePe / GPay" },
    { id: "card", label: "Debit/Credit Card", icon: <CreditCard size={18} />, provider: "Visa / Master" },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={18} />, provider: "All Major Banks" },
    { id: "wallet", label: "Slotify Credits", icon: <Wallet size={18} />, provider: "Internal Balance" },
  ];

  const handlePayment = () => {
    setLoading(true);
    // Simulation of a secure handshake
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        // Pass the booking data along to the Ticket page
        navigate("/ticket", { state: { booking: bookingData } });
      }, 2800);
    }, 2500);
  };

  // ✅ UPGRADED SUCCESS SCREEN (THE "GRID ACTIVATION")
  if (success) {
    return (
      <div className="min-h-screen bg-[#000d1a] flex flex-col items-center justify-center relative overflow-hidden p-6 text-white">
        {/* Radiating Pulse Waves */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            className="absolute w-64 h-64 border border-[#00FFFF] rounded-full"
          />
        ))}

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-dashed border-[#00FFFF]/30 rounded-full"
            />
            <div className="w-28 h-28 bg-[#00FFFF] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,255,255,0.5)]">
              <Unlock size={48} className="text-[#000d1a]" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Security Verified</h2>
            <p className="text-[#00FFFF] text-[10px] tracking-[0.5em] font-black uppercase">Syncing Grid {bookingData.slot || "A1"}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000d1a] text-white flex flex-col p-6 font-sans overflow-hidden">
      
      {/* 1. TOP NAVIGATION */}
      <div className="flex justify-between items-center mb-10 pt-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#00FFFF]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFFF]">SSL Secure</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg mx-auto space-y-8"
      >
        <div className="text-center space-y-1">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">Checkout Protocol</h2>
          <p className="text-3xl font-black italic tracking-tighter">FINALIZE BOOKING</p>
        </div>

        {/* 2. LEDGER CARD */}
        <div className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <Zap size={80} className="text-[#00FFFF]" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Service Fee Total</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-[#00FFFF] opacity-50">₹</span>
              <span className="text-6xl font-black tracking-tighter tabular-nums">
                {amount}<span className="text-xl text-[#00FFFF]">.00</span>
              </span>
            </div>
            <div className="mt-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-zinc-400">
              SLOT: <span className="text-[#00FFFF]">{bookingData.slot || "A1"}</span> • {bookingData.mall || "BROADWAY"}
            </div>
          </div>
        </div>

        {/* 3. PAYMENT SELECTION */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Gateway Selection</h3>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`group flex items-center justify-between p-5 rounded-[1.8rem] border transition-all duration-300 ${
                  selectedMethod === method.id
                    ? "border-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_10px_30px_rgba(0,255,255,0.1)]"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedMethod === method.id ? "bg-[#00FFFF] text-[#000d1a]" : "bg-white/5 text-zinc-500"
                  }`}>
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-black uppercase ${selectedMethod === method.id ? "text-white" : "text-zinc-400"}`}>
                      {method.label}
                    </p>
                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{method.provider}</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === method.id ? "border-[#00FFFF]" : "border-white/10"
                }`}>
                  {selectedMethod === method.id && (
                    <motion.div layoutId="dot" className="w-2.5 h-2.5 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF]" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 4. CTA FOOTER */}
        <div className="pt-4 space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] text-sm font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden ${
              loading
                ? "bg-zinc-800 text-zinc-500"
                : "bg-[#00FFFF] text-[#000d1a] shadow-[0_20px_40px_rgba(0,255,255,0.25)]"
            }`}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-4 h-4 border-2 border-[#000d1a] border-t-transparent rounded-full animate-spin"></div>
                  Verifying Gateway...
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Lock size={16} fill="currentColor" />
                  Initialize Payment
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          <p className="text-center text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
            Encryption: AES-256 Bit • v4.0.2 Compliance
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;