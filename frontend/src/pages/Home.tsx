import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Home: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-3 max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome to CODEFORCE Analyser
        </h1>
        <p className="text-slate-400">
          Register to analyse Codeforces in a way you never thought before
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-500 transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="rounded-lg border border-slate-600 px-6 py-3 font-medium text-slate-200 hover:border-slate-400 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
