import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";

const sectionLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Our Edge" },
  { href: "#brands", label: "BRANDS", highlight: true },
];

// Base page links, Login will be added conditionally
const basePageLinks = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/web-development", label: "Web Dev" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { isAuthenticated, user, logout } = useApp();

  // Dynamic page links based on auth
  const pageLinks = isAuthenticated
    ? basePageLinks
    : [...basePageLinks, { to: "/auth", label: "Login" }];

  // For section links: on homepage scroll to section, on other pages navigate to /#section
  const getSectionHref = (hash) => {
    return isHome ? hash : `/${hash}`;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center min-w-0">
        <Link
          to="/"
          className="text-base sm:text-lg md:text-2xl font-black text-white tracking-widest uppercase whitespace-nowrap flex-shrink-0"
        >
          INDICREED STUDIOS<span className="text-blue-500">.</span>
        </Link>

        <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center text-sm font-semibold flex-shrink min-w-0">
          {/* Section links (About, Services, Brands, Our Edge) */}
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={getSectionHref(link.href)}
              className={`text-gray-300 hover:text-blue-400 transition-colors ${link.highlight ? "font-bold" : ""}`}
            >
              {link.label}
            </a>
          ))}

          {/* Page links (Portfolio, conditionally Login) */}
          {pageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors ${
                location.pathname === link.to
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* User Profile / Logout (Desktop) */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4 border-l border-gray-700 pl-4 ml-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-gray-200 text-sm font-medium">
                  {user?.name?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link
            to="/contact"
            className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cta-button"
          >
            Start a Project
          </Link>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden md:hidden absolute w-full bg-black/95 backdrop-blur-xl border-b border-gray-800 transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 pt-2 flex flex-col">
          {/* Section links */}
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={getSectionHref(link.href)}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 transition-colors border-b border-gray-800 ${
                link.highlight
                  ? "text-blue-400 font-bold hover:text-blue-300"
                  : "text-gray-300 hover:text-blue-400"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Page links */}
          {pageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 transition-colors border-b border-gray-800 ${
                location.pathname === link.to
                  ? "text-blue-400 font-bold"
                  : "text-gray-300 hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* User Profile / Logout (Mobile) */}
          {isAuthenticated && (
            <div className="block py-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Logged in as</div>
                    <div className="text-gray-200 font-medium">
                      {user?.name}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-4 text-center py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cta-button"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
}
