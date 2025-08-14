// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, userData, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="bg-[#D9CAB3] shadow-sm py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="bg-[#A67B5B] text-white font-bold text-xl p-2 rounded mr-2">AI</div>
          <span className="text-xl font-bold text-[#2C3E50]">ArchitectAI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[#4A4A4A] hover:text-[#A67B5B] font-medium">Accueil</Link>
          <a href="#features" className="text-[#4A4A4A] hover:text-[#A67B5B] font-medium">Fonctionnalités</a>
          <a href="#gallery" className="text-[#4A4A4A] hover:text-[#A67B5B] font-medium">Galerie</a>
          <Link to="/dashboard" className="text-[#4A4A4A] hover:text-[#A67B5B] font-medium">Tableau de bord</Link>
        </nav>

        {isLoggedIn ? (
          <div className="hidden md:flex items-center space-x-4">
            <span className="font-medium text-[#2C3E50]">Bonjour, {userData?.name || "Utilisateur"}</span>
            <button
              onClick={handleLogout}
              className="bg-[#A67B5B] text-white px-4 py-2 rounded-lg hover:bg-[#8C6339] transition"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/Connexion"
              className="bg-white border border-[#A67B5B] text-[#A67B5B] px-4 py-2 rounded-lg hover:bg-[#E3D6B6] transition"
            >
              Connexion
            </Link>
            <Link
              to="/Inscription"
              className="bg-[#A67B5B] text-white px-4 py-2 rounded-lg hover:bg-[#8C6339] transition"
            >
              Inscription
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#4A4A4A]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4A4A4A"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#D9CAB3] py-4 px-6 shadow-inner border-t border-[#A67B5B]">
          <nav className="mb-6 space-y-4">
            <Link
              to="/"
              className="block text-[#4A4A4A] hover:text-[#A67B5B] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <a href="#features" className="block text-[#4A4A4A] hover:text-[#A67B5B] font-medium">
              Fonctionnalités
            </a>
            <a href="#gallery" className="block text-[#4A4A4A] hover:text-[#A67B5B] font-medium">
              Galerie
            </a>
            <Link
              to="/dashboard"
              className="block text-[#4A4A4A] hover:text-[#A67B5B] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tableau de bord
            </Link>
          </nav>

          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="font-medium text-[#2C3E50]">Bonjour, {userData?.name || "Utilisateur"}</div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#A67B5B] text-white px-4 py-2 rounded-lg hover:bg-[#8C6339] transition"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/Connexion"
                className="block text-center bg-white border border-[#A67B5B] text-[#A67B5B] px-4 py-2 rounded-lg hover:bg-[#E3D6B6] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                to="/Inscription"
                className="block text-center bg-[#A67B5B] text-white px-4 py-2 rounded-lg hover:bg-[#8C6339] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
