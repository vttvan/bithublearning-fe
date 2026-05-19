import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
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
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const currentSectionLabel = getDashboardSectionLabel(location.pathname);

  const navigateFromSidebar = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-[#f8f9fa] md:flex-row">
      <div className="sticky top-16 z-40 border-b border-[#e5ebf3] bg-white/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5ebf3] bg-[#f8fbff] px-3 py-2.5 shadow-sm">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f97316]">
              Dashboard
            </p>
            <p className="truncate text-sm font-bold text-primary">
              {currentSectionLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-colors hover:bg-[#1267ad]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Đóng menu học tập" : "Mở menu học tập"}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mt-3 overflow-hidden rounded-2xl border border-[#e5ebf3] bg-white p-3 shadow-xl shadow-slate-900/10"
            >
              <div className="mb-3 rounded-xl bg-[#fff7ed] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f97316]">
                  Không gian học tập
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-primary">
                  {user?.fullName ?? "Học viên BitHub"}
                </p>
              </div>
              <DashboardSidebarContent
                locationPathname={location.pathname}
                logout={logout}
                navigate={navigateFromSidebar}
                compact
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
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
  compact = false,
}: {
  locationPathname: string;
  logout: () => void;
  navigate: (path: string) => void;
  pinActionsToBottom?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav className={compact ? "grid grid-cols-2 gap-2" : "space-y-2"}>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Tổng quan"
            onClick={() => navigate("/dashboard")}
            active={locationPathname === "/dashboard"}
            compact={compact}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
          <SidebarLink
            icon={<BookOpen size={20} />}
            label="Khóa học của tôi"
            onClick={() => navigate("/dashboard/courses")}
            active={locationPathname.startsWith("/dashboard/courses")}
            compact={compact}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}>
          <SidebarLink
            icon={<Award size={20} />}
            label="Thành tựu"
            onClick={() => navigate("/dashboard/achievements")}
            active={locationPathname.startsWith("/dashboard/achievements")}
            compact={compact}
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
            compact={compact}
          />
        </motion.div>
      </nav>

      <div
        className={`${compact ? "grid grid-cols-2 gap-2" : "space-y-2"} border-t border-outline-variant pt-4 ${
          pinActionsToBottom ? "mt-auto" : compact ? "mt-3" : "mt-4"
        }`}
      >
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.48 }}>
          <SidebarLink
            icon={<Settings size={20} />}
            label="Cài đặt"
            onClick={() => navigate("/dashboard/settings")}
            active={locationPathname.startsWith("/dashboard/settings")}
            compact={compact}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.56 }}>
          <button
            onClick={logout}
            className={`flex w-full items-center rounded-xl font-medium text-on-surface-variant transition-colors hover:bg-surface-container ${
              compact
                ? "min-h-[76px] flex-col justify-center gap-2 px-2 py-3 text-center text-xs"
                : "gap-3 px-4 py-3"
            }`}
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
  compact = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full rounded-xl font-medium transition-colors ${
        compact
          ? "min-h-[76px] flex-col items-center justify-center gap-2 px-2 py-3 text-center text-xs"
          : "items-center gap-3 px-4 py-3"
      } ${
        active
          ? "bg-[#f97316] text-white shadow-sm shadow-orange-200"
          : "text-on-surface-variant hover:bg-surface-container"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function getDashboardSectionLabel(pathname: string) {
  if (pathname.startsWith("/dashboard/courses")) {
    return "Khóa học của tôi";
  }

  if (pathname.startsWith("/dashboard/achievements")) {
    return "Thành tựu";
  }

  if (pathname.startsWith("/dashboard/offline-courses")) {
    return "Khóa học trực tiếp";
  }

  if (pathname.startsWith("/dashboard/settings")) {
    return "Cài đặt tài khoản";
  }

  return "Tổng quan học tập";
}
