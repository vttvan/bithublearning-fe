import { myCoursesApi } from "../api/myCoursesApi";

export const myCoursesService = {
  getMyCourses() {
    return myCoursesApi.getMyCourses();
  },
};
