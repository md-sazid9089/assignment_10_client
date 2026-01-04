import { createContext, useState, useEffect, useContext } from 'react'

export const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('artify-theme')
    return savedTheme || 'light'
  })

  
  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    
    // Set data-theme attribute for DaisyUI
    root.setAttribute('data-theme', theme)
    
    // Save to localStorage
    localStorage.setItem('artify-theme', theme)
  }, [theme])

  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const themeInfo = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
  )
}

  
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
