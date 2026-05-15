import React from "react";
import { motion } from "framer-motion";
import {
  BookCopy,
  ChevronDown,
  ChevronRight,
  ChartNoAxesCombined,
  FileWarning,
  LayoutDashboard,
  LogOut,
  Menu,
  Megaphone,
  ShieldUser,
  Sparkles,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/Auth/context/AuthContext";

const AdminDashboardShell: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [courseMenuOpen, setCourseMenuOpen] = React.useState(
    location.pathname.startsWith("/dashboard/admin/courses"),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname.startsWith("/dashboard/admin/courses")) {
      setCourseMenuOpen(true);
    }
  }, [location.pathname]);

  const navigateFromSidebar = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6fb] md:flex-row">
      <div className="sticky top-0 z-50 border-b border-[#dce2ec] bg-[#fbfcff] px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-lg border border-[#d0d5dd] bg-white px-4 py-3 font-semibold text-[#001c3d]"
          aria-expanded={mobileMenuOpen}
        >
          <span>Menu quản trị</span>
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {mobileMenuOpen ? (
          <div className="mt-3">
            <AdminSidebarContent
              userFullName={user?.fullName}
              userEmail={user?.email}
              courseMenuOpen={courseMenuOpen}
              locationPathname={location.pathname}
              logout={logout}
              navigate={navigateFromSidebar}
              setCourseMenuOpen={setCourseMenuOpen}
              showAccountCard={false}
            />
          </div>
        ) : null}
      </div>

      <motion.aside
        initial={{ x: -28, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-[#dce2ec] bg-[#fbfcff] md:flex"
      >
        <AdminSidebarContent
          userFullName={user?.fullName}
          userEmail={user?.email}
          courseMenuOpen={courseMenuOpen}
          locationPathname={location.pathname}
          logout={logout}
          navigate={navigateFromSidebar}
          setCourseMenuOpen={setCourseMenuOpen}
          showAccountCard
        />
      </motion.aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <AdminDashboardHeader userFullName={user?.fullName} />
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

function AdminDashboardHeader({ userFullName }: { userFullName?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.42, ease: "easeOut" }}
      className="sticky top-0 z-30 border-b border-[#dce2ec] bg-[#f4f6fb]/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-8xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#667085]">
            <Sparkles size={14} className="text-[#f28633]" />
            Admin Dashboard
          </p>
          <h1 className="mt-1 text-xl font-bold text-primary">
            Chào mừng trở lại{userFullName ? `, ${userFullName}` : ""}
          </h1>
        </div>
  
      </div>
    </motion.header>
  );
}

function AdminSidebarContent({
  userFullName,
  userEmail,
  courseMenuOpen,
  locationPathname,
  logout,
  navigate,
  setCourseMenuOpen,
  showAccountCard,
}: {
  userFullName?: string;
  userEmail?: string;
  courseMenuOpen: boolean;
  locationPathname: string;
  logout: () => void;
  navigate: (path: string) => void;
  setCourseMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showAccountCard: boolean;
}) {
  return (
    <>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.3 }}
          className="border-b border-[#e7ebf1] px-5 py-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#98a2b3]">
            Không gian quản trị
          </p>
          <h2 className="mt-2 text-xl font-bold text-primary">
            Điều phối BitHub
          </h2>
        </motion.div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}>
          <AdminSidebarLink
            icon={<LayoutDashboard size={18} />}
            label="Tổng quan"
            active={locationPathname === "/dashboard/admin"}
            onClick={() => navigate("/dashboard/admin")}
          />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24 }}
            className="rounded-xl border border-[#edf1f5] bg-white/80 p-1"
          >
            <button
              onClick={() => setCourseMenuOpen((current) => !current)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                locationPathname.startsWith("/dashboard/admin/courses")
                  ? "bg-[#eef3ff] text-primary"
                  : "text-[#475467] hover:bg-[#f8fafc]"
              }`}
            >
              <span className="flex items-center gap-3">
                <BookCopy size={18} />
                Quản lý khóa học
              </span>
              {courseMenuOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {courseMenuOpen ? (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                className="mt-1 space-y-1 px-2 pb-2"
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                <AdminSubSidebarLink
                  label="Khóa học trực tuyến"
                  active={locationPathname.startsWith(
                    "/dashboard/admin/courses/online",
                  )}
                  onClick={() => navigate("/dashboard/admin/courses/online")}
                />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                <AdminSubSidebarLink
                  label="Khóa học trực tiếp"
                  active={locationPathname.startsWith(
                    "/dashboard/admin/courses/offline",
                  )}
                  onClick={() => navigate("/dashboard/admin/courses/offline")}
                />
                </motion.div>
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}>
          <AdminSidebarLink
            icon={<ShieldUser size={18} />}
            label="Quản lý người dùng"
            active={locationPathname.startsWith("/dashboard/admin/users")}
            onClick={() => navigate("/dashboard/admin/users")}
          />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <AdminSidebarLink
            icon={<Megaphone size={18} />}
            label="Thông báo"
            active={locationPathname.startsWith("/dashboard/admin/notifications")}
            onClick={() => navigate("/dashboard/admin/notifications")}
          />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.46 }}>
          <AdminSidebarLink
            icon={<FileWarning size={18} />}
            label="Báo cáo"
            active={locationPathname.startsWith("/dashboard/admin/reports")}
            onClick={() => navigate("/dashboard/admin/reports")}
          />
          </motion.div>
        
     
        </nav>

        <div className={`${showAccountCard ? "block" : "hidden"} border-t border-[#e7ebf1] p-4`}>
          <div className="mb-3 rounded-xl bg-[#0b2243] p-4 text-white">
            <p className="text-xs text-white/70">Đăng nhập với tài khoản</p>
            <p className="mt-1 text-sm font-bold">{userFullName}</p>
            <p className="text-xs text-white/70">{userEmail}</p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-4 py-3 text-sm font-semibold text-[#344054] hover:bg-[#f9fafb]"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
    </>
  );
}

function AdminSidebarLink({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-white text-[#475467] hover:bg-[#f8fafc]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function AdminSubSidebarLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-white text-[#475467] hover:bg-[#f8fafc]"
      }`}
    >
      {label}
    </button>
  );
}

export default AdminDashboardShell;
