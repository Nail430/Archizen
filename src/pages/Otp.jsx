import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { KeyRound, ArrowLeft, RefreshCw, Mail, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRef = useRef(null);
  const navigate = useNavigate("")

  useEffect(() => {
    // Focus sur le champ OTP au chargement
    inputRef.current.focus();
    
    // Démarrer le compte à rebours pour le renvoi
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Le code doit contenir exactement 6 chiffres")
        .required("Champ requis"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      
      // Simulation de vérification OTP
      setTimeout(() => {
        console.log("✅ OTP vérifié", values);
        setIsLoading(false);
        setIsVerified(true);
        
        // Simulation de redirection après vérification
        setTimeout(() => {
          console.log("Redirection vers la page de réinitialisation du mot de passe");
        }, 2000);
      }, 1500);
    },
  });

  const handleResendCode = () => {
    setResendDisabled(true);
    setCountdown(30);
    
    // Démarrer un nouveau compte à rebours
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    console.log("Nouveau code OTP envoyé");
  };

  const handleBackToEmail = () => {
   navigate ("/MotDP")
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <Check className="text-green-600" size={48} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Code vérifié avec succès!
            </h1>
            <p className="text-gray-600 mb-6">
              Votre code OTP a été vérifié. Vous pouvez maintenant réinitialiser votre mot de passe.
            </p>
            
            <div className="w-24 h-2 bg-blue-200 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
            
            <p className="text-gray-500 text-sm">
              Redirection en cours...
            </p>
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
        <button
          onClick={handleBackToEmail}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour
        </button>
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-xl">
              <KeyRound size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Vérification OTP
          </h1>
          <p className="text-gray-600 mt-2">
            Entrez le code à 6 chiffres envoyé à votre email
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Code de vérification
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="text-gray-400" size={20} />
              </div>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="000000"
                className={`w-full rounded-xl border ${
                  formik.touched.otp && formik.errors.otp
                    ? "border-red-300"
                    : "border-gray-300"
                } pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-xl tracking-widest font-mono`}
                ref={inputRef}
                {...formik.getFieldProps("otp")}
              />
            </div>
            {formik.touched.otp && formik.errors.otp && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-500 flex items-center justify-center"
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
                {formik.errors.otp}
              </motion.p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendDisabled}
              className={`text-blue-600 hover:text-blue-800 font-medium flex items-center ${
                resendDisabled ? "text-gray-400 cursor-not-allowed" : ""
              }`}
            >
              <RefreshCw size={16} className="mr-2" />
              {resendDisabled ? `Renvoyer (${countdown}s)` : "Renvoyer le code"}
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition flex items-center ${
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
                  Vérification...
                </>
              ) : (
                "Vérifier"
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Mail className="text-blue-600" size={18} />
            </div>
            <p className="text-sm text-gray-600">
              Vous n'avez pas reçu le code? Vérifiez votre dossier spam
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">
              Le code expirera dans
            </p>
            <div className="text-xl font-bold text-blue-600">
              {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Otp;