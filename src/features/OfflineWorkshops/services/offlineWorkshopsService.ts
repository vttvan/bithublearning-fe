import { offlineWorkshopsApi } from "../api/offlineWorkshopsApi";

export const offlineWorkshopsService = {
  getOfflineWorkshops() {
    return offlineWorkshopsApi.getOfflineWorkshops();
  },

  getOfflineWorkshopById(id: string) {
    return offlineWorkshopsApi.getOfflineWorkshopById(id);
  },
};
