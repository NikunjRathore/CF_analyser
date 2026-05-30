import React from 'react'

export const Login: React.FC= () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-violet-50 via-white to-indigo-100 px-4">
  <form className="flex flex-col gap-5 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 text-slate-800">
    <h1 className="text-2xl font-bold text-slate-900 text-center font-serif">Login</h1>

    <div>
        <label className="text-sm font-semibold text-slate-600">Email:</label>
        <input className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 ml-3" />
    </div>
    <div>
        <label className="text-sm font-semibold text-slate-600">Password:</label>
        <input className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 ml-3" />
    </div>

    <button className="rounded-lg bg-violet-600 py-2.5 font-medium text-white hover:bg-violet-500 transition-colors font-stretch-50%">
      Login
    </button>
  </form>
  <p className='mt-2'>Don't have an account?</p>
  <a href="/register" className='underline text-violet-600 hover:text-violet-500 transition-colors font-stretch-50%'>Register</a>
</div>
  )
}
