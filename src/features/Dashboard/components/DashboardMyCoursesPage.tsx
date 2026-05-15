import React from "react";
import { motion } from "framer-motion";
import { Play, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { myCoursesService } from "../services/myCoursesService";
import type {
  EnrolledCourseCardData,
  MyCoursesPageData,
  MyCourseStatus,
} from "../types/myCourses";

export const DashboardMyCoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<MyCoursesPageData | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<MyCourseStatus>("all");

  React.useEffect(() => {
    let mounted = true;

    const loadMyCourses = async () => {
      const response = await myCoursesService.getMyCourses();
      if (mounted) {
        setData(response);
      }
    };

    void loadMyCourses();

    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="p-4 pb-20 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-5">
          <div className="h-16 w-96 rounded-xl bg-white" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-[320px] rounded-xl bg-white" />
            <div className="h-[320px] rounded-xl bg-white" />
            <div className="h-[320px] rounded-xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  const visibleCourses =
    activeFilter === "all"
      ? data.courses
      : data.courses.filter((course) => course.status === activeFilter);

  return (
    <div className="bg-[#f7f5f2] p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#001c3d] sm:text-4xl">{data.title}</h1>
            <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {data.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-md px-4 py-2 text-xs font-bold transition-colors ${
                  activeFilter === filter.value
                    ? "bg-[#001c3d] text-white"
                    : "border border-[#d0d5dd] bg-white text-[#344054] hover:bg-[#f9fafb]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onOpen={() =>
                course.status === "completed"
                  ? navigate("/dashboard/achievements")
                  : navigate(`/course-player/${course.id}`)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function CourseCard({
  course,
  index,
  onOpen,
}: {
  course: EnrolledCourseCardData;
  index: number;
  onOpen: () => void;
}) {
  const isCompleted = course.status === "completed";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`overflow-hidden rounded-xl border shadow-sm ${
        isCompleted
          ? "border-[#d5dae1] bg-[#f4f5f7]"
          : "border-[#d9dee5] bg-white"
      }`}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className={`h-full w-full object-cover ${
            isCompleted ? "opacity-80 grayscale-[0.2]" : ""
          }`}
        />
        <div className="absolute left-3 top-3 rounded-sm bg-[#f28633] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {course.levelTag}
        </div>
        {isCompleted ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#667085]">
            <Trophy size={12} />
            Đã hoàn thành
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <h2
          className={`min-h-[56px] text-xl font-bold leading-tight ${
            isCompleted ? "text-[#6b7280]" : "text-[#001c3d]"
          }`}
        >
          {course.title}
        </h2>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
          {course.category}
        </p>
        <p className="mt-2 text-sm text-[#606a76]">{course.currentLessonLabel}</p>

        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e4e7ec]">
            <div
              className={`h-full ${
                isCompleted ? "bg-[#bdbfc4]" : "bg-[#f28633]"
              }`}
              style={{ width: `${course.progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-right text-[11px] text-[#98a2b3]">
            {course.progressLabel}
          </p>
        </div>

        <button
          onClick={onOpen}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold transition-colors ${
            isCompleted
              ? "border border-[#cfd4dc] bg-white text-[#667085] hover:bg-[#f9fafb]"
              : "bg-primary text-white hover:bg-[#003366]"
          }`}
        >
          <Play size={15} />
          {course.actionLabel}
        </button>
      </div>
    </motion.article>
  );
}

export default DashboardMyCoursesPage;
