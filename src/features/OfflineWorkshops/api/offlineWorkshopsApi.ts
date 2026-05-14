import { request } from "@/shared/api/api";
import { OFFLINE_WORKSHOPS_MOCK } from "../mocks/offlineWorkshops.mock";
import type { OfflineWorkshop } from "../types/offlineWorkshop";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const offlineWorkshopsApi = {
  async getOfflineWorkshops(): Promise<OfflineWorkshop[]> {
    if (shouldUseMockApi) {
      await wait();
      return OFFLINE_WORKSHOPS_MOCK;
    }

    return request<OfflineWorkshop[]>({
      url: "/offline-workshops",
      method: "GET",
    });
  },

  async getOfflineWorkshopById(id: string): Promise<OfflineWorkshop> {
    if (shouldUseMockApi) {
      await wait();
      const workshop =
        OFFLINE_WORKSHOPS_MOCK.find((item) => item.id === id) ??
        OFFLINE_WORKSHOPS_MOCK[0];

      return workshop;
    }

    return request<OfflineWorkshop>({
      url: `/offline-workshops/${id}`,
      method: "GET",
    });
  },
};
