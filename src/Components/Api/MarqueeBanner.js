import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';

const MarqueeBanner = () => {
    const [plan, setPlan] = useState('free');
    
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await dashboardService.getSubscription();
                if (response.data.status === "True") {
                    const subscriptionPlan = response.data.Data.subscription.plan;
                    setPlan(subscriptionPlan);
                }
            } catch (error) {
                console.error('Error fetching subscription:', error);
            }
        };
        
        fetchSubscription();
    }, []);

    const messages = {
        free: "**Upgrade your plan!** You are currently on a free plan that is limited to 50 requests per month. Click here to upgrade to a paid plan!",
        basic: "You are in **Basic plan** with 500 credits per month. Upgrade to Advanced plan for more flexibility!",
        advance: "You are in **Advance plan** with 2000 credits per month. Consider upgrading to Premium!",
        premium: "You are on the **Premium plan**. Enjoy our top-tier services with 5000 credits per month!"
    };

    const handleClick = () => {
        // Update the URL and reload the page to trigger proper navigation
        window.location.href = '/dashboard#billing';
        // Alternatively, if you're using local storage to handle navigation:
        localStorage.setItem('activeCategory', 'billing');
        localStorage.setItem('activeSubCategory', 'subscriptions');
        window.location.reload();
    };

    const message = messages[plan.toLowerCase()] || messages.free;

    return (
        <div 
            className="relative bg-gray-50 rounded-lg mb-6 overflow-hidden border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleClick}
        >
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap py-3 px-4 group-hover:[animation-play-state:paused]">
                    <span className="text-gray-700">{message}</span>
                </div>
            </div>
        </div>
    );
};

export default MarqueeBanner;