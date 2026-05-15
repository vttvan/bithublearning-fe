import React from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Code2,
  Download,
  GraduationCap,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { achievementsService } from "../services/achievementsService";
import type {
  AchievementBadge,
  AchievementStat,
  AchievementStatIcon,
  AchievementsPageData,
  BadgeIcon,
  ProfessionalCertificate,
} from "../types/achievements";

export const DashboardAchievementsPage: React.FC = () => {
  const [data, setData] = React.useState<AchievementsPageData | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const loadAchievements = async () => {
      const response = await achievementsService.getAchievements();
      if (mounted) {
        setData(response);
      }
    };

    void loadAchievements();

    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="p-4 pb-20 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-5">
          <div className="h-16 w-96 rounded-xl bg-white" />
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <div className="space-y-4">
              <div className="h-64 rounded-xl bg-white" />
              <div className="h-48 rounded-xl bg-white" />
            </div>
            <div className="h-[640px] rounded-xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5f2] p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-8xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">{data.title}</h1>
          <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="grid gap-4">
              {data.stats.map((stat, index) => (
                <StatCard key={stat.id} stat={stat} index={index} />
              ))}
            </div>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="rounded-xl border border-[#e6e9ef] bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#001c3d]">Bộ sưu tập huy hiệu</h2>
                <span className="text-[11px] font-semibold text-[#f28633]">
                  Đã mở 8 / 24
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {data.badges.map((badge) => (
                  <BadgeTile key={badge.id} badge={badge} />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="rounded-xl bg-[#08345b] p-5 text-white shadow-sm"
            >
              <h2 className="text-base font-bold">{data.milestone.title}</h2>
              <p className="mt-3 text-xs leading-relaxed text-white/80">
                {data.milestone.description}
              </p>
              <button className="mt-5 w-full rounded-md bg-[#0d2648] px-4 py-2.5 text-xs font-bold text-white ring-1 ring-white/20">
                {data.milestone.actionLabel}
              </button>
            </motion.section>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="rounded-xl border border-[#e6e9ef] bg-white p-5 shadow-sm"
          >
            <h2 className="mb-5 text-2xl font-bold text-primary">
              Chứng chỉ chuyên môn
            </h2>
            <div className="space-y-4">
              {data.certificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                />
              ))}
            </div>
            <p className="mt-6 text-center text-xs font-medium text-[#667085]">
              {data.archiveLabel}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

function StatCard({ stat, index }: { stat: AchievementStat; index: number }) {
  const Icon = getStatIcon(stat.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl border border-[#e6e9ef] bg-white p-5 shadow-sm"
    >
      <Icon size={16} className="text-[#f28633]" />
      <h3 className="mt-4 text-2xl font-bold text-[#001c3d]">{stat.value}</h3>
      <p className="mt-1 text-sm font-semibold text-[#344054]">{stat.label}</p>
      <p className="mt-3 text-[11px] text-[#f28633]">{stat.supportingText}</p>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#f2f4f7]">
        <div className="h-full w-3/4 bg-[#f28633]" />
      </div>
    </motion.article>
  );
}

function BadgeTile({ badge }: { badge: AchievementBadge }) {
  const Icon = getBadgeIcon(badge.icon);

  return (
    <div
      className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-center ${
        badge.active
          ? "border-[#d9f2e2] bg-[#e9f8ee] text-[#0f8a43]"
          : "border-[#eaecf0] bg-[#f9fafb] text-[#98a2b3]"
      }`}
    >
      <Icon size={18} />
      <span className="mt-2 px-2 text-[10px] font-bold leading-tight">
        {badge.label}
      </span>
    </div>
  );
}

function CertificateCard({
  certificate,
}: {
  certificate: ProfessionalCertificate;
}) {
  return (
    <article className="grid gap-4 rounded-xl border border-[#eaecf0] p-4 md:grid-cols-[180px_1fr]">
      <img
        src={certificate.previewImage}
        alt={certificate.title}
        className="h-28 w-full rounded-lg object-cover"
      />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-secondary-container">
          {certificate.category}
        </p>
        <h3 className="mt-1 text-xl font-bold leading-tight text-primary sm:text-2xl">
          {certificate.title}
        </h3>
        <p className="mt-2 text-sm text-[#667085]">
          {certificate.issuedAt} • {certificate.certificateId}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-[#003366]">
            <Download size={14} />
            {certificate.downloadLabel}
          </button>
          <button className="rounded-md border border-[#d0d5dd] px-4 py-2.5 text-xs font-bold text-[#344054] hover:bg-[#f9fafb]">
            {certificate.verifyLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

function getStatIcon(icon: AchievementStatIcon) {
  switch (icon) {
    case "graduation":
      return GraduationCap;
    case "star":
      return Star;
    case "clock":
    default:
      return Clock3;
  }
}

function getBadgeIcon(icon: BadgeIcon) {
  switch (icon) {
    case "code":
      return Code2;
    case "shield":
      return ShieldCheck;
    case "sparkles":
      return Sparkles;
    case "medal":
      return Medal;
    case "trophy":
    default:
      return Trophy;
  }
}

export default DashboardAchievementsPage;
