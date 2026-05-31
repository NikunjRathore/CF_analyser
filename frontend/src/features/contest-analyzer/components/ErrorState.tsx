import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center text-cf-text dark:text-cf-text-light">
    <div className="text-center">
      <div className="text-xl mb-4 text-red-500">{error}</div>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 bg-cf-blue dark:bg-cf-blue-light text-white rounded hover:bg-opacity-90 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorState;
