import type { Course, CourseCategory } from "@/types/course";

/* ─── Category definitions ─── */
const CATEGORIES: Record<string, CourseCategory> = {
    programming: {
        id: "programming",
        label: "LẬP TRÌNH",
        color: "bg-amber-600",
        textColor: "text-white",
    },
    dataScience: {
        id: "data-science",
        label: "KHOA HỌC DỮ LIỆU",
        color: "bg-teal-700",
        textColor: "text-white",
    },
    innovation: {
        id: "innovation",
        label: "SỰ ĐỔI MỚI",
        color: "bg-orange-500",
        textColor: "text-white",
    },
    architecture: {
        id: "architecture",
        label: "KIẾN ​​TRÚC",
        color: "bg-yellow-500",
        textColor: "text-gray-900",
    },
    business: {
        id: "business",
        label: "DOANH NGHIỆP",
        color: "bg-emerald-600",
        textColor: "text-white",
    },
    ai: {
        id: "ai",
        label: "AI",
        color: "bg-indigo-600",
        textColor: "text-white",
    },
    softSkills: {
        id: "soft-skills",
        label: "KỸ NĂNG MỀM",
        color: "bg-rose-600",
        textColor: "text-white",
    },
};

/* ─── Mock courses ─── */
export const coursesMock: Course[] = [
    {
        id: "c1",
        title: "Kỹ thuật Full-stack Pro",
        instructor: "Dr. Nguyen Minh",
        rating: 4.8,
        reviewCount: 1240,
        price: 1200000,
        image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.programming,
        level: "Intermediate",
    },
    {
        id: "c2",
        title: "Phân tích dữ liệu doanh nghiệp",
        instructor: "Sarah Parker, Ph.D",
        rating: 4.9,
        reviewCount: 890,
        price: 2500000,
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.dataScience,
        level: "Advanced",
    },
    {
        id: "c3",
        title: "Hệ thống Đổi mới sáng tạo TRIZ",
        instructor: "Master Le Van Toan",
        rating: 5.0,
        reviewCount: 640,
        price: 1800000,
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.innovation,
        level: "Advanced",
    },
    {
        id: "c4",
        title: "System Design for Scalability",
        instructor: "Eng. Tran Duc",
        rating: 4.7,
        reviewCount: 2100,
        price: 3200000,
        image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.architecture,
        level: "Advanced",
    },
    {
        id: "c5",
        title: "Quản trị dự án Agile",
        instructor: "Mike Johnson, PMP",
        rating: 4.6,
        reviewCount: 1560,
        price: 1500000,
        image:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.business,
        level: "Intermediate",
    },
    {
        id: "c6",
        title: "Generative AI for Professionals",
        instructor: "AI Institute Global",
        rating: 4.9,
        reviewCount: 4300,
        price: 0,
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.ai,
        level: "Beginner",
    },
    {
        id: "c7",
        title: "React & TypeScript Mastery",
        instructor: "Nguyen Hoang Anh",
        rating: 4.8,
        reviewCount: 3200,
        price: 1900000,
        image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.programming,
        level: "Intermediate",
    },
    {
        id: "c8",
        title: "Machine Learning cơ bản",
        instructor: "Prof. Tran Quoc Bao",
        rating: 4.7,
        reviewCount: 1800,
        price: 2200000,
        image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.ai,
        level: "Beginner",
    },
    {
        id: "c9",
        title: "Kỹ năng giao tiếp chuyên nghiệp",
        instructor: "Coach Minh Thu",
        rating: 4.5,
        reviewCount: 920,
        price: 800000,
        image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.softSkills,
        level: "Beginner",
    },
    {
        id: "c10",
        title: "DevOps & CI/CD Pipeline",
        instructor: "Le Thanh Son",
        rating: 4.6,
        reviewCount: 1100,
        price: 2800000,
        image:
            "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.programming,
        level: "Advanced",
    },
    {
        id: "c11",
        title: "Data Visualization với Python",
        instructor: "Dr. Pham Ngoc Lan",
        rating: 4.8,
        reviewCount: 760,
        price: 1600000,
        image:
            "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.dataScience,
        level: "Intermediate",
    },
    {
        id: "c12",
        title: "Leadership & Team Building",
        instructor: "MBA Vo Thi Hanh",
        rating: 4.4,
        reviewCount: 530,
        price: 1000000,
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80",
        category: CATEGORIES.business,
        level: "Beginner",
    },
];
