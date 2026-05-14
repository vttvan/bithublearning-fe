export type CourseCategory = {
    id: string;
    label: string;
    color: string; // tailwind bg class
    textColor: string; // tailwind text class
};

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
    id: string;
    title: string;
    instructor: string;
    rating: number;
    reviewCount: number;
    /** Price in VND — 0 means free ("Miễn phí") */
    price: number;
    image: string;
    category: CourseCategory;
    level: CourseLevel;
};

/* ─── Detail page types ─── */

export type CourseLesson = {
    id: string;
    title: string;
    duration: string; // e.g. "11:40"
};

export type CourseModule = {
    id: string;
    title: string;
    lessons: CourseLesson[];
};

export type CourseIncludes = {
    hoursVideo: number;
    downloadableResources: number;
    lifetimeAccess: boolean;
    mobileAccess: boolean;
    certificate: boolean;
};

export type CourseDetail = Course & {
    subtitle: string;
    description: string;
    /** Original price before discount */
    originalPrice: number;
    /** Discount percentage, 0 = no discount */
    discountPercent: number;
    enrolledStudents: number;
    instructorAvatar: string;
    previewVideoThumb: string;
    overview: string;
    learningPoints: string[];
    curriculum: CourseModule[];
    includes: CourseIncludes;
    totalModules: number;
    totalLessons: number;
    totalDuration: string;
};
