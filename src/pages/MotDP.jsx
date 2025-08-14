import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MotDP  ()  {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse email invalide")
        .required("Ce champ est requis"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        console.log("Email envoyé pour réinitialisation", values);
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
    },
  });

  const handleBackToLogin = () => {
    
    navigate("/Connexion")
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Email envoyé avec succès!
            </h1>
            <p className="text-gray-600 mb-6">
              Nous avons envoyé un lien de réinitialisation à{" "}
              <span className="font-medium text-blue-600">
                {formik.values.email}
              </span>
              . Veuillez vérifier votre boîte de réception.
            </p>
            
            <div className="mt-4 flex flex-col w-full gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Mail size={18} /> Renvoyer l'email
              </button>
              
              <button
                onClick={handleBackToLogin}
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Link to ="/Connexion">
                <ArrowLeft size={18} /> Retour à la connexion
                </Link>
                
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-600 text-white p-3 rounded-xl">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Mot de passe oublié?
          </h1>
          <p className="text-gray-600 mt-2">
            Entrez votre email pour réinitialiser votre mot de passe
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                className={`w-full rounded-xl border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-300"
                    : "border-gray-300"
                } pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-500 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formik.errors.email}
              </motion.p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-gray-700 hover:text-blue-800 font-medium flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour à la connexion
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-900 transition flex items-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le lien"
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Vous avez besoin d'aide?
          </h3>
          <div className="flex flex-col sm:flex-row justify-between gap-3 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Support technique
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contactez-nous
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MotDP;