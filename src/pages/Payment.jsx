import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Landmark,
  Lock,
  Unlock,
  ChevronLeft,
  ShieldCheck,
  CircleDot,
  Zap
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("gpay");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pulling state from Booking.jsx
  const bookingData = location.state || {};
  const amount = bookingData.amount || 120;

  const paymentMethods = [
    { id: "gpay", label: "Google Pay", icon: <Smartphone size={20} />, provider: "Instant UPI Transfer" },
    { id: "upi", label: "Other UPI", icon: <Smartphone size={20} />, provider: "PhonePe / Paytm" },
    { id: "card", label: "Debit/Credit Card", icon: <CreditCard size={20} />, provider: "Visa / Mastercard / Amex" },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={20} />, provider: "All Major Indian Banks" },
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/ticket", { state: { booking: bookingData } });
      }, 2500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#000d1a] flex flex-col items-center justify-center p-6 text-white">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] text-center space-y-6 border border-white/10 w-full max-w-sm"
        >
          <div className="w-20 h-20 bg-[#00FFFF] rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(0,255,255,0.3)]">
            <Unlock size={32} className="text-[#000d1a]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Booking Secured</h2>
            <p className="text-zinc-400 text-sm">Your space at <span className="text-white font-semibold">{bookingData.mall || "Broadway"}</span> is confirmed.</p>
          </div>
          <div className="pt-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FFFF]/10 rounded-full text-[#00FFFF] text-[10px] font-black uppercase tracking-wider border border-[#00FFFF]/20">
               Slot {bookingData.slot || "A1"} Active
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000d1a] text-white flex flex-col font-sans overflow-hidden">
      
      {/* 1. TOP NAV - REFINED */}
      <div className="flex justify-between items-center p-6 pt-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-[#00FFFF]">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Secure Link</span>
          </div>
          <span className="text-[8px] text-zinc-500 font-bold uppercase mt-1">v4.2 Encryption</span>
        </div>
      </div>

      <div className="px-6 pb-10 w-full max-w-lg mx-auto flex-1 flex flex-col">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Finalize</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Secure Transaction Portal</p>
        </div>

        {/* 2. PRICE CARD - BOOKING STYLE */}
        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={60} className="text-[#00FFFF]" />
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Total Amount</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#00FFFF]">₹</span>
              <span className="text-6xl font-black tracking-tighter tabular-nums">
                {amount}<span className="text-2xl opacity-40">.00</span>
              </span>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00FFFF]/10 flex items-center justify-center text-[#00FFFF] text-xs font-black">
                        {bookingData.mall?.charAt(0) || "B"}
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider">Parking Zone</p>
                        <p className="text-sm font-bold">{bookingData.mall || "Broadway"} • {bookingData.slot || "A1"}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* 3. PAYMENT SELECTION - REFINED LIST */}
        <div className="space-y-3 mb-10">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">Select Gateway</h3>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 ${
                  selectedMethod === method.id
                    ? "border-[#00FFFF] bg-[#00FFFF]/5"
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
                <div className={selectedMethod === method.id ? "text-[#00FFFF]" : "text-zinc-800"}>
                  <CircleDot size={20} fill={selectedMethod === method.id ? "currentColor" : "none"} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. CTA FOOTER */}
        <div className="mt-auto pt-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] text-sm font-black uppercase tracking-[0.4em] transition-all ${
              loading
                ? "bg-zinc-800 text-zinc-500"
                : "bg-[#00FFFF] text-[#000d1a] shadow-[0_20px_40px_rgba(0,255,255,0.2)]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-[#000d1a]/30 border-t-[#000d1a] rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Lock size={16} fill="currentColor" />
                Pay ₹{amount}.00
              </div>
            )}
          </motion.button>
          <p className="text-center text-[9px] text-zinc-600 font-bold mt-6 uppercase tracking-[0.2em]">
            AES-256 Bit SSL Security • Slotify Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;