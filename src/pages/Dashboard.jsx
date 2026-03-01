import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const heroImages = [
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?q=80&w=1600",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const places = [
    {
      name: "UB City Mall",
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1200",
    },
    {
      name: "1MG-Lido Mall",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200",
    },
    {
      name: "The Forum Mall",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
  ];

  const handleClick = (mall) => {
    navigate("/booking", { state: mall });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0f1a] to-black text-white">

      {/* 🔥 HERO SLIDER */}
      <div className="relative h-64 w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentHero ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black"></div>

        <div className="absolute bottom-6 left-6">
          <h2 className="text-green-400 text-lg">Hey!</h2>
          <h1 className="text-2xl font-semibold">
            Bengaluru, India <span className="text-green-400">›</span>
          </h1>
        </div>
      </div>

      <div className="p-6">

        {/* 🔥 LIVE EVENTS HORIZONTAL SCROLL */}
        <h3 className="text-lg mb-4 text-gray-300">Live Events & Offers</h3>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="min-w-[250px] bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={img}
                alt="event"
                className="h-36 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">Weekend Parking Deal</h4>
                <p className="text-gray-400 text-sm">
                  Flat ₹50 off
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 RECOMMENDED PLACES */}
        <h3 className="text-lg mt-6 mb-4 text-gray-300">
          Recommended Parking Spots
        </h3>

        <div className="space-y-4">
          {places.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleClick(place)}
              className="cursor-pointer flex items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-md"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-16 h-16 rounded-xl object-cover mr-4"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{place.name}</h4>
                <p className="text-gray-400 text-sm">
                  Tap to book parking
                </p>
              </div>

              <span className="text-green-400 text-xl">›</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}