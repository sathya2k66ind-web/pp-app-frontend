import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);

    // Fake authentication delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-lime-400/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div
        className={`relative bg-white/10 backdrop-blur-xl border border-white/20 w-full max-w-md rounded-3xl p-10 shadow-2xl transition-all duration-700 ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-lime-400 flex items-center justify-center text-black text-3xl font-bold shadow-lg animate-pulse">
            P
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-wide">
            Park Pulse
          </h1>
          <p className="text-gray-400 text-sm">
            Smart Parking Experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-lime-400 text-white placeholder-gray-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-lime-400 text-white placeholder-gray-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-lime-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}