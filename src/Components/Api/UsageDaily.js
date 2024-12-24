import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardService } from '../services/api';

const UsageDaily = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyUsage = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response.data.status === "True") {
          // Transform the data for the chart
          const formattedData = Object.entries(response.data.Data.requests_by_day.requests_by_day || {})
            .map(([date, count]) => ({
              date: new Date(date).toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric'
              }),
              requests: count,
              fullDate: date // Keep full date for sorting
            }))
            .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate)); // Sort by date

          setDailyData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching daily usage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyUsage();
  }, []);

  if (loading) {
    return <div className="h-64 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Daily API Usage</h3>
      
      <div className="h-[400px]"> {/* Increased height for better visibility */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={dailyData} 
            margin={{ top: 10, right: 30, left: 0, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Number of Requests', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: 12 }
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              formatter={(value, name) => [value + ' requests', 'Usage']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar 
              dataKey="requests" 
              fill="#1E2B3C"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageDaily;