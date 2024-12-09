import React from 'react';

const MarqueeBanner = ({ plan }) => {
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