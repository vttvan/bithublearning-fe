import type {
  AdminCourseManagementData,
  AdminOverviewData,
  AdminReportsData,
  AdminNotificationsData,
  AdminUserDetailData,
  AdminUsersData,
  OfflineCourseEditorData,
  OnlineCourseEditorData,
} from "../types/adminDashboard";

export const adminOverviewMock: AdminOverviewData = {
  title: "Tổng quan hệ thống",
  subtitle: "Báo cáo thị trường, dữ liệu và nội dung mới nhất từ BitHub Academy.",
  metrics: [
    {
      id: "metric-1",
      label: "Người học đăng ký",
      value: "12,482",
      delta: "+8.4% thang nay",
      tone: "blue",
    },
    {
      id: "metric-2",
      label: "Doanh thu",
      value: "$842.0M",
      delta: "Mục tiêu 12B",
      tone: "green",
    },
    {
      id: "metric-3",
      label: "Khóa học đang hoạt động",
      value: "156",
      delta: "36 khóa học mới ",
      tone: "orange",
    },
  ],
  revenueChart: {
    title: "Doanh thu theo tháng",
    rangeLabel: "12 tháng gần nhất",
    totalLabel: "Tổng doanh thu",
    totalValue: "₫842.000.000",
    points: [
      { label: "T1", value: 42 },
      { label: "T2", value: 55 },
      { label: "T3", value: 48 },
      { label: "T4", value: 72 },
      { label: "T5", value: 64 },
      { label: "T6", value: 88 },
      { label: "T7", value: 95 },
      { label: "T8", value: 82 },
      { label: "T9", value: 76 },
      { label: "T10", value: 91 },
      { label: "T11", value: 104 },
      { label: "T12", value: 126 },
    ],
  },
  topCourses: {
    title: "Khóa học bán chạy",
    subtitle: "Xếp hạng theo doanh thu và số lượt mua",
    courses: [
      {
        id: "top-course-1",
        title: "Systematic Innovation for Engineers",
        category: "Innovation",
        sales: 482,
        revenue: "₫248.000.000",
        completionRate: 82,
      },
      {
        id: "top-course-2",
        title: "Advanced React & Modern Patterns",
        category: "Software",
        sales: 326,
        revenue: "₫186.000.000",
        completionRate: 76,
      },
      {
        id: "top-course-3",
        title: "Data Science Intro",
        category: "Data",
        sales: 284,
        revenue: "₫142.000.000",
        completionRate: 69,
      },
    ],
  },
  customerFeedback: {
    title: "Feedback khách hàng",
    averageRating: "4.8/5",
    feedbacks: [
      {
        id: "feedback-1",
        customerName: "Nguyen Minh Anh",
        courseName: "Advanced React & Modern Patterns",
        rating: 5,
        comment: "Nội dung rõ ràng, bài tập thực tế và dashboard học tập rất dễ theo dõi.",
        createdAt: "2 giờ trước",
      },
      {
        id: "feedback-2",
        customerName: "Le Hoang Nam",
        courseName: "Systematic Innovation for Engineers",
        rating: 5,
        comment: "Phần TRIZ được giải thích dễ hiểu, áp dụng được ngay vào case công việc.",
        createdAt: "Hôm qua",
      },
      {
        id: "feedback-3",
        customerName: "Tran Bao Chau",
        courseName: "Data Science Intro",
        rating: 4,
        comment: "Video tốt, mong có thêm ví dụ doanh nghiệp ở phần dashboard dữ liệu.",
        createdAt: "3 ngày trước",
      },
    ],
  },
  activityCountLabel: "Quản lý danh sách report",
  activityCountValue: "156 report trong hệ thống",
  reportList: [
    {
      id: "overview-report-1",
      title: "Lỗi phát lại video trên Chương 3",
      category: "Course Content",
      severity: "medium",
      reporter: "support@bithub.io",
      status: "open",
    },
    {
      id: "overview-report-2",
      title: "Người dùng không thể nộp bài kiểm tra cuối kỳ",
      category: "Assessment",
      severity: "high",
      reporter: "qa@bithub.io",
      status: "in-review",
    },
    {
      id: "overview-report-3",
      title: "Yêu cầu thay đổi phòng workshop offline",
      category: "Operations",
      severity: "low",
      reporter: "ops.hanoi@bithub.io",
      status: "resolved",
    },
  ],
  activitySplit: [
    { label: "Online", value: "106", tone: "blue" },
    { label: "Offline", value: "50", tone: "orange" },
  ],
  recentActivities: [
    {
      id: "activity-1",
      courseName: "Hoc vien onboarding",
      instructorName: "Nguyen Thi Minh",
      activityType: "Cap nhat lesson",
      timestamp: "2 phut truoc",
      status: "published",
    },
    {
      id: "activity-2",
      courseName: "Khoa hoc Python",
      instructorName: "Khoa Do",
      activityType: "Dang tai video",
      timestamp: "14 phut truoc",
      status: "published",
    },
    {
      id: "activity-3",
      courseName: "AI He thong",
      instructorName: "Le Hoang Han",
      activityType: "Trinh duyet bai tap",
      timestamp: "1 gio truoc",
      status: "draft",
    },
    {
      id: "activity-4",
      courseName: "Data Science Intro",
      instructorName: "BitHub Ops",
      activityType: "Loi dong bo file",
      timestamp: "3 gio truoc",
      status: "warning",
    },
  ],
  systemHealth: [
    {
      id: "health-1",
      label: "Server Load",
      value: "24%",
      change: "On dinh",
      tone: "healthy",
    },
    {
      id: "health-2",
      label: "Database Storage",
      value: "68%",
      change: "+4.6%",
      tone: "warning",
    },
    {
      id: "health-3",
      label: "API Latency",
      value: "44ms",
      change: "-12%",
      tone: "healthy",
    },
  ],
  workspaceCard: {
    title: "BitHub Pro",
    description:
      "Tập hợp các quy trình vận hành, báo cáo tồn động.",
    actionLabel: "Tim hieu them",
  },
};

export const adminOnlineCoursesMock: AdminCourseManagementData = {
  mode: "online",
  title: "Quản lý khóa học",
  subtitle: "Hệ thống khóa học online cho phép quản lý nội dung, bài tập, quiz và video.",
  summary: [
    {
      id: "summary-1",
      label: "Tổng tham gia",
      value: "12,482",
      meta: "+12%",
    },
    {
      id: "summary-2",
      label: "Khóa học hoạt động",
      value: "48",
      meta: "6 mới",
    },
    {
      id: "summary-3",
      label: "Avg. completion",
      value: "76%",
      meta: "Ổn định",
    },
  ],
  filters: ["Tất cả", "Draft", "Published", "Advanced Filter"],
  courses: [
    {
      id: "online-1",
      title: "Systematic Innovation for Engineers",
      category: "Innovation",
      instructor: "Tran Duy",
      status: "published",
      enrollment: "1,294",
      price: "2.400.000đ",
      createdAt: " Jan 08, 2026",
      updatedAt: "1 day ago",
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      format: "online",
    },
    {
      id: "online-2",
      title: "Advanced React & Modern Patterns",
      category: "Software",
      instructor: "Sarah Jenkins",
      status: "draft",
      enrollment: "0",
      price: "1.800.000đ",
      createdAt: " Feb 14, 2026",
      updatedAt: "2 days ago",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
      format: "online",
    },
    {
      id: "online-3",
      title: "User Experience for Architects",
      category: "Design",
      instructor: "Alex Miller",
      status: "published",
      enrollment: "812",
      price: "1.500.000đ",
      createdAt: " Mar 21, 2026",
      updatedAt: "1 week ago",
      thumbnail:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      format: "online",
    },
  ],
};

export const adminOfflineCoursesMock: AdminCourseManagementData = {
  mode: "offline",
  title: "Quản lý khóa học offline",
  subtitle: "Quản lý workshop, lịch học, nội dung từng buổi và tài liệu cho học viên.",
  summary: [
    {
      id: "summary-1",
      label: "Upcoming workshops",
      value: "14",
      meta: "3 trong tuan",
    },
    {
      id: "summary-2",
      label: "Venue partners",
      value: "08",
      meta: "2 moi",
    },
    {
      id: "summary-3",
      label: "Session assets",
      value: "126",
      meta: "16 can review",
    },
  ],
  filters: ["Tất cả", "Published", "Review", "Advanced Filter"],
  courses: [
    {
      id: "offline-1",
      title: "Advanced TRIZ for Engineers",
      category: "Workshop",
      instructor: "Dr. Artyom Petrov",
      status: "published",
      enrollment: "56",
      price: "3.200.000đ",
      createdAt: " Apr 02, 2026",
      updatedAt: "3 hours ago",
      thumbnail:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop",
      format: "offline",
    },
    {
      id: "offline-2",
      title: "Scalable Backend Systems",
      category: "Architecture",
      instructor: "Phan Thanh Dat",
      status: "review",
      enrollment: "32",
      price: "2.900.000đ",
      createdAt: " Apr 18, 2026",
      updatedAt: "Yesterday",
      thumbnail:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
      format: "offline",
    },
  ],
};

export const adminOnlineCourseEditorsMock: Record<string, OnlineCourseEditorData> = {
  "online-1": {
    id: "online-1",
    title: "Đổi mới có hệ thống dành cho kỹ sư",
    subtitle: "6 chương • 38 bài học",
    updatedAt: "Cập nhật lần cuối Sep 02, 2026",
    modules: [
      {
        id: "module-1",
        title: "Chương 1: Nhập môn TRIZ",
        lessons: [
          {
            id: "lesson-1",
            title: "Giới thiệu về nguồn gốc TRIZ",
            type: "video",
            durationLabel: "12:02",
          },
          {
            id: "lesson-2",
            title: "Kiểm tra 40 nguyên lý sáng tạo",
            type: "quiz",
            durationLabel: "5 câu hỏi",
          },
        ],
      },
      {
        id: "module-2",
        title: "Chương 2: Tư duy hệ thống",
        lessons: [
          {
            id: "lesson-3",
            title: "Bài đọc: Phân tích mô hình hệ thống",
            type: "reading",
            durationLabel: "8 phút",
          },
          {
            id: "lesson-4",
            title: "Bài tập case study 1",
            type: "exercise",
            durationLabel: "1 bài nộp",
          },
        ],
      },
    ],
    selectedLessonId: "lesson-1",
    lessonDetails: {
      "lesson-1": {
        id: "lesson-1",
        moduleId: "module-1",
        title: "Giới thiệu về nguồn gốc TRIZ",
        type: "video",
        durationLabel: "12:02",
        videoUrl: "https://vimeo.com/123456",
        durationMinutes: 12,
        content:
          "Nội dung bài học sử dụng markdown để mô tả mục tiêu, tài liệu đọc thêm và hướng dẫn cho học viên.",
        attachments: ["slide-module-1.pdf", "innovation-checklist.docx"],
        previewImage:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      },
      "lesson-2": {
        id: "lesson-2",
        moduleId: "module-1",
        title: "Kiểm tra 40 Nguyên lý sáng tạo",
        type: "quiz",
        durationLabel: "5 câu hỏi",
        videoUrl: "https://vimeo.com/223344",
        durationMinutes: 8,
        content:
          "Quiz đánh giá mức độ nắm vững 40 nguyên lý sáng tạo, gồm 5 câu hỏi và 1 tình huống mở.",
        attachments: ["quiz-bank-module-1.pdf"],
        quizConfig: {
          passingScore: 70,
          durationMinutes: 15,
          importedFileName: "triz-principles-question-bank.xlsx",
          questions: [
            {
              id: "quiz-q1",
              prompt: "Nguyên lý sáng tạo nào phù hợp nhất để tách 1 chức năng gây xung đột ra khỏi hệ thống chính?",
              options: [
                { id: "q1-a", label: "Segmentation" },
                { id: "q1-b", label: "Taking out" },
                { id: "q1-c", label: "Local quality" },
                { id: "q1-d", label: "Nested doll" },
              ],
              correctOptionId: "q1-b",
              explanation: "Taking out phù hợp khi cần đưa một thành phần gây hại ra khỏi hệ thống.",
            },
            {
              id: "quiz-q2",
              prompt: "Khi muốn tối ưu hóa giao diện của hai thành phần, bạn ưu tiên nhóm nguyên lý nào?",
              options: [
                { id: "q2-a", label: "Dynamicity" },
                { id: "q2-b", label: "Universality" },
                { id: "q2-c", label: "Intermediary" },
                { id: "q2-d", label: "Copying" },
              ],
              correctOptionId: "q2-c",
              explanation: "Intermediary giúp tạo lớp trung gian để giải quyết xung đột giao diện.",
            },
          ],
        },
        previewImage:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      },
      "lesson-3": {
        id: "lesson-3",
        moduleId: "module-2",
        title: "Bài đọc: Phân tích mô hình hệ thống",
        type: "reading",
        durationLabel: "8 phut",
        videoUrl: "https://vimeo.com/556677",
        durationMinutes: 8,
        content:
          "Tài liệu đọc cho học viên về mô hình hệ thống, input-output và đường chạy giá trị.",
        attachments: ["system-model-reading.pdf"],
        previewImage:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      },
      "lesson-4": {
        id: "lesson-4",
        moduleId: "module-2",
        title: "Bài tập case study 1",
        type: "exercise",
        durationLabel: "1 bai nop",
        videoUrl: "https://vimeo.com/889900",
        durationMinutes: 15,
        content:
          "Bài tập thực hành để học viên nộp file phân tích case study trên mô hình TRIZ.",
        attachments: ["exercise-brief.docx"],
        codeExercise: {
          language: "typescript",
          difficulty: "medium",
          starterCode:
            "export function resolveContradiction(input: number[]): number {\n  // TODO: implement\n  return 0;\n}",
          solutionCode:
            "export function resolveContradiction(input: number[]): number {\n  return input.reduce((best, value) => Math.max(best, value), Number.NEGATIVE_INFINITY);\n}",
          testCases: [
            {
              id: "tc-1",
              input: "[1, 4, 2]",
              expectedOutput: "4",
              visibility: "public",
            },
            {
              id: "tc-2",
              input: "[-5, -2, -9]",
              expectedOutput: "-2",
              visibility: "hidden",
            },
          ],
        },
        previewImage:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      },
    },
  },
};

export const adminOfflineCourseEditorsMock: Record<string, OfflineCourseEditorData> = {
  "offline-1": {
    id: "offline-1",
    title: "TRIZ nâng cao dành cho kỹ sư",
    subtitle: "5 buổi • Hanoi Hub",
    venue: "Hanoi Hub - Sector 7",
    uploadHint: "Tải lên slide, bài tập, bảng điểm danh cho mỗi buổi học.",
    sessions: [
      {
        id: "session-1",
        title: "Buổi 1: Những nền tảng của đổi mới có hệ thống",
        dateLabel: "Nov 02, 2026",
        timeLabel: "09:00 - 17:00",
        room: "Hall A",
        speaker: "Dr. Artyom Petrov",
        content:
          "Mô tả mục tiêu session, flow bài giảng, timebox cho thực hành và chuẩn bị yêu cầu cầu của học viên.",
        assets: [
          { id: "asset-1", name: "agenda-day-1.pdf", sizeLabel: "2.4 MB" },
          { id: "asset-2", name: "workshop-handout.zip", sizeLabel: "18 MB" },
        ],
      },
      {
        id: "session-2",
        title: "Buổi 2: Phòng khám Ma trận Mâu thuẫn",
        dateLabel: "Nov 03, 2026",
        timeLabel: "09:00 - 17:00",
        room: "Room 402",
        speaker: "Le Thi Mai",
        content:
          "Trường hợp phòng khám cho ma trận mâu thuẫn, phân nhóm bài tập và review ngay tại lớp.",
        assets: [
          { id: "asset-3", name: "matrix-case-study.pdf", sizeLabel: "3.1 MB" },
        ],
      },
    ],
    enrolledStudents: [
      {
        id: "student-1",
        name: "Nguyen Minh Anh",
        email: "minhanh@example.com",
        phone: "090 234 5678",
        registeredAt: "Oct 18, 2026",
        paymentStatus: "paid",
        attendanceStatus: "attending",
      },
      {
        id: "student-2",
        name: "Le Hoang Nam",
        email: "nam.le@example.com",
        phone: "091 888 2201",
        registeredAt: "Oct 20, 2026",
        paymentStatus: "pending",
        attendanceStatus: "not-started",
      },
      {
        id: "student-3",
        name: "Tran Bao Chau",
        email: "chau.tran@example.com",
        phone: "098 765 4321",
        registeredAt: "Oct 21, 2026",
        paymentStatus: "paid",
        attendanceStatus: "not-started",
      },
    ],
    selectedSessionId: "session-1",
  },
};

export const adminUsersMock: AdminUsersData = {
  title: "Quản lý người dùng",
  subtitle: "Theo dõi học viên, giảng viên và quyền truy cập của hệ thống.",
  summary: [
    { id: "user-summary-1", label: "Active users", value: "8,421", meta: "+6%" },
    { id: "user-summary-2", label: "Instructors", value: "184", meta: "12 moi" },
    { id: "user-summary-3", label: "Pending approvals", value: "24", meta: "Can duyet" },
  ],
  users: [
    {
      id: "user-1",
      name: "Nguyen Thi Minh",
      email: "minh.nguyen@bithub.edu",
      role: "instructor",
      status: "active",
      program: "Systematic Innovation",
      joinedAt: " 2025-04-12",
    },
    {
      id: "user-2",
      name: "Khoa Do",
      email: "khoa.do@bithub.edu",
      role: "student",
      status: "active",
      program: "Backend Systems",
      joinedAt: " 2026-01-18",
    },
    {
      id: "user-3",
      name: "Le Hoang Han",
      email: "han.le@bithub.edu",
      role: "admin",
      status: "pending",
      program: "Operations",
      joinedAt: " 2026-07-02",
    },
    {
      id: "user-4",
      name: "Data Science Intro Cohort",
      email: "cohort.ds@bithub.edu",
      role: "student",
      status: "suspended",
      program: "Data Science",
      joinedAt: " 2024-11-09",
    },
  ],
};

export const adminUserDetailsMock: Record<string, AdminUserDetailData> = {
  "user-1": createAdminUserDetail({
    id: "user-1",
    name: "Nguyen Thi Minh",
    email: "minh.nguyen@bithub.edu",
    role: "instructor",
    status: "active",
    program: "Systematic Innovation",
    joinedAt: " 2025-04-12",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop",
    totalSpent: "12.500.000 VND",
  }),
  "user-2": createAdminUserDetail({
    id: "user-2",
    name: "Khoa Do",
    email: "khoa.do@bithub.edu",
    role: "student",
    status: "active",
    program: "Backend Systems",
    joinedAt: " 2026-01-18",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
    totalSpent: "8.900.000 VND",
  }),
  "user-3": createAdminUserDetail({
    id: "user-3",
    name: "Le Hoang Han",
    email: "han.le@bithub.edu",
    role: "admin",
    status: "pending",
    program: "Operations",
    joinedAt: " 2026-07-02",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=900&auto=format&fit=crop",
    totalSpent: "5.200.000 VND",
  }),
  "user-4": createAdminUserDetail({
    id: "user-4",
    name: "Data Science Intro Cohort",
    email: "cohort.ds@bithub.edu",
    role: "student",
    status: "suspended",
    program: "Data Science",
    joinedAt: " 2024-11-09",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=900&auto=format&fit=crop",
    totalSpent: "3.700.000 VND",
  }),
};

function createAdminUserDetail(
  profile: Omit<AdminUserDetailData["profile"], "phone">,
): AdminUserDetailData {
  return {
    profile: {
      ...profile,
      phone: "090 123 4567",
    },
    purchasedCourses: [
      {
        id: "course-1",
        title: "Tư duy Sáng tạo TRIZ Cơ bản",
        level: "Trung cấp",
        enrolledAt: "12/01/2024",
        progressPercent: 65,
        completedLessons: 12,
        totalLessons: 20,
        status: "learning",
      },
      {
        id: "course-2",
        title: "Phân tích mẫu thuẫn hệ thống",
        level: "Nâng cao",
        enrolledAt: "05/02/2024",
        progressPercent: 20,
        completedLessons: 4,
        totalLessons: 20,
        status: "learning",
      },
      {
        id: "course-3",
        title: "Advanced React & Modern Patterns",
        level: "Nâng cao",
        enrolledAt: "18/03/2024",
        progressPercent: 100,
        completedLessons: 32,
        totalLessons: 32,
        status: "completed",
      },
    ],
    offlineWorkshops: [
      {
        id: "workshop-1",
        title: "TRIZ in Business 2024",
        location: "TP. Hồ Chí Minh",
        dateLabel: "20/03/2024",
        status: "registered",
      },
    ],
    transactions: [
      {
        id: "txn-1",
        invoiceCode: "#INV-99201",
        dateLabel: "15/03/2024",
        amount: "2.500.000đ",
        paymentMethod: "Ví MoMo",
        status: "paid",
      },
      {
        id: "txn-2",
        invoiceCode: "#INV-98542",
        dateLabel: "10/02/2024",
        amount: "5.000.000đ",
        paymentMethod: "Thẻ Visa",
        status: "paid",
      },
      {
        id: "txn-3",
        invoiceCode: "#INV-97210",
        dateLabel: "01/01/2024",
        amount: "5.000.000đ",
        paymentMethod: "Chuyển khoản",
        status: "pending",
      },
    ],
    achievements: [
      { id: "ach-1", label: "Hoàn thành onboarding", tone: "green" },
      { id: "ach-2", label: "Top learner", tone: "orange" },
      { id: "ach-3", label: "Chứng chỉ nâng cao", tone: "gray" },
    ],
  };
}

export const adminReportsMock: AdminReportsData = {
  title: "Quản lý reports",
  subtitle: "Xử lý báo cáo nội dung, vận hành và các báo cáo hệ thống.",
  summary: [
    { id: "report-summary-1", label: "Open", value: "18", tone: "orange" },
    { id: "report-summary-2", label: "In review", value: "07", tone: "blue" },
    { id: "report-summary-3", label: "Resolved", value: "142", tone: "green" },
  ],
  reports: [
    {
      id: "report-1",
      title: "Lỗi phát lại video trên Chương 3",
      category: "Course Content",
      severity: "medium",
      reporter: "support@bithub.io",
      createdAt: "10 mins ago",
      status: "open",
    },
    {
      id: "report-2",
      title: "Yêu cầu thay đổi phòng hội thảo ngoại tuyến",
      category: "Operations",
      severity: "low",
      reporter: "ops.hanoi@bithub.io",
      createdAt: "1 hour ago",
      status: "in-review",
    },
    {
      id: "report-3",
      title: "Người dùng không thể nộp bài kiểm tra cuối kỳ",
      category: "Assessment",
      severity: "high",
      reporter: "qa@bithub.io",
      createdAt: "Today 08:42",
      status: "resolved",
    },
  ],
};

export const adminNotificationsMock: AdminNotificationsData = {
  title: "Tạo Thông báo Mới",
  subtitle: "Soạn thảo và gửi thông báo đến học viên trên hệ thống BitHub.",
  notifications: [
    {
      id: "notification-1",
      title: "Lịch bảo trì hệ thống tối nay",
      content: "BitHub sẽ bảo trì từ 22:00 đến 23:00. Việc học sẽ trở lại bình thường sau thời gian này.",
      audience: "all",
      channels: ["in-app", "email"],
      sentAt: "12:45 - 24/05/2024",
      status: "sent",
    },
    {
      id: "notification-2",
      title: "Khóa React nâng cao có bài tập mới",
      content: "Bài tập về performance optimization đã được mở cho học viên đang tham gia khóa học.",
      audience: "students",
      channels: ["in-app"],
      sentAt: "09:15 - 24/05/2024",
      status: "sent",
    },
    {
      id: "notification-3",
      title: "Nhắc lịch workshop TRIZ in Business",
      content: "Workshop offline sẽ diễn ra vào cuối tuần này tại TP. Hồ Chí Minh.",
      audience: "students",
      channels: ["in-app", "push"],
      sentAt: "23:10 - 23/05/2024",
      status: "scheduled",
    },
    {
      id: "notification-4",
      title: "Cập nhật chính sách hoàn tiền",
      content: "Chính sách hoàn tiền mới đã được cập nhật trong trung tâm hỗ trợ.",
      audience: "all",
      channels: ["email"],
      sentAt: "18:00 - 23/05/2024",
      status: "draft",
    },
  ],
};
