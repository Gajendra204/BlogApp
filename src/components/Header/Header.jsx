import React from "react";
import { Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import ThemeToggle from "../themeToggle/ThemeToggle";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  const mainNavItems = navItems.filter(
    (item) =>
      ["Home", "All Posts", "Add Post"].includes(item.name) && item.active
  );
  const authNavItems = navItems.filter(
    (item) => ["Login", "Signup"].includes(item.name) && item.active
  );

  return (
    <header className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <Logo width="60px" />
            </Link>
          </div>

          {/* Main Navigation Links */}
          <ul className="flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="px-4 py-2 text-lg text-white font-semibold hover:bg-white hover:text-blue-500 rounded transition-colors duration-300"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Side Section */}
          <div className="flex items-center space-x-6">
            {/* Authentication Links */}
            {authStatus ? (
              <LogoutBtn />
            ) : (
              authNavItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-lg text-white font-semibold hover:bg-white hover:text-blue-500 rounded transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
