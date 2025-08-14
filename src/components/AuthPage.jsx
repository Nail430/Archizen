import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useThemeStore } from '../components/themeStore';
import { SunIcon, MoonIcon, CubeIcon } from '@heroicons/react/24/outline';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6"
            >
              <CubeIcon className="h-8 w-8 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              ArchitectorAI
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-gray-600 dark:text-gray-400"
            >
              {isLogin ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            {isLogin ? (
              <LoginForm onToggleMode={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggleMode={() => setIsLogin(true)} />
            )}
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Modern architecture"
        />
        <div className="absolute inset-0 bg-blue-600 bg-opacity-20"></div>
        
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
        >
          {isDark ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};
