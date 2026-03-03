import BottomNavigation from "../components/BottomNavigation";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="px-4 pt-6">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout; 