export type AchievementStatIcon = "clock" | "graduation" | "star";

export interface AchievementStat {
  id: string;
  value: string;
  label: string;
  supportingText: string;
  icon: AchievementStatIcon;
}

export type BadgeIcon = "trophy" | "code" | "shield" | "sparkles" | "medal";

export interface AchievementBadge {
  id: string;
  label: string;
  icon: BadgeIcon;
  active: boolean;
}

export interface AchievementMilestone {
  title: string;
  description: string;
  actionLabel: string;
}

export interface ProfessionalCertificate {
  id: string;
  category: string;
  title: string;
  issuedAt: string;
  certificateId: string;
  previewImage: string;
  downloadLabel: string;
  verifyLabel: string;
}

export interface AchievementsPageData {
  title: string;
  subtitle: string;
  stats: AchievementStat[];
  badges: AchievementBadge[];
  milestone: AchievementMilestone;
  certificates: ProfessionalCertificate[];
  archiveLabel: string;
}
