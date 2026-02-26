import { useNavigate } from "react-router-dom";
import EventBanner from "../components/EventBanner";
import LocationCard from "../components/LocationCard";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Park <span className="text-lime-400">Pulse</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Real-time smart parking insights
          </p>
        </div>

        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-xl hover:bg-white/20 transition"
        >
          My Bookings
        </button>
      </div>

      {/* Live Events */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Live Events</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <EventBanner
            title="Mall Festival"
            status="High Demand"
            description="Expect limited parking availability"
          />

          <EventBanner
            title="Movie Premiere"
            status="Limited Slots"
            description="Pre-book your parking now"
          />
        </div>
      </div>

      {/* Recommended */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">
          Recommended Places
        </h2>

        <div className="space-y-4">
          <LocationCard
            name="Phoenix Mall"
            distance="2.1 km"
            slots="120"
          />

          <LocationCard
            name="City Center"
            distance="3.5 km"
            slots="75"
          />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;