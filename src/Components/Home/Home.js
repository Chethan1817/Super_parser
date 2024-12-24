import React from 'react';
import Apikey from '../Api/Apikey';
import MarqueeBanner from '../Api/MarqueeBanner';
import UsageMonth from '../Api/UsageMonth';
import UsageDaily from '../Api/UsageDaily';

const Home = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="mb-6">
        <MarqueeBanner />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Apikey />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <UsageMonth />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <UsageDaily />
        </div>
      </div>
    </div>
  );
};

export default Home;