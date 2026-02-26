import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFakePayment = () => {
    setLoading(true);

    // Simulate payment delay
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful ✅");

      // Navigate to ticket page
      navigate("/ticket");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-96">
        <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
        <p className="mb-6 text-gray-600">Amount: ₹120</p>

        <button
          onClick={handleFakePayment}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            loading ? "bg-gray-400" : "bg-lime-600 hover:bg-lime-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;