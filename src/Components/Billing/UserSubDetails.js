import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';

const UserSubDetails = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await dashboardService.getSubscription();
                if (response.data.status === "True") {
                    setSubscription(response.data.Data.subscription);
                }
            } catch (error) {
                console.error('Error fetching subscription:', error);
                setSubscription(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, []);

    const getSubscriptionMessage = () => {
        if (loading) {
            return "Loading subscription details...";
        }

        if (!subscription || subscription.plan === 'free') {
            return "You are currently on the free plan and do not have an active subscription.";
        }

        return `You are in ${subscription.plan} plan with ${subscription.monthly_limit} credits per month. 
                Valid until: ${new Date(subscription.end_date).toLocaleDateString()}`;
    };

    return (
        <div className="sub-details-container">
            <div className="sub-details-header">
                <h4 className="sub-details-header-text">Your subscription</h4>
            </div>
            <div className="sub-details-content">
                <div className="sub-details-key-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p className="sub-details-key-text" style={{ flex: 1, margin: 0 }}>
                        {getSubscriptionMessage()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSubDetails;