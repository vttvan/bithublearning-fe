import React from "react";
import { Bell, Camera, Lock, ShieldAlert, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { settingsService } from "../services/settingsService";
import type {
  NotificationPreference,
  PersonalInformationForm,
  UserSettingsData,
} from "../types/settings";

const inputClassName =
  "w-full rounded-md border border-[#d0d5dd] bg-white px-3 py-2.5 text-sm text-[#101828] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[#003366]";

const initialPasswordState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = React.useState<UserSettingsData | null>(null);
  const [personalInformation, setPersonalInformation] =
    React.useState<PersonalInformationForm | null>(null);
  const [notifications, setNotifications] = React.useState<
    NotificationPreference[]
  >([]);
  const [passwordForm, setPasswordForm] = React.useState(initialPasswordState);
  const [loading, setLoading] = React.useState(true);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);
  const [togglingTwoFactor, setTogglingTwoFactor] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        if (!mounted) {
          return;
        }

        setSettings(data);
        setPersonalInformation(data.personalInformation);
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Failed to load settings:", error);
        toast.error("Unable to load settings.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSaveProfile = async () => {
    if (!personalInformation) {
      return;
    }

    setSavingProfile(true);
    try {
      const updated =
        await settingsService.updatePersonalInformation(personalInformation);
      setSettings(updated);
      setPersonalInformation(updated.personalInformation);
      toast.success("Personal information saved.");
    } catch (error) {
      console.error("Failed to save personal information:", error);
      toast.error("Could not save personal information.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleResetProfile = () => {
    if (!settings) {
      return;
    }

    setPersonalInformation(settings.personalInformation);
  };

  const handleUpdatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Password confirmation does not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await settingsService.updatePassword(passwordForm);
      setPasswordForm(initialPasswordState);
      toast.success("Password updated.");
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error("Could not update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleToggleNotification = async (
    preference: NotificationPreference,
  ) => {
    const previous = notifications;
    const next = notifications.map((item) =>
      item.id === preference.id
        ? { ...item, enabled: !preference.enabled }
        : item,
    );

    setNotifications(next);

    try {
      const updated = await settingsService.updateNotificationPreference({
        id: preference.id,
        enabled: !preference.enabled,
      });
      setSettings(updated);
      setNotifications(updated.notifications);
    } catch (error) {
      console.error("Failed to update notifications:", error);
      setNotifications(previous);
      toast.error("Could not update notification preference.");
    }
  };

  const handleToggleTwoFactor = async () => {
    if (!settings) {
      return;
    }

    setTogglingTwoFactor(true);
    try {
      const updated = await settingsService.updateTwoFactor({
        enabled: !settings.twoFactor.enabled,
      });
      setSettings(updated);
      toast.success(
        updated.twoFactor.enabled
          ? "Two-factor authentication enabled."
          : "Two-factor authentication disabled.",
      );
    } catch (error) {
      console.error("Failed to update two-factor:", error);
      toast.error("Could not update two-factor authentication.");
    } finally {
      setTogglingTwoFactor(false);
    }
  };

  if (loading || !settings || !personalInformation) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-28 rounded-xl bg-white" />
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="h-64 rounded-xl bg-white" />
            <div className="h-64 rounded-xl bg-white" />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="h-48 rounded-xl bg-white" />
            <div className="h-48 rounded-xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5f2] p-8 pb-20">
      <div className="mx-auto max-w-6xl space-y-4">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#ece8e2] bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={settings.profile.avatar}
                  alt={settings.profile.fullName}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#001c3d] text-white shadow-sm">
                  <Camera size={15} />
                </button>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#001c3d]">
                  {settings.profile.fullName}
                </h1>
                <p className="mt-1 text-sm text-[#606a76]">
                  {settings.profile.roleTitle} •{" "}
                  {settings.profile.joinedAtLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {settings.profile.badges.map((badge) => (
                    <span
                      key={badge.id}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        badge.tone === "warning"
                          ? "bg-[#fff0e2] text-[#b85f00]"
                          : "bg-[#e9f8ee] text-[#17803d]"
                      }`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className="rounded-md bg-[#001c3d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#003366] disabled:opacity-60"
              >
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleResetProfile}
                className="rounded-md border border-[#d0d5dd] px-5 py-2.5 text-sm font-bold text-[#344054] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl border border-[#ece8e2] bg-white p-6 shadow-sm"
          >
            <SectionTitle
              icon={<User size={16} />}
              title="Personal Information"
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Full Name">
                <input
                  value={personalInformation.fullName}
                  onChange={(event) =>
                    setPersonalInformation({
                      ...personalInformation,
                      fullName: event.target.value,
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Email Address">
                <input
                  value={personalInformation.email}
                  onChange={(event) =>
                    setPersonalInformation({
                      ...personalInformation,
                      email: event.target.value,
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Professional Bio" className="md:col-span-2">
                <textarea
                  value={personalInformation.bio}
                  onChange={(event) =>
                    setPersonalInformation({
                      ...personalInformation,
                      bio: event.target.value,
                    })
                  }
                  rows={5}
                  className={`${inputClassName} resize-none`}
                />
              </Field>
              <Field label="Department" className="md:col-span-2">
                <select
                  value={personalInformation.department}
                  onChange={(event) =>
                    setPersonalInformation({
                      ...personalInformation,
                      department: event.target.value,
                    })
                  }
                  className={inputClassName}
                >
                  {settings.departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-[#ece8e2] bg-white p-6 shadow-sm"
          >
            <SectionTitle icon={<Lock size={16} />} title="Account Security" />
            <div className="mt-5 space-y-4">
              <Field label="Current Password">
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  placeholder={
                    settings.accountSecurity.currentPasswordPlaceholder
                  }
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      currentPassword: event.target.value,
                    }))
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="New Password">
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  placeholder={settings.accountSecurity.newPasswordPlaceholder}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      newPassword: event.target.value,
                    }))
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Confirm New Password">
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  placeholder={
                    settings.accountSecurity.confirmPasswordPlaceholder
                  }
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      confirmPassword: event.target.value,
                    }))
                  }
                  className={inputClassName}
                />
              </Field>
              <button
                onClick={handleUpdatePassword}
                disabled={savingPassword}
                className="w-full rounded-md border border-[#d0d5dd] px-4 py-3 text-sm font-bold text-[#001c3d] hover:bg-[#f9fafb] disabled:opacity-60"
              >
                {savingPassword
                  ? "Updating..."
                  : settings.accountSecurity.updateButtonLabel}
              </button>
            </div>
          </motion.section>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-[#ece8e2] bg-white p-6 shadow-sm"
          >
            <SectionTitle icon={<Bell size={16} />} title="Notifications" />
            <div className="mt-5 space-y-5">
              {notifications.map((preference) => (
                <div
                  key={preference.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[#001c3d]">
                      {preference.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#606a76]">
                      {preference.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleNotification(preference)}
                    className={`relative mt-1 h-6 w-11 rounded-full transition-colors ${
                      preference.enabled ? "bg-[#f28633]" : "bg-[#e5e7eb]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                        preference.enabled ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          <div className="space-y-4">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-[#08345b] p-6 text-white shadow-sm"
            >
              <h2 className="text-2xl font-bold">{settings.twoFactor.title}</h2>
              <p className="mt-3 max-w-fulltext-sm leading-relaxed text-white/75">
                {settings.twoFactor.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-white/75">
                <span>Status</span>
                <span>
                  {settings.twoFactor.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <button
                onClick={handleToggleTwoFactor}
                disabled={togglingTwoFactor}
                className="mt-8 w-full rounded-md bg-white px-4 py-3 text-sm font-bold text-[#001c3d] hover:bg-[#f3f4f6] disabled:opacity-60"
              >
                {togglingTwoFactor
                  ? "Updating..."
                  : settings.twoFactor.actionLabel}
              </button>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl border border-[#ffd3cc] bg-[#fff3f1] p-6 shadow-sm"
            >
              <SectionTitle
                icon={<ShieldAlert size={16} />}
                title={settings.dangerZone.title}
                className="text-[#b42318]"
              />
              <p className="mt-4 text-xs leading-relaxed text-[#b42318]">
                {settings.dangerZone.description}
              </p>
              <button
                onClick={() =>
                  toast.message("Demo mode only. No account was deactivated.")
                }
                className="mt-5 rounded-md border border-[#fda29b] px-4 py-2.5 text-sm font-bold text-[#b42318] hover:bg-white"
              >
                {settings.dangerZone.actionLabel}
              </button>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

function SectionTitle({
  icon,
  title,
  className = "text-[#001c3d]",
}: {
  icon: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-base font-bold ${className}`}>
      {icon}
      <h2>{title}</h2>
    </div>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[11px] font-semibold text-[#344054]">
        {label}
      </span>
      {children}
    </label>
  );
}

export default SettingsPage;
