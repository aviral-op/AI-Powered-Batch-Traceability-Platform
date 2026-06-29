import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        AI Traceability Platform
      </h1>

      <div className="hidden md:flex gap-6">
       <Link to="/">Home</Link>
       <Link to="/dashboard">Dashboard</Link>
       <Link to="/batches">Batches</Link>
       <Link to="/reports">Reports</Link>
      </div>
    </nav>
  );
}

export default Navbar;