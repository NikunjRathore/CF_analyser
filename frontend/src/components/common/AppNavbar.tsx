import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-cf-dark dark:bg-cf-dark-light border-b border-cf-gray dark:border-cf-gray-light p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-cf-blue dark:text-cf-blue-light font-bold text-4xl font-serif hover:text-cf-link dark:hover:text-cf-link-light"
        >
          CF Analyser
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="text-cf-text underline dark:text-cf-text-light text-sm hover:text-cf-blue dark:hover:text-cf-blue-light"
        >
          Dashboard
        </Link>
        <Link
          to="/contests"
          className="text-cf-text underline dark:text-cf-text-light text-sm hover:text-cf-blue dark:hover:text-cf-blue-light"
        >
          Contests
        </Link>
        {user && (
          <Link
            to={`/hero/${user.codeforces_ID}`}
            className="text-cf-text underline dark:text-cf-text-light text-sm hover:text-cf-blue dark:hover:text-cf-blue-light"
          >
            My Profile
          </Link>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-1.5 rounded bg-blue-500 dark:bg-cf-gray-light text-cf-text dark:text-cf-text-light text-sm hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AppNavbar;
