import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Register: React.FC = () => {
  const { register, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [codeforces_ID, setCodeforcesId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await register(name, codeforces_ID, email, password)
      navigate('/login', { state: { message: 'Account created. Please log in.' } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-violet-50 via-white to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 text-slate-800"
      >
        <h1 className="text-2xl font-bold text-slate-900 text-center font-serif">Create account</h1>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <label className="text-sm font-semibold text-slate-600">
          Name:
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
          />
        </label>

        <label className="text-sm font-semibold text-slate-600">
          CodeForces Handle:
          <input
            name="codeforces_ID"
            required
            value={codeforces_ID}
            onChange={(e) => setCodeforcesId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
          />
        </label>

        <label className="text-sm font-semibold text-slate-600">
          Email:
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
          />
        </label>

        <label className="text-sm font-semibold text-slate-600">
          Password:
          <input
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-violet-600 py-2.5 font-medium text-white hover:bg-violet-500 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-slate-600">Already have an account?</p>
      <Link to="/login" className="underline text-violet-600 hover:text-violet-500 transition-colors">
        Login
      </Link>
    </div>
  )
}
