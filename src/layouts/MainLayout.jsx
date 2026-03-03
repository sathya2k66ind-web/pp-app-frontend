import BottomNavigation from "../components/BottomNavigation";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="px-4 pt-6">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout; now remove the bottom bar or maybe replace it with a design thagt matches the app ui/ux with glow and glass finish