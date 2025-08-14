import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import createToast from '../components/toast.jsx';
import axios from 'axios'
import B from '../assets/B.png'

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setErrors] = useState('');
  const navigate = useNavigate();

const validate = () => {
    const newErrors = {};

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
      const response = await axios.post('http://localhost:3000/api/auth/connexion', {
        email,
        password,
      });
  
      console.log(response.data);
      createToast('Connexion réussie', 0);
      navigate("/board");
    } catch (error) {
      console.error(error.response?.data || error.message);
      createToast(
        error.response?.data?.message || 'Erreur lors de la connexion',
        1
      );
    }
  };

  return (
  <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-gray-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Notre Plateforme</h1>
        <p className="text-lg opacity-80">
          Connectez-vous à votre compte et commencez à gérer vos projets facilement.
        </p>
        <img
          src={B}
          alt=""
          className="mt-8 max-w-md"
        />
      </div>  
    <div className="flex items-center justify-center py-12 px-4 w-full md:w-1/2">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gray-7Z    00 text-white font-bold text-xl p-2 rounded inline-block mb-4">
            ArchiZen
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Connexion à votre compte
          </h1>
          <p className="mt-2 text-gray-600">
            Entrez vos informations pour accéder à votre espace
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2">Se souvenir de moi</span>
              </label>
              <Link to="/MotDP" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-blue-900 focus:outline-none"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center py-2 px-4 border rounded-md bg-white shadow-sm hover:bg-gray-50">
                <FcGoogle className="text-xl" />
              </button>
             
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/Inscription" className="font-medium text-blue-600 hover:text-blue-500">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div> 
  );
}

export default Connexion
