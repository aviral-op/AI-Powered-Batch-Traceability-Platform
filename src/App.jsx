import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Batches from "./pages/Batches";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/batches" element={<Batches />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default App;