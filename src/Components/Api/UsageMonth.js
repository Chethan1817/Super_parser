import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';

const UsageMonth = () => {
  const [usageData, setUsageData] = useState(null);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response.data.status === "True") {
          setUsageData(response.data.Data.total_requests);
        }
      } catch (error) {
        console.error('Error fetching usage data:', error);
      }
    };

    fetchUsage();
  }, []);

  const formatUsageData = () => {
    if (!usageData) return 'Loading...';
    
    return (
      <div>
        <div>Total Requests: {usageData.total_requests || 0}</div>
        <div>
          {Object.entries(usageData.request_types || {}).map(([endpoint, count]) => (
            <div key={endpoint}>
              {endpoint}: {count}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="usage-container">
      <div className="usage-header">
        <h4 className="usage-header-text">Usage in current month</h4>
      </div>
      <div className="usage-content">
        <div className="usage-key-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p className="usage-key-text" style={{ flex: 1, margin: 0 }}>
            {formatUsageData()}
          </p>
        </div>
        <div className="usage-info">
          <p className="usage-info-text"></p>
        </div>
      </div>
    </div>
  );
};

export default UsageMonth;