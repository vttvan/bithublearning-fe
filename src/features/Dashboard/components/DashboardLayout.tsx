import React from "react";
import {
  Award,
  BookOpen,
  Files,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MonitorPlay,
  Settings,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/context/AuthContext";

export const DashboardLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigateFromSidebar = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-[#f8f9fa] md:flex-row">
      <div className="sticky top-16 z-40 border-b border-outline-variant bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-lg border border-outline-variant px-4 py-3 font-semibold text-[#001c3d]"
          aria-expanded={mobileMenuOpen}
        >
          <span>Menu học tập</span>
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {mobileMenuOpen ? (
          <div className="mt-3 space-y-2">
            <DashboardSidebarContent
              locationPathname={location.pathname}
              logout={logout}
              navigate={navigateFromSidebar}
            />
          </div>
        ) : null}
      </div>

      <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-64 shrink-0 flex-col overflow-y-auto border-r border-outline-variant bg-white md:flex">
        <div className="mt-4 flex-1 space-y-2 p-4">
          <DashboardSidebarContent
            locationPathname={location.pathname}
            logout={logout}
            navigate={navigateFromSidebar}
          />
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

function DashboardSidebarContent({
  locationPathname,
  logout,
  navigate,
}: {
  locationPathname: string;
  logout: () => void;
  navigate: (path: string) => void;
}) {
  return (
    <>
      <nav className="space-y-2">
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Tổng quan"
            onClick={() => navigate("/dashboard")}
            active={locationPathname === "/dashboard"}
          />
          <SidebarLink
            icon={<BookOpen size={20} />}
            label="Khóa học của tôi"
            onClick={() => navigate("/dashboard/courses")}
            active={locationPathname.startsWith("/dashboard/courses")}
          />
          <SidebarLink
            icon={<Award size={20} />}
            label="Thành tựu"
            onClick={() => navigate("/dashboard/achievements")}
            active={locationPathname.startsWith("/dashboard/achievements")}
          />
          <SidebarLink
            icon={<Files size={20} />}
            label="Tài nguyên"
            active={locationPathname === "/dashboard/resources"}
          />
          <SidebarLink
            icon={<MonitorPlay size={20} />}
            label="Khóa học trực tiếp"
            onClick={() => navigate("/dashboard/offline-courses")}
            active={locationPathname.startsWith("/dashboard/offline-courses")}
          />
      </nav>

      <div className="mt-4 space-y-2 border-t border-outline-variant pt-4">
          <SidebarLink
            icon={<Settings size={20} />}
            label="Cài đặt"
            onClick={() => navigate("/dashboard/settings")}
            active={locationPathname.startsWith("/dashboard/settings")}
          />
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
      </div>
    </>
  );
}

function SidebarLink({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
        active ? "bg-[#f28633] text-white" : "text-on-surface-variant hover:bg-surface-container"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
