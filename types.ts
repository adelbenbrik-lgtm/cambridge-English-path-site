
export interface Module {
    id: string;
    name: string;
    description: string;
}

export interface Level {
    id: string;
    name: string;
    cefr: string;
    modules: Module[];
    color: string;
}

export interface Progress {
    [levelId: string]: {
        modules: {
            [moduleId: string]: boolean;
        };
        finalTestPassed: boolean;
    };
}

export enum View {
    Dashboard = 'DASHBOARD',
    Level = 'LEVEL',
    Module = 'MODULE',
    Test = 'TEST',
}

export interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}
