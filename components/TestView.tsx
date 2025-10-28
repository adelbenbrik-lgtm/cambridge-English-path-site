
import React, { useState, useEffect } from 'react';
import { Level, Module, Question } from '../types';
import { generateTestQuestions } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface TestViewProps {
    level: Level;
    module: Module;
    onTestComplete: (levelId: string, moduleId: string) => void;
    onBack: () => void;
}

const TestView: React.FC<TestViewProps> = ({ level, module, onTestComplete, onBack }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const PASS_PERCENTAGE = 0.8;

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const testQuestions = await generateTestQuestions(level.name, module.name);
                setQuestions(testQuestions);
                setAnswers(new Array(testQuestions.length).fill(null));
            } catch (err) {
                setError('Failed to load the test. Please try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, [level, module]);

    const handleAnswerSelect = (option: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = option;
        setAnswers(newAnswers);
    };
    
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctAnswers++;
            }
        });
        const finalScore = correctAnswers / questions.length;
        setScore(finalScore);
        setShowResults(true);

        if (finalScore >= PASS_PERCENTAGE) {
            onTestComplete(level.id, module.id);
        }
    };
    
    if (isLoading) return <div className="text-center p-8"><LoadingSpinner /> <p className="mt-4 text-lg">Generating your test...</p></div>;
    if (error) return <p className="text-red-500 bg-red-100 p-4 rounded-md text-center">{error}</p>;

    if (showResults) {
        const passed = score >= PASS_PERCENTAGE;
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-lg mx-auto">
                <h2 className="text-3xl font-bold mb-4">Test Results</h2>
                <p className={`text-5xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.round(score * 100)}%
                </p>
                {passed ? (
                    <>
                        <p className="text-xl text-gray-700 mb-6">Congratulations! You've passed the {module.name} test.</p>
                        <button onClick={onBack} className="bg-cambridge-blue text-white font-bold py-3 px-8 rounded-full hover:bg-cambridge-dark transition-colors">
                            Continue Learning
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-xl text-gray-700 mb-6">You need {PASS_PERCENTAGE * 100}% to pass. Please review the material and try again.</p>
                        <button onClick={onBack} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors">
                            Back to Module
                        </button>
                    </>
                )}
            </div>
        );
    }
    
    if (questions.length === 0) return <p>No questions available for this test.</p>;

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-cambridge-dark mb-2">{module.name} Test</h2>
            <p className="text-gray-600 mb-6">Question {currentQuestionIndex + 1} of {questions.length}</p>
            
            <div className="border-t pt-6">
                <p className="text-xl font-semibold mb-6">{currentQuestion.question}</p>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                answers[currentQuestionIndex] === option
                                    ? 'bg-cambridge-blue border-cambridge-blue text-white'
                                    : 'bg-gray-100 border-gray-200 hover:border-cambridge-blue'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                {isLastQuestion ? (
                    <button 
                        onClick={handleSubmit}
                        disabled={answers[currentQuestionIndex] === null}
                        className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Finish Test
                    </button>
                ) : (
                    <button 
                        onClick={handleNext}
                        disabled={answers[currentQuestionIndex] === null}
                        className="bg-cambridge-blue text-white font-bold py-2 px-6 rounded-full hover:bg-cambridge-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default TestView;
