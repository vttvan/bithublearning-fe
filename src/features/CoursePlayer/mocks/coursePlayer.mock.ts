// Mocks for Course Player content

export const coursePlayerContentMock = {
    id: "1",
    title: "Full-Stack Engineering",
    module: "Module 3: Systematic Innovation",
    description: "Master modern systems engineering through the lens of systematic innovation and high-performance algorithms.",
    duration: "24 Hours",
    lessonsCount: 48,
    studentsCount: "1.2k",
    instructor: {
        name: "Dr. Alex Rivers",
        role: "Senior Engineer @ SBank",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    curriculum: [
        {
            title: "Module 1: Mathematical Foundations",
            duration: "4h 30m",
            lessons: [
                { id: "l1", type: "video", title: "Introduction to Algorithmic Logic", duration: "12:45" },
                { id: "l2", type: "video", title: "Linear Algebra for Engineers", duration: "45:00" },
                { id: "l3", type: "code", title: "Matrix Multiplication Exercise" },
                { id: "l4", type: "quiz", title: "Module 1 Assessment: Math Basics" },
            ]
        },
        {
            title: "Module 2: Advanced Data Structures",
            duration: "6h 15m",
            lessons: [
                { id: "l5", type: "video", title: "Heaps and Priority Queues", duration: "32:10" },
                { id: "l6", type: "video", title: "Trie Trees in Depth", duration: "28:50" },
                { id: "l7", type: "code", title: "Implement a Lisp Interpreter" },
                { id: "l8", type: "quiz", title: "Module 2 Assessment: Structures" },
            ]
        },
        {
            title: "Module 3: Systematic Innovation",
            duration: "5h 45m",
            lessons: [
                { id: "l9", type: "video", title: "The 40 Principles of TRIZ", duration: "40:00" },
                { id: "l10", type: "video", title: "Array Manipulation in Systemic Innovation", duration: "25:00" },
                { id: "l11", type: "code", title: "Maximum Element Detection" },
                { id: "l12", type: "quiz", title: "Module 3 Quiz: Logic and Flow" },
            ]
        }
    ],
    currentLesson: {
        id: "l10",
        title: "Array Manipulation in Systemic Innovation",
        videoUrl: "https://example.com/video.mp4",
        transcript: [
            { time: "00:12", text: "In this segment, we explore how systematic innovation (TRIZ) applies to data structure management. When handling large-scale arrays in real-time banking systems, the physical constraints often mirror engineering..." },
            { time: "01:45", text: "The principle of \"Segmentation\" allows us to break down complex problems into manageable sub-algorithms. Notice how the visual representation on screen demonstrates the recursive flow..." }
        ],
        assets: [
            { name: "Lesson_Notes_Module3.pdf", size: "2.4 MB" },
            { name: "Array_Practice_Sheet.xlsx", size: "1.1 MB" }
        ]
    },
    quiz: {
        id: "q3",
        title: "Module 3 Quiz: Logic and Flow",
        totalQuestions: 20,
        timeLimit: 900, // 15 mins
        questions: [
            {
                id: 4,
                type: "multiple-choice",
                text: "In the context of TRIZ-based systematic innovation, which principle is most effectively applied when resolving a technical contradiction between \"Weight of Moving Object\" and \"Strength\"?",
                options: [
                    "Principle 1: Segmentation – Divide an object into independent parts.",
                    "Principle 40: Composite Materials – Change from uniform to composite structures to reduce weight while maintaining high tensile strength.",
                    "Principle 10: Prior Action – Perform the required change of an object in full or in part before it is needed.",
                    "Principle 15: Dynamicity – Allow the characteristics of an object to change to be optimal at each stage of an operation."
                ]
            }
        ]
    },
    exercise: {
        id: "e4",
        title: "Maximum Element Detection",
        description: "Write a function findMaxElement(arr) that takes an array of integers and returns the maximum element. The solution must handle empty arrays by returning null.",
        starterCode: `/**
 * @param {number[]} arr
 * @return {number|null}
 */
function findMaxElement(arr) {
  // Your code here
}`,
        testCases: [
            { id: 1, text: "Test Case 1 Passed:", expected: "9", got: "9", status: "pass" },
            { id: 2, text: "Test Case 2 Passed:", expected: "-5", got: "-5", status: "pass" }
        ]
    }
};
