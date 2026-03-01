import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Premium Cityscapes to match "The City, Unlocked"
  const heroImages = [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600",
    "https://images.unsplash.com/photo-1522295534424-4b8843971238?q=80&w=1600",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const places = [
    {
      name: "UB City Mall",
      tag: "Premium Valet Available",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1200",
    },
    {
      name: "1MG-Lido Mall",
      tag: "EV Charging On-site",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200",
    },
    {
      name: "The Forum Mall",
      tag: "Instant Spot Booking",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
  ];

  const handleClick = (place) => {
    navigate("/booking", { state: place });
  };

  return (
    <div className="min-h-screen bg-[#001F3F] text-white font-sans pb-10">

      {/* 🏙️ HERO SLIDER - The "City Unlocked" View */}
      <div className="relative h-80 w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 brightness-50 ${
              index === currentHero ? "opacity-100 scale-105" : "opacity-0 scale-100"
            } transition-transform duration-[5000ms]`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001f3f]/40 to-[#001F3F]"></div>

        <div className="absolute bottom-10 left-6">
          <motion.p 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-[#00FFFF] text-xs uppercase tracking-[0.3em] font-bold mb-1"
          >
            Your Current View
          </motion.p>
          <h1 className="text-3xl font-black tracking-tight">
            Bengaluru <span className="text-[#00FFFF] opacity-50 font-light">| India</span>
          </h1>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">

        {/* 🎧 LIVE VIBE & OFFERS (Matching Headphone Icon Theme) */}
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#00FFFF]">Access Live Perks</h3>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              className="min-w-[280px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <div className="h-32 w-full relative">
                <img src={img} alt="event" className="h-full w-full object-cover opacity-60" />
                <div className="absolute top-3 left-3 bg-[#00FFFF] text-[#001F3F] text-[10px] font-black px-2 py-1 rounded-md uppercase">
                  Unlocked
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg leading-tight">Elite Night Access</h4>
                <p className="text-gray-400 text-xs mt-1">Book a spot and get priority entry.</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🚗 RECOMMENDED SLOTS */}
        <div className="flex justify-between items-center mt-8 mb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Recommended Slots
          </h3>
          <span className="text-xs text-[#00FFFF] font-bold">See All</span>
        </div>

        <div className="space-y-4">
          {places.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(place)}
              className="group cursor-pointer flex items-center bg-white/5 border border-white/5 hover:border-[#00FFFF]/30 backdrop-blur-md p-4 rounded-[2rem] transition-all"
            >
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-16 h-16 rounded-2xl object-cover mr-4 grayscale-[50%] group-hover:grayscale-0 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#00FFFF] w-4 h-4 rounded-full border-2 border-[#001F3F]" />
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-lg text-white group-hover:text-[#00FFFF] transition-colors">
                  {place.name}
                </h4>
                <p className="text-gray-500 text-xs font-medium">
                  {place.tag}
                </p>
              </div>

              <div className="flex flex-col items-end">
                 <span className="text-[#00FFFF] text-xl font-light">›</span>
                 <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter mt-1">Free Now</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* 🔘 FIXED "UNLOCK" CTA */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#00FFFF] text-[#001F3F] px-8 py-4 rounded-full font-black shadow-[0_10px_30px_rgba(0,255,255,0.4)] flex items-center gap-3 cursor-pointer active:scale-95 transition-transform z-50"
      >
        <div className="w-2 h-2 bg-[#001F3F] rounded-full animate-ping" />
        UNLOCK NEAREST SLOT
      </motion.div>

    </div>
  );
}