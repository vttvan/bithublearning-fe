import { achievementsApi } from "../api/achievementsApi";

export const achievementsService = {
  getAchievements() {
    return achievementsApi.getAchievements();
  },
};
