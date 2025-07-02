import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaUserCircle,
  FaHome,
  FaUserPlus,
  FaQrcode,
  FaFileAlt,
  FaIdBadge,
} from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';

const navItems = [
  { to: '/security/dashboard', label: 'Dashboard', icon: <FaHome /> },
  { to: '/security/addvisitor', label: 'Add Visitor', icon: <FaUserPlus /> },
  { to: '/security/scanqr', label: 'Scan QR', icon: <FaQrcode /> },
  { to: '/security/visitorsearch', label: 'Visitor Report', icon: <FaFileAlt /> },
  { to: '/security/profile', label: 'Profile', icon: <FaIdBadge /> },
];

function SecurityLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    const security_id = localStorage.getItem('security_id');
    if (!security_id) return;

    try {
      await axios.post('http://localhost:5000/api/securitylogout/logout', {
        security_id,
        
lastActive: new Date().toISOString(),
        currentStatus: 'offline'
      });

      // Optionally clear localStorage
      // localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('❌ Logout failed:', err);
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-violet-700 text-white p-4 space-y-4 shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white text-xl mb-4 focus:outline-none"
          title={sidebarOpen ? 'Collapse' : 'Expand'}
        >
          <FaBars />
        </button>

        {sidebarOpen && (
          <h2 className="text-xl font-bold mb-2">SECURITY PANEL</h2>
        )}
        <hr />

        <nav className="flex flex-col space-y-2">
          {navItems.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
                  isActive ? 'bg-violet-500 font-semibold' : 'hover:bg-violet-600'
                }`}
                title={!sidebarOpen ? label : undefined}
              >
                <span className={`text-lg ${isActive ? 'text-yellow-300' : ''}`}>
                  {icon}
                </span>
                {sidebarOpen && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}

          {/* 🔴 Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-violet-600 w-full text-left"
          >
            <span className="text-lg">
              <IoLogOut />
            </span>
            {sidebarOpen && <span className="text-sm">Log out</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-violet-800 text-amber-50 p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-bold">GURU NANAK COLLEGE (AUTONOMOUS)</h1>
            <p className="text-sm">Visitor Pass Management System – Security Portal</p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-3xl text-white hover:text-amber-200 transition"
            >
              <FaUserCircle />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <Link
                  to="/security/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Profile
                </Link>
                <Link
                  to="/security/change-password"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Change Password
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>

        <footer className="bg-violet-800 text-center text-amber-50 p-4 shadow-md mt-auto">
          <p className="text-sm font-light">
            Developed with <span className="text-red-400">❤️</span> by{" "}
            <a
              href="https://github.com/Raasika2510"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Raasika M
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SecurityLayout;
