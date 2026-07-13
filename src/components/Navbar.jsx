import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const handleLogout = () => {
  localStorage.removeItem("token");
  alert("Logged out successfully");
  navigate("/login");
  };

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

       {isLoggedIn ? (
       <button
         onClick={handleLogout}
         className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
       >
         Logout
       </button>
) : (
  <Link
    to="/login"
    className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
  >
    Login
  </Link>
)}
      </div>
    </nav>
  );
}

export default Navbar;