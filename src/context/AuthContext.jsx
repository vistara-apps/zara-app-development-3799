import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Demo User',
    email: 'demo@cryptosentinel.com',
    telegramId: null,
    isPremium: false
  })

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }))
  }

  const upgradeToPremium = () => {
    setUser(prev => ({ ...prev, isPremium: true }))
  }

  const value = {
    user,
    updateUser,
    upgradeToPremium,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}