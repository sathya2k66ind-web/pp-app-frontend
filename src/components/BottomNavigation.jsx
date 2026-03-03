import React from "react";
import { Zap, Ticket, MapPin, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: Zap },
    { to: "/my-bookings", icon: Ticket },
    { to: "/navigate", icon: MapPin },
    { to: "/profile", icon: User },
  ];

  return (
    <div className="flex justify-around items-center h-14">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.to;

        return (
          <button
            key={index}
            onClick={() => navigate(item.to)}
            className={`relative flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-full ${
              isActive ? "text-[#00FFFF]" : "text-zinc-500 hover:text-white"
            }`}
          >
            {/* Active Glow Effect */}
            {isActive && (
              <div className="absolute inset-0 bg-[#00FFFF]/10 blur-md rounded-full animate-pulse" />
            )}
            
            <Icon 
              size={24} 
              className="relative z-10" 
              strokeWidth={isActive ? 2.5 : 2}
            />
            
            {/* Active Indicator Dot */}
            {isActive && (
              <div className="absolute -bottom-1 w-1 h-1 bg-[#00FFFF] rounded-full shadow-[0_0_8px_#00FFFF]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;