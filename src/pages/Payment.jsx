import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Landmark,
  Lock,
  Check,
  ChevronLeft,
  ShieldCheck,
  CircleDot,
  ArrowRight
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("gpay");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const bookingData = location.state || {};
  const amount = bookingData.amount || 120;

  const paymentMethods = [
    { id: "gpay", label: "Google Pay", icon: <Smartphone size={20} />, provider: "UPI Instant" },
    { id: "upi", label: "PhonePe / Paytm", icon: <Smartphone size={20} />, provider: "UPI ID" },
    { id: "card", label: "Cards", icon: <CreditCard size={20} />, provider: "Visa, Mastercard, Amex" },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={20} />, provider: "Major Indian Banks" },
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/ticket", { state: { booking: bookingData } });
      }, 2200);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#000d1a] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[3rem] text-center"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", damping: 12 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          >
            <Check size={40} className="text-white" strokeWidth={3} />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Success</h2>
          <p className="text-white/60 text-sm mb-6">Redirecting to your digital pass...</p>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 2 }}
              className="h-full bg-emerald-500"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000d1a] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      {/* BACKGROUND DECOR (SOFT GLOWS) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Verified Checkout</span>
        </div>
      </div>

      <div className="relative z-10 px-6 flex-1 flex flex-col max-w-xl mx-auto w-full">
        <div className="mb-8 mt-2">
          <h1 className="text-3xl font-bold tracking-tight">Confirm Payment</h1>
          <p className="text-white/40 text-sm mt-1">Review your booking details</p>
        </div>

        {/* GLASS PRICE CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 mb-8 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] mb-1">Total Due</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-white">₹{amount}</span>
                <span className="text-xl text-white/30">.00</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
              <CreditCard className="text-cyan-400" size={24} />
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase">Location</span>
              <span className="text-sm font-semibold">{bookingData.mall || "Broadway Mall"}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-white/40 uppercase">Slot</span>
              <span className="text-sm font-semibold text-cyan-400">{bookingData.slot || "A1"}</span>
            </div>
          </div>
        </div>

        {/* PAYMENT OPTIONS - MINIMAL GLASS LIST */}
        <div className="space-y-3 mb-12">
          <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Choose Method</p>
          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`group flex items-center justify-between p-4 rounded-[1.8rem] transition-all duration-300 border ${
                  selectedMethod === method.id
                    ? "bg-white/20 border-white/30 ring-1 ring-white/20"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    selectedMethod === method.id ? "bg-cyan-500 text-black" : "bg-white/5 text-white/40"
                  }`}>
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{method.label}</p>
                    <p className="text-[10px] text-white/40">{method.provider}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === method.id ? "border-cyan-500" : "border-white/10"
                }`}>
                  {selectedMethod === method.id && (
                    <motion.div layoutId="glass-dot" className="w-2.5 h-2.5 bg-cyan-500 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER BUTTON */}
        <div className="mt-auto pb-10">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] font-bold text-sm uppercase tracking-widest transition-all relative overflow-hidden ${
              loading
                ? "bg-white/5 text-white/20 border border-white/10"
                : "bg-white text-[#000d1a] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-[#000d1a]/20 border-t-[#000d1a] rounded-full animate-spin" />
                Processing
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Pay Now
                <ArrowRight size={18} />
              </div>
            )}
          </motion.button>
          <p className="text-center text-[10px] text-white/20 mt-6 font-medium tracking-widest uppercase">
            Powered by Stripe • End-to-end Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;