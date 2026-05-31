import React from 'react';
import { DIVISIONS, type Division } from '../types';

interface DivisionSelectorProps {
  activeDivision: Division;
  onDivisionChange: (division: Division) => void;
}

const DivisionSelector: React.FC<DivisionSelectorProps> = ({
  activeDivision,
  onDivisionChange,
}) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {DIVISIONS.map((div) => (
      <button
        key={div}
        type="button"
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
          activeDivision === div
            ? 'bg-cf-blue dark:bg-cf-blue-light text-white'
            : 'bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light'
        } hover:bg-opacity-90 transition-colors`}
        onClick={() => onDivisionChange(div)}
      >
        {div.toUpperCase()}
      </button>
    ))}
  </div>
);

export default DivisionSelector;
