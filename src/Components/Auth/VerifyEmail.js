import React, { useEffect, useState } from 'react';

const VerifyEmail = () => {
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        const verifyEmailToken = async () => {
            // Get token from URL parameters
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            
            if (!token) {
                setStatus('error');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8001/user/verifyemail/?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.status === "True" && data.Data.jwt_token) {
                    localStorage.setItem('jwt_token', data.Data.jwt_token);
                    setStatus('success');
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 2000);
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
            }
        };

        verifyEmailToken();
    }, []);

    const renderStatus = () => {
        switch (status) {
            case 'verifying':
                return (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                        <p>Verifying your email...</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center text-green-600">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p>Email verified successfully!</p>
                        <p className="text-sm text-gray-600 mt-2">Redirecting to dashboard...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center text-red-600">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <p>Failed to verify email.</p>
                        <button 
                            onClick={() => window.location.href = '/signin'}
                            className="mt-4 text-yellow-400 hover:text-yellow-500"
                        >
                            Return to Sign In
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                    <span className="text-black">Super</span>
                    <span className="text-yellow-400">Parser</span>
                </h1>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {renderStatus()}
            </div>
        </div>
    );
};

export default VerifyEmail;