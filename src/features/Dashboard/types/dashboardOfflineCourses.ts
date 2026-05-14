import type { WorkshopAsset } from "@/features/OfflineWorkshops/types/offlineWorkshop";

export type DashboardOfflineCourseStatusTone = "primary" | "outline";

export interface DashboardOfflineCourseItem {
  id: string;
  category: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
  statusLabel: string;
  statusTone: DashboardOfflineCourseStatusTone;
}

export interface DashboardOfflineNextSession {
  dayLabel: string;
  monthLabel: string;
  title: string;
  locationLabel: string;
  timeLabel: string;
  instructions: string[];
}

export interface DashboardOfflineCoursesData {
  enrolledWorkshops: DashboardOfflineCourseItem[];
  nextSession: DashboardOfflineNextSession;
  resources: WorkshopAsset[];
}
