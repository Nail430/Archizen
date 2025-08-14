// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, Briefcase } from 'lucide-react';
import createToast from '../components/toast.jsx';
import axios from 'axios'
import A from "../assets/A.png";

function Inscription() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("architect");
  const [experience, setExperience] = useState("beginner");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions';
    }

    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      name,
      email,
      password,
      userType,
      experience
    });

    console.log(response.data);
    createToast('Inscription réussie', 0);
    navigate("/Connexion");
  } catch (error) {
    console.error(error.response?.data || error.message);
    createToast(
      error.response?.data?.message || 'Erreur lors de l’inscription',
      1
    );
  }
};

  return (
  <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-gray-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Notre Plateforme</h1>
        <p className="text-lg opacity-80">
          Créez votre compte et commencez à gérer vos projets facilement.
        </p>
        <img
          src={A}
          alt=""
          className="mt-8 max-w-md"
        />
      </div>

    <div className="flex items-center justify-center py-12 px-4 bg-white w-full md:w-1/2">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="bg-gray-700 text-white font-bold text-xl p-2 rounded inline-block mb-4">
            ArchiZen
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
          <p className="mt-2 text-gray-600">
            Commencez votre aventure avec ArchiZen
          </p>
        </div>

        <div className="card p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                Type d'utilisateur
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="architect">Architecte</option>
                  <option value="student">Étudiant</option>
                  <option value="individual">Particulier</option>
                  <option value="company">Entreprise</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau d'expérience
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                  J'accepte les{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Conditions Générales d'Utilisation
                  </a>
                </label>
              </div>
              {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
            </div>
            <div className="md:col-span-2 mt-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full py-3 px-4 bg-gray-700  text-white font-medium rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Commencer l'aventure
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">Vous avez déjà un compte ?</p>
            <Link to="/Connexion" className="text-blue-600 hover:text-blue-800 font-medium">
              Se connecter à votre compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
}

export default Inscription;
