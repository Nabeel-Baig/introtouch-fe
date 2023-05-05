import React from 'react';

const TabViewHeader = ({ tabs, activeTab, onChange }) => {
  return (
    <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
      <ul className='flex flex-wrap -mb-px'>
        {tabs?.map((tab,index) => {
          const isActive = (activeTab && tab.key === activeTab.key) || (!activeTab && index===0)
          return (
            <li
              className='mr-2'
              key={tab.key}
              onClick={() => {
                onChange(tab);
              }}
            >
              <a
                className={`${
                  isActive
                    ? 'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                } inline-block p-4 rounded-t-lg border-b-2 cursor-pointer `}
              >
                {tab.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabViewHeader;
