
import React from 'react';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
    return (
        <header className="bg-cambridge-dark shadow-md">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
                <div onClick={onHomeClick} className="cursor-pointer">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                        Cambridge English Path
                    </h1>
                </div>
                 <button 
                    onClick={onHomeClick}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label="Home"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
