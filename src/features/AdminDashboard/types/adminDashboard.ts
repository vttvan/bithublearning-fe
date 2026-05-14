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

export interface AdminOverviewData {
  title: string;
  subtitle: string;
  metrics: AdminMetricCard[];
  activityCountLabel: string;
  activityCountValue: string;
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

export interface OfflineCourseEditorData {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  uploadHint: string;
  sessions: OfflineSessionItem[];
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
