import type { MyCoursesPageData } from "../types/myCourses";

export const myCoursesMock: MyCoursesPageData = {
  title: "Khóa học đã tham gia",
  subtitle: "Tiếp tục hành trình đổi mới có hệ thống của bạn.",
  filters: [
    { id: "filter-1", label: "Tất cả", value: "all" },
    { id: "filter-2", label: "Đang học", value: "in-progress" },
    { id: "filter-3", label: "Đã hoàn thành", value: "completed" },
  ],
  courses: [
    {
      id: "1",
      levelTag: "TRIZ CẤP ĐỘ 1",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      title: "Kỹ thuật Hệ thống & Giải quyết vấn đề sáng tạo",
      category: "GIẢNG VIÊN: TS. NGUYỄN VĂN A",
      currentLessonLabel: "Buổi 4 • Tối ưu hóa hiệu năng",
      progressPercent: 55,
      progressLabel: "11/20 bài đã xong",
      actionLabel: "Tiếp tục học",
      status: "in-progress",
    },
    {
      id: "2",
      levelTag: "DỮ LIỆU",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      title: "Cấu trúc dữ liệu và Giải thuật (Nâng cao)",
      category: "GIẢNG VIÊN: GS. TRẦN THỊ B",
      currentLessonLabel: "Hoàn thành bài kiểm tra cuối khóa",
      progressPercent: 100,
      progressLabel: "45/45 bài đã xong",
      actionLabel: "Xem chứng chỉ",
      status: "completed",
    },
    {
      id: "3",
      levelTag: "PHẦN CỨNG",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      title: "Thiết kế vi mạch & Kiến trúc máy tính",
      category: "GIẢNG VIÊN: TS. LÊ HỒNG C",
      currentLessonLabel: "Chương 1 • Giới thiệu vi Logic số",
      progressPercent: 10,
      progressLabel: "2/40 bài đã xong",
      actionLabel: "Bắt đầu học",
      status: "in-progress",
    },
    {
      id: "4",
      levelTag: "KHOA HỌC DỮ LIỆU",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1200&auto=format&fit=crop",
      title: "Nền tảng trực quan hóa dữ liệu cho kỹ sư",
      category: "GIẢNG VIÊN: THS. PHẠM GIA D",
      currentLessonLabel: "Buổi 2 • Dashboard kể chuyện bằng dữ liệu",
      progressPercent: 32,
      progressLabel: "8/25 bài đã xong",
      actionLabel: "Tiếp tục học",
      status: "in-progress",
    },
  ],
};
