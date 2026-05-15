import React from "react";
import { motion } from "framer-motion";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  AdminCustomerFeedback,
  AdminMetricCard,
  AdminOverviewData,
  AdminOverviewReportItem,
  AdminRecentActivity,
  AdminRevenuePoint,
  AdminTopCourse,
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
      <div className="mx-auto max-w-8xl">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">{data.title}</h1>
            <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#f9fafb]">
              Xử lý báo cáo
            </button>
            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#003366]">
              Thêm nội dung mới
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {data.metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.9fr)]">
            <RevenueChartCard points={data.revenueChart.points} data={data} />
            <TopCoursesCard
              courses={data.topCourses.courses}
              data={data}
              revenuePoints={data.revenueChart.points}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
            <CustomerFeedbackCard feedbacks={data.customerFeedback.feedbacks} data={data} />
            <ActivitySplitCard data={data} />
          </div>

          <RecentActivitiesCard activities={data.recentActivities} />
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

function RevenueChartCard({
  points,
  data,
}: {
  points: AdminRevenuePoint[];
  data: AdminOverviewData;
}) {
  const width = 760;
  const height = 540;
  const paddingLeft = 72;
  const paddingRight = 28;
  const paddingTop = 24;
  const paddingBottom = 36;
  const max = Math.max(...points.map((point) => point.value));
  const min = 0;
  const range = Math.max(max - min, 1);
  const yTicks = Array.from({ length: 4 }, (_, index) =>
    Math.round((max / 3) * (3 - index)),
  );
  const coordinates = points.map((point, index) => {
    const x =
      paddingLeft +
      (index / Math.max(points.length - 1, 1)) *
        (width - paddingLeft - paddingRight);
    const y =
      paddingTop +
      ((max - point.value) / range) *
        (height - paddingTop - paddingBottom);
    return { ...point, x, y };
  });
  const linePath = createSmoothPath(coordinates);
  const chartBottom = height - paddingBottom;
  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1].x} ${chartBottom} L ${coordinates[0].x} ${chartBottom} Z`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#98a2b3]">
            {data.revenueChart.rangeLabel}
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#001c3d]">
            {data.revenueChart.title}
          </h2>
        </div>
        <div className="rounded-xl bg-[#f8fafc] px-4 py-3 text-right">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#98a2b3]">
            {data.revenueChart.totalLabel}
          </p>
          <p className="mt-1 text-lg font-bold text-[#001c3d]">
            {data.revenueChart.totalValue}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[640px]">
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((tick, line) => {
            const y = paddingTop + line * ((height - paddingTop - paddingBottom) / 3);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  x2={width - paddingRight}
                  y1={y}
                  y2={y}
                  stroke="#e4e7ec"
                  strokeDasharray="5 7"
                />
                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#667085] text-[11px] font-bold"
                >
                  {formatRevenueTick(tick)}
                </text>
              </g>
            );
          })}
          <line x1={paddingLeft} x2={width - paddingRight} y1={chartBottom} y2={chartBottom} stroke="#d0d5dd" />
          <line x1={paddingLeft} x2={paddingLeft} y1={paddingTop} y2={chartBottom} stroke="#d0d5dd" />
          <path d={areaPath} fill="url(#revenueFill)" />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
          />
          {coordinates.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="4.5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
              <text x={point.x} y={height - 8} textAnchor="middle" className="fill-[#667085] text-[11px] font-bold">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </motion.section>
  );
}

function TopCoursesCard({
  courses,
  data,
  revenuePoints,
}: {
  courses: AdminTopCourse[];
  data: AdminOverviewData;
  revenuePoints: AdminRevenuePoint[];
}) {
  const maxSales = Math.max(...courses.map((course) => course.sales));
  const heatmapValues = courses.map((course, courseIndex) =>
    revenuePoints.slice(-7).map((point, pointIndex) => {
      const base = (course.sales / maxSales) * 0.72;
      const seasonal = (point.value / Math.max(...revenuePoints.map((item) => item.value))) * 0.28;
      const wave = ((courseIndex + pointIndex) % 3) * 0.08;
      return Math.min(1, base + seasonal + wave);
    }),
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#001c3d]">{data.topCourses.title}</h2>
        <p className="mt-1 text-sm text-[#667085]">{data.topCourses.subtitle}</p>
      </div>
      <div className="mb-5 overflow-x-auto rounded-xl bg-[#f8fafc] p-4">
        <div className="grid min-w-[420px] grid-cols-[120px_repeat(7,1fr)] gap-2">
          <div />
          {revenuePoints.slice(-7).map((point) => (
            <span key={point.label} className="text-center text-[10px] font-bold text-[#98a2b3]">
              {point.label}
            </span>
          ))}
          {courses.map((course, rowIndex) => (
            <React.Fragment key={course.id}>
              <span className="truncate text-xs font-semibold text-[#475467]">
                {course.category}
              </span>
              {heatmapValues[rowIndex].map((value, colIndex) => (
                <span
                  key={`${course.id}-${colIndex}`}
                  title={`${course.title}: ${Math.round(value * 100)}%`}
                  className="aspect-square rounded-[4px]"
                  style={{ backgroundColor: getHeatmapColor(value) }}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={course.id} className="rounded-xl bg-[#f8fafc] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#001c3d]">{course.title}</p>
                <p className="mt-1 text-xs font-semibold text-[#667085]">
                  #{index + 1} • {course.category} • {course.sales} lượt mua
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold text-[#2563eb]">{course.revenue}</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e4e7ec]">
              <div
                className="h-full rounded-full bg-[#2563eb]"
                style={{ width: `${Math.max(8, (course.sales / maxSales) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-medium text-[#667085]">
              Completion rate: {course.completionRate}%
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function CustomerFeedbackCard({
  feedbacks,
  data,
}: {
  feedbacks: AdminCustomerFeedback[];
  data: AdminOverviewData;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-primary">{data.customerFeedback.title}</h2>
          <p className="mt-1 text-sm text-[#667085]">Đánh giá mới nhất từ học viên</p>
        </div>
        <span className="rounded-full bg-[#fff7e6] px-3 py-1 text-sm font-bold text-[#b85f00]">
          {data.customerFeedback.averageRating}
        </span>
      </div>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <article key={feedback.id} className="rounded-xl border border-[#eef1f5] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-[#001c3d]">{feedback.customerName}</p>
                <p className="mt-1 text-xs text-[#667085]">{feedback.courseName}</p>
              </div>
              <span className="text-sm font-bold text-[#f28633]">
                {"★".repeat(feedback.rating)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#475467]">{feedback.comment}</p>
            <p className="mt-3 text-xs font-semibold text-[#98a2b3]">{feedback.createdAt}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}

function ActivitySplitCard({ data }: { data: AdminOverviewData }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.24 }}
      className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm"
    >
      <h2 className="text-sm font-bold uppercase tracking-wide text-[#98a2b3]">
        {data.activityCountLabel}
      </h2>
      <p className="mt-3 text-2xl font-bold text-[#001c3d]">
        {data.activityCountValue}
      </p>
      <div className="mt-5 space-y-3">
        {data.reportList.map((report) => (
          <OverviewReportRow key={report.id} report={report} />
        ))}
      </div>
    </motion.section>
  );
}

function OverviewReportRow({ report }: { report: AdminOverviewReportItem }) {
  return (
    <article className="rounded-xl border border-[#eef1f5] bg-[#f8fafc] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="line-clamp-1 font-bold text-[#001c3d]">{report.title}</p>
          <p className="mt-1 text-xs font-semibold text-[#667085]">
            {report.category} • {report.reporter}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${getOverviewReportStatusClass(report.status)}`}>
          {getOverviewReportStatusLabel(report.status)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${getOverviewSeverityClass(report.severity)}`}>
          {getOverviewSeverityLabel(report.severity)}
        </span>
        <button className="text-xs font-bold text-[#003366]">Xem report</button>
      </div>
    </article>
  );
}

function RecentActivitiesCard({ activities }: { activities: AdminRecentActivity[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#e4e7ec] bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-primary">Hoạt động gần đây</h2>
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
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function createSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) {
    return "";
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");
}

function getHeatmapColor(value: number) {
  if (value > 0.86) return "#0b5ed7";
  if (value > 0.72) return "#2563eb";
  if (value > 0.58) return "#60a5fa";
  if (value > 0.44) return "#bfdbfe";
  return "#eef4ff";
}

function formatRevenueTick(value: number) {
  return `${Math.round(value)}M`;
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

function getOverviewSeverityClass(severity: "low" | "medium" | "high") {
  switch (severity) {
    case "high":
      return "bg-[#fff3f1] text-[#b42318]";
    case "medium":
      return "bg-[#fff7e6] text-[#b85f00]";
    case "low":
    default:
      return "bg-[#e9f8ee] text-[#17803d]";
  }
}

function getOverviewSeverityLabel(severity: "low" | "medium" | "high") {
  switch (severity) {
    case "high":
      return "Mức độ cao";
    case "medium":
      return "Trung bình";
    case "low":
    default:
      return "Mức độ thấp";
  }
}

function getOverviewReportStatusClass(status: "open" | "in-review" | "resolved") {
  switch (status) {
    case "resolved":
      return "bg-[#e9f8ee] text-[#17803d]";
    case "in-review":
      return "bg-[#eef3ff] text-[#003366]";
    case "open":
    default:
      return "bg-[#fff7e6] text-[#b85f00]";
  }
}

function getOverviewReportStatusLabel(status: "open" | "in-review" | "resolved") {
  switch (status) {
    case "resolved":
      return "Đã xử lý";
    case "in-review":
      return "Đang xem xét";
    case "open":
    default:
      return "Đang mở";
  }
}

export default AdminOverviewPage;
