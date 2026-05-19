import React from "react";
import { adminDashboardService } from "../services/adminDashboardService";
import type { AdminReportItem, AdminReportsData } from "../types/adminDashboard";

const AdminReportsPage: React.FC = () => {
  const [data, setData] = React.useState<AdminReportsData | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const loadReports = async () => {
      const response = await adminDashboardService.getReports();
      if (mounted) {
        setData(response);
      }
    };
    void loadReports();
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return <div className="p-8">Đang tải báo cáo...</div>;
  }

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-8xl">
        <h1 className="text-3xl font-bold text-[#0b4f8a] sm:text-4xl">{data.title}</h1>
        <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.summary.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#667085]">{item.label}</p>
              <p className="mt-3 text-3xl font-bold text-[#0b4f8a]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e4e7ec] bg-white shadow-sm">
          <div className="min-w-[820px]">
          <div className="grid grid-cols-[1.6fr_1fr_0.9fr_1fr_1fr] bg-[#f8fafc] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
            <span>Báo cáo</span>
            <span>Danh mục</span>
            <span>Mức độ</span>
            <span>Trạng thái</span>
            <span>Người báo cáo</span>
          </div>
          {data.reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function ReportRow({ report }: { report: AdminReportItem }) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr_0.9fr_1fr_1fr] items-center border-t border-[#eef1f5] px-4 py-4 text-sm">
      <div>
        <p className="font-semibold text-[#101828]">{report.title}</p>
        <p className="mt-1 text-xs text-[#667085]">{report.createdAt}</p>
      </div>
      <p className="text-[#475467]">{report.category}</p>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getSeverityClass(report.severity)}`}>
        {getSeverityLabel(report.severity)}
      </span>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getReportStatusClass(report.status)}`}>
        {getReportStatusLabel(report.status)}
      </span>
      <p className="text-[#475467]">{report.reporter}</p>
    </div>
  );
}

function getSeverityClass(severity: "low" | "medium" | "high") {
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

function getSeverityLabel(severity: "low" | "medium" | "high") {
  switch (severity) {
    case "high":
      return "Cao";
    case "medium":
      return "Trung bình";
    case "low":
    default:
      return "Thấp";
  }
}

function getReportStatusClass(status: "open" | "in-review" | "resolved") {
  switch (status) {
    case "resolved":
      return "bg-[#e9f8ee] text-[#17803d]";
    case "in-review":
      return "bg-[#eef3ff] text-[#1267ad]";
    case "open":
    default:
      return "bg-[#fff7e6] text-[#b85f00]";
  }
}

function getReportStatusLabel(status: "open" | "in-review" | "resolved") {
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

export default AdminReportsPage;
