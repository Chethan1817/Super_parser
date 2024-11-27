import React, { useState } from 'react';

const Profile = () => {
  const [currentEmail, setCurrentEmail] = useState('user@example.com');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    e.preventDefault();
    setError(''); 
    if (newEmail === currentEmail) {
      setError('You are already using this email address.');
      return;
    }
    
    if (newEmail !== confirmEmail) {
      setError('New email and confirm email do not match.');
      return;
    }

    if (newEmail === confirmEmail) {
      setCurrentEmail(newEmail);
      setIsChangingEmail(false);
      setNewEmail('');
      setConfirmEmail('');
    }
  };

  return (
    <div className="profile-container">      
      <div className="profile-card">
        <div className="email-row">
          <div>
            <label className="email-label">Your Email ID:</label>
            <span className="current-email">{currentEmail}</span>
          </div>
          <button 
            className="change-button"
            onClick={() => {
              setIsChangingEmail(true);
              setError(''); 
            }}
          >
            Change Email
          </button>
        </div>
      </div>

      {isChangingEmail && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Change Email</h3>
            
            <form onSubmit={handleEmailChange} className="email-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="new-email" className="form-label">
                  Your new email
                </label>
                <input
                  id="new-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-email" className="form-label">
                  Confirm new email
                </label>
                <input
                  id="confirm-email"
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <p className="note">*Note: This will update your login e-mail for all future logins.</p>

              <div className="button-group">
                <button type="submit" className="submit-button">
                  Change Email
                </button>
                <button 
                  type="button" 
                  className="close-button"
                  onClick={() => {
                    setIsChangingEmail(false);
                    setNewEmail('');
                    setConfirmEmail('');
                    setError('');
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;