export interface SettingsBadge {
  id: string;
  label: string;
  tone: "warning" | "success";
}

export interface SettingsProfileSummary {
  id: string;
  fullName: string;
  roleTitle: string;
  joinedAtLabel: string;
  avatar: string;
  badges: SettingsBadge[];
}

export interface PersonalInformationForm {
  fullName: string;
  email: string;
  bio: string;
  department: string;
}

export interface AccountSecurityMeta {
  currentPasswordPlaceholder: string;
  newPasswordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  updateButtonLabel: string;
}

export interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface TwoFactorSettings {
  enabled: boolean;
  title: string;
  description: string;
  actionLabel: string;
}

export interface DangerZoneSettings {
  title: string;
  description: string;
  actionLabel: string;
}

export interface UserSettingsData {
  profile: SettingsProfileSummary;
  personalInformation: PersonalInformationForm;
  departments: string[];
  accountSecurity: AccountSecurityMeta;
  notifications: NotificationPreference[];
  twoFactor: TwoFactorSettings;
  dangerZone: DangerZoneSettings;
}

export interface UpdatePersonalInformationPayload {
  fullName: string;
  email: string;
  bio: string;
  department: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateNotificationPreferencePayload {
  id: string;
  enabled: boolean;
}

export interface UpdateTwoFactorPayload {
  enabled: boolean;
}
