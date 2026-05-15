import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminDashboardService } from "../services/adminDashboardService";
import type { AdminUserItem, AdminUsersData } from "../types/adminDashboard";

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<AdminUsersData | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      const response = await adminDashboardService.getUsers();
      if (mounted) {
        setData(response);
      }
    };
    void loadUsers();
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return <div className="p-8">Đang tải người dùng...</div>;
  }

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-8xl">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">{data.title}</h1>
        <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.summary.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#667085]">{item.label}</p>
              <p className="mt-3 text-3xl font-bold text-[#001c3d]">{item.value}</p>
              <p className="mt-2 text-xs font-semibold text-[#f28633]">{item.meta}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e4e7ec] bg-white shadow-sm">
          <div className="min-w-[860px]">
          <div className="grid grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_1fr_1fr_0.7fr] bg-[#f8fafc] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
            <span>Tên</span>
            <span>Email</span>
            <span>Vai trò</span>
            <span>Trạng thái</span>
            <span>Chương trình</span>
            <span>Ngày tham gia</span>
            <span>Thao tác</span>
          </div>
          {data.users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onOpen={() => navigate(`/dashboard/admin/users/${user.id}`)}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function UserRow({ user, onOpen }: { user: AdminUserItem; onOpen: () => void }) {
  return (
    <div className="grid grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_1fr_1fr_0.7fr] items-center border-t border-[#eef1f5] px-4 py-4 text-sm">
      <p className="font-semibold text-[#101828]">{user.name}</p>
      <p className="text-[#475467]">{user.email}</p>
      <p className="text-[#475467]">{getUserRoleLabel(user.role)}</p>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getUserStatusClass(user.status)}`}>
        {getUserStatusLabel(user.status)}
      </span>
      <p className="text-[#475467]">{user.program}</p>
      <p className="text-[#475467]">{user.joinedAt}</p>
      <button
        onClick={onOpen}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#003366]"
      >
        Chi tiết
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

function getUserStatusClass(status: "active" | "pending" | "suspended") {
  switch (status) {
    case "active":
      return "bg-[#e9f8ee] text-[#17803d]";
    case "pending":
      return "bg-[#fff7e6] text-[#b85f00]";
    case "suspended":
    default:
      return "bg-[#fff3f1] text-[#b42318]";
  }
}

function getUserStatusLabel(status: "active" | "pending" | "suspended") {
  switch (status) {
    case "active":
      return "Đang hoạt động";
    case "pending":
      return "Chờ duyệt";
    case "suspended":
    default:
      return "Tạm khóa";
  }
}

function getUserRoleLabel(role: string) {
  switch (role.toLowerCase()) {
    case "admin":
      return "Quản trị viên";
    case "instructor":
      return "Giảng viên";
    case "student":
      return "Học viên";
    default:
      return role;
  }
}

export default AdminUsersPage;
