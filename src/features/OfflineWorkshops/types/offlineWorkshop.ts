export type WorkshopSessionState = "completed" | "active" | "upcoming";

export type WorkshopAssetIcon =
  | "file-text"
  | "file-archive"
  | "map"
  | "presentation";

export type WorkshopAssetAction = "download" | "preview";

export interface WorkshopSyllabusItem {
  id: string;
  day: string;
  title: string;
  description: string;
  topics: string[];
}

export interface WorkshopInstructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface WorkshopHighlight {
  id: string;
  title: string;
  description: string;
}

export interface WorkshopVenue {
  name: string;
  address: string;
  mapUrl: string;
  roomLabel?: string;
  securityNotice?: string;
}

export interface WorkshopSession {
  id: string;
  day: string;
  title: string;
  description: string;
  date: string;
  time: string;
  room: string;
  state: WorkshopSessionState;
  actionLabel?: string;
}

export interface WorkshopAttendance {
  currentDay: number;
  totalDays: number;
  progressPercent: number;
  statusLabel: string;
}

export interface WorkshopAsset {
  id: string;
  title: string;
  subtitle?: string;
  icon: WorkshopAssetIcon;
  action: WorkshopAssetAction;
}

export interface OfflineWorkshop {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  progressText: string;
  progressPercent: number;
  thumbnail: string;
  seatsRemaining?: number;
  price?: number;
  syllabus?: WorkshopSyllabusItem[];
  sessions?: WorkshopSession[];
  instructors?: WorkshopInstructor[];
  highlights?: WorkshopHighlight[];
  materials?: WorkshopAsset[];
  attendance?: WorkshopAttendance;
  venue?: WorkshopVenue;
}
