// src/context/DarkModeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // Initialiser le mode avec ce qui est stocké en localStorage ou par défaut sur false
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  // Ajouter ou retirer la classe 'dark' sur le <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Sauvegarder dans localStorage pour garder la préférence
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
