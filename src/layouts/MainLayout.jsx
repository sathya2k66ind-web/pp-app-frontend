import BottomNavigation from "../components/BottomNavigation";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000d1a] text-white relative">
      {/* Content area with padding at bottom to clear the floating dock */}
      <div className="px-4 pt-6 pb-32">
        {children}
      </div>
      
      {/* Floating Glass Dock Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100]">
        <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_15px_rgba(0,255,255,0.1)]">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;