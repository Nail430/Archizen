import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { DarkModeProvider } from './context/DarkMode.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
  <DarkModeProvider>
      <ToastContainer />
      <App />
    </DarkModeProvider>
  </StrictMode>,
)
