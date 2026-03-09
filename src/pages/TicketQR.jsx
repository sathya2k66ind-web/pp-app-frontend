import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { Navigation, Share2, Download, ChevronLeft, MapPin, User } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketQR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketRef = useRef(null);

  // Fallback data
  const booking = location.state?.booking || {
    mall: "Phoenix Mall of Asia",
    mallImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800",
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
      borderRadius: 40
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 250);
    pdf.save(`Slotify-Pass-${booking.ticketNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white flex flex-col items-center p-6 font-sans overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[70%] h-[50%] bg-[#00FFFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* TOP NAV */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 relative z-20">
        <button 
          onClick={() => navigate("/dashboard")}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Access Granted</p>
          <p className="text-sm font-bold text-[#00FFFF]">ID: {booking.ticketNo}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        className="w-full max-w-md relative z-10"
      >
        {/* MAIN GLASS TICKET */}
        <div 
          ref={ticketRef} 
          className="bg-white/[0.07] backdrop-blur-3xl border border-white/20 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Visual Header */}
          <div className="relative h-44">
            <img 
              src={booking.mallImage} 
              alt="mall" 
              className="w-full h-full object-cover opacity-50" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/[0.07] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8">
               <div className="flex items-center gap-2 mb-2">
                 <MapPin size={14} className="text-[#00FFFF]" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Parking Location</span>
               </div>
               <h2 className="text-2xl font-bold tracking-tight">{booking.mall}</h2>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 grid grid-cols-2 gap-8 border-b border-white/10">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Assigned Slot</p>
              <h3 className="text-4xl font-black text-white tracking-tighter">{booking.slot}</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Fee Paid</p>
              <h3 className="text-2xl font-bold text-[#00FFFF]">₹{booking.amount}</h3>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Date</p>
              <p className="text-sm font-semibold">{booking.date}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Validity</p>
              <p className="text-sm font-semibold text-emerald-400">Authorized</p>
            </div>
          </div>

          {/* QR AREA WITH SOFT GLOW */}
          <div className="p-10 flex flex-col items-center bg-white/[0.03]">
            <div className="relative group">
               {/* Inner glow behind QR */}
              <div className="absolute inset-0 bg-[#00FFFF]/20 blur-2xl rounded-full scale-75 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-5 bg-white rounded-[2.5rem] shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <QRCodeCanvas 
                  value={`SLOTIFY-${booking.ticketNo}`} 
                  size={140} 
                  fgColor="#000d1a"
                  level="H"
                />
              </div>
            </div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              Encrypted Pass Signal
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-10 grid grid-cols-5 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/navigate", { state: { booking } })}
            className="col-span-3 py-5 rounded-3xl bg-white text-[#000d1a] font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 shadow-xl"
          >
            <Navigation size={18} />
            Start Navigation
          </motion.button>
          
          <button 
            onClick={downloadPDF}
            className="col-span-1 py-5 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <Download size={20} />
          </button>

          <button 
            className="col-span-1 py-5 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <Share2 size={20} />
          </button>
        </div>

        <p className="text-center mt-10 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
          Valid only for single entry/exit
        </p>
      </motion.div>
    </div>
  );
};

export default TicketQR;