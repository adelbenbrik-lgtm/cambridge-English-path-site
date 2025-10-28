
import { Level } from './types';

const COMMON_MODULES = [
    { id: 'reading-writing', name: 'Reading & Writing', description: 'Develop your comprehension and composition skills.' },
    { id: 'listening', name: 'Listening', description: 'Improve your ability to understand spoken English.' },
    { id: 'speaking', name: 'Speaking', description: 'Practice your pronunciation and conversational skills.' },
    { id: 'vocabulary', name: 'Vocabulary', description: 'Expand your word knowledge.'},
    { id: 'grammar', name: 'Grammar', description: 'Master the rules of English structure.'},
];

const FINAL_TEST_MODULE = { id: 'final-test', name: 'Final Level Test', description: 'Pass this test to unlock the next level.' };

export const LEVELS: Level[] = [
    {
        id: 'starters',
        name: 'Starters',
        cefr: 'Pre-A1',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-red-500',
    },
    {
        id: 'movers',
        name: 'Movers',
        cefr: 'A1',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-orange-500',
    },
    {
        id: 'flyers',
        name: 'Flyers',
        cefr: 'A2',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-amber-500',
    },
    {
        id: 'ket',
        name: 'KET',
        cefr: 'A2',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-yellow-500',
    },
    {
        id: 'pet',
        name: 'PET',
        cefr: 'B1',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-lime-500',
    },
    {
        id: 'fce',
        name: 'FCE',
        cefr: 'B2',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-green-500',
    },
    {
        id: 'cae',
        name: 'CAE',
        cefr: 'C1',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-teal-500',
    },
    {
        id: 'cpe',
        name: 'CPE',
        cefr: 'C2',
        modules: [...COMMON_MODULES, FINAL_TEST_MODULE],
        color: 'bg-cyan-500',
    },
];
