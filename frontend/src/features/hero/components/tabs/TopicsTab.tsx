import React from 'react';
import { Link } from 'react-router-dom';
import { useHeroContext } from '../../context/HeroContext';

const TopicsTab: React.FC = () => {
  const { topicProblems } = useHeroContext();

  return (
    <div className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-4 sm:p-6 shadow-cf">
      <h2 className="text-xl sm:text-2xl font-bold text-cf-blue dark:text-cf-blue-light mb-4">
        Solved Problems by Topic
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {Object.keys(topicProblems)
          .sort()
          .map((topic) => (
            <div
              key={topic}
              className="bg-cf-dark dark:bg-cf-dark-light p-4 rounded text-center"
            >
              <Link
                to={`topic/${topic}`}
                className="text-cf-blue dark:text-cf-blue-light font-bold hover:underline"
              >
                {topic}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopicsTab;
