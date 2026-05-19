export type AdminTrendTone = "blue" | "orange" | "green" | "red";

export interface AdminMetricCard {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: AdminTrendTone;
}

export interface AdminRecentActivity {
  id: string;
  courseName: string;
  instructorName: string;
  activityType: string;
  timestamp: string;
  status: "published" | "draft" | "warning";
}

export interface AdminHealthMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: "healthy" | "warning" | "critical";
}

export interface AdminRevenuePoint {
  label: string;
  value: number;
}

export interface AdminTopCourse {
  id: string;
  title: string;
  category: string;
  sales: number;
  revenue: string;
  completionRate: number;
}

export interface AdminCustomerFeedback {
  id: string;
  customerName: string;
  courseName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AdminOverviewReportItem {
  id: string;
  title: string;
  category: string;
  severity: "low" | "medium" | "high";
  reporter: string;
  status: "open" | "in-review" | "resolved";
}

export interface AdminOverviewData {
  title: string;
  subtitle: string;
  metrics: AdminMetricCard[];
  revenueChart: {
    title: string;
    rangeLabel: string;
    totalLabel: string;
    totalValue: string;
    points: AdminRevenuePoint[];
  };
  topCourses: {
    title: string;
    subtitle: string;
    courses: AdminTopCourse[];
  };
  customerFeedback: {
    title: string;
    averageRating: string;
    feedbacks: AdminCustomerFeedback[];
  };
  activityCountLabel: string;
  activityCountValue: string;
  reportList: AdminOverviewReportItem[];
  activitySplit: {
    label: string;
    value: string;
    tone: AdminTrendTone;
  }[];
  recentActivities: AdminRecentActivity[];
  systemHealth: AdminHealthMetric[];
  workspaceCard: {
    title: string;
    description: string;
    actionLabel: string;
  };
}

export type AdminCourseMode = "online" | "offline";

export interface AdminCourseSummaryCard {
  id: string;
  label: string;
  value: string;
  meta: string;
}

export interface AdminCourseManagementItem {
  id: string;
  title: string;
  category: string;
  instructor: string;
  status: "published" | "draft" | "review";
  enrollment: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  format: AdminCourseMode;
}

export interface AdminCourseManagementData {
  mode: AdminCourseMode;
  title: string;
  subtitle: string;
  summary: AdminCourseSummaryCard[];
  filters: string[];
  courses: AdminCourseManagementItem[];
}

export type OnlineLessonContentType =
  | "video"
  | "quiz"
  | "exercise"
  | "reading";

export interface OnlineLessonItem {
  id: string;
  title: string;
  type: OnlineLessonContentType;
  durationLabel: string;
}

export interface OnlineLessonDetail extends OnlineLessonItem {
  moduleId: string;
  videoUrl: string;
  durationMinutes: number;
  content: string;
  attachments: string[];
  previewImage: string;
  quizConfig?: QuizConfig;
  codeExercise?: CodeExerciseConfig;
}

export interface QuizQuestionOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizQuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizConfig {
  passingScore: number;
  durationMinutes: number;
  importedFileName?: string;
  questions: QuizQuestion[];
}

export interface CodeExerciseTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  visibility: "public" | "hidden";
}

export interface CodeExerciseConfig {
  language: "javascript" | "typescript" | "python" | "java";
  difficulty: "easy" | "medium" | "hard";
  starterCode: string;
  solutionCode: string;
  testCases: CodeExerciseTestCase[];
}

export interface OnlineCourseModule {
  id: string;
  title: string;
  lessons: OnlineLessonItem[];
}

export interface OnlineCourseEditorData {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  modules: OnlineCourseModule[];
  selectedLessonId: string;
  lessonDetails: Record<string, OnlineLessonDetail>;
}

export interface OfflineSessionAsset {
  id: string;
  name: string;
  sizeLabel: string;
}

export interface OfflineSessionItem {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  room: string;
  speaker: string;
  content: string;
  assets: OfflineSessionAsset[];
}

export type OfflineStudentPaymentStatus = "paid" | "pending" | "refunded";
export type OfflineStudentAttendanceStatus =
  | "not-started"
  | "attending"
  | "completed"
  | "cancelled";

export interface OfflineCourseStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  paymentStatus: OfflineStudentPaymentStatus;
  attendanceStatus: OfflineStudentAttendanceStatus;
}

export interface OfflineCourseEditorData {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  uploadHint: string;
  sessions: OfflineSessionItem[];
  enrolledStudents: OfflineCourseStudent[];
  selectedSessionId: string;
}

export interface UpdateOnlineLessonPayload {
  lessonId: string;
  title: string;
  type: OnlineLessonContentType;
  videoUrl: string;
  durationMinutes: number;
  content: string;
  quizConfig?: QuizConfig;
  codeExercise?: CodeExerciseConfig;
}

export interface CreateOnlineLessonPayload {
  moduleId: string;
  title: string;
  type: OnlineLessonContentType;
}

export interface ImportQuizSpreadsheetPayload {
  lessonId: string;
  fileName: string;
}

export interface UpdateOfflineSessionPayload {
  sessionId: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  room: string;
  speaker: string;
  content: string;
}

export interface CreateOfflineSessionPayload {
  title: string;
  dateLabel: string;
  timeLabel: string;
  room: string;
  speaker: string;
  content: string;
}

export interface AddOfflineSessionAssetPayload {
  sessionId: string;
  name: string;
  sizeLabel: string;
}

export interface AddOfflineCourseStudentPayload {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateOfflineCourseStudentPayload {
  studentId: string;
  paymentStatus: OfflineStudentPaymentStatus;
  attendanceStatus: OfflineStudentAttendanceStatus;
}

export interface AdminUserSummaryCard {
  id: string;
  label: string;
  value: string;
  meta: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "pending" | "suspended";
  program: string;
  joinedAt: string;
}

export interface AdminUsersData {
  title: string;
  subtitle: string;
  summary: AdminUserSummaryCard[];
  users: AdminUserItem[];
}

export interface AdminUserPurchasedCourse {
  id: string;
  title: string;
  level: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  status: "learning" | "completed" | "paused";
}

export interface AdminUserOfflineWorkshop {
  id: string;
  title: string;
  location: string;
  dateLabel: string;
  status: "registered" | "attended" | "cancelled";
}

export interface AdminUserTransaction {
  id: string;
  invoiceCode: string;
  dateLabel: string;
  amount: string;
  paymentMethod: string;
  status: "paid" | "pending" | "refunded";
}

export interface AdminUserAchievement {
  id: string;
  label: string;
  tone: "green" | "orange" | "gray";
}

export interface AdminUserDetailData {
  profile: AdminUserItem & {
    avatar: string;
    phone: string;
    totalSpent: string;
  };
  purchasedCourses: AdminUserPurchasedCourse[];
  offlineWorkshops: AdminUserOfflineWorkshop[];
  transactions: AdminUserTransaction[];
  achievements: AdminUserAchievement[];
}

export interface AdminReportSummaryCard {
  id: string;
  label: string;
  value: string;
  tone: AdminTrendTone;
}

export interface AdminReportItem {
  id: string;
  title: string;
  category: string;
  severity: "low" | "medium" | "high";
  reporter: string;
  createdAt: string;
  status: "open" | "in-review" | "resolved";
}

export interface AdminReportsData {
  title: string;
  subtitle: string;
  summary: AdminReportSummaryCard[];
  reports: AdminReportItem[];
}

export type AdminNotificationAudience = "all" | "students" | "instructors" | "admins";
export type AdminNotificationChannel = "in-app" | "email" | "push";
export type AdminNotificationStatus = "sent" | "scheduled" | "draft";

export interface AdminNotificationItem {
  id: string;
  title: string;
  content: string;
  audience: AdminNotificationAudience;
  channels: AdminNotificationChannel[];
  sentAt: string;
  status: AdminNotificationStatus;
}

export interface AdminNotificationsData {
  title: string;
  subtitle: string;
  notifications: AdminNotificationItem[];
}
