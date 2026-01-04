import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: '',
              style: {
                background: 'rgb(31 41 55)',
                color: 'rgb(243 244 246)',
                border: '1px solid rgb(75 85 99)',
              },
              success: {
                duration: 3000,
                style: {
                  background: 'rgb(16 185 129)',
                  color: 'rgb(255 255 255)',
                },
                iconTheme: {
                  primary: 'rgb(255 255 255)',
                  secondary: 'rgb(16 185 129)',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: 'rgb(239 68 68)',
                  color: 'rgb(255 255 255)',
                },
                iconTheme: {
                  primary: 'rgb(255 255 255)',
                  secondary: 'rgb(239 68 68)',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
