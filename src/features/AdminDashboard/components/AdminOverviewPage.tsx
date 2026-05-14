import React from "react";
import { motion } from "framer-motion";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  AdminHealthMetric,
  AdminMetricCard,
  AdminOverviewData,
  AdminRecentActivity,
} from "../types/adminDashboard";

const AdminOverviewPage: React.FC = () => {
  const [data, setData] = React.useState<AdminOverviewData | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const loadOverview = async () => {
      const response = await adminDashboardService.getOverview();
      if (mounted) {
        setData(response);
      }
    };
    void loadOverview();
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return <div className="p-4 sm:p-6 lg:p-8">Đang tải bảng điều khiển...</div>;
  }

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#001c3d] sm:text-4xl">{data.title}</h1>
            <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#f9fafb]">
              Xử lý báo cáo
            </button>
            <button className="rounded-lg bg-[#001c3d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#003366]">
              Thêm nội dung mới
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {data.metrics.map((metric, index) => (
                <MetricCard key={metric.id} metric={metric} index={index} />
              ))}
            </div>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[#e4e7ec] bg-white p-4 shadow-sm sm:p-6"
            >
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-[#001c3d]">Hoạt động gần đây</h2>
                <button className="text-sm font-semibold text-[#003366]">Xem tất cả</button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#eef1f5]">
                <div className="min-w-[720px]">
                <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] bg-[#f8fafc] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
                  <span>Hoạt động gần đây</span>
                  <span>Giảng viên</span>
                  <span>Trạng thái</span>
                  <span>Thời gian</span>
                </div>
                {data.recentActivities.map((activity) => (
                  <ActivityRow key={activity.id} activity={activity} />
                ))}
                </div>
              </div>
            </motion.section>
          </div>

          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm"
            >
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#98a2b3]">
                {data.activityCountLabel}
              </h2>
              <p className="mt-3 text-2xl font-bold text-[#001c3d]">
                {data.activityCountValue}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                {data.activitySplit.map((item) => (
                  <div key={item.label} className="rounded-xl bg-[#f8fafc] px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-[#98a2b3]">
                      {item.label}
                    </p>
                    <p className={`mt-1 text-lg font-bold ${getToneText(item.tone)}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#001c3d]">Sức khỏe hệ thống</h2>
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
              </div>
              <div className="space-y-4">
                {data.systemHealth.map((metric) => (
                  <HealthRow key={metric.id} metric={metric} />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl bg-[#0a2242] p-6 text-white shadow-sm"
            >
              <p className="text-sm font-semibold text-white/70">{data.workspaceCard.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                {data.workspaceCard.description}
              </p>
              <button className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#001c3d]">
                {data.workspaceCard.actionLabel}
              </button>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

function MetricCard({ metric, index }: { metric: AdminMetricCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm"
    >
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#98a2b3]">
        {metric.label}
      </p>
      <p className="mt-3 text-3xl font-bold text-[#001c3d]">{metric.value}</p>
      <p className={`mt-3 text-xs font-semibold ${getToneText(metric.tone)}`}>
        {metric.delta}
      </p>
    </motion.article>
  );
}

function ActivityRow({ activity }: { activity: AdminRecentActivity }) {
  return (
    <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-t border-[#eef1f5] px-4 py-4 text-sm">
      <div>
        <p className="font-semibold text-[#101828]">{activity.courseName}</p>
        <p className="mt-1 text-xs text-[#667085]">{activity.activityType}</p>
      </div>
      <p className="text-[#475467]">{activity.instructorName}</p>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getStatusClass(activity.status)}`}>
        {getStatusLabel(activity.status)}
      </span>
      <p className="text-[#475467]">{activity.timestamp}</p>
    </div>
  );
}

function HealthRow({ metric }: { metric: AdminHealthMetric }) {
  return (
    <div className="rounded-xl bg-[#f8fafc] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#344054]">{metric.label}</p>
        <span className={`text-xs font-bold ${getHealthTone(metric.tone)}`}>
          {metric.change}
        </span>
      </div>
      <p className="mt-2 text-xl font-bold text-[#001c3d]">{metric.value}</p>
    </div>
  );
}

function getToneText(tone: "blue" | "orange" | "green" | "red") {
  switch (tone) {
    case "green":
      return "text-[#16a34a]";
    case "orange":
      return "text-[#f28633]";
    case "red":
      return "text-[#dc2626]";
    case "blue":
    default:
      return "text-[#2563eb]";
  }
}

function getStatusClass(status: "published" | "draft" | "warning") {
  switch (status) {
    case "published":
      return "bg-[#e9f8ee] text-[#17803d]";
    case "warning":
      return "bg-[#fff3f1] text-[#b42318]";
    case "draft":
    default:
      return "bg-[#f2f4f7] text-[#667085]";
  }
}

function getStatusLabel(status: "published" | "draft" | "warning") {
  switch (status) {
    case "published":
      return "Đã xuất bản";
    case "warning":
      return "Cần chú ý";
    case "draft":
    default:
      return "Bản nháp";
  }
}

function getHealthTone(tone: "healthy" | "warning" | "critical") {
  switch (tone) {
    case "warning":
      return "text-[#d97706]";
    case "critical":
      return "text-[#dc2626]";
    case "healthy":
    default:
      return "text-[#16a34a]";
  }
}

export default AdminOverviewPage;
