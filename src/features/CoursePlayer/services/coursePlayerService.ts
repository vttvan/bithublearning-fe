import { coursePlayerApi } from "../api/coursePlayerApi";

export const coursePlayerService = {
  getCoursePlayer(courseId: string) {
    return coursePlayerApi.getCoursePlayer(courseId);
  },
};
