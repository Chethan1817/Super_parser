import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';

const UsageHourly = () => {
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyUsage = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response.data.status === "True") {
          setHourlyData(response.data.Data.requests_by_hour);
        }
      } catch (error) {
        console.error('Error fetching hourly usage:', error);
        setError('Failed to load hourly usage data');
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyUsage();
  }, []);

  if (loading) {
    return <div className="usage-container">Loading hourly usage...</div>;
  }

  if (error) {
    return <div className="usage-container text-red-500">{error}</div>;
  }

  return (
    <div className="usage-container p-4 border rounded-lg shadow-sm mt-4">
      <div className="usage-header mb-4">
        <h4 className="text-lg font-semibold">Hourly Usage</h4>
      </div>
      <div className="usage-content">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="space-y-2">
            {hourlyData?.requests_by_hour && Object.entries(hourlyData.requests_by_hour).map(([timeSlot, count]) => (
              <div key={timeSlot} className="flex justify-between">
                <span className="text-sm">{timeSlot}</span>
                <span className="text-sm font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageHourly;