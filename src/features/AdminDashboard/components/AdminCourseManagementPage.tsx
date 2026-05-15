import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Image, Plus, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  AdminCourseManagementData,
  AdminCourseManagementItem,
  AdminCourseMode,
} from "../types/adminDashboard";

const courseTableColumns =
  "minmax(320px,1.8fr) minmax(130px,1fr) minmax(150px,1fr) minmax(120px,0.9fr) minmax(120px,0.9fr) minmax(100px,0.8fr) minmax(100px,0.8fr)";

const AdminCourseManagementPage: React.FC<{ mode: AdminCourseMode }> = ({ mode }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<AdminCourseManagementData | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);

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
      <div className="mx-auto max-w-8xl">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#98a2b3]">Bảng điều khiển / Quản lý khóa học</p>
            <h1 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">{data.title} - BitHub</h1>
            <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>
          </div>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-[#003366] sm:w-fit"
          >
            <Plus size={16} />
            {mode === "online" ? "Thêm khóa học online" : "Thêm khóa học mới"}
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
            <div className="min-w-[1120px]">
            <div
              className="grid bg-[#f8fafc] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]"
              style={{ gridTemplateColumns: courseTableColumns }}
            >
              <span>Tên khóa học</span>
              <span>Danh mục</span>
              <span>Giảng viên</span>
              <span>Trạng thái</span>
              <span>Giá</span>
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

      {mode === "online" && (
        <CreateOnlineCourseDialog
          open={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreate={(course) => {
            setData((current) =>
              current
                ? {
                    ...current,
                    courses: [course, ...current.courses],
                  }
                : current,
            );
            setIsCreateDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

type CreateOnlineCourseForm = {
  title: string;
  category: string;
  instructor: string;
  createdAt: string;
  level: string;
  price: string;
  thumbnail: string;
  description: string;
};

const initialCreateOnlineCourseForm: CreateOnlineCourseForm = {
  title: "",
  category: "Software",
  instructor: "",
  createdAt: new Date().toISOString().slice(0, 10),
  level: "Beginner",
  price: "",
  thumbnail:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  description: "",
};

function CreateOnlineCourseDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (course: AdminCourseManagementItem) => void;
}) {
  const [form, setForm] = React.useState<CreateOnlineCourseForm>(initialCreateOnlineCourseForm);

  React.useEffect(() => {
    if (open) {
      setForm(initialCreateOnlineCourseForm);
    }
  }, [open]);

  if (!open) return null;

  const updateField = (field: keyof CreateOnlineCourseForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = form.title.trim();
    const instructor = form.instructor.trim();

    if (!title || !instructor) return;

    onCreate({
      id: `online-draft-${Date.now()}`,
      title,
      category: form.category,
      instructor,
      status: "draft",
      enrollment: "0",
      price: form.price.trim() || "Miễn phí",
      createdAt: formatCreatedDate(form.createdAt),
      updatedAt: "Vừa tạo",
      thumbnail: form.thumbnail.trim() || initialCreateOnlineCourseForm.thumbnail,
      format: "online",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001c3d]/55 px-4 py-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-[#e4e7ec] px-6 py-5">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf6ff] text-[#003366]">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#001c3d]">Thêm khóa học trực tuyến</h2>
              <p className="mt-1 text-sm text-[#667085]">
                Tạo bản nháp khóa học online trước khi thêm chương, video, bài tập và quiz.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#667085] hover:bg-[#f2f4f7] hover:text-[#001c3d]"
            aria-label="Đóng dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(92vh-88px)] overflow-y-auto">
          <div className="grid gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-5">
              <Field label="Tên khóa học" required>
                <input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="VD: React chuyên sâu cho Frontend Engineer"
                  className="h-11 w-full rounded-lg border border-[#d0d5dd] px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Danh mục">
                  <select
                    value={form.category}
                    onChange={(event) => updateField("category", event.target.value)}
                    className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                  >
                    <option>Software</option>
                    <option>Data</option>
                    <option>Design</option>
                    <option>Innovation</option>
                    <option>Business</option>
                  </select>
                </Field>
                <Field label="Cấp độ">
                  <select
                    value={form.level}
                    onChange={(event) => updateField("level", event.target.value)}
                    className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Giảng viên" required>
                  <input
                    value={form.instructor}
                    onChange={(event) => updateField("instructor", event.target.value)}
                    placeholder="Tên giảng viên"
                    className="h-11 w-full rounded-lg border border-[#d0d5dd] px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                  />
                </Field>
                <Field label="Học phí">
                  <input
                    value={form.price}
                    onChange={(event) => updateField("price", event.target.value)}
                    placeholder="VD: 1.200.000đ"
                    className="h-11 w-full rounded-lg border border-[#d0d5dd] px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                  />
                </Field>
              </div>

              <Field label="Ngày tạo">
                <input
                  type="date"
                  value={form.createdAt}
                  onChange={(event) => updateField("createdAt", event.target.value)}
                  className="h-11 w-full rounded-lg border border-[#d0d5dd] px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                />
              </Field>

              <Field label="Mô tả ngắn">
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Tóm tắt giá trị khóa học, đối tượng phù hợp và kết quả đầu ra."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#d0d5dd] px-3 py-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                />
              </Field>
            </div>

            <aside className="space-y-4">
              <Field label="Ảnh đại diện">
                <input
                  value={form.thumbnail}
                  onChange={(event) => updateField("thumbnail", event.target.value)}
                  placeholder="URL ảnh thumbnail"
                  className="h-11 w-full rounded-lg border border-[#d0d5dd] px-3 text-sm outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/15"
                />
              </Field>
              <div className="overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#f8fafc]">
                {form.thumbnail ? (
                  <img src={form.thumbnail} alt="Course thumbnail preview" className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-[#98a2b3]">
                    <Image size={28} />
                  </div>
                )}
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-bold text-[#001c3d]">
                    {form.title || "Tên khóa học mới"}
                  </p>
                  <p className="mt-1 text-xs text-[#667085]">
                    {form.category} • {form.level}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#98a2b3]">
                    Ngày tạo: {formatCreatedDate(form.createdAt)}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#e4e7ec] bg-[#f8fafc] px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#f2f4f7]"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001c3d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#003366]"
            >
              <Save size={16} />
              Tạo bản nháp
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#344054]">
        {label}
        {required && <span className="text-[#b42318]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function CourseTableRow({
  course,
  onOpen,
}: {
  course: AdminCourseManagementItem;
  onOpen: () => void;
}) {
  return (
    <div
      className="grid items-center border-t border-[#eef1f5] px-4 py-4 text-sm"
      style={{ gridTemplateColumns: courseTableColumns }}
    >
      <div className="flex items-center gap-3">
        <img src={course.thumbnail} alt={course.title} className="h-12 w-12 rounded-lg object-cover" />
        <div>
          <p className="font-semibold text-[#101828]">{course.title}</p>
          <p className="text-xs text-[#667085]">Ngày tạo: {course.createdAt}</p>
          <p className="text-xs text-[#98a2b3]">Cập nhật: {course.updatedAt}</p>
        </div>
      </div>
      <p className="text-[#475467]">{course.category}</p>
      <p className="text-[#475467]">{course.instructor}</p>
      <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${getCourseStatusClass(course.status)}`}>
        {getCourseStatusLabel(course.status)}
      </span>
      <p className="font-semibold text-[#001c3d]">{course.price}</p>
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

function formatCreatedDate(value: string) {
  if (!value) return "Chưa chọn";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return `Ngày tạo ${date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;
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
