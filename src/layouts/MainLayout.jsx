import { useNavigate, useLocation } from "react-router-dom";
import { Zap, Ticket, MapPin, Star } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Zap size={24} />, path: "/dashboard" },
    { icon: <Ticket size={24} />, path: "/my-bookings" },
    { icon: <MapPin size={24} />, path: "/navigate" },
    { icon: <Star size={24} />, path: "/profile" },
  ];

  return (
    <div className="flex justify-around items-center h-16">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`p-3 transition-all duration-300 rounded-full ${
            location.pathname === item.path 
            ? "text-[#00FFFF] bg-[#00FFFF]/10 shadow-[0_0_15px_rgba(0,255,255,0.3)]" 
            : "text-gray-500 hover:text-white"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;