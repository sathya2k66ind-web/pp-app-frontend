import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState, useRef } from "react"; // Added useRef
import { motion } from "framer-motion";
import { Navigation, Share2, Download, Info } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketQR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketRef = useRef(null); // Ref for the ticket capture

  const booking = location.state?.booking || {
    mall: location.state?.mallName || "Phoenix Mall of Asia",
    mallImage: location.state?.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800",
    slot: "A-12",
    ticketNo: location.state?._id?.slice(-6).toUpperCase() || "TKT-990",
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    entryTime: "Live Access",
    amount: location.state?.price || "150.00",
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // PDF Generation Logic
  const downloadPDF = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element, {
      backgroundColor: "#000d1a",
      scale: 2, // Higher quality
      useCORS: true // Allows external images (Unsplash) to show up in PDF
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Slotify-Pass-${booking.ticketNo}.pdf`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#000d1a] overflow-hidden text-white px-4 font-sans">
      
      <div className="absolute w-[600px] h-[600px] bg-[#00FFFF]/5 rounded-full blur-[120px] -top-40 -left-20 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-2">
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFFF]">Slotify Pass</span>
              <span className="text-xs text-gray-400">Validated • {booking.date}</span>
           </div>
           <div className="flex gap-3">
              <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition"><Share2 size={16}/></button>
              {/* PDF TRIGGER BUTTON */}
              <button 
                onClick={downloadPDF} 
                className="p-2 bg-[#00FFFF]/20 rounded-full border border-[#00FFFF]/50 hover:bg-[#00FFFF] hover:text-black transition"
              >
                <Download size={16}/>
              </button>
           </div>
        </div>

        {/* TICKET CARD (WITH REF) */}
        <div ref={ticketRef} className="relative overflow-hidden shadow-2xl rounded-[3.5rem] bg-[#000d1a]">
          {/* Top Section */}
          <div className="bg-white/5 backdrop-blur-3xl border-t border-l border-r border-white/10 rounded-t-[3rem] overflow-hidden">
            <div className="relative h-40">
              <img 
                src={booking.mallImage} 
                alt="mall" 
                className="w-full h-full object-cover opacity-60" 
                crossOrigin="anonymous" // Essential for PDF capture
                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] to-transparent"></div>
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
                <h3 className="text-4xl font-black text-[#00FFFF] tracking-tighter">{booking.slot}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Pass ID</p>
                <h3 className="text-xl font-black tabular-nums">#{booking.ticketNo}</h3>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Status</p>
                <h3 className="text-lg font-bold">Confirmed</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-1">Total Fee</p>
                <h3 className="text-lg font-bold text-[#00FFFF]">₹{booking.amount}</h3>
              </div>
            </div>
          </div>

          {/* PERFORATED DIVIDER */}
          <div className="relative flex items-center h-8 bg-white/5 backdrop-blur-3xl border-l border-r border-white/10">
            <div className="absolute -left-4 w-8 h-8 bg-[#000d1a] rounded-full border border-white/10"></div>
            <div className="w-full border-t-2 border-dashed border-white/20 mx-4"></div>
            <div className="absolute -right-4 w-8 h-8 bg-[#000d1a] rounded-full border border-white/10"></div>
          </div>

          {/* Bottom Section (QR Area) */}
          <div className="bg-white/5 backdrop-blur-3xl border-b border-l border-r border-white/10 rounded-b-[3rem] p-8 pb-10">
            <div className="flex flex-col items-center">
              <div className="relative p-4 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(0,255,255,0.2)]">
                <QRCodeCanvas 
                  value={`SLOTIFY-PASS-${booking.ticketNo}`} 
                  size={160} 
                  fgColor="#000d1a"
                  level="H"
                />
              </div>
              <p className="mt-6 text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400">Scan at Entry Gate</p>
            </div>
          </div>
        </div>

        {/* HUD Navigation Actions */}
        <div className="mt-8 space-y-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/navigate", { state: { booking } })}
            className="w-full py-5 rounded-[2rem] bg-[#00FFFF] text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,255,255,0.3)]"
          >
            <Navigation size={18} fill="currentColor" />
            GPS Entry Mode
          </motion.button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-4 rounded-[2rem] bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition"
          >
            Back to Hub
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketQR;