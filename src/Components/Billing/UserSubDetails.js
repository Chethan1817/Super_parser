const UserSubDetails=()=>{
    
    return (
        <div className="sub-details-container">
            <div className="sub-details-header">
            <h4 className="sub-details-header-text">Your subscription</h4>
            </div>
            <div className="sub-details-content">
            <div className="sub-details-key-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p className="sub-details-key-text" style={{ flex: 1, margin: 0 }}>User subscription Details</p>
            </div>
            </div>
        </div>
      );
    };

export default UserSubDetails;