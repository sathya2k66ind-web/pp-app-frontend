import { Zap, Ticket, MapPin, User } from "lucide-react"; // Switched to match your Dashboard icons
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  const navItems = [
    { to: "/dashboard", icon: Zap },
    { to: "/my-bookings", icon: Ticket },
    { to: "/navigate", icon: MapPin },
    { to: "/profile", icon: User },
  ];

  return (
    // Removed fixed positioning and bg-zinc-900 to let the MainLayout glass effect shine through
    <div className="flex justify-around items-center h-16 px-2">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 ${
                isActive ? "text-[#00FFFF]" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Neon Glow background for the active icon */}
                {isActive && (
                  <div className="absolute inset-0 bg-[#00FFFF]/10 blur-lg rounded-full animate-pulse" />
                )}
                
                <Icon 
                  size={24} 
                  className="relative z-10" 
                  fill={isActive ? "currentColor" : "none"} 
                />

                {/* Small indicator dot below the active icon */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF]" />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNavigation;