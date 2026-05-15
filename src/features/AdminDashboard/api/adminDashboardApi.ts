import { request } from "@/shared/api/api";
import {
  adminOfflineCourseEditorsMock,
  adminOfflineCoursesMock,
  adminOnlineCourseEditorsMock,
  adminOnlineCoursesMock,
  adminOverviewMock,
  adminNotificationsMock,
  adminReportsMock,
  adminUserDetailsMock,
  adminUsersMock,
} from "../mocks/adminDashboard.mock";
import type {
  AddOfflineSessionAssetPayload,
  AdminCourseManagementData,
  AdminCourseMode,
  AdminOverviewData,
  AdminReportsData,
  AdminNotificationsData,
  AdminUserDetailData,
  AdminUsersData,
  CreateOfflineSessionPayload,
  CreateOnlineLessonPayload,
  ImportQuizSpreadsheetPayload,
  OfflineCourseEditorData,
  OnlineCourseEditorData,
  UpdateOfflineSessionPayload,
  UpdateOnlineLessonPayload,
} from "../types/adminDashboard";

const shouldUseMockApi = !import.meta.env.VITE_API_URL;

const wait = (ms = 250) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

let onlineCourseEditorsStore = structuredClone(adminOnlineCourseEditorsMock);
let offlineCourseEditorsStore = structuredClone(adminOfflineCourseEditorsMock);

export const adminDashboardApi = {
  async getOverview(): Promise<AdminOverviewData> {
    if (shouldUseMockApi) {
      await wait();
      return adminOverviewMock;
    }

    return request<AdminOverviewData>({
      url: "/admin/dashboard/overview",
      method: "GET",
    });
  },

  async getCourseManagement(mode: AdminCourseMode): Promise<AdminCourseManagementData> {
    if (shouldUseMockApi) {
      await wait();
      return mode === "online" ? adminOnlineCoursesMock : adminOfflineCoursesMock;
    }

    return request<AdminCourseManagementData>({
      url: `/admin/courses?mode=${mode}`,
      method: "GET",
    });
  },

  async getOnlineCourseEditor(courseId: string): Promise<OnlineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      return (
        structuredClone(onlineCourseEditorsStore[courseId]) ??
        structuredClone(onlineCourseEditorsStore["online-1"])
      );
    }

    return request<OnlineCourseEditorData>({
      url: `/admin/courses/online/${courseId}`,
      method: "GET",
    });
  },

  async getOfflineCourseEditor(courseId: string): Promise<OfflineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      return (
        structuredClone(offlineCourseEditorsStore[courseId]) ??
        structuredClone(offlineCourseEditorsStore["offline-1"])
      );
    }

    return request<OfflineCourseEditorData>({
      url: `/admin/courses/offline/${courseId}`,
      method: "GET",
    });
  },

  async getUsers(): Promise<AdminUsersData> {
    if (shouldUseMockApi) {
      await wait();
      return adminUsersMock;
    }

    return request<AdminUsersData>({
      url: "/admin/users",
      method: "GET",
    });
  },

  async getUserDetail(userId: string): Promise<AdminUserDetailData> {
    if (shouldUseMockApi) {
      await wait();
      return structuredClone(adminUserDetailsMock[userId] ?? adminUserDetailsMock["user-1"]);
    }

    return request<AdminUserDetailData>({
      url: `/admin/users/${userId}`,
      method: "GET",
    });
  },

  async getReports(): Promise<AdminReportsData> {
    if (shouldUseMockApi) {
      await wait();
      return adminReportsMock;
    }

    return request<AdminReportsData>({
      url: "/admin/reports",
      method: "GET",
    });
  },

  async getNotifications(): Promise<AdminNotificationsData> {
    if (shouldUseMockApi) {
      await wait();
      return adminNotificationsMock;
    }

    return request<AdminNotificationsData>({
      url: "/admin/notifications",
      method: "GET",
    });
  },

  async updateOnlineLesson(
    courseId: string,
    payload: UpdateOnlineLessonPayload,
  ): Promise<OnlineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      const course = onlineCourseEditorsStore[courseId];
      if (!course) {
        return structuredClone(onlineCourseEditorsStore["online-1"]);
      }

      const current = course.lessonDetails[payload.lessonId];
      if (!current) {
        return structuredClone(course);
      }

      course.lessonDetails[payload.lessonId] = {
        ...current,
        title: payload.title,
        type: payload.type,
        durationMinutes: payload.durationMinutes,
        durationLabel:
          payload.type === "quiz"
            ? `${Math.max(3, Math.round(payload.durationMinutes / 2))} cau hoi`
            : payload.type === "exercise"
              ? "1 bai nop"
              : `${payload.durationMinutes} phut`,
        videoUrl: payload.videoUrl,
        content: payload.content,
        quizConfig: payload.quizConfig,
        codeExercise: payload.codeExercise,
      };

      course.modules = course.modules.map((module) =>
        module.id === current.moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === payload.lessonId
                  ? {
                      ...lesson,
                      title: payload.title,
                      type: payload.type,
                      durationLabel: course.lessonDetails[payload.lessonId].durationLabel,
                    }
                  : lesson,
              ),
            }
          : module,
      );
      course.selectedLessonId = payload.lessonId;
      course.updatedAt = "Last updated just now";
      return structuredClone(course);
    }

    return request<OnlineCourseEditorData>({
      url: `/admin/courses/online/${courseId}/lessons/${payload.lessonId}`,
      method: "PUT",
      data: payload,
    });
  },

  async createOnlineLesson(
    courseId: string,
    payload: CreateOnlineLessonPayload,
  ): Promise<OnlineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      const course = onlineCourseEditorsStore[courseId];
      if (!course) {
        return structuredClone(onlineCourseEditorsStore["online-1"]);
      }

      const lessonId = `lesson-${Date.now()}`;
      const durationLabel =
        payload.type === "quiz"
          ? "5 cau hoi"
          : payload.type === "exercise"
            ? "1 bai nop"
            : "10 phut";

      course.modules = course.modules.map((module) =>
        module.id === payload.moduleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: lessonId,
                  title: payload.title,
                  type: payload.type,
                  durationLabel,
                },
              ],
            }
          : module,
      );

      course.lessonDetails[lessonId] = {
        id: lessonId,
        moduleId: payload.moduleId,
        title: payload.title,
        type: payload.type,
        durationLabel,
        videoUrl: "",
        durationMinutes: 10,
        content: "Noi dung bai hoc moi. Ban co the bo sung markdown, quiz hoac video.",
        attachments: [],
        quizConfig:
          payload.type === "quiz"
            ? {
                passingScore: 70,
                durationMinutes: 15,
                questions: [],
              }
            : undefined,
        codeExercise:
          payload.type === "exercise"
            ? {
                language: "typescript",
                difficulty: "easy",
                starterCode:
                  "export function solve(input: string): string {\n  return input;\n}",
                solutionCode:
                  "export function solve(input: string): string {\n  return input;\n}",
                testCases: [],
              }
            : undefined,
        previewImage:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      };
      course.selectedLessonId = lessonId;
      course.updatedAt = "Last updated just now";
      return structuredClone(course);
    }

    return request<OnlineCourseEditorData>({
      url: `/admin/courses/online/${courseId}/lessons`,
      method: "POST",
      data: payload,
    });
  },

  async importQuizSpreadsheet(
    courseId: string,
    payload: ImportQuizSpreadsheetPayload,
  ): Promise<OnlineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      const course = onlineCourseEditorsStore[courseId];
      if (!course) {
        return structuredClone(onlineCourseEditorsStore["online-1"]);
      }

      const lesson = course.lessonDetails[payload.lessonId];
      if (!lesson) {
        return structuredClone(course);
      }

      lesson.quizConfig = {
        passingScore: lesson.quizConfig?.passingScore ?? 70,
        durationMinutes: lesson.quizConfig?.durationMinutes ?? 20,
        importedFileName: payload.fileName,
        questions: [
          {
            id: `excel-q-${Date.now()}-1`,
            prompt: "Tu file Excel: dau la nguyen ly phu hop de chia nho he thong thanh module doc lap?",
            options: [
              { id: "excel-q1-a", label: "Segmentation" },
              { id: "excel-q1-b", label: "Blessing in disguise" },
              { id: "excel-q1-c", label: "Pneumatics and hydraulics" },
              { id: "excel-q1-d", label: "Skipping" },
            ],
            correctOptionId: "excel-q1-a",
            explanation: "Segmentation la nguyen ly co ban khi can chia he thong thanh cac module doc lap.",
          },
          {
            id: `excel-q-${Date.now()}-2`,
            prompt: "Tu file Excel: khi muon thay doi tinh chat theo tung khu vuc, ban uu tien nguyen ly nao?",
            options: [
              { id: "excel-q2-a", label: "Asymmetry" },
              { id: "excel-q2-b", label: "Local quality" },
              { id: "excel-q2-c", label: "Partial action" },
              { id: "excel-q2-d", label: "Self-service" },
            ],
            correctOptionId: "excel-q2-b",
            explanation: "Local quality khuyen khich toi uu tinh chat theo tung khu vuc cua he thong.",
          },
        ],
      };
      course.selectedLessonId = payload.lessonId;
      course.updatedAt = "Last updated just now";
      return structuredClone(course);
    }

    return request<OnlineCourseEditorData>({
      url: `/admin/courses/online/${courseId}/lessons/${payload.lessonId}/import-quiz`,
      method: "POST",
      data: payload,
    });
  },

  async updateOfflineSession(
    courseId: string,
    payload: UpdateOfflineSessionPayload,
  ): Promise<OfflineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      const course = offlineCourseEditorsStore[courseId];
      if (!course) {
        return structuredClone(offlineCourseEditorsStore["offline-1"]);
      }

      course.sessions = course.sessions.map((session) =>
        session.id === payload.sessionId
          ? {
              ...session,
              title: payload.title,
              dateLabel: payload.dateLabel,
              timeLabel: payload.timeLabel,
              room: payload.room,
              speaker: payload.speaker,
              content: payload.content,
            }
          : session,
      );
      course.selectedSessionId = payload.sessionId;
      return structuredClone(course);
    }

    return request<OfflineCourseEditorData>({
      url: `/admin/courses/offline/${courseId}/sessions/${payload.sessionId}`,
      method: "PUT",
      data: payload,
    });
  },

  async createOfflineSession(
    courseId: string,
    payload: CreateOfflineSessionPayload,
  ): Promise<OfflineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      const course = offlineCourseEditorsStore[courseId];
      if (!course) {
        return structuredClone(offlineCourseEditorsStore["offline-1"]);
      }

      const sessionId = `session-${Date.now()}`;
      course.sessions = [
        ...course.sessions,
        {
          id: sessionId,
          title: payload.title,
          dateLabel: payload.dateLabel,
          timeLabel: payload.timeLabel,
          room: payload.room,
          speaker: payload.speaker,
          content: payload.content,
          assets: [],
        },
      ];
      course.selectedSessionId = sessionId;
      return structuredClone(course);
    }

    return request<OfflineCourseEditorData>({
      url: `/admin/courses/offline/${courseId}/sessions`,
      method: "POST",
      data: payload,
    });
  },

  async addOfflineSessionAsset(
    courseId: string,
    payload: AddOfflineSessionAssetPayload,
  ): Promise<OfflineCourseEditorData> {
    if (shouldUseMockApi) {
      await wait();
      const course = offlineCourseEditorsStore[courseId];
      if (!course) {
        return structuredClone(offlineCourseEditorsStore["offline-1"]);
      }

      course.sessions = course.sessions.map((session) =>
        session.id === payload.sessionId
          ? {
              ...session,
              assets: [
                ...session.assets,
                {
                  id: `asset-${Date.now()}`,
                  name: payload.name,
                  sizeLabel: payload.sizeLabel,
                },
              ],
            }
          : session,
      );
      course.selectedSessionId = payload.sessionId;
      return structuredClone(course);
    }

    return request<OfflineCourseEditorData>({
      url: `/admin/courses/offline/${courseId}/sessions/${payload.sessionId}/assets`,
      method: "POST",
      data: payload,
    });
  },
};
