import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxes,
  FaChartBar,
  FaFileAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-green-900"
        : "hover:bg-green-600"
    }`;

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="font-bold text-xl"
        >
          🌿 AI Traceability
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-4">

          <Link className={linkClass("/")} to="/">
            <FaHome />
            Home
          </Link>

        {isLoggedIn && (
         <>
        <Link className={linkClass("/dashboard")} to="/dashboard">
        <FaChartBar />
          Dashboard
        </Link>

        <Link className={linkClass("/batches")} to="/batches">
        <FaBoxes />
          Batches
        </Link>

        <Link className={linkClass("/reports")} to="/reports">
        <FaFileAlt />
          Reports
        </Link>
        </>
        )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center gap-2"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/register"
                className="bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded flex items-center gap-2"
              >
                <FaUserPlus />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
           className="md:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
       <div className="md:hidden bg-green-800 px-5 py-5 flex flex-col gap-3 absolute left-0 top-full w-full z-[9999] shadow-xl">

          <Link onClick={closeMenu} className={linkClass("/")} to="/">
            <FaHome />
            Home
          </Link>

         {isLoggedIn && (
  <>
    <Link
      onClick={closeMenu}
      className={linkClass("/dashboard")}
      to="/dashboard"
    >
      <FaChartBar />
      Dashboard
    </Link>

    <Link
      onClick={closeMenu}
      className={linkClass("/batches")}
      to="/batches"
    >
      <FaBoxes />
      Batches
    </Link>

    <Link
      onClick={closeMenu}
      className={linkClass("/reports")}
      to="/reports"
    >
      <FaFileAlt />
      Reports
    </Link>
  </>
)}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 p-2 rounded flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <>
              <Link
                onClick={closeMenu}
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded flex items-center gap-2"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                onClick={closeMenu}
                to="/register"
                className="bg-gray-800 hover:bg-gray-900 p-2 rounded flex items-center gap-2"
              >
                <FaUserPlus />
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;