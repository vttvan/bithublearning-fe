import type { CourseDetail } from "@/types/course";
import { coursesMock } from "./courses.mock";

/**
 * Detailed course data — extends each course from coursesMock
 * with curriculum, overview, pricing, and inclusions.
 */
export const courseDetailsMock: CourseDetail[] = coursesMock.map((course) => ({
    ...course,
    ...getCourseExtras(course.id),
}));

/** Look up detail by id */
export function getCourseDetailById(id: string): CourseDetail | undefined {
    return courseDetailsMock.find((c) => c.id === id);
}

/* ─── Per-course detail data ─── */
function getCourseExtras(id: string): Omit<CourseDetail, keyof typeof coursesMock[0]> {
    const extras: Record<string, Omit<CourseDetail, keyof typeof coursesMock[0]>> = {
        c1: {
            subtitle: "ADVANCED PROGRAMMING",
            description:
                "Nắm vững kiến thức full-stack từ frontend đến backend. Khóa học bao gồm React, Node.js, database design và deployment strategies cho ứng dụng thực tế.",
            originalPrice: 2400000,
            discountPercent: 50,
            enrolledStudents: 1248,
            instructorAvatar: "https://i.pravatar.cc/80?u=dr-nguyen",
            previewVideoThumb:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
            overview:
                "Khóa học Full-stack Pro giúp bạn xây dựng ứng dụng web hoàn chỉnh từ đầu đến cuối. Bạn sẽ học cách thiết kế API, quản lý state, tối ưu performance và deploy lên cloud.",
            learningPoints: [
                "Xây dựng REST API với Node.js & Express",
                "Thiết kế database schema hiệu quả",
                "Frontend với React, hooks & state management",
                "Deploy ứng dụng lên AWS/Vercel",
            ],
            curriculum: [
                {
                    id: "m1",
                    title: "Module 1: Nền tảng Web Development",
                    lessons: [
                        { id: "l1", title: "Tổng quan về Full-stack", duration: "12:30" },
                        { id: "l2", title: "Thiết lập môi trường phát triển", duration: "08:15" },
                        { id: "l3", title: "HTML/CSS nâng cao", duration: "15:40" },
                        { id: "l4", title: "JavaScript ES6+ essentials", duration: "18:20" },
                    ],
                },
                {
                    id: "m2",
                    title: "Module 2: React Frontend",
                    lessons: [
                        { id: "l5", title: "React Components & JSX", duration: "14:10" },
                        { id: "l6", title: "Hooks: useState, useEffect", duration: "16:50" },
                        { id: "l7", title: "React Router & Navigation", duration: "11:30" },
                    ],
                },
                {
                    id: "m3",
                    title: "Module 3: Backend với Node.js",
                    lessons: [
                        { id: "l8", title: "Express.js setup & routing", duration: "13:00" },
                        { id: "l9", title: "Database với MongoDB", duration: "17:25" },
                        { id: "l10", title: "Authentication & JWT", duration: "15:10" },
                    ],
                },
            ],
            includes: {
                hoursVideo: 22,
                downloadableResources: 15,
                lifetimeAccess: true,
                mobileAccess: true,
                certificate: true,
            },
            totalModules: 3,
            totalLessons: 10,
            totalDuration: "22h Total",
        },
        c2: {
            subtitle: "DATA ANALYSIS",
            description:
                "Học phân tích dữ liệu doanh nghiệp với Python, SQL và các công cụ BI hiện đại. Áp dụng ngay vào bài toán thực tế.",
            originalPrice: 4500000,
            discountPercent: 44,
            enrolledStudents: 890,
            instructorAvatar: "https://i.pravatar.cc/80?u=sarah-parker",
            previewVideoThumb:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            overview:
                "Khóa học cung cấp kỹ năng phân tích dữ liệu chuyên sâu, từ thu thập, làm sạch đến trực quan hóa và đưa ra insight cho doanh nghiệp.",
            learningPoints: [
                "Thu thập và làm sạch dữ liệu với Python",
                "SQL nâng cao cho phân tích",
                "Trực quan hóa với Power BI / Tableau",
                "Xây dựng dashboard báo cáo tự động",
            ],
            curriculum: [
                {
                    id: "m1",
                    title: "Module 1: Cơ bản về Data Analysis",
                    lessons: [
                        { id: "l1", title: "Giới thiệu Data Analysis", duration: "10:00" },
                        { id: "l2", title: "Python cơ bản cho phân tích", duration: "14:30" },
                        { id: "l3", title: "Pandas & NumPy essentials", duration: "18:00" },
                    ],
                },
                {
                    id: "m2",
                    title: "Module 2: SQL & Database",
                    lessons: [
                        { id: "l4", title: "SQL queries cơ bản đến nâng cao", duration: "16:40" },
                        { id: "l5", title: "Joins, subqueries & CTEs", duration: "14:20" },
                    ],
                },
                {
                    id: "m3",
                    title: "Module 3: Visualization & Reporting",
                    lessons: [
                        { id: "l6", title: "Power BI fundamentals", duration: "15:00" },
                        { id: "l7", title: "Xây dựng dashboard thực tế", duration: "20:15" },
                    ],
                },
            ],
            includes: {
                hoursVideo: 28,
                downloadableResources: 20,
                lifetimeAccess: true,
                mobileAccess: true,
                certificate: true,
            },
            totalModules: 3,
            totalLessons: 7,
            totalDuration: "28h Total",
        },
        c3: {
            subtitle: "ADVANCED ENGINEERING",
            description:
                "Master the Theory of Inventive Problem Solving (TRIZ) to overcome psychological inertia and solve complex technical contradictions using 40 fundamental principles.",
            originalPrice: 4490000,
            discountPercent: 60,
            enrolledStudents: 1248,
            instructorAvatar: "https://i.pravatar.cc/80?u=elena-petrova",
            previewVideoThumb:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            overview:
                "TRIZ is not just a methodology, it's a rigorous mental framework developed by Genrich Altshuller after analyzing thousands of patents. This course provides a systematic path from understanding the \"ideality\" of a system to implementing the \"40 Inventive Principles\" in real-world engineering challenges.",
            learningPoints: [
                "Identify and resolve technical contradictions",
                "Master the Law of Ideality in system design",
                "Utilize Substance-Field (Su-Field) Analysis",
                "Apply the 40 Principles to software architecture",
            ],
            curriculum: [
                {
                    id: "m1",
                    title: "Module 1: Introduction to Systematic Innovation",
                    lessons: [
                        { id: "l1", title: "The History and Evolution of TRIZ", duration: "11:40" },
                        { id: "l2", title: "Psychological Inertia and How to Overcome It", duration: "9:15" },
                        { id: "l3", title: "The Concept of Ideality", duration: "13:20" },
                        { id: "l4", title: "Levels of Innovation", duration: "10:05" },
                    ],
                },
                {
                    id: "m2",
                    title: "Module 2: The 40 Inventive Principles",
                    lessons: [
                        { id: "l5", title: "Principles 1-10: Segmentation to Prior Action", duration: "18:30" },
                        { id: "l6", title: "Principles 11-20: Beforehand Cushioning to Continuity", duration: "17:45" },
                        { id: "l7", title: "Principles 21-30: Skipping to Porous Materials", duration: "16:20" },
                        { id: "l8", title: "Principles 31-40: Color Changes to Composites", duration: "15:10" },
                    ],
                },
                {
                    id: "m3",
                    title: "Module 3: Contradiction Matrix & Su-Field Analysis",
                    lessons: [
                        { id: "l9", title: "Technical vs Physical Contradictions", duration: "14:00" },
                        { id: "l10", title: "Building the Contradiction Matrix", duration: "16:30" },
                        { id: "l11", title: "Su-Field Modeling basics", duration: "12:45" },
                        { id: "l12", title: "76 Standard Solutions overview", duration: "18:00" },
                    ],
                },
                {
                    id: "m4",
                    title: "Module 4: Standards & Laws of Evolution",
                    lessons: [
                        { id: "l13", title: "The 8 Laws of Technical System Evolution", duration: "25:00" },
                        { id: "l14", title: "ARIZ: The Algorithm for Inventive Problem Solving", duration: "45:20" },
                        { id: "l15", title: "Case Studies: Aerospace & Automotive", duration: "32:00" },
                    ],
                },
                {
                    id: "m5",
                    title: "Module 5: TRIZ for Software Architecture",
                    lessons: [
                        { id: "l16", title: "Applying Inventive Principles to Code", duration: "15:40" },
                        { id: "l17", title: "Resolving Performance vs Scalability Contradictions", duration: "22:15" },
                        { id: "l18", title: "Final Project Overview", duration: "10:00" },
                    ],
                },
            ],
            includes: {
                hoursVideo: 35,
                downloadableResources: 25,
                lifetimeAccess: true,
                mobileAccess: true,
                certificate: true,
            },
            totalModules: 5,
            totalLessons: 18,
            totalDuration: "35h Total",
        },
    };

    // Default extras for courses without specific detail
    const defaultExtras: Omit<CourseDetail, keyof typeof coursesMock[0]> = {
        subtitle: "PROFESSIONAL COURSE",
        description: "Khóa học chuyên nghiệp với nội dung bài bản, được thiết kế bởi chuyên gia hàng đầu trong ngành.",
        originalPrice: 0,
        discountPercent: 0,
        enrolledStudents: 500,
        instructorAvatar: "https://i.pravatar.cc/80?u=default",
        previewVideoThumb:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        overview:
            "Khóa học cung cấp kiến thức chuyên sâu và thực hành giúp bạn nắm vững kỹ năng cần thiết cho công việc chuyên nghiệp.",
        learningPoints: [
            "Nắm vững kiến thức nền tảng",
            "Thực hành với dự án thực tế",
            "Học từ chuyên gia trong ngành",
            "Nhận chứng chỉ hoàn thành",
        ],
        curriculum: [
            {
                id: "m1",
                title: "Module 1: Giới thiệu khóa học",
                lessons: [
                    { id: "l1", title: "Tổng quan nội dung", duration: "10:00" },
                    { id: "l2", title: "Thiết lập môi trường học tập", duration: "08:00" },
                    { id: "l3", title: "Mục tiêu và lộ trình", duration: "06:30" },
                ],
            },
            {
                id: "m2",
                title: "Module 2: Kiến thức cốt lõi",
                lessons: [
                    { id: "l4", title: "Lý thuyết cơ bản", duration: "15:00" },
                    { id: "l5", title: "Bài tập thực hành", duration: "20:00" },
                    { id: "l6", title: "Case study thực tế", duration: "18:00" },
                ],
            },
            {
                id: "m3",
                title: "Module 3: Ứng dụng nâng cao",
                lessons: [
                    { id: "l7", title: "Kỹ thuật nâng cao", duration: "16:00" },
                    { id: "l8", title: "Dự án cuối khóa", duration: "25:00" },
                ],
            },
        ],
        includes: {
            hoursVideo: 18,
            downloadableResources: 10,
            lifetimeAccess: true,
            mobileAccess: true,
            certificate: true,
        },
        totalModules: 3,
        totalLessons: 8,
        totalDuration: "18h Total",
    };

    return extras[id] ?? defaultExtras;
}
