import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppNavbar from '../components/common/AppNavbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cf-dark dark:bg-cf-dark-light">
      <AppNavbar />

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cf-blue dark:text-cf-blue-light">
            Welcome, {user?.name}
          </h1>
          <p className="text-cf-text dark:text-cf-text-light mt-2">
            Analyze your Codeforces progress and explore contest problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to={`/hero/${user?.codeforces_ID}`}
            className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-6 shadow-cf hover:opacity-90 transition-opacity"
          >
            <h2 className="text-xl font-bold text-cf-blue dark:text-cf-blue-light mb-2">
              My CF Analytics
            </h2>
            <p className="text-cf-text dark:text-cf-text-light text-sm">
              View your solved problems by rating, topic, and statistics for handle{' '}
              <span className="font-semibold">{user?.codeforces_ID}</span>.
            </p>
          </Link>

          <Link
            to="/contests"
            className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-6 shadow-cf hover:opacity-90 transition-opacity"
          >
            <h2 className="text-xl font-bold text-cf-blue dark:text-cf-blue-light mb-2">
              Contest Analyzer
            </h2>
            <p className="text-cf-text dark:text-cf-text-light text-sm">
              Browse recent Div 1–4 contests, problems by rating, and topic statistics.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
