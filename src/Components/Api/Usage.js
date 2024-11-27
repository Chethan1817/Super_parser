const Usage = () => {
  const Data = 'r';
  return (
    <div className="usage-container">
      <div className="usage-header">
        <h4 className="usage-header-text">Usage in current month</h4>
      </div>
      <div className="usage-content">
        <div className="usage-key-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p className="usage-key-text" style={{ flex: 1, margin: 0 }}>{Data}</p>
        </div>
        <div className="usage-info">
          <div className="info-icon-container">
            <span className="info-icon">ℹ</span>
          </div>
          <p className="usage-info-text">0 used of 50 total available</p>
        </div>
      </div>
    </div>
  );
};

export default Usage;