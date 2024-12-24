import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { dashboardService } from '../services/api';

const UsageMonth = () => {
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        // Fetch both dashboard data and subscription data to get limits
        const [dashboardResponse, subscriptionResponse] = await Promise.all([
          dashboardService.getDashboardData(),
          dashboardService.getSubscription()
        ]);

        if (dashboardResponse.data.status === "True" && subscriptionResponse.data.status === "True") {
          const totalRequests = dashboardResponse.data.Data.total_requests.total_requests || 0;
          const monthlyLimit = subscriptionResponse.data.Data.subscription.monthly_limit || 50; // default to free tier
          
          setUsageData([
            { name: 'Used', value: totalRequests },
            { name: 'Remaining', value: Math.max(0, monthlyLimit - totalRequests) }
          ]);
        }
      } catch (error) {
        console.error('Error fetching usage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return <div className="h-64 flex items-center justify-center">Loading...</div>;
  }

  const COLORS = ['#1E2B3C', '#E5E7EB'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="text-sm">
            {payload[0].name}: {payload[0].value} requests
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Usage Overview</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={usageData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {usageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => {
                const data = usageData.find(item => item.name === value);
                return `${value} (${data.value} requests)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageMonth;