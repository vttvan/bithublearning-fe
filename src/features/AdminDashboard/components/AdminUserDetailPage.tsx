import React from "react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  RotateCcw,
  WalletCards,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  AdminUserDetailData,
  AdminUserOfflineWorkshop,
  AdminUserPurchasedCourse,
  AdminUserTransaction,
} from "../types/adminDashboard";

const AdminUserDetailPage: React.FC = () => {
  const { userId } = useParams();
  const [data, setData] = React.useState<AdminUserDetailData | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const loadUserDetail = async () => {
      const response = await adminDashboardService.getUserDetail(userId ?? "user-1");
      if (mounted) {
        setData(response);
      }
    };
    void loadUserDetail();
    return () => {
      mounted = false;
    };
  }, [userId]);

  if (!data) {
    return <div className="p-8">Đang tải chi tiết người dùng...</div>;
  }

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-[#e4e7ec] bg-white p-6 text-center shadow-sm">
            <img
              src={data.profile.avatar}
              alt={data.profile.name}
              className="mx-auto h-28 w-28 rounded-xl object-cover shadow-md"
            />
            <h1 className="mt-5 text-2xl font-bold text-[#0b4f8a]">{data.profile.name}</h1>
            <span className="mt-2 inline-flex rounded-full bg-[#fff7e6] px-3 py-1 text-xs font-bold text-[#b85f00]">
              {getRoleLabel(data.profile.role)}
            </span>

            <div className="mt-8 space-y-5 text-left">
              <ProfileInfo icon={<Mail size={16} />} label="Email" value={data.profile.email} />
              <ProfileInfo icon={<Phone size={16} />} label="Số điện thoại" value={data.profile.phone} />
              <ProfileInfo icon={<CalendarDays size={16} />} label="Ngày tham gia" value={data.profile.joinedAt} />
              <ProfileInfo
                icon={<CheckCircle2 size={16} />}
                label="Trạng thái"
                value={getUserStatusLabel(data.profile.status)}
                valueClassName="text-[#16a34a]"
              />
            </div>

            <button className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b4f8a] hover:bg-[#f8fafc]">
              <RotateCcw size={16} />
              Đặt lại mật khẩu
            </button>
          </section>

          <section className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#0b4f8a]">Thành tích học tập</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {data.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  title={achievement.label}
                  className={`flex aspect-square items-center justify-center rounded-xl border ${getAchievementClass(achievement.tone)}`}
                >
                  <Award size={20} />
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          <section className="rounded-2xl border border-[#e4e7ec] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#eef1f5] px-6 py-5">
              <h2 className="text-xl font-bold text-[#0b4f8a]">Khóa học đang tham gia</h2>
              <span className="rounded-full bg-[#f2f4f7] px-3 py-1 text-xs font-bold text-[#475467]">
                {data.purchasedCourses.length} khóa học
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-3 bg-[#f8fafc] px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
                  <span>Khóa học</span>
                  <span>Ngày đăng ký</span>
                  <span>Tiến độ</span>
                </div>
                {data.purchasedCourses.map((course) => (
                  <CourseRow key={course.id} course={course} />
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <WorkshopCard workshop={data.offlineWorkshops[0]} />
            <section className="rounded-2xl bg-[#0b4f8a] p-6 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                Tổng chi tiêu
              </p>
              <p className="mt-4 text-3xl font-bold">{data.profile.totalSpent}</p>
              <div className="mt-10 flex items-center justify-between text-xs text-white/65">
                <span>Giao dịch gần nhất hôm qua</span>
                <WalletCards size={20} className="text-white" />
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-[#e4e7ec] bg-white shadow-sm">
            <div className="border-b border-[#eef1f5] px-6 py-5">
              <h2 className="text-xl font-bold text-[#0b4f8a]">Lịch sử giao dịch</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[0.9fr_0.9fr_1fr_1fr_0.8fr] bg-[#f8fafc] px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
                  <span>Mã hóa đơn</span>
                  <span>Ngày</span>
                  <span>Số tiền</span>
                  <span>Phương thức</span>
                  <span>Trạng thái</span>
                </div>
                {data.transactions.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

function ProfileInfo({
  icon,
  label,
  value,
  valueClassName = "text-[#0b4f8a]",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-[#667085]">{icon}</span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#98a2b3]">{label}</p>
        <p className={`mt-1 text-sm font-semibold ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );
}

function CourseRow({ course }: { course: AdminUserPurchasedCourse }) {
  return (
    <div className="grid grid-cols-3 items-center border-t border-[#eef1f5] px-6 py-5 text-sm">
      <div>
        <p className="font-bold text-[#0b4f8a]">{course.title}</p>
        <p className="mt-1 text-xs text-[#667085]">Level: {course.level}</p>
      </div>
      <p className="text-[#0b4f8a]">{course.enrolledAt}</p>
      <div>
        <p className="text-xs font-bold text-[#b85f00]">
          {course.progressPercent}% bài
        </p>
        <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-[#f2f4f7]">
          <div
            className="h-full rounded-full bg-[#f97316]"
            style={{ width: `${course.progressPercent}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-[#667085]">
          {course.completedLessons}/{course.totalLessons}
        </p>
      </div>

    </div>
  );
}

function WorkshopCard({ workshop }: { workshop?: AdminUserOfflineWorkshop }) {
  if (!workshop) return null;

  return (
    <section className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#0b4f8a]">Workshop Offline</h2>
      <div className="mt-5 rounded-xl border border-[#eef1f5] bg-[#fffaf7] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold text-[#0b4f8a]">{workshop.title}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-[#667085]">
              <MapPin size={14} />
              {workshop.location}
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-[#667085]">
              <CalendarDays size={14} />
              {workshop.dateLabel}
            </p>
          </div>
          <span className="rounded bg-[#dcfce7] px-2 py-1 text-[10px] font-bold uppercase text-[#17803d]">
            Đã đăng ký
          </span>
        </div>
      </div>
    </section>
  );
}

function TransactionRow({ transaction }: { transaction: AdminUserTransaction }) {
  return (
    <div className="grid grid-cols-[0.9fr_0.9fr_1fr_1fr_0.8fr] items-center border-t border-[#eef1f5] px-6 py-5 text-sm">
      <p className="font-bold text-[#0b4f8a]">{transaction.invoiceCode}</p>
      <p className="text-[#0b4f8a]">{transaction.dateLabel}</p>
      <p className="font-bold text-[#0b4f8a]">{transaction.amount}</p>
      <p className="flex items-center gap-2 text-[#0b4f8a]">
        <CreditCard size={15} />
        {transaction.paymentMethod}
      </p>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getTransactionStatusClass(transaction.status)}`}>
        {getTransactionStatusLabel(transaction.status)}
      </span>
    </div>
  );
}

function getRoleLabel(role: string) {
  switch (role) {
    case "admin":
      return "Quản trị viên";
    case "instructor":
      return "Giảng viên";
    default:
      return "Học viên";
  }
}

function getUserStatusLabel(status: string) {
  switch (status) {
    case "active":
      return "Đang hoạt động";
    case "pending":
      return "Chờ duyệt";
    default:
      return "Tạm khóa";
  }
}

function getAchievementClass(tone: "green" | "orange" | "gray") {
  switch (tone) {
    case "green":
      return "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]";
    case "orange":
      return "border-[#fed7aa] bg-[#fff7ed] text-[#f97316]";
    default:
      return "border-[#e4e7ec] bg-[#f8fafc] text-[#98a2b3]";
  }
}

function getTransactionStatusClass(status: "paid" | "pending" | "refunded") {
  switch (status) {
    case "paid":
      return "bg-[#dcfce7] text-[#17803d]";
    case "refunded":
      return "bg-[#eef3ff] text-[#2563eb]";
    case "pending":
    default:
      return "bg-[#fff7e6] text-[#b85f00]";
  }
}

function getTransactionStatusLabel(status: "paid" | "pending" | "refunded") {
  switch (status) {
    case "paid":
      return "Hoàn thành";
    case "refunded":
      return "Hoàn tiền";
    case "pending":
    default:
      return "Chờ xử lý";
  }
}

export default AdminUserDetailPage;
