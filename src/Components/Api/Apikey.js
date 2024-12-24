import React, { useState, useEffect } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { dashboardService } from '../services/api';

const Apikey = () => {
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response.data.status === "True") {
          setApiKey(response.data.Data.api_key.api_key);
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">API Key</h2>
        </div>

        {/* API Key Display */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
          <div className="flex items-center justify-between">
            <code className="font-mono text-sm text-gray-600 flex-1">
              {apiKey || 'Loading...'}
            </code>
            <button
              onClick={handleCopy}
              className="ml-4 p-2 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex items-start space-x-3 bg-blue-50 rounded-lg p-4">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Please contact support to change API key. Keep your API key secure and do not share it publicly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Apikey;