
import React from 'react';
import { Level, Module, Progress } from '../types';
import ModuleCard from './ModuleCard';

interface LevelViewProps {
    level: Level;
    progress: Progress;
    onSelectModule: (level: Level, module: Module) => void;
    onBack: () => void;
}

const LevelView: React.FC<LevelViewProps> = ({ level, progress, onSelectModule, onBack }) => {
    
    const levelProgress = progress[level.id] || { modules: {}, finalTestPassed: false };

    const getModuleStatus = (module: Module, index: number): 'locked' | 'unlocked' | 'completed' => {
        if (levelProgress.modules[module.id]) {
            return 'completed';
        }

        if (module.id === 'final-test') {
            const allOtherModulesCompleted = level.modules
                .filter(m => m.id !== 'final-test')
                .every(m => levelProgress.modules[m.id]);
            return allOtherModulesCompleted ? 'unlocked' : 'locked';
        }

        if (index === 0) {
            return 'unlocked';
        }

        const prevModule = level.modules[index - 1];
        if (levelProgress.modules[prevModule.id]) {
            return 'unlocked';
        }

        return 'locked';
    };

    return (
        <div>
            <button onClick={onBack} className="mb-6 text-cambridge-blue hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
            </button>
            <div className="flex items-center mb-8">
                 <div className={`w-20 h-20 rounded-full ${level.color} flex items-center justify-center text-white font-bold text-3xl mr-6`}>
                    {level.cefr}
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-cambridge-dark">{level.name}</h2>
                    <p className="text-xl text-gray-600">Complete all modules to pass the level.</p>
                </div>
            </div>
            
            <div className="space-y-4">
                {level.modules.map((module, index) => (
                    <ModuleCard
                        key={module.id}
                        module={module}
                        status={getModuleStatus(module, index)}
                        onClick={() => onSelectModule(level, module)}
                    />
                ))}
            </div>
        </div>
    );
};

export default LevelView;
