import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  AdminCourseManagementData,
  AdminCourseManagementItem,
  AdminCourseMode,
} from "../types/adminDashboard";

const AdminCourseManagementPage: React.FC<{ mode: AdminCourseMode }> = ({ mode }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<AdminCourseManagementData | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const loadCourses = async () => {
      const response = await adminDashboardService.getCourseManagement(mode);
      if (mounted) {
        setData(response);
      }
    };
    void loadCourses();
    return () => {
      mounted = false;
    };
  }, [mode]);

  if (!data) {
    return <div className="p-8">Đang tải khóa học...</div>;
  }

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#98a2b3]">Bảng điều khiển / Quản lý khóa học</p>
            <h1 className="mt-2 text-3xl font-bold text-[#001c3d] sm:text-4xl">{data.title} - BitHub</h1>
            <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>
          </div>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#001c3d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#003366] sm:w-fit">
            <Plus size={16} />
            Thêm khóa học mới
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {data.summary.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#667085]">{item.label}</p>
              <p className="mt-3 text-3xl font-bold text-[#001c3d]">{item.value}</p>
              <p className="mt-2 text-xs font-semibold text-[#f28633]">{item.meta}</p>
            </div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {data.filters.map((filter) => (
              <button
                key={filter}
                className="rounded-lg border border-[#d0d5dd] bg-[#f8fafc] px-3 py-2 text-xs font-semibold text-[#344054]"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#eef1f5]">
            <div className="min-w-[920px]">
            <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.8fr] bg-[#f8fafc] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
              <span>Tên khóa học</span>
              <span>Danh mục</span>
              <span>Giảng viên</span>
              <span>Trạng thái</span>
              <span>Ghi danh</span>
              <span>Thao tác</span>
            </div>
            {data.courses.map((course) => (
              <CourseTableRow
                key={course.id}
                course={course}
                onOpen={() =>
                  navigate(
                    mode === "online"
                      ? `/dashboard/admin/courses/online/${course.id}`
                      : `/dashboard/admin/courses/offline/${course.id}`,
                  )
                }
              />
            ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

function CourseTableRow({
  course,
  onOpen,
}: {
  course: AdminCourseManagementItem;
  onOpen: () => void;
}) {
  return (
    <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.8fr] items-center border-t border-[#eef1f5] px-4 py-4 text-sm">
      <div className="flex items-center gap-3">
        <img src={course.thumbnail} alt={course.title} className="h-12 w-12 rounded-lg object-cover" />
        <div>
          <p className="font-semibold text-[#101828]">{course.title}</p>
          <p className="text-xs text-[#667085]">{course.updatedAt}</p>
        </div>
      </div>
      <p className="text-[#475467]">{course.category}</p>
      <p className="text-[#475467]">{course.instructor}</p>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getCourseStatusClass(course.status)}`}>
        {getCourseStatusLabel(course.status)}
      </span>
      <p className="text-[#475467]">{course.enrollment}</p>
      <button
        onClick={onOpen}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#003366]"
      >
        Quản lý
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

function getCourseStatusClass(status: "published" | "draft" | "review") {
  switch (status) {
    case "published":
      return "bg-[#e9f8ee] text-[#17803d]";
    case "review":
      return "bg-[#fff7e6] text-[#b85f00]";
    case "draft":
    default:
      return "bg-[#f2f4f7] text-[#667085]";
  }
}

function getCourseStatusLabel(status: "published" | "draft" | "review") {
  switch (status) {
    case "published":
      return "Đã xuất bản";
    case "review":
      return "Đang duyệt";
    case "draft":
    default:
      return "Bản nháp";
  }
}

export default AdminCourseManagementPage;
