import React, { useState } from 'react';
import TabButtonGroup from '../../components/common/TabButtonGroup';
import { useHeroContext } from './context/HeroContext';
import UserInfoCard from './components/UserInfoCard';
import StatisticsTab from './components/tabs/StatisticsTab';
import RatingTab from './components/tabs/RatingTab';
import TopicsTab from './components/tabs/TopicsTab';
import UnsolvedTab from './components/tabs/UnsolvedTab';
import { HERO_TABS, type HeroTab } from './types';

const Hero: React.FC = () => {
  const { userInfo } = useHeroContext();
  const [activeTab, setActiveTab] = useState<HeroTab>('statistics');

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cf-text">
        Loading...
      </div>
    );
  }

  const tabContent: Record<HeroTab, React.ReactNode> = {
    statistics: <StatisticsTab />,
    rating: <RatingTab />,
    topics: <TopicsTab />,
    unsolved: <UnsolvedTab />,
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 sm:mt-10 px-4 sm:px-0">
      <UserInfoCard userInfo={userInfo} />

      <div className="mt-6 sm:mt-8">
        <TabButtonGroup
          tabs={HERO_TABS}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as HeroTab)}
        />
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default Hero;
