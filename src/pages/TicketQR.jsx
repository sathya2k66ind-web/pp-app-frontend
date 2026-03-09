import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navigation, Share2, Download, ChevronLeft, MapPin, Calendar, Clock } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketQR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketRef = useRef(null);

  // High-end placeholder data
  const booking = location.state?.booking || {
    mall: "Phoenix Mall of Asia",
    mallImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?auto=format&fit=crop&w=800&q=80",
    slot: "A-12",
    ticketNo: "XP-772",
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    amount: "150.00",
  };

  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const downloadPDF = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element, {
      backgroundColor: "#000d1a",
      scale: 3,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 250);
    pdf.save(`Slotify-Pass-${booking.ticketNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white flex flex-col items-center p-6 font-sans relative overflow-hidden">
      {/* MESH GRADIENT BACKGROUND */}
      <div className="fixed top-[-10%] right-[-10%] w-[70%] h-[50%] bg-[#00FFFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 relative z-20 pt-4">
        <button 
          onClick={() => navigate("/dashboard")}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00FFFF]">Digital Pass</p>
          <p className="text-xs text-white/40 italic">ID: {booking.ticketNo}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        className="w-full max-w-md relative z-10"
      >
        {/* THE GLASS TICKET SLAB */}
        <div 
          ref={ticketRef} 
          className="bg-white/[0.06] backdrop-blur-3xl border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl"
        >
          {/* FADING MALL IMAGE SECTION */}
          <div className="relative h-48 w-full">
            <img 
              src={booking.mallImage} 
              alt="mall" 
              className="w-full h-full object-cover opacity-40" 
              crossOrigin="anonymous" 
            />
            {/* The Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8">
               <div className="flex items-center gap-2 mb-1">
                 <MapPin size={12} className="text-[#00FFFF]" />
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Reserved Zone</span>
               </div>
               <h2 className="text-2xl font-black italic uppercase tracking-tighter">{booking.mall}</h2>
            </div>
          </div>

          {/* BOOKING INFO GRID */}
          <div className="p-8 grid grid-cols-2 gap-y-8 border-b border-white/5">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Parking Slot</p>
              <h3 className="text-5xl font-black italic text-white tracking-tighter">{booking.slot}</h3>
            </div>
            <div className="text-right flex flex-col items-end justify-center">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Total Fee</p>
              <h3 className="text-2xl font-black text-[#00FFFF]">₹{booking.amount}</h3>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/40">
                <Calendar size={12} />
                <p className="text-[10px] font-bold uppercase tracking-widest">{booking.date}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end text-white/40">
                <Clock size={12} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Entry: Live</p>
              </div>
            </div>
          </div>

          {/* QR SCAN AREA */}
          <div className="p-10 flex flex-col items-center bg-white/[0.02]">
            <div className="relative group">
              {/* Inner Glow around QR */}
              <div className="absolute inset-0 bg-[#00FFFF]/10 blur-3xl rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative p-5 bg-white rounded-[2.8rem] shadow-2xl">
                <QRCodeCanvas 
                  value={`SLOTIFY-PASS-${booking.ticketNo}`} 
                  size={150} 
                  fgColor="#000d1a"
                  level="H"
                />
              </div>
            </div>
            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
              Validated Signal
            </p>
          </div>
        </div>

        {/* BOTTOM ACTION CLUSTER */}
        <div className="mt-8 space-y-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/navigate", { state: { booking } })}
            className="w-full py-5 rounded-[2.2rem] bg-white text-[#000d1a] font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <Navigation size={18} fill="currentColor" />
            Initialize GPS
          </motion.button>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={downloadPDF}
              className="flex items-center justify-center gap-3 py-4 rounded-3xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <Download size={16} />
              Save PDF
            </button>
            <button 
              className="flex items-center justify-center gap-3 py-4 rounded-3xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <Share2 size={16} />
              Dispatch
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">
          Terminals: Verified AES-256
        </p>
      </motion.div>
    </div>
  );
};

export default TicketQR;