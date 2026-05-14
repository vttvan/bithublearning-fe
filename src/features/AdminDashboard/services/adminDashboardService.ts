import { adminDashboardApi } from "../api/adminDashboardApi";
import type {
  AddOfflineSessionAssetPayload,
  AdminCourseMode,
  CreateOfflineSessionPayload,
  CreateOnlineLessonPayload,
  ImportQuizSpreadsheetPayload,
  UpdateOfflineSessionPayload,
  UpdateOnlineLessonPayload,
} from "../types/adminDashboard";

export const adminDashboardService = {
  getOverview() {
    return adminDashboardApi.getOverview();
  },

  getCourseManagement(mode: AdminCourseMode) {
    return adminDashboardApi.getCourseManagement(mode);
  },

  getOnlineCourseEditor(courseId: string) {
    return adminDashboardApi.getOnlineCourseEditor(courseId);
  },

  getOfflineCourseEditor(courseId: string) {
    return adminDashboardApi.getOfflineCourseEditor(courseId);
  },

  updateOnlineLesson(courseId: string, payload: UpdateOnlineLessonPayload) {
    return adminDashboardApi.updateOnlineLesson(courseId, payload);
  },

  createOnlineLesson(courseId: string, payload: CreateOnlineLessonPayload) {
    return adminDashboardApi.createOnlineLesson(courseId, payload);
  },

  importQuizSpreadsheet(courseId: string, payload: ImportQuizSpreadsheetPayload) {
    return adminDashboardApi.importQuizSpreadsheet(courseId, payload);
  },

  updateOfflineSession(courseId: string, payload: UpdateOfflineSessionPayload) {
    return adminDashboardApi.updateOfflineSession(courseId, payload);
  },

  createOfflineSession(courseId: string, payload: CreateOfflineSessionPayload) {
    return adminDashboardApi.createOfflineSession(courseId, payload);
  },

  addOfflineSessionAsset(courseId: string, payload: AddOfflineSessionAssetPayload) {
    return adminDashboardApi.addOfflineSessionAsset(courseId, payload);
  },

  getUsers() {
    return adminDashboardApi.getUsers();
  },

  getReports() {
    return adminDashboardApi.getReports();
  },
};
