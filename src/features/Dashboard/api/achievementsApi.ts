import { request } from "@/shared/api/api";
import { achievementsMock } from "../mocks/achievements.mock";
import type { AchievementsPageData } from "../types/achievements";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const achievementsApi = {
  async getAchievements(): Promise<AchievementsPageData> {
    if (shouldUseMockApi) {
      await wait();
      return achievementsMock;
    }

    return request<AchievementsPageData>({
      url: "/dashboard/achievements",
      method: "GET",
    });
  },
};
