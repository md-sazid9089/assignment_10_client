import { createContext, useState, useEffect, useContext } from 'react'

export const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('artify-theme')
    return savedTheme || 'light'
  })

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous theme
    root.classList.remove('light', 'dark')
    
    // Add current theme
    root.classList.add(theme)
    
    // Save to localStorage
    localStorage.setItem('artify-theme', theme)
  }, [theme])

  // Toggle theme
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

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
