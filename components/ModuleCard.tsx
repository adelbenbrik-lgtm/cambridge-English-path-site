
import React from 'react';
import { Module } from '../types';

interface ModuleCardProps {
    module: Module;
    status: 'locked' | 'unlocked' | 'completed';
    onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, status, onClick }) => {
    const isLocked = status === 'locked';

    const baseClasses = "rounded-lg p-6 transition-all duration-300 flex items-center space-x-4";
    const statusClasses = {
        locked: 'bg-gray-200 text-gray-500 cursor-not-allowed',
        unlocked: 'bg-white shadow hover:shadow-lg hover:border-cambridge-blue border-2 border-transparent cursor-pointer',
        completed: 'bg-green-100 border-2 border-green-500 text-green-800 cursor-pointer',
    };

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const LockIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
    
    const ArrowIcon = () => (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cambridge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
    
    const getIcon = () => {
        switch (status) {
            case 'completed': return <CheckIcon />;
            case 'locked': return <LockIcon />;
            case 'unlocked': return <ArrowIcon />;
        }
    }


    return (
        <div className={`${baseClasses} ${statusClasses[status]}`} onClick={!isLocked ? onClick : undefined}>
            <div className="flex-shrink-0">
                {getIcon()}
            </div>
            <div className={`flex-grow ${isLocked ? 'opacity-60' : ''}`}>
                <h4 className="text-xl font-semibold">{module.name}</h4>
                <p className="text-sm">{module.description}</p>
            </div>
        </div>
    );
};

export default ModuleCard;
