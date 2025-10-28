
import React from 'react';
import { Level } from '../types';

interface LevelCardProps {
    level: Level;
    status: 'locked' | 'unlocked' | 'completed';
    onClick: () => void;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const LevelCard: React.FC<LevelCardProps> = ({ level, status, onClick }) => {
    const isLocked = status === 'locked';
    
    const baseClasses = "relative rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 transform";
    const statusClasses = {
        locked: 'bg-gray-300 text-black cursor-not-allowed',
        unlocked: `bg-white text-black hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-cambridge-blue`,
        completed: 'bg-green-600 text-white cursor-pointer hover:bg-green-700',
    };

    return (
        <div className={`${baseClasses} ${statusClasses[status]}`} onClick={!isLocked ? onClick : undefined}>
            {status === 'completed' && (
                <div className="absolute top-3 right-3 bg-green-700 rounded-full p-1">
                    <CheckIcon />
                </div>
            )}
            {status === 'locked' && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 opacity-50">
                    <LockIcon />
                </div>
            )}
            <div className={`flex-grow ${isLocked ? 'opacity-40' : ''}`}>
                <div className={`w-16 h-16 rounded-full ${level.color} flex items-center justify-center text-white font-bold text-2xl mb-4`}>
                    {level.cefr}
                </div>
                <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                <p className="text-sm">{level.modules.length -1} modules + Final Test</p>
            </div>
        </div>
    );
};

export default LevelCard;