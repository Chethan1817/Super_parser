const Billing = () => {
  return (
    <div className="billing-container">
        <div className="billing-header">
            <h4 className="billing-header-text">Billing History</h4>
        </div>
        <div className="billing-content">
            <div className="billing-key-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p className="billing-key-text" style={{ flex: 1, margin: 0 }}>User Billing History Details</p>
        </div>
        </div>
    </div>
)
}

export default Billing