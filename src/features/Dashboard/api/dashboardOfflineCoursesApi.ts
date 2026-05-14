import { request } from "@/shared/api/api";
import { dashboardOfflineCoursesMock } from "../mocks/dashboardOfflineCourses.mock";
import type { DashboardOfflineCoursesData } from "../types/dashboardOfflineCourses";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const dashboardOfflineCoursesApi = {
  async getDashboardOfflineCourses(): Promise<DashboardOfflineCoursesData> {
    if (shouldUseMockApi) {
      await wait();
      return dashboardOfflineCoursesMock;
    }

    return request<DashboardOfflineCoursesData>({
      url: "/dashboard/offline-courses",
      method: "GET",
    });
  },
};
