import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation, Share2, Download, Info } from "lucide-react";

const TicketQR = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    mall: "Broadway",
    mallImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    slot: "F6",
    ticketNo: Math.floor(100000 + Math.random() * 900000),
    date: "Sat, 18 Oct, 2026",
    entryTime: "1:30 PM",
    amount: "120.00",
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#001F3F] overflow-hidden text-white px-4 font-sans">
      
      {/* Dynamic Background Elements */}
      <div className="absolute w-[600px] h-[600px] bg-[#00FFFF]/5 rounded-full blur-[120px] -top-40 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#00FFFF]/10 rounded-full blur-[100px] -bottom-20 -right-20"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Ticket Branding Header */}
        <div className="flex justify-between items-center mb-6 px-2">
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify Pass</span>
              <span className="text-xs text-gray-400">Validated • {booking.date}</span>
           </div>
           <div className="flex gap-3">
              <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-[#00FFFF]/20 transition"><Share2 size={16}/></button>
              <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-[#00FFFF]/20 transition"><Download size={16}/></button>
           </div>
        </div>

        {/* MAIN TICKET CARD */}
        <div className="relative overflow-hidden">
          {/* Top Section */}
          <div className="bg-white/5 backdrop-blur-3xl border-t border-l border-r border-white/10 rounded-t-[3rem] overflow-hidden">
            <div className="relative h-40">
              <img src={booking.mallImage} alt="mall" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">{booking.mall}</h2>
                <div className="flex items-center gap-2 text-[#00FFFF] text-[10px] font-bold tracking-widest uppercase mt-1">
                   <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-ping" />
                   Active Booking
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Parking Slot</p>
                <h3 className="text-4xl font-black text-[#00FFFF] italic-none tracking-tighter">{booking.slot}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Pass Number</p>
                <h3 className="text-xl font-black tabular-nums">#{booking.ticketNo}</h3>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Entry After</p>
                <h3 className="text-lg font-bold">{booking.entryTime}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Total Paid</p>
                <h3 className="text-lg font-bold text-[#00FFFF]">₹{booking.amount}</h3>
              </div>
            </div>
          </div>

          {/* THE PERFORATED DIVIDER */}
          <div className="relative flex items-center h-8 bg-white/5 backdrop-blur-3xl border-l border-r border-white/10">
            <div className="absolute -left-4 w-8 h-8 bg-[#001F3F] rounded-full border border-white/10"></div>
            <div className="w-full border-t-2 border-dashed border-white/20 mx-4"></div>
            <div className="absolute -right-4 w-8 h-8 bg-[#001F3F] rounded-full border border-white/10"></div>
          </div>

          {/* Bottom Section (QR Area) */}
          <div className="bg-white/5 backdrop-blur-3xl border-b border-l border-r border-white/10 rounded-b-[3rem] p-8">
            <div className="flex flex-col items-center">
              <div className="relative p-4 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(0,255,255,0.2)] group">
                <QRCodeCanvas 
                  value={`SLOTIFY-${booking.ticketNo}`} 
                  size={180} 
                  fgColor="#001F3F"
                  level="H"
                  includeMargin={true}
                />
                {/* Scanning Animation Line */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-[#00FFFF] shadow-[0_0_15px_#00FFFF] z-10 opacity-50"
                />
              </div>
              <p className="mt-6 text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">Scan at Entry Gate</p>
            </div>

            {/* Main Action */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/navigate", { state: { booking } })}
              className="w-full mt-8 py-5 rounded-2xl bg-[#00FFFF] text-[#001F3F] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,255,255,0.3)]"
            >
              <Navigation size={18} fill="currentColor" />
              Start GPS Unlock
            </motion.button>

            {/* Secondary Actions */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition"
              >
                Done
              </button>
              <button
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#00FFFF] hover:bg-white/10 transition"
              >
                <Info size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Footer Tip */}
        <p className="mt-8 text-center text-xs text-gray-500 px-8">
          Present this pass to the sensor. Gate will open automatically as you approach.
        </p>
      </motion.div>
    </div>
  );
};

export default TicketQR;