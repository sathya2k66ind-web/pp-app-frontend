import BottomNavigation from "../components/BottomNavigation";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#000d1a] text-white overflow-x-hidden">
      {/* Main Content Area: 
         We use pb-28 to make sure content doesn't get stuck behind the dock.
      */}
      <main className="relative z-10 pb-28">
        {children}
      </main>

      {/* THE PREMIUM GLASS DOCK:
         - Fixed position at the bottom center.
         - backdrop-blur-2xl creates the "Frosted Glass" look.
         - border-white/10 adds a subtle edge highlight.
      */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[100] px-4">
        <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(0,255,255,0.05)]">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;