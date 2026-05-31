import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabButtonGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabButtonGroup: React.FC<TabButtonGroupProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {tabs.map(({ id, label }) => (
      <button
        key={id}
        type="button"
        className={`px-4 py-2 rounded ${
          activeTab === id
            ? 'bg-cf-blue dark:bg-cf-blue-light text-white'
            : 'bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light'
        } hover:bg-opacity-90 transition-colors`}
        onClick={() => onTabChange(id)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default TabButtonGroup;
