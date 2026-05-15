import type {
  CoursePlayerCodeExercise,
  CoursePlayerPageData,
  CoursePlayerQuiz,
  CoursePlayerTheoryLesson,
} from "../types/coursePlayer";

const transcript = Array.from({ length: 10 }).map((_, index) => ({
  id: `tr-${index + 1}`,
  time: `0${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`,
  content:
    index % 2 === 0
      ? "Trong phần này, chúng ta phân tích cách áp dụng TRIZ vào bài toán kỹ thuật phần mềm thực tế, từ nhận diện mâu thuẫn đến chọn nguyên tắc xử lý phù hợp."
      : "Khi hệ thống tăng tải, cách chia nhỏ vấn đề và thiết kế luồng dữ liệu quyết định trực tiếp đến khả năng mở rộng của sản phẩm.",
}));

export const coursePlayerContentMock: CoursePlayerPageData = {
  id: "1",
  title: "Full-Stack Engineering",
  module: "Chương 3: Systematic Innovation",
  instructor: {
    name: "Dr. Alex Rivers",
    role: "Senior Engineer @ SBank",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  navigation: {
    theory: [
      {
        id: "chapter-theory-1",
        title: "Chương 1: Nền tảng tư duy hệ thống",
        subtitle: "3 bài học • 52 phút",
        items: [
          { id: "theory-1", title: "Giới thiệu Systematic Innovation", duration: "12:45", status: "completed" },
          { id: "theory-2", title: "Problem Framing trong kỹ thuật", duration: "18:20", status: "completed" },
          { id: "theory-3", title: "Array Manipulation in Systemic Innovation", duration: "21:10", status: "current" },
        ],
      },
      {
        id: "chapter-theory-2",
        title: "Chương 2: Thiết kế luồng xử lý",
        subtitle: "2 bài học • 41 phút",
        items: [
          { id: "theory-4", title: "Logical Flows và decision points", duration: "19:30", status: "available" },
          { id: "theory-5", title: "Tối ưu pipeline dữ liệu", duration: "21:40", status: "available" },
        ],
      },
    ],
    code: [
      {
        id: "chapter-code-1",
        title: "Chương 1: Algorithm Warm-up",
        subtitle: "2 bài tập",
        items: [
          { id: "code-1", title: "Maximum Element Detection", status: "current" },
          { id: "code-2", title: "Normalize Transaction Stream", status: "available" },
        ],
      },
      {
        id: "chapter-code-2",
        title: "Chương 2: Data Structure Practice",
        subtitle: "2 bài tập",
        items: [
          { id: "code-3", title: "Priority Queue Scheduler", status: "available" },
        ],
      },
    ],
    quiz: [
      {
        id: "chapter-quiz-1",
        title: "Chương 1: Kiểm tra nền tảng",
        subtitle: "2 bài kiểm tra",
        items: [
          { id: "quiz-1", title: "Math Basics Assessment", duration: "10 phút", status: "completed" },
          { id: "quiz-2", title: "Logic and Flow Quiz", duration: "15 phút", status: "current" },
        ],
      },
      {
        id: "chapter-quiz-2",
        title: "Chương 2: Kiểm tra chuyên sâu",
        subtitle: "1 bài kiểm tra",
        items: [
          { id: "quiz-3", title: "System Design Review", duration: "20 phút", status: "available" },
        ],
      },
    ],
  },
  theoryLessons: {
    "theory-1": createTheoryLesson("theory-1", "Giới thiệu Systematic Innovation", 100),
    "theory-2": createTheoryLesson("theory-2", "Problem Framing trong kỹ thuật", 100),
    "theory-3": createTheoryLesson("theory-3", "Array Manipulation in Systemic Innovation", 60),
    "theory-4": createTheoryLesson("theory-4", "Logical Flows và decision points", 0),
    "theory-5": createTheoryLesson("theory-5", "Tối ưu pipeline dữ liệu", 0),
  },
  codeExercises: {
    "code-1": createCodeExercise("code-1", "Maximum Element Detection", "Exercise 4.2"),
    "code-2": createCodeExercise("code-2", "Normalize Transaction Stream", "Exercise 4.3"),
    "code-3": createCodeExercise("code-3", "Priority Queue Scheduler", "Exercise 5.1"),
    "code-4": createCodeExercise("code-4", "Trie Search Optimizer", "Exercise 5.2"),
  },
  quizzes: {
    "quiz-1": createQuiz("quiz-1", "Math Basics Assessment", 10, 10),
    "quiz-2": createQuiz("quiz-2", "Logic and Flow Quiz", 20, 4),
    "quiz-3": createQuiz("quiz-3", "System Design Review", 25, 1),
  },
};

function createTheoryLesson(
  id: string,
  title: string,
  progressPercent: number,
): CoursePlayerTheoryLesson {
  return {
    id,
    title,
    duration: "21:10",
    status: progressPercent === 100 ? "completed" : progressPercent > 0 ? "current" : "available",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1631&auto=format&fit=crop",
    progressPercent,
    previousTitle: "Problem Framing",
    nextTitle: "Logical Flows",
    transcript,
    assets: [
      { id: "asset-1", label: "Lesson_Notes_Module3.pdf", size: "2.4 MB" },
      { id: "asset-2", label: "Array_Practice_Sheet.xlsx", size: "1.1 MB" },
    ],
  };
}

function createCodeExercise(id: string, title: string, label: string): CoursePlayerCodeExercise {
  return {
    id,
    title,
    label,
    status: id === "code-1" ? "current" : "available",
    description:
      "Systematic innovation in algorithms often requires efficient traversal of data structures. Your task is to implement a robust solution for a realistic engineering problem.",
    problemStatement:
      "Write a function findMaxElement(arr) that takes an array of integers and returns the maximum element. The solution must handle empty arrays by returning null.",
    functionName: "findMaxElement(arr)",
    constraints: ["0 <= arr.length <= 10^5", "-10^9 <= arr[i] <= 10^9", "Time Complexity requirement: O(n)"],
    examples: [
      { id: "ex-1", input: "[3, 7, 2, 9, 1]", output: "9" },
      { id: "ex-2", input: "[-10, -5, -20]", output: "-5" },
    ],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number|null}
 */
function findMaxElement(arr) {
  if (arr.length === 0) {
    return null;
  }

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}`,
    testCases: [
      { id: 1, text: "Test Case 1 Passed:", expected: "9", got: "9", status: "pass" },
      { id: 2, text: "Test Case 2 Passed:", expected: "-5", got: "-5", status: "pass" },
    ],
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop",
  };
}

function createQuiz(
  id: string,
  title: string,
  totalQuestions: number,
  currentQuestionNumber: number,
): CoursePlayerQuiz {
  return {
    id,
    title,
    category: "Systematic Innovation",
    status: id === "quiz-2" ? "current" : "available",
    totalQuestions,
    solvedQuestions: Math.max(currentQuestionNumber - 1, 0),
    timeLimitSeconds: 900,
    currentQuestionNumber,
    questions: [
      {
        id: currentQuestionNumber,
        type: "multiple-choice",
        selectedOptionIndex: 1,
        text:
          'In the context of TRIZ-based systematic innovation, which principle is most effectively applied when resolving a technical contradiction between "Weight of Moving Object" and "Strength"?',
        options: [
          "Principle 1: Segmentation - Divide an object into independent parts.",
          "Principle 40: Composite Materials - Change from uniform to composite structures to reduce weight while maintaining high tensile strength.",
          "Principle 10: Prior Action - Perform the required change of an object in full or in part before it is needed.",
          "Principle 15: Dynamicity - Allow the characteristics of an object to change to be optimal at each stage of an operation.",
        ],
      },
    ],
  };
}
