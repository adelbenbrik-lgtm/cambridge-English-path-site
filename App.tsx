
import React, { useState, useEffect, useCallback } from 'react';
import { Level, Module, Progress, View } from './types';
import { LEVELS } from './constants';
import Header from './components/Header';
import LevelDashboard from './components/LevelDashboard';
import LevelView from './components/LevelView';
import ModuleView from './components/ModuleView';
import TestView from './components/TestView';

const App: React.FC = () => {
    const [progress, setProgress] = useState<Progress>({});
    const [view, setView] = useState<View>(View.Dashboard);
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('cambridgePathProgress');
            if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
            } else {
                // Initialize first level
                const initialProgress: Progress = {};
                initialProgress[LEVELS[0].id] = { modules: {}, finalTestPassed: false };
                setProgress(initialProgress);
            }
        } catch (error) {
            console.error("Failed to load progress from localStorage", error);
        }
    }, []);

    const updateProgress = useCallback((levelId: string, moduleId: string) => {
        setProgress(prev => {
            const newProgress = { ...prev };
            if (!newProgress[levelId]) {
                newProgress[levelId] = { modules: {}, finalTestPassed: false };
            }
            newProgress[levelId].modules[moduleId] = true;

            const currentLevel = LEVELS.find(l => l.id === levelId);
            if (!currentLevel) return newProgress;

            const allModulesCompleted = currentLevel.modules.every(m => newProgress[levelId].modules[m.id]);

            if (moduleId === 'final-test' && allModulesCompleted) {
                newProgress[levelId].finalTestPassed = true;
                const currentLevelIndex = LEVELS.findIndex(l => l.id === levelId);
                if (currentLevelIndex < LEVELS.length - 1) {
                    const nextLevel = LEVELS[currentLevelIndex + 1];
                    if (!newProgress[nextLevel.id]) {
                        newProgress[nextLevel.id] = { modules: {}, finalTestPassed: false };
                    }
                }
            }
            
            localStorage.setItem('cambridgePathProgress', JSON.stringify(newProgress));
            return newProgress;
        });
    }, []);

    const handleSelectLevel = (level: Level) => {
        setSelectedLevel(level);
        setView(View.Level);
    };

    const handleSelectModule = (level: Level, module: Module) => {
        setSelectedLevel(level);
        setSelectedModule(module);
        setView(View.Module);
    };

    const handleStartTest = (level: Level, module: Module) => {
        setSelectedLevel(level);
        setSelectedModule(module);
        setView(View.Test);
    };

    const handleBackToDashboard = () => {
        setSelectedLevel(null);
        setSelectedModule(null);
        setView(View.Dashboard);
    };
    
    const handleBackToLevelView = () => {
        if (selectedLevel) {
           setView(View.Level);
           setSelectedModule(null);
        } else {
            handleBackToDashboard();
        }
    };

    const renderView = () => {
        switch (view) {
            case View.Level:
                return selectedLevel && <LevelView level={selectedLevel} progress={progress} onSelectModule={handleSelectModule} onBack={handleBackToDashboard} />;
            case View.Module:
                return selectedLevel && selectedModule && <ModuleView level={selectedLevel} module={selectedModule} onStartTest={handleStartTest} onBack={handleBackToLevelView} />;
            case View.Test:
                return selectedLevel && selectedModule && <TestView level={selectedLevel} module={selectedModule} onTestComplete={updateProgress} onBack={handleBackToLevelView} />;
            case View.Dashboard:
            default:
                return <LevelDashboard levels={LEVELS} progress={progress} onSelectLevel={handleSelectLevel} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header onHomeClick={handleBackToDashboard} />
            <main className="container mx-auto p-4 sm:p-6 md:p-8">
                {renderView()}
            </main>
        </div>
    );
};

export default App;
