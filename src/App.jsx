import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Alerts from './pages/Alerts'
import Analytics from './pages/Analytics'
import Chat from './pages/Chat'
import PremiumFeatures from './pages/PremiumFeatures'
import { AuthProvider } from './context/AuthContext'
import { CryptoProvider } from './context/CryptoContext'
import { ChatProvider } from './context/ChatContext'

function App() {
  return (
    <AuthProvider>
      <CryptoProvider>
        <ChatProvider>
          <div className="min-h-screen bg-crypto-primary">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/premium" element={<PremiumFeatures />} />
              </Routes>
            </main>
          </div>
        </ChatProvider>
      </CryptoProvider>
    </AuthProvider>
  )
}

export default App
