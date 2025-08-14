// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Lightbulb, 
  BookOpen, 
  Star, 
  LayoutDashboard,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Facebook
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                ArchiZen
              </span>
            </div>
            <p className="mb-6 max-w-md text-slate-400 leading-relaxed">
              Logiciel tout-en-un de conception 3D avec visite virtuelle immersive et IA intégrée pour architectes visionnaires.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-cyan-600 transition-colors">
                <Twitter size={18} className="text-slate-300" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-cyan-600 transition-colors">
                <Instagram size={18} className="text-slate-300" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-cyan-600 transition-colors">
                <Linkedin size={18} className="text-slate-300" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-cyan-600 transition-colors">
                <Facebook size={18} className="text-slate-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Home size={18} /> Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/features", label: "Fonctionnalités" },
                { to: "/gallery", label: "Galerie" },
                { to: "/testimonials", label: "Témoignages" },
                { to: "/pricing", label: "Tarifs" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <LayoutDashboard size={18} /> Ressources
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/blog", label: "Blog" },
                { to: "/docs", label: "Documentation" },
                { to: "/tutorials", label: "Tutoriels" },
                { to: "/community", label: "Communauté" },
                { to: "/support", label: "Support" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <MapPin size={18} /> Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>contact@archizen.design</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>123 Rue de l'Innovation<br />75000 Paris, France</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} ArchiZen. Tous droits réservés.
          </p>
          
          <div className="flex gap-6 text-slate-500 text-sm">
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/cookies" className="hover:text-cyan-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;