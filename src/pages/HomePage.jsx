// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Brain, Eye, Users, Library, ArrowRight, Star, Quote } from "lucide-react";
import Footer from "../components/Footer";
import image1 from "../assets/image.png";
import image2 from "../assets/image 1.png";
import image3 from "../assets/image2.png";
import image4 from "../assets/image3.png";

function HomePage() {
  const projects = [
    { id: 1, name: "Maison Moderne", style: "Contemporain", architect: "Jean Dupont", image: image1 },
    { id: 2, name: "Villa Méditerranéenne", style: "Méditerranéen", architect: "Marie Lambert", image: image2 },
    { id: 3, name: "Chalet Alpin", style: "Montagnard", architect: "Thomas Martin", image: image3 },
    { id: 4, name: "Appartement Urbain", style: "Industriel", architect: "Sophie Bernard", image: image4 },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alexandre Dubois",
      role: "Architecte d'intérieur",
      content: "La visite virtuelle a révolutionné ma façon de présenter les projets à mes clients. Les retours sont unanimes !",
      rating: 5
    },
    {
      id: 2,
      name: "Camille Rousseau",
      role: "Designer freelance",
      content: "L'IA intégrée m'a fait gagner des heures de travail sur la conception des plans. Un outil indispensable aujourd'hui.",
      rating: 4
    },
    {
      id: 3,
      name: "TechnoConstruct",
      role: "Agence d'architecture",
      content: "La collaboration en temps réel a fluidifié nos processus et réduit les délais de validation de 40%.",
      rating: 5
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-white text-slate-900 font-sans">
      <Navbar />

      {/* HERO - Nouveau design avec superposition d'éléments */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 z-10"></div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left py-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                <span className="block">Concevez l'Architecture</span>
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-300 text-transparent bg-clip-text">du Futur</span>
              </h1>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl">
                Logiciel tout-en-un de conception 3D avec visite virtuelle immersive et IA intégrée pour architectes visionnaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/inscription" 
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Démarrer gratuitement <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 rounded-xl font-bold text-white transition-all"
                >
                  Voir la démo
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-cyan-400 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-1 shadow-2xl">
                  <div className="bg-gray-800 aspect-video rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-900 to-cyan-800 w-full h-full flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="inline-block bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-6">
                          <Brain size={48} className="text-cyan-300 mx-auto" />
                        </div>
                        <h3 className="text-cyan-200 text-xl font-bold mb-2">Design assisté par IA</h3>
                        <p className="text-blue-100">Générez des concepts en quelques clics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES - Nouvelle disposition en grille */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Une suite complète pour vos projets</h2>
            <p className="text-lg text-slate-600">
              Tous les outils dont vous avez besoin dans une seule plateforme intuitive
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              {[
                { 
                  icon: <Brain size={36} className="text-cyan-500" />, 
                  title: "IA Intégrée", 
                  text: "Génération automatique de plans optimisés selon vos contraintes et préférences avec notre intelligence artificielle spécialisée." 
                },
                { 
                  icon: <Users size={36} className="text-indigo-500" />, 
                  title: "Collaboration en temps réel", 
                  text: "Travaillez simultanément avec votre équipe et vos clients. Commentaires, annotations et validation simplifiées." 
                }
              ].map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                      {f.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{f.title}</h3>
                    <p className="text-slate-600">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-12">
              {[
                { 
                  icon: <Eye size={36} className="text-blue-500" />, 
                  title: "Visite Virtuelle Immersive", 
                  text: "Explorez vos créations en réalité virtuelle avant la construction. Compatible avec tous les casques VR du marché." 
                },
                { 
                  icon: <Library size={36} className="text-violet-500" />, 
                  title: "Bibliothèque Premium", 
                  text: "Accédez à plus de 10 000 matériaux, textures et objets 3D haute définition. Mise à jour hebdomadaire." 
                }
              ].map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                      {f.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{f.title}</h3>
                    <p className="text-slate-600">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE - Nouvelle disposition avec effet parallax */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Projets inspirants</h2>
            <p className="text-lg text-slate-600">
              Découvrez des réalisations créées avec ArchiZen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((p, index) => (
              <div 
                key={p.id} 
                className={`group relative overflow-hidden rounded-3xl shadow-xl ${index % 2 === 0 ? 'h-[500px]' : 'h-[450px]'}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${p.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="inline-block bg-cyan-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {p.style}
                  </span>
                  <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
                  <p className="text-cyan-200 mb-4">Par {p.architect}</p>
                  <Link 
                    to={`/project/${p.id}`} 
                    className="inline-flex items-center font-medium text-white hover:text-cyan-300 transition-colors"
                  >
                    Explorer le projet <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/gallery" 
              className="inline-flex items-center px-8 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-900 shadow-lg font-bold transition-all"
            >
              Parcourir la galerie complète
            </Link>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES - Nouveau slider */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils révolutionnent leur métier</h2>
            <p className="text-slate-400">
              Découvrez comment ArchiZen transforme le quotidien des professionnels
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="relative bg-slate-800 rounded-3xl p-8 md:p-12">
              <Quote className="absolute top-8 left-8 text-slate-700" size={24} />
              
              <div className="mb-6">
                <div className="flex mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xl italic">
                  "{testimonials[activeTestimonial].content}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold text-lg">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-slate-400">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Nouveau design avec gradient */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-500 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid-white.svg')] opacity-20 z-10"></div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à transformer votre processus créatif ?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Rejoignez des milliers d'architectes et designers qui utilisent ArchiZen pour créer des projets exceptionnels.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/inscription" 
                className="px-8 py-4 bg-white text-slate-900 hover:bg-gray-100 rounded-xl font-bold shadow-lg transition-all"
              >
                Essai gratuit 14 jours
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-xl font-bold transition-all"
              >
                Demander une démo
              </Link>
            </div>
            
            <p className="mt-8 text-blue-200 text-sm">
              Aucune carte de crédit requise • Annulation à tout moment
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;