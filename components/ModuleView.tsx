
import React, { useState, useEffect } from 'react';
import { Level, Module } from '../types';
import { generateLessonContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

// Make marked available from the window object
declare global {
    interface Window {
        marked: any;
    }
}

interface ModuleViewProps {
    level: Level;
    module: Module;
    onStartTest: (level: Level, module: Module) => void;
    onBack: () => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ level, module, onStartTest, onBack }) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const lessonContent = await generateLessonContent(level.name, module.name);
                setContent(lessonContent);
            } catch (err) {
                setError('Failed to load lesson. Please try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [level, module]);
    
    const createMarkup = (markdown: string) => {
        if (window.marked) {
            return { __html: window.marked.parse(markdown) };
        }
        return { __html: markdown.replace(/\n/g, '<br />') }; // Fallback
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
             <button onClick={onBack} className="mb-6 text-cambridge-blue hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Modules
            </button>
            <h2 className="text-3xl font-bold text-cambridge-dark mb-2">{module.name}</h2>
            <p className="text-lg text-gray-500 mb-6">Lesson for {level.name} ({level.cefr})</p>

            <div className="border-t border-gray-200 pt-6">
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}
                {!isLoading && !error && (
                     <div className="prose max-w-none" dangerouslySetInnerHTML={createMarkup(content)} />
                )}
            </div>
            
            {!isLoading && !error && (
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => onStartTest(level, module)}
                        className="bg-cambridge-blue text-white font-bold py-3 px-8 rounded-full hover:bg-cambridge-dark transition-colors text-lg"
                    >
                        {module.id === 'final-test' ? 'Start Final Test' : 'Take Module Test'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ModuleView;
