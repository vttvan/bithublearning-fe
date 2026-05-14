import type { UserSettingsData } from "../types/settings";

export const userSettingsMock: UserSettingsData = {
  profile: {
    id: "settings-user-1",
    fullName: "Alex Thompson",
    roleTitle: "Senior Technical Instructor",
    joinedAtLabel: "Joined March 2024",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    badges: [
      {
        id: "badge-1",
        label: "Admin Access",
        tone: "warning",
      },
      {
        id: "badge-2",
        label: "Verified Educator",
        tone: "success",
      },
    ],
  },
  personalInformation: {
    fullName: "Alex Van",
    email: "alex.vanV@bithub.edu",
    bio: "Passionate about systematic innovation and the TRIZ methodology. Over 10 years of experience in full-stack development and technical pedagogy.",
    department: "Computer Science",
  },
  departments: [
    "Computer Science",
    "Software Engineering",
    "Product Innovation",
    "Data Science",
  ],
  accountSecurity: {
    currentPasswordPlaceholder: "************",
    newPasswordPlaceholder: "Min. 12 characters",
    confirmPasswordPlaceholder: "Confirm selection",
    updateButtonLabel: "Update Password",
  },
  notifications: [
    {
      id: "notification-1",
      title: "Course Enrollment Alerts",
      description: "Get notified when new students join your courses.",
      enabled: true,
    },
    {
      id: "notification-2",
      title: "System Updates",
      description: "Stay informed about scheduled maintenance and new features.",
      enabled: true,
    },
    {
      id: "notification-3",
      title: "Student Queries",
      description: "Email alerts for new questions in the course forums.",
      enabled: false,
    },
  ],
  twoFactor: {
    enabled: false,
    title: "Two-Factor Authentication",
    description:
      "Enhance your account security by adding an extra layer of verification.",
    actionLabel: "Enable 2FA",
  },
  dangerZone: {
    title: "Danger Zone",
    description: "Proceed with caution. These actions cannot be undone.",
    actionLabel: "Deactivate Educator Account",
  },
};
