import { request } from "@/shared/api/api";
import { myCoursesMock } from "../mocks/myCourses.mock";
import type { MyCoursesPageData } from "../types/myCourses";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const myCoursesApi = {
  async getMyCourses(): Promise<MyCoursesPageData> {
    if (shouldUseMockApi) {
      await wait();
      return myCoursesMock;
    }

    return request<MyCoursesPageData>({
      url: "/dashboard/my-courses",
      method: "GET",
    });
  },
};
