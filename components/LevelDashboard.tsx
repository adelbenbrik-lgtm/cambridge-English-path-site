
import React from 'react';
import { Level, Progress } from '../types';
import LevelCard from './LevelCard';

interface LevelDashboardProps {
    levels: Level[];
    progress: Progress;
    onSelectLevel: (level: Level) => void;
}

const LevelDashboard: React.FC<LevelDashboardProps> = ({ levels, progress, onSelectLevel }) => {
    
    const getLevelStatus = (level: Level, index: number): 'locked' | 'unlocked' | 'completed' => {
        if (progress[level.id]?.finalTestPassed) {
            return 'completed';
        }
        if (index === 0 && progress[level.id]) {
            return 'unlocked';
        }
        if (index > 0) {
            const prevLevel = levels[index - 1];
            if (progress[prevLevel.id]?.finalTestPassed && progress[level.id]) {
                return 'unlocked';
            }
        }
        return 'locked';
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cambridge-dark mb-2">Your Learning Path</h2>
            <p className="text-lg text-black mb-8">Complete each level to unlock the next. Good luck!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {levels.map((level, index) => (
                    <LevelCard 
                        key={level.id}
                        level={level}
                        status={getLevelStatus(level, index)}
                        onClick={() => onSelectLevel(level)}
                    />
                ))}
            </div>
        </div>
    );
};

export default LevelDashboard;