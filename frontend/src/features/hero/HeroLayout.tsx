import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { HeroContext } from './context/HeroContext';
import { useHeroData } from './hooks/useHeroData';
import HeroNavbar from './components/HeroNavbar';

const HeroLayout: React.FC = () => {
  const { handle } = useParams();
  const { userInfo, solvedProblems, topicProblems, unsolvedProblems } =
    useHeroData(handle);

  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDateInputs, setShowDateInputs] = useState(false);

  useEffect(() => {
    const ratings = Object.keys(solvedProblems).sort(
      (a, b) => Number(a) - Number(b)
    );
    if (!selectedRating && ratings.length > 0) {
      setSelectedRating(ratings[0]);
    }
  }, [solvedProblems, selectedRating]);

  return (
    <HeroContext.Provider
      value={{
        userInfo,
        solvedProblems,
        topicProblems,
        unsolvedProblems,
        selectedRating,
        setSelectedRating,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        sortOrder,
        setSortOrder,
        handle,
        showDateInputs,
        setShowDateInputs,
      }}
    >
      <div className="min-h-screen bg-cf-dark dark:bg-cf-dark-light p-6">
        <HeroNavbar />
        <Outlet />
      </div>
    </HeroContext.Provider>
  );
};

export default HeroLayout;
