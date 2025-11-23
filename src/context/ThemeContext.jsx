import { createContext, useState, useEffect, useContext } from 'react'

export const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('artify-theme')
    return savedTheme || 'light'
  })

  
  useEffect(() => {
    const root = window.document.documentElement
    
    
    root.classList.remove('light', 'dark')
    
    
    root.classList.add(theme)
    
    
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
