export interface DashboardStats {
    certificatesEarned: number;
    quizAverage: number;
    studyHours: number;
}

export interface EnrolledCourse {
    id: string;
    title: string;
    category: string;
    image: string;
    progress: number;
    lessonsLeft: number;
}

export const dashboardStatsMock: DashboardStats = {
    certificatesEarned: 12,
    quizAverage: 92,
    studyHours: 148,
};

export const currentEnrolledCourseMock = {
    title: "Full-Stack Engineering: Chương 3",
    currentLesson: "Phương pháp đổi mới có hệ thống",
    progress: 68,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
};

export const enrolledCoursesMock: EnrolledCourse[] = [
    {
        id: "e1",
        title: "Làm chủ kiến ​​trúc Rust",
        category: "Programming",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
        progress: 45,
        lessonsLeft: 24,
    },
    {
        id: "e2",
        title: "Lãnh đạo dành cho kỹ sư",
        category: "Soft Skills",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        progress: 10,
        lessonsLeft: 12,
    },
    {
        id: "e3",
        title: "Các mẫu Python nâng cao",
        category: "Programming",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        progress: 90,
        lessonsLeft: 2,
    },
];
