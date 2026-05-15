import { request } from "@/shared/api/api";
import { coursePlayerContentMock } from "../mocks/coursePlayer.mock";
import type { CoursePlayerPageData } from "../types/coursePlayer";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const coursePlayerApi = {
  async getCoursePlayer(courseId: string): Promise<CoursePlayerPageData> {
    if (shouldUseMockApi) {
      await wait();
      return coursePlayerContentMock;
    }

    return request<CoursePlayerPageData>({
      url: `/course-player/${courseId}`,
      method: "GET",
    });
  },
};
