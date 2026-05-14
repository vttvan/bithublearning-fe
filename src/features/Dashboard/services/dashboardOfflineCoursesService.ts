import { dashboardOfflineCoursesApi } from "../api/dashboardOfflineCoursesApi";

export const dashboardOfflineCoursesService = {
  getDashboardOfflineCourses() {
    return dashboardOfflineCoursesApi.getDashboardOfflineCourses();
  },
};
