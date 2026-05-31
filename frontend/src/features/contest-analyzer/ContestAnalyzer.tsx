import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TabButtonGroup from '../../components/common/TabButtonGroup';
import AppNavbar from '../../components/common/AppNavbar';
import { useContestData } from './hooks/useContestData';
import DivisionSelector from './components/DivisionSelector';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ContestsTab from './components/tabs/ContestsTab';
import RatingTab from './components/tabs/RatingTab';
import TopicsTab from './components/tabs/TopicsTab';
import StatisticsTab from './components/tabs/StatisticsTab';
import { CONTEST_TABS, type ContestTab, type Division } from './types';

const ContestAnalyzer: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<Division>('div2');
  const [activeTab, setActiveTab] = useState<ContestTab>('contests');
  const {
    loading,
    divisionLoading,
    error,
    contestData,
    fetchContestData,
    triggerSync,
    refreshDivision,
    isSyncing,
    isEmpty,
  } = useContestData(activeDivision);

  const divisionData = contestData[activeDivision];

  useEffect(() => {
    setActiveTab('contests');
  }, [activeDivision]);

  if (loading) return <LoadingState />;
  if (error && !divisionData.isLoaded) {
    return <ErrorState error={error} onRetry={fetchContestData} />;
  }

  const tabContent: Record<ContestTab, React.ReactNode> = {
    contests: (
      <ContestsTab
        contests={divisionData.contests}
        isEmpty={isEmpty}
        isSyncing={isSyncing}
        onRefresh={refreshDivision}
        onSync={triggerSync}
      />
    ),
    rating: <RatingTab problemsByRating={divisionData.problemsByRating} />,
    topics: <TopicsTab problemsByTopic={divisionData.problemsByTopic} />,
    statistics: <StatisticsTab divisionData={divisionData} />,
  };

  return (
    <div className="min-h-screen bg-cf-dark dark:bg-cf-dark-light">
      <AppNavbar />

      <div className="max-w-6xl mx-auto mt-4 sm:mt-8 px-4 sm:px-0">
        <div className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-4 sm:p-6 shadow-cf">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-cf-blue dark:text-cf-blue-light">
              Contest Analyzer
            </h2>
            <Link
              to="/dashboard"
              className="text-cf-blue dark:text-cf-blue-light hover:underline text-sm sm:text-base"
            >
              Back to Dashboard
            </Link>
          </div>

          <DivisionSelector
            activeDivision={activeDivision}
            onDivisionChange={setActiveDivision}
          />

          <TabButtonGroup
            tabs={CONTEST_TABS}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as ContestTab)}
          />

          {divisionLoading ? (
            <div className="py-12 text-center text-cf-text dark:text-cf-text-light">
              Loading {activeDivision.toUpperCase()} data...
            </div>
          ) : (
            tabContent[activeTab]
          )}

          {error && divisionData.isLoaded && (
            <p className="mt-4 text-center text-red-400 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestAnalyzer;
