import type { AchievementsPageData } from "../types/achievements";

export const achievementsMock: AchievementsPageData = {
  title: "Hồ sơ học tập",
  subtitle:
    "Hành trình TRIZ và đổi mới có hệ thống của bạn, được lưu lại cho sự nghiệp.",
  stats: [
    {
      id: "stat-1",
      value: "428 giờ",
      label: "Thời gian học tập trung",
      supportingText: "Lộ trình cấp tiếp theo | còn 72 giờ",
      icon: "clock",
    },
    {
      id: "stat-2",
      value: "12",
      label: "Khóa học đã hoàn thành",
      supportingText: "Trên các lộ trình kỹ thuật và đổi mới",
      icon: "graduation",
    },
    {
      id: "stat-3",
      value: "98.4%",
      label: "Điểm quiz trung bình",
      supportingText: "Duy trì năng lực tốt qua các dự án cuối khóa",
      icon: "star",
    },
  ],
  badges: [
    { id: "badge-1", label: "Học nhanh", icon: "trophy", active: true },
    { id: "badge-2", label: "Code gọn", icon: "code", active: true },
    { id: "badge-3", label: "Bậc thầy TRIZ", icon: "shield", active: true },
    { id: "badge-4", label: "Thành tích cao", icon: "medal", active: false },
    { id: "badge-5", label: "Cố vấn lab", icon: "trophy", active: true },
    { id: "badge-6", label: "Khám phá AI", icon: "sparkles", active: true },
  ],
  milestone: {
    title: "Cột mốc tiếp theo",
    description:
      "Hoàn thành thêm hai workshop nâng cao và nộp một case study cuối khóa để mở khóa danh hiệu Chuyên gia giải quyết vấn đề.",
    actionLabel: "Cần thêm 4 điểm XP",
  },
  certificates: [
    {
      id: "certificate-1",
      category: "CHỨNG NHẬN NÂNG CAO",
      title: "Đổi mới có hệ thống và TRIZ",
      issuedAt: "Cấp ngày 24/10/2023",
      certificateId: "ID BH-092-TR",
      previewImage:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      downloadLabel: "Tải PDF",
      verifyLabel: "Xác minh chứng chỉ",
    },
    {
      id: "certificate-2",
      category: "LỘ TRÌNH KHÓA HỌC",
      title: "Kỹ thuật FullStack JavaScript",
      issuedAt: "Cấp ngày 12/08/2023",
      certificateId: "ID BH-104-JS",
      previewImage:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      downloadLabel: "Tải PDF",
      verifyLabel: "Xác minh chứng chỉ",
    },
    {
      id: "certificate-3",
      category: "CHUYÊN NGÀNH",
      title: "Thiết kế thuật toán phức tạp",
      issuedAt: "Cấp ngày 05/06/2023",
      certificateId: "ID BH-442-AD",
      previewImage:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
      downloadLabel: "Tải PDF",
      verifyLabel: "Xác minh chứng chỉ",
    },
  ],
  archiveLabel: "Kho lưu trữ năm 2023",
};
