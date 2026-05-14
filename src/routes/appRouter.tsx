import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/common/layouts/main-layout";
import HomePage from "../components/Home/homePage";
import SignInPage from "@/components/SignIn";
import SignUpPage from "@/components/SignUp";
import CoursesPage from "@/features/Courses/components/CoursesPage";
import CourseDetailPage from "@/features/Courses/components/CourseDetailPage";
import AboutPage from "@/features/About/components/AboutPage";
import UnifiedCoursesPage from "@/features/Courses/components/UnifiedCoursesPage";
import { DashboardLayout } from "@/features/Dashboard/components/DashboardLayout";
import { DashboardOfflineCourses } from "@/features/Dashboard/components/DashboardOfflineCourses";
import CoursePlayerPage from "@/features/CoursePlayer/components/CoursePlayerPage";
import OfflineWorkshopsPage from "@/features/OfflineWorkshops/components/OfflineWorkshopsPage";
import OfflineWorkshopDetailPage from "@/features/OfflineWorkshops/components/OfflineWorkshopDetailPage";
import SettingsPage from "@/features/Settings/components/SettingsPage";
import DashboardMyCoursesPage from "@/features/Dashboard/components/DashboardMyCoursesPage";
import DashboardAchievementsPage from "@/features/Dashboard/components/DashboardAchievementsPage";
import DashboardHomeRoute from "@/features/Dashboard/components/DashboardHomeRoute";
import AdminOnlyRoute from "@/features/AdminDashboard/components/AdminOnlyRoute";
import AdminCourseManagementPage from "@/features/AdminDashboard/components/AdminCourseManagementPage";
import AdminOnlineCourseEditorPage from "@/features/AdminDashboard/components/AdminOnlineCourseEditorPage";
import AdminOfflineCourseEditorPage from "@/features/AdminDashboard/components/AdminOfflineCourseEditorPage";
import AdminUsersPage from "@/features/AdminDashboard/components/AdminUsersPage";
import AdminReportsPage from "@/features/AdminDashboard/components/AdminReportsPage";
import DashboardOverview from "@/features/Dashboard/components/DashboardOverview";
import AdminDashboardShell from "@/features/AdminDashboard/components/AdminDashboardShell";
import AdminOverviewPage from "@/features/AdminDashboard/components/AdminOverviewPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/course-player/:id" element={<CoursePlayerPage />} />
      <Route
        path="/dashboard/admin"
        element={
          <AdminOnlyRoute>
            <AdminDashboardShell />
          </AdminOnlyRoute>
        }
      >
        <Route index element={<AdminOverviewPage />} />
        <Route
          path="courses/online"
          element={<AdminCourseManagementPage mode="online" />}
        />
        <Route
          path="courses/online/:courseId"
          element={<AdminOnlineCourseEditorPage />}
        />
        <Route
          path="courses/offline"
          element={<AdminCourseManagementPage mode="offline" />}
        />
        <Route
          path="courses/offline/:courseId"
          element={<AdminOfflineCourseEditorPage />}
        />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomeRoute />} />
          <Route path="courses" element={<DashboardMyCoursesPage />} />
          <Route path="achievements" element={<DashboardAchievementsPage />} />
          <Route path="offline-courses" element={<DashboardOfflineCourses />} />
          <Route path="offline-courses/:id" element={<OfflineWorkshopDetailPage />} />
          <Route path="office-workshop/:id" element={<OfflineWorkshopDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="courses" element={<UnifiedCoursesPage />} />
        <Route path="courses-online" element={<CoursesPage />} />
        <Route path="courses-online/:id" element={<CourseDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="offline-workshops" element={<OfflineWorkshopsPage />} />
        <Route path="offline-workshops/:id" element={<OfflineWorkshopDetailPage />} />
        <Route path="office-workshop/:id" element={<OfflineWorkshopDetailPage />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
