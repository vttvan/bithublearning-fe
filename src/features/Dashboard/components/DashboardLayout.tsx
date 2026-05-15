import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Files,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MonitorPlay,
  Sparkles,
  Settings,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/context/AuthContext";

export const DashboardLayout: React.FC = () => {
  const { logout, user } = useAuth();
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

      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-16 hidden h-[calc(100vh-64px)] w-64 shrink-0 flex-col overflow-y-auto border-r border-outline-variant bg-white md:flex"
      >
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <DashboardSidebarContent
            locationPathname={location.pathname}
            logout={logout}
            navigate={navigateFromSidebar}
            pinActionsToBottom
          />
        </div>
      </motion.aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.45, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};


function DashboardSidebarContent({
  locationPathname,
  logout,
  navigate,
  pinActionsToBottom = false,
}: {
  locationPathname: string;
  logout: () => void;
  navigate: (path: string) => void;
  pinActionsToBottom?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav className="space-y-2">
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Tổng quan"
            onClick={() => navigate("/dashboard")}
            active={locationPathname === "/dashboard"}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
          <SidebarLink
            icon={<BookOpen size={20} />}
            label="Khóa học của tôi"
            onClick={() => navigate("/dashboard/courses")}
            active={locationPathname.startsWith("/dashboard/courses")}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}>
          <SidebarLink
            icon={<Award size={20} />}
            label="Thành tựu"
            onClick={() => navigate("/dashboard/achievements")}
            active={locationPathname.startsWith("/dashboard/achievements")}
          />
        </motion.div>
          {/* <SidebarLink
            icon={<Files size={20} />}
            label="Tài nguyên"
            active={locationPathname === "/dashboard/resources"}
          /> */}
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <SidebarLink
            icon={<MonitorPlay size={20} />}
            label="Khóa học trực tiếp"
            onClick={() => navigate("/dashboard/offline-courses")}
            active={locationPathname.startsWith("/dashboard/offline-courses")}
          />
        </motion.div>
      </nav>

      <div
        className={`space-y-2 border-t border-outline-variant pt-4 ${
          pinActionsToBottom ? "mt-auto" : "mt-4"
        }`}
      >
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.48 }}>
          <SidebarLink
            icon={<Settings size={20} />}
            label="Cài đặt"
            onClick={() => navigate("/dashboard/settings")}
            active={locationPathname.startsWith("/dashboard/settings")}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.56 }}>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </motion.div>
      </div>
    </div>
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
