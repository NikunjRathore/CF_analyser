import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { Register } from './pages/Register.tsx'
import Dashboard from './pages/Dashboard.tsx'
import HeroLayout from './pages/HeroLayout.tsx'
import Hero from './pages/Hero.tsx'
import Topic from './pages/Topic.tsx'
import ContestAnalyzer from './pages/ContestAnalyzer.tsx'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hero/:handle"
              element={
                <ProtectedRoute>
                  <HeroLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Hero />} />
              <Route path="topic/:topic" element={<Topic />} />
            </Route>
            <Route
              path="/contests"
              element={
                <ProtectedRoute>
                  <ContestAnalyzer />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
