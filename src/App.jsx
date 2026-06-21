import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Batches from "./pages/Batches";
import Reports from "./pages/Reports";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen ${
        darkMode
        ? "bg-gray-900 text-white"
        : "bg-white text-black"
      }`}
    >

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 bg-black text-white px-4 py-2 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;