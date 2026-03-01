import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

const Navigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    mall: "Broadway",
    mallImage:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3",
    lat: 13.0827,
    lng: 80.2707,
  };

  const [visible, setVisible] = useState(false);
  const [eta, setEta] = useState("6 mins");
  const [distance, setDistance] = useState("3.2 km");

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${booking.lat},${booking.lng}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-4">

      <div
        className={`w-full max-w-md transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-[#111111] rounded-3xl overflow-hidden shadow-2xl border border-white/10">

          {/* Mall Image */}
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={booking.mallImage}
              alt="mall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute bottom-5 left-5">
              <h2 className="text-2xl font-semibold">
                {booking.mall}
              </h2>
              <p className="text-sm text-gray-300">
                Navigation Preview
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-6 space-y-6">

            {/* Distance + ETA */}
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-full">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Distance</p>
                  <p className="font-medium">{distance}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-full">
                  <Navigation size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">ETA</p>
                  <p className="font-medium">{eta}</p>
                </div>
              </div>

            </div>

            {/* Animated Route Line */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="absolute h-full w-1/3 bg-white animate-pulse rounded-full"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Back
              </button>

              <button
                onClick={openGoogleMaps}
                className="flex-1 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition"
              >
                Start Navigation
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Navigate;