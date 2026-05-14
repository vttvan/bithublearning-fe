export type MyCourseStatus = "all" | "in-progress" | "completed";

export interface MyCoursesFilter {
  id: string;
  label: string;
  value: MyCourseStatus;
}

export interface EnrolledCourseCardData {
  id: string;
  levelTag: string;
  image: string;
  title: string;
  category: string;
  currentLessonLabel: string;
  progressPercent: number;
  progressLabel: string;
  actionLabel: string;
  status: Exclude<MyCourseStatus, "all">;
}

export interface MyCoursesPageData {
  title: string;
  subtitle: string;
  filters: MyCoursesFilter[];
  courses: EnrolledCourseCardData[];
}
