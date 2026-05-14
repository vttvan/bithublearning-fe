import type { DashboardOfflineCoursesData } from "../types/dashboardOfflineCourses";

export const dashboardOfflineCoursesMock: DashboardOfflineCoursesData = {
  enrolledWorkshops: [
    {
      id: "ws-1",
      category: "KỸ THUẬT",
      title: "TRIZ nâng cao cho kỹ sư",
      location: "Hanoi Hub - Khu 7",
      startDate: "02 Th11",
      endDate: "07 Th11, 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop",
      statusLabel: "Đang diễn ra",
      statusTone: "primary",
    },
    {
      id: "ws-2",
      category: "KIẾN TRÚC HỆ THỐNG",
      title: "Hệ thống backend có khả năng mở rộng",
      location: "Trung tâm Đổi mới Sài Gòn",
      startDate: "12 Th12",
      endDate: "15 Th12, 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
      statusLabel: "Sắp diễn ra",
      statusTone: "outline",
    },
  ],
  nextSession: {
    dayLabel: "02",
    monthLabel: "TH11",
    title: "Workshop TRIZ nâng cao",
    locationLabel: "Phòng 402, Hanoi Hub",
    timeLabel: "09:00 - 17:00",
    instructions: [
      "Mang theo laptop cá nhân đã cài phần mềm 'System 2.0'.",
      "Cần xuất trình thẻ định danh tại quầy lễ tân.",
    ],
  },
  resources: [
    {
      id: "resource-1",
      title: "Tài liệu đọc trước workshop.pdf",
      subtitle: "4.2 MB • BẮT BUỘC",
      icon: "file-text",
      action: "download",
    },
    {
      id: "resource-2",
      title: "TRIZ Toolset v4.zip",
      subtitle: "128 MB • PHẦN MỀM",
      icon: "file-archive",
      action: "download",
    },
    {
      id: "resource-3",
      title: "Sơ đồ khuôn viên Hanoi Hub",
      subtitle: "PNG • HẬU CẦN",
      icon: "map",
      action: "preview",
    },
  ],
};
