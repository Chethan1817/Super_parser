import React from 'react';
import { LogOut } from 'lucide-react';

const Header = () => {
    const handleSignOut = () => {
        localStorage.removeItem('jwt_token');        
        window.location.href = '/';
    };
    
    return (
        <div className="bg-[#1E2B3C] text-white border-b border-gray-700">
            <div className="px-4 h-14 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-xl m-[300px] font-black ">
                        <span className="text-yellow-400">Super</span>
                        <span className="text-white">Parser</span>
                    </span>
                </div>
                <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="font-bold mr-[300px]">Sign out</span>
                </button>
            </div>
        </div>
    );
};

export default Header;