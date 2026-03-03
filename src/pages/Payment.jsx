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
  CircleDot
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
        // Navigating to TicketQR with structured state
        navigate("/ticket", { state: { booking: bookingData } });
      }, 2500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-slate-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center space-y-6 border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
            <Unlock size={40} className="text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Payment Confirmed</h2>
            <p className="text-slate-500 text-sm">Your spot at <span className="font-bold text-slate-700">{bookingData.mall || "Broadway"}</span> is secured.</p>
          </div>
          <div className="pt-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
               Slot {bookingData.slot || "A1"} Reserved
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 pt-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-600"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Secure Checkout</span>
          </div>
          <span className="text-[9px] text-slate-400 font-medium">PCI-DSS COMPLIANT</span>
        </div>
      </div>

      <div className="px-6 pb-10 w-full max-w-lg mx-auto flex-1 flex flex-col">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Confirm Booking</h1>
          <p className="text-slate-500 text-sm mt-1">Choose your preferred payment method</p>
        </div>

        {/* PRICE SUMMARY CARD */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16" />
          
          <div className="relative z-10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Total Payable</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-slate-400">₹</span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                {amount}<span className="text-2xl opacity-30">.00</span>
              </span>
            </div>
            
            <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-50">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                    {bookingData.mall?.charAt(0) || "B"}
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parking Location</p>
                    <p className="text-sm font-bold text-slate-800">{bookingData.mall || "Broadway Mall"} • Slot {bookingData.slot || "A1"}</p>
                </div>
            </div>
          </div>
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="space-y-3 mb-10">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Payment Methods</h3>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-between p-4 rounded-3xl border transition-all duration-200 ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    selectedMethod === method.id ? "bg-blue-500 text-white shadow-md shadow-blue-100" : "bg-slate-100 text-slate-400"
                  }`}>
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">{method.label}</p>
                    <p className="text-[10px] font-medium text-slate-500">{method.provider}</p>
                  </div>
                </div>
                <div className={selectedMethod === method.id ? "text-blue-500" : "text-slate-200"}>
                  <CircleDot size={22} fill={selectedMethod === method.id ? "currentColor" : "none"} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-auto pt-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-5 rounded-3xl text-sm font-bold uppercase tracking-widest shadow-xl transition-all ${
              loading
                ? "bg-slate-200 text-slate-400"
                : "bg-slate-900 text-white shadow-slate-200"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Lock size={16} />
                Pay ₹{amount}.00 Now
              </div>
            )}
          </motion.button>
          <p className="text-center text-[10px] text-slate-400 font-medium mt-6 uppercase tracking-wider">
            Safe & Secure Checkout • encrypted by Slotify
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;