import React from 'react';
import { Check } from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$50',
      features: [
        '500 credits/month',
        'Rate limit: 5 call/sec',
        'Excess usage at $0.1/call'
      ]
    },
    {
      name: 'Advance',
      price: '$100',
      features: [
        '2000 credits/month',
        'Rate limit: 5 call/sec',
        'Excess usage at $0.05/call'
      ]
    },
    {
      name: 'Premium',
      price: '$250',
      features: [
        '5000 credits/month',
        'Rate limit: 5 call/sec',
        'Excess usage at $0.05/call'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscription Plans</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-[#1E2B3C] mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{plan.price}<span className="text-sm text-gray-500">/mo</span></p>
            </div>
            
            <div className="space-y-4 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-[#1E2B3C] text-white rounded-md py-2 px-4 hover:bg-[#273548] transition-colors duration-200 font-medium">
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;