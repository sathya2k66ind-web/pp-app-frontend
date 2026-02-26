export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">Widget 1</div>
        <div className="bg-white p-6 rounded-lg shadow">Widget 2</div>
        <div className="bg-white p-6 rounded-lg shadow">Widget 3</div>
      </main>
    </div>
  );
} //dashboard