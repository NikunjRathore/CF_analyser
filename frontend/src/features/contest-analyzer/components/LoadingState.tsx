import React from 'react';

const LoadingState: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center text-cf-text dark:text-cf-text-light">
    <div className="text-center">
      <div className="text-xl mb-4">Loading contest data...</div>
      <div className="text-sm">
        This may take a few minutes as we fetch data for multiple contests.
      </div>
    </div>
  </div>
);

export default LoadingState;
