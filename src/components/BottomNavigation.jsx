import { Home, Building2, Utensils, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  const navItems = [
    { to: "/dashboard", icon: Home },
    { to: "/malls", icon: Building2 },
    { to: "/restaurants", icon: Utensils },
    { to: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-center ${
                isActive ? "text-lime-400" : "text-zinc-500"
              }`
            }
          >
            <Icon size={24} />
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNavigation;