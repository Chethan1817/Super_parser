import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
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
    <div className="api-container">
      <div className="api-header">
        <h4 className="api-header-text">API Key</h4>
      </div>
      <div className="api-content">
        <div className="api-key-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p className="api-key-text" style={{ flex: 1, margin: 0 }}>{apiKey}</p>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Copy API key"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
        <div className="api-info">
          <div className="info-icon-container">
            <span className="info-icon">ℹ</span>
          </div>
          <p className="api-info-text">Please contact support to change API key.</p>
        </div>
      </div>
    </div>
  );
};

export default Apikey;