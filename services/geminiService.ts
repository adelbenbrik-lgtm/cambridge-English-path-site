
import { GoogleGenAI, Type } from '@google/genai';
import { Question } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonContent = async (levelName: string, moduleName: string): Promise<string> => {
    try {
        const prompt = `Act as an expert English language teacher following the Cambridge curriculum. Generate a concise and engaging lesson for the '${moduleName}' module of the '${levelName}' level. The content should be suitable for learners at this stage. Use Markdown for formatting, including headings, subheadings, lists, and bold text to make it easy to read.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating lesson content:", error);
        return "Failed to generate lesson content. Please check your API key and try again.";
    }
};

export const generateTestQuestions = async (levelName: string, moduleName: string): Promise<Question[]> => {
    try {
        const prompt = `Act as a Cambridge English exam creator. Generate 5 multiple-choice quiz questions to test the '${moduleName}' module for the '${levelName}' level. Provide 4 options for each question, with only one correct answer. Ensure the questions are appropriate for the specified CEFR level.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "The question text." },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "An array of 4 possible answers."
                            },
                            correctAnswer: { type: Type.STRING, description: "The correct answer from the options array." }
                        },
                        required: ['question', 'options', 'correctAnswer']
                    }
                }
            }
        });

        const jsonText = response.text;
        const questions = JSON.parse(jsonText);
        
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("API returned an empty or invalid array of questions.");
        }
        
        return questions as Question[];

    } catch (error) {
        console.error("Error generating test questions:", error);
        throw new Error("Failed to generate test questions. The format from the API might be incorrect.");
    }
};
