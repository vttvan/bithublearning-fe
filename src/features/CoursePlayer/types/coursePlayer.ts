export type CoursePlayerTab = "overview" | "theory" | "code" | "quiz" | "resources";

export type CoursePlayerItemStatus = "completed" | "current" | "locked" | "available";

export interface CoursePlayerInstructor {
  name: string;
  role: string;
  avatar: string;
}

export interface CoursePlayerNavItem {
  id: string;
  title: string;
  duration?: string;
  status: CoursePlayerItemStatus;
}

export interface CoursePlayerChapter {
  id: string;
  title: string;
  subtitle: string;
  items: CoursePlayerNavItem[];
}

export interface CoursePlayerTranscriptItem {
  id: string;
  time: string;
  content: string;
}

export interface CoursePlayerAsset {
  id: string;
  label: string;
  size: string;
}

export interface CoursePlayerTheoryLesson extends CoursePlayerNavItem {
  videoUrl?: string;
  thumbnail: string;
  progressPercent: number;
  previousTitle?: string;
  nextTitle?: string;
  transcript: CoursePlayerTranscriptItem[];
  assets: CoursePlayerAsset[];
}

export interface CoursePlayerCodeExample {
  id: string;
  input: string;
  output: string;
}

export interface CoursePlayerCodeTestCase {
  id: number;
  text: string;
  expected: string;
  got: string;
  status: "pass" | "fail";
}

export interface CoursePlayerCodeExercise extends CoursePlayerNavItem {
  label: string;
  description: string;
  problemStatement: string;
  functionName: string;
  constraints: string[];
  examples: CoursePlayerCodeExample[];
  starterCode: string;
  testCases: CoursePlayerCodeTestCase[];
  image: string;
}

export interface CoursePlayerQuizQuestion {
  id: number;
  type: "multiple-choice";
  text: string;
  options: string[];
  selectedOptionIndex?: number;
}

export interface CoursePlayerQuiz extends CoursePlayerNavItem {
  category: string;
  totalQuestions: number;
  solvedQuestions: number;
  timeLimitSeconds: number;
  currentQuestionNumber: number;
  questions: CoursePlayerQuizQuestion[];
}

export interface CoursePlayerPageData {
  id: string;
  title: string;
  module: string;
  instructor: CoursePlayerInstructor;
  navigation: {
    theory: CoursePlayerChapter[];
    code: CoursePlayerChapter[];
    quiz: CoursePlayerChapter[];
  };
  theoryLessons: Record<string, CoursePlayerTheoryLesson>;
  codeExercises: Record<string, CoursePlayerCodeExercise>;
  quizzes: Record<string, CoursePlayerQuiz>;
}
