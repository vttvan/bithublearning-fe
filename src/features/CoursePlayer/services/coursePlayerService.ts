import { coursePlayerContentMock } from "../mocks/coursePlayer.mock";

export const coursePlayerService = {
    getCourseContent: async (id: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return coursePlayerContentMock;
    },

    getLessonDetails: async (lessonId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return coursePlayerContentMock.currentLesson;
    },

    getQuizDetails: async (quizId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return coursePlayerContentMock.quiz;
    },

    getExerciseDetails: async (exerciseId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return coursePlayerContentMock.exercise;
    }
};
