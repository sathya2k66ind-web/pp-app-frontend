import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Lock,
  Unlock
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = 120;

  const paymentMethods = [
    { id: "upi", label: "UPI Instant", icon: <Smartphone size={18} /> },
    { id: "gpay", label: "Google Pay", icon: <Smartphone size={18} /> },
    { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={18} /> },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={18} /> },
    { id: "wallet", label: "Slotify Wallet", icon: <Wallet size={18} /> },
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/ticket");
      }, 2500);
    }, 2500);
  };

  // ✅ SUCCESS SCREEN (THE "UNLOCK" MOMENT)
  if (success) {
    return (
      <div className="min-h-screen bg-[#001F3F] flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#00FFFF]/10 blur-[120px] rounded-full animate-pulse"></div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center space-y-6"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-24 h-24 bg-[#00FFFF] rounded-full mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.4)]"
          >
            <Unlock size={40} className="text-[#001F3F]" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter uppercase">Spot Unlocked</h2>
            <p className="text-[#00FFFF] text-xs tracking-[0.3em] font-bold uppercase opacity-70">Preparing your digital key...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001F3F] flex items-center justify-center px-6 relative overflow-hidden font-sans">
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00FFFF]/5 via-transparent to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-2xl"
      >
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight uppercase">Secure Transaction</h2>
          <p className="text-[10px] text-[#00FFFF] tracking-[0.4em] uppercase font-bold mt-2 opacity-60">
            Slotify Encrypted
          </p>
        </div>

        {/* Amount Display */}
        <div className="border border-white/5 rounded-3xl p-6 flex flex-col items-center bg-[#001F3F]/50">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total to Pay</span>
          <span className="text-4xl font-black text-white italic-none">
            ₹{amount}<span className="text-[#00FFFF] text-lg">.00</span>
          </span>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 ${
                selectedMethod === method.id
                  ? "border-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                  : "border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-4 text-sm font-bold tracking-tight">
                <span className={selectedMethod === method.id ? "text-[#00FFFF]" : "text-gray-400"}>
                  {method.icon}
                </span>
                {method.label}
              </div>

              <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                selectedMethod === method.id ? "border-[#00FFFF] bg-[#001F3F] scale-110" : "border-white/20"
              }`}>
                {selectedMethod === method.id && <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full m-auto mt-[3px]" />}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Visual Area */}
        <div className="h-24 rounded-2xl bg-[#001F3F]/80 flex items-center justify-center border border-white/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMethod}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[#00FFFF]"
            >
              {selectedMethod === "upi" && <Smartphone className="animate-pulse" size={32} />}
              {selectedMethod === "card" && <motion.div animate={{ rotateY: 180 }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}><CreditCard size={32} /></motion.div>}
              {selectedMethod === "wallet" && <Wallet className="animate-bounce" size={32} />}
              {selectedMethod === "netbanking" && <Landmark size={32} />}
              {selectedMethod === "gpay" && <div className="font-black text-xl italic">GPay</div>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pay Button - The "Final Unlock" */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-5 rounded-3xl text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl ${
            loading
              ? "bg-gray-800 text-gray-500 cursor-wait"
              : "bg-[#00FFFF] text-[#001F3F] hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-4 h-4 border-2 border-[#001F3F] border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </div>
          ) : (
             <div className="flex items-center justify-center gap-2">
               <Lock size={16} />
               Confirm & Unlock
             </div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Payment;