// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  LogIn, 
  UserPlus, 
  LayoutDashboard,
  X,
  Menu,
  Lightbulb,
  Star,
  BookOpen
} from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainLinks = [
    { to: "/", label: "Accueil", icon: <Home size={18} /> },
    { to: "/features", label: "Fonctionnalités", icon: <Lightbulb size={18} /> },
    { to: "/gallery", label: "Galerie", icon: <BookOpen size={18} /> },
    { to: "/testimonials", label: "Témoignages", icon: <Star size={18} /> },
  ];

  const authLinks = [
    { to: "/dashboard", label: "Tableau de bord", icon: <LayoutDashboard size={18} /> },
    { to: "/inscription", label: "Inscription", icon: <UserPlus size={18} /> },
    { to: "/connexion", label: "Connexion", icon: <LogIn size={18} /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center gap-2"
        >
          <div className="bg-gray-600 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="bg-gray-700 bg-clip-text text-transparent">
            ArchiZen
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {mainLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium ${
                isActive(to)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {authLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium ${
                isActive(to)
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 focus:outline-none z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8 h-full flex flex-col">
          <div className="flex-1 space-y-2">
            <h3 className="text-sm uppercase text-slate-500 font-medium pl-4 mb-2">Navigation</h3>
            {mainLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition font-medium ${
                  isActive(to)
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
          
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-sm uppercase text-slate-500 font-medium pl-4 mb-2">Mon compte</h3>
            {authLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition font-medium ${
                  isActive(to)
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-8">
            <button 
              onClick={() => {
                navigate("/inscription");
                setMobileOpen(false);
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Commencer gratuitement
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;