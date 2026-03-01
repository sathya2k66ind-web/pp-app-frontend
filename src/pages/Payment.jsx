import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = 120;

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: <Smartphone size={18} /> },
    { id: "gpay", label: "Google Pay", icon: <Smartphone size={18} /> },
    { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={18} /> },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={18} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
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

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-lime-400/20 blur-3xl rounded-full animate-pulse"></div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={90} className="text-lime-400 mx-auto" />
          </motion.div>

          <h2 className="text-2xl font-bold">Payment Successful</h2>
          <p className="text-zinc-400">Redirecting to your ticket...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"></div>
      <div className="absolute w-96 h-96 bg-lime-400/10 blur-3xl rounded-full animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl"
      >
        <div>
          <h2 className="text-2xl font-bold">Complete Payment</h2>
          <p className="text-sm text-zinc-400 mt-2">
            Secure payment powered by ParkPro
          </p>
        </div>

        {/* Amount */}
        <div className="border border-white/10 rounded-2xl p-4 flex justify-between items-center bg-white/5">
          <span className="text-sm text-zinc-400">Total Amount</span>
          <span className="text-xl font-semibold text-lime-400">
            ₹ {amount}
          </span>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                selectedMethod === method.id
                  ? "border-lime-400 bg-lime-400/10"
                  : "border-white/10 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3 text-sm">
                {method.icon}
                {method.label}
              </div>

              {selectedMethod === method.id && (
                <motion.div
                  layoutId="activeDot"
                  className="w-3 h-3 rounded-full bg-lime-400"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* 🔥 Animated Visual Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMethod}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-40 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative overflow-hidden"
          >
            {/* UPI Animation */}
            {selectedMethod === "upi" && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-20 h-20 rounded-full bg-lime-400/30 flex items-center justify-center"
              >
                <Smartphone className="text-lime-400" size={30} />
              </motion.div>
            )}

            {/* GPay Ripple */}
            {selectedMethod === "gpay" && (
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-24 h-24 rounded-full bg-blue-400/40 flex items-center justify-center"
              >
                <Smartphone className="text-blue-400" size={30} />
              </motion.div>
            )}

            {/* NetBanking Bars */}
            {selectedMethod === "netbanking" && (
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20px", "60px", "20px"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.2,
                    }}
                    className="w-3 bg-lime-400 rounded"
                  />
                ))}
              </div>
            )}

            {/* Card Spin */}
            {selectedMethod === "card" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <CreditCard className="text-lime-400" size={40} />
              </motion.div>
            )}

            {/* Wallet Bounce */}
            {selectedMethod === "wallet" && (
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <Wallet className="text-lime-400" size={40} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pay Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            loading
              ? "bg-zinc-700 text-zinc-400"
              : "bg-lime-400 text-black hover:shadow-lg hover:shadow-lime-400/30"
          }`}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="flex justify-center"
            >
              ⏳
            </motion.div>
          ) : (
            `Pay ₹ ${amount}`
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Payment;