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
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                }
            }
        };
        
        fetchSubscription();
    }, []);

    const marqueeMessages = {
        free: "**Upgrade your plan!** You are currently on a free plan that is limited to 50 requests per month. Click here to upgrade to a paid plan!",
        basic: "You are in **Basic plan** with 500 credits per month. Upgrade to Advanced plan for more flexibility and lower excess usage rates!",
        advance: "You are in **Advance plan** with 2000 credits per month. Consider upgrading to Premium for even higher credit limits and better rates!",
        premium: "You are on the **Premium plan**. Enjoy our top-tier services with 5000 credits per month and the lowest excess usage rates!"
    };

    const message = marqueeMessages[plan.toLowerCase()] || marqueeMessages.free;

    return (  
        <div className="marquee-container">
            <div className="marquee">
                <div className="marquee-content">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default MarqueeBanner;