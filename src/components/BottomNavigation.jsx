import React from "react";
// 🛑 THESE ARE THE IMPORTS THAT WERE MISSING 🛑
import { NavLink, useNavigate, useLocation } from "react-router-dom"; 
import { Zap, Ticket, MapPin, User } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: Zap, label: "Live" },
    { to: "/my-bookings", icon: Ticket, label: "Tickets" },
    { to: "/navigate", icon: MapPin, label: "Map" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="flex justify-around items-center h-16 px-2">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.to;

        return (
          <button
            key={index}
            onClick={() => navigate(item.to)}
            className={`relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 ${
              isActive ? "text-[#00FFFF]" : "text-zinc-500 hover:text-white"
            }`}
          >
            {/* Neon Glow background for active state */}
            {isActive && (
              <div className="absolute inset-0 bg-[#00FFFF]/10 blur-lg rounded-full animate-pulse" />
            )}
            
            <Icon 
              size={24} 
              className="relative z-10" 
              fill={isActive ? "currentColor" : "none"} 
            />

            {/* Small indicator dot below */}
            {isActive && (
              <div className="absolute -bottom-1 w-1 h-1 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;