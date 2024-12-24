import React, { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8001/user/sendverificationlink/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                setMessage('Verification link sent! Please check your email.');
                setEmail('');
            } else {
                setMessage(data.Message || 'Failed to send verification email');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">
                    <span className="text-black">Super</span>
                    <span className="text-yellow-400">Parser</span>
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send Verification Link
                    </button>

                    {message && (
                        <div className={`p-3 rounded-md ${
                            message.includes('success') 
                                ? 'bg-green-50 text-green-800' 
                                : 'bg-red-50 text-red-800'
                        }`}>
                            {message}
                        </div>
                    )}

                    <p className="text-gray-600 text-center text-sm mt-4">
                        We'll send you a magic link for password-free sign in.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;