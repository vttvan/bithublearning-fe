import { request } from "@/shared/api/api";
import { userSettingsMock } from "../mocks/settings.mock";
import type {
  UpdateNotificationPreferencePayload,
  UpdatePasswordPayload,
  UpdatePersonalInformationPayload,
  UpdateTwoFactorPayload,
  UserSettingsData,
} from "../types/settings";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

let settingsStore: UserSettingsData = structuredClone(userSettingsMock);

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const settingsApi = {
  async getSettings(): Promise<UserSettingsData> {
    if (shouldUseMockApi) {
      await wait();
      return structuredClone(settingsStore);
    }

    return request<UserSettingsData>({
      url: "/settings",
      method: "GET",
    });
  },

  async updatePersonalInformation(
    payload: UpdatePersonalInformationPayload,
  ): Promise<UserSettingsData> {
    if (shouldUseMockApi) {
      await wait();
      settingsStore = {
        ...settingsStore,
        profile: {
          ...settingsStore.profile,
          fullName: payload.fullName,
        },
        personalInformation: payload,
      };
      return structuredClone(settingsStore);
    }

    return request<UserSettingsData>({
      url: "/settings/personal-information",
      method: "PUT",
      data: payload,
    });
  },

  async updatePassword(payload: UpdatePasswordPayload): Promise<void> {
    if (shouldUseMockApi) {
      await wait();
      void payload;
      return;
    }

    await request<void>({
      url: "/settings/password",
      method: "PUT",
      data: payload,
    });
  },

  async updateNotificationPreference(
    payload: UpdateNotificationPreferencePayload,
  ): Promise<UserSettingsData> {
    if (shouldUseMockApi) {
      await wait();
      settingsStore = {
        ...settingsStore,
        notifications: settingsStore.notifications.map((item) =>
          item.id === payload.id ? { ...item, enabled: payload.enabled } : item,
        ),
      };
      return structuredClone(settingsStore);
    }

    return request<UserSettingsData>({
      url: `/settings/notifications/${payload.id}`,
      method: "PATCH",
      data: payload,
    });
  },

  async updateTwoFactor(
    payload: UpdateTwoFactorPayload,
  ): Promise<UserSettingsData> {
    if (shouldUseMockApi) {
      await wait();
      settingsStore = {
        ...settingsStore,
        twoFactor: {
          ...settingsStore.twoFactor,
          enabled: payload.enabled,
          actionLabel: payload.enabled ? "Disable 2FA" : "Enable 2FA",
        },
      };
      return structuredClone(settingsStore);
    }

    return request<UserSettingsData>({
      url: "/settings/two-factor",
      method: "PATCH",
      data: payload,
    });
  },
};
