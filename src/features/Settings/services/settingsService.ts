import { settingsApi } from "../api/settingsApi";
import type {
  UpdateNotificationPreferencePayload,
  UpdatePasswordPayload,
  UpdatePersonalInformationPayload,
  UpdateTwoFactorPayload,
} from "../types/settings";

export const settingsService = {
  getSettings() {
    return settingsApi.getSettings();
  },

  updatePersonalInformation(payload: UpdatePersonalInformationPayload) {
    return settingsApi.updatePersonalInformation(payload);
  },

  updatePassword(payload: UpdatePasswordPayload) {
    return settingsApi.updatePassword(payload);
  },

  updateNotificationPreference(payload: UpdateNotificationPreferencePayload) {
    return settingsApi.updateNotificationPreference(payload);
  },

  updateTwoFactor(payload: UpdateTwoFactorPayload) {
    return settingsApi.updateTwoFactor(payload);
  },
};
