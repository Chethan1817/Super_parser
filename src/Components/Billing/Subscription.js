import React from 'react';

const Subscription = () => {
  return (
    <div className="subscription-container">
      <div className="subscription-plan">
        <h3>Basic - $50/mo</h3>
        <p>500 credits/month</p>
        <p> Rate limit: 5 call/sec</p>
        <p>Excess usage at $0.1/call</p>
        <button className='to-start'>Get started</button>
      </div>
      <div className="subscription-plan">
        <h3>Advance - $100/mo</h3>
        <p>2000 credits/month</p>
        <p> Rate limit: 5 call/sec</p>
        <p>Excess usage at $0.05/call</p>
        <button className='to-start'>Get started</button>
      </div>
      <div className="subscription-plan">
        <h3>Premium - $250/mo</h3>
        <p>5000 credits/month</p>
        <p> Rate limit: 5 call/sec</p>
        <p>Excess usage at $0.05/call</p>
        <button className='to-start'>Get started</button>
      </div>
    </div>
  );
};

export default Subscription;