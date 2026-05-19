import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Eye,
  FileArchive,
  FileText,
  Info,
  MapPin,
  Presentation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dashboardOfflineCoursesService } from "../services/dashboardOfflineCoursesService";
import type {
  DashboardOfflineCourseItem,
  DashboardOfflineCoursesData,
} from "../types/dashboardOfflineCourses";
import type {
  WorkshopAsset,
  WorkshopAssetIcon,
} from "@/features/OfflineWorkshops/types/offlineWorkshop";

export const DashboardOfflineCourses: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<DashboardOfflineCoursesData | null>(
    null,
  );

  React.useEffect(() => {
    let mounted = true;

    const loadOfflineCourses = async () => {
      const response =
        await dashboardOfflineCoursesService.getDashboardOfflineCourses();

      if (mounted) {
        setData(response);
      }
    };

    void loadOfflineCourses();

    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="p-4 pb-20 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-20 rounded-xl bg-white" />
          <div className="grid gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[360px] rounded-xl bg-white" />
                <div className="h-[360px] rounded-xl bg-white" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-72 rounded-xl bg-white" />
              <div className="h-64 rounded-xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-1 text-3xl font-bold text-[#1267ad] sm:text-4xl">
            Khóa học trực tiếp của tôi
          </h1>
          <p className="text-on-surface-variant">
            Quản lý các workshop kỹ thuật trực tiếp và lịch học tại cơ sở.
          </p>
        </motion.div>

        <button className="w-full rounded border border-outline-variant bg-surface-container-low px-4 py-2 font-medium text-on-surface-variant shadow-sm transition-colors hover:bg-surface-container sm:w-fit">
          Lọc: Tất cả trạng thái
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="mb-6 flex items-center gap-2 text-xl font-bold text-[#1267ad]">
            <Calendar size={24} />
            <h2>Workshop trực tiếp đã tham gia</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.enrolledWorkshops.map((workshop, index) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                index={index}
                onViewDetail={() =>
                  navigate(`/dashboard/office-workshop/${workshop.id}`)
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-6 xl:pt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-primary p-6 text-white shadow-lg"
          >
            <h3 className="mb-6 text-lg font-bold text-white/90">Buổi học tiếp theo</h3>

            <div className="mb-8 flex items-start gap-4">
              <div className="flex shrink-0 flex-col items-center justify-center">
                <span className="mb-1 text-4xl font-bold leading-none">
                  {data.nextSession.dayLabel}
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-[#f97316]">
                  {data.nextSession.monthLabel}
                </span>
              </div>
              <div className="pt-1">
                <h4 className="mb-2 text-lg font-bold leading-tight">
                  {data.nextSession.title}
                </h4>
                <p className="text-sm text-white/70">
                  {data.nextSession.locationLabel}
                </p>
                <p className="text-sm text-white/70">
                  {data.nextSession.timeLabel}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#f97316]">
                Hướng dẫn địa điểm
              </h5>
              <ul className="space-y-4">
                {data.nextSession.instructions.map((instruction) => (
                  <li
                    key={instruction}
                    className="flex items-start gap-3 text-sm text-white/80"
                  >
                    <Info size={16} className="mt-0.5 shrink-0 text-white/60" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-2 text-lg font-bold text-[#1267ad]">
              <FileText size={20} />
              <h3>Tài nguyên workshop</h3>
            </div>

            <div className="space-y-3">
              {data.resources.map((resource) => (
                <ResourceItem key={resource.id} resource={resource} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

function WorkshopCard({
  workshop,
  index,
  onViewDetail,
}: {
  workshop: DashboardOfflineCourseItem;
  index: number;
  onViewDetail: () => void;
}) {
  const statusClassName =
    workshop.statusTone === "primary"
      ? "bg-[#f97316] text-white"
      : "border border-outline-variant bg-white text-on-surface-variant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={workshop.thumbnail}
          alt={workshop.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute right-4 top-4 rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${statusClassName}`}
        >
          {workshop.statusLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#f97316]">
          {workshop.category}
        </div>
        <h3 className="mb-6 min-h-[56px] text-xl font-bold text-[#1267ad]">
          {workshop.title}
        </h3>

        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <MapPin size={16} />
            <span className="truncate">{workshop.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Calendar size={16} />
            <span>
              {workshop.startDate} - {workshop.endDate}
            </span>
          </div>
        </div>

        <button
          onClick={onViewDetail}
          className="mt-auto w-full rounded bg-primary py-3 font-bold text-white transition-colors hover:bg-[#1267ad] active:scale-[0.98]"
        >
          XEM CHI TIẾT
        </button>
      </div>
    </motion.div>
  );
}

function ResourceItem({ resource }: { resource: WorkshopAsset }) {
  const Icon = getResourceIcon(resource.icon);
  const ActionIcon = resource.action === "preview" ? Eye : Download;

  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-lg border border-outline-variant p-4 transition-colors hover:bg-surface-container">
      <div className="shrink-0 rounded bg-orange-50 p-2">
        <Icon className="text-[#f97316]" size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-[#1267ad]">
          {resource.title}
        </div>
        {resource.subtitle ? (
          <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            {resource.subtitle}
          </div>
        ) : null}
      </div>
      <button className="shrink-0 rounded p-2 opacity-60 transition-all group-hover:bg-white group-hover:opacity- 100">
        <ActionIcon size={18} className="text-on-surface-variant" />
      </button>
    </div>
  );
}

function getResourceIcon(icon: WorkshopAssetIcon) {
  switch (icon) {
    case "file-archive":
      return FileArchive;
    case "map":
      return MapPin;
    case "presentation":
      return Presentation;
    case "file-text":
    default:
      return FileText;
  }
}

export default DashboardOfflineCourses;
