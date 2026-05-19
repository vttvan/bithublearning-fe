import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileArchive,
  FileText,
  Heart,
  Infinity,
  MapPin,
  Navigation,
  Play,
  Presentation,
  Share2,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import { offlineWorkshopsService } from "../services/offlineWorkshopsService";
import { OFFLINE_WORKSHOPS_MOCK } from "../mocks/offlineWorkshops.mock";
import type {
  OfflineWorkshop,
  WorkshopAsset,
  WorkshopAssetIcon,
  WorkshopSyllabusItem,
  WorkshopSession,
} from "../types/offlineWorkshop";

const PUBLIC_TABS = [
  { id: "overview", label: "Tổng quan" },
  { id: "curriculum", label: "Chương trình học" },
  { id: "instructor", label: "Giảng viên" },
  { id: "reviews", label: "Đánh giá" },
  { id: "faq", label: "Câu hỏi thường gặp" },
] as const;
type PublicWorkshopTab = (typeof PUBLIC_TABS)[number]["id"];

const OfflineWorkshopDetailPage: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const location = useLocation();
  const isDashboardDetail = location.pathname.startsWith("/dashboard");
  const [workshop, setWorkshop] = React.useState<OfflineWorkshop | null>(null);
  const [activeTab, setActiveTab] = React.useState<PublicWorkshopTab>("overview");
  const [expandedSyllabus, setExpandedSyllabus] = React.useState<string[]>(["m1"]);

  React.useEffect(() => {
    let mounted = true;

    const loadWorkshop = async () => {
      const response = await offlineWorkshopsService.getOfflineWorkshopById(id);
      if (mounted) {
        setWorkshop(response);
      }
    };

    void loadWorkshop();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!workshop) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-6 w-72 rounded bg-white" />
          <div className="h-[280px] rounded bg-white" />
          <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
            <div className="space-y-5">
              <div className="h-40 rounded bg-white" />
              <div className="h-40 rounded bg-white" />
              <div className="h-40 rounded bg-white" />
            </div>
            <div className="space-y-5">
              <div className="h-72 rounded bg-white" />
              <div className="h-48 rounded bg-white" />
              <div className="h-56 rounded bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbPath = isDashboardDetail
    ? "/dashboard/offline-courses"
    : "/offline-workshops";
  const breadcrumbLabel = isDashboardDetail
    ? "Khóa học trực tiếp của tôi"
    : "Workshop trực tiếp";
  const heroDate = `${workshop.startDate} - ${workshop.endDate}`;
  const attendance = workshop.attendance;

  if (!isDashboardDetail) {
    const relatedWorkshops = OFFLINE_WORKSHOPS_MOCK.filter(
      (item) => item.category === workshop.category && item.id !== workshop.id,
    ).slice(0, 3);

    const toggleSyllabus = (moduleId: string) => {
      setExpandedSyllabus((current) =>
        current.includes(moduleId)
          ? current.filter((item) => item !== moduleId)
          : [...current, moduleId],
      );
    };

    return (
      <PublicWorkshopDetail
        workshop={workshop}
        activeTab={activeTab}
        expandedSyllabus={expandedSyllabus}
        relatedWorkshops={relatedWorkshops}
        onTabChange={setActiveTab}
        onToggleSyllabus={toggleSyllabus}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#5d6673]">
          <Link to={breadcrumbPath} className="hover:text-[#1267ad]">
            {breadcrumbLabel}
          </Link>
          <ChevronRight size={13} />
          <span className="truncate text-[#0b4f8a]">{workshop.title}</span>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[4px] border border-[#0f3554] bg-[#082b4a] shadow-sm"
        >
          <img
            src={workshop.thumbnail}
            alt={workshop.title}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#176da8]/95 via-[#176da8]/88 to-[#176da8]/62" />

          <div className="relative min-h-[260px] p-6 sm:p-8 lg:p-10">
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-bold">
              <span className="rounded-full bg-[#f97316] px-4 py-1.5 uppercase tracking-wide text-white">
                {attendance?.statusLabel ?? "Đã lên lịch"}
              </span>
              <span className="flex items-center gap-1.5 text-white/88">
                <Calendar size={14} />
                {heroDate}
              </span>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                  {workshop.title}
                </h1>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/82">
                  <MapPin size={17} />
                  {workshop.location}
                </p>
              </div>

              {attendance ? (
                <div className="w-fit min-w-[160px] border border-white/15 bg-white/12 p-5 text-white shadow-lg backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Điểm danh
                  </p>
                  <p className="mt-1 text-3xl font-bold leading-none">
                    Ngày {attendance.currentDay}{" "}
                    <span className="text-base text-white/70">trên</span>
                  </p>
                  <p className="mt-1 text-lg font-bold text-white/65">
                    {attendance.totalDays}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative h-1 bg-white/12">
            <div
              className="h-full bg-[#f97316]"
              style={{ width: `${attendance?.progressPercent ?? 0}%` }}
            />
          </div>
        </motion.section>

        <div className="mt-8 grid gap-7 xl:grid-cols-[1fr_330px]">
          <main>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-[#0b4f8a]">
                Lịch học
              </h2>
              <button className="inline-flex items-center gap-2 text-sm font-bold text-[#0b4f8a] hover:text-[#f97316]">
                <Download size={16} />
                Tải lịch (.ics)
              </button>
            </div>

            <div className="relative pl-8">
              <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#cfd4dc]" />
              <div className="space-y-5">
                {(workshop.sessions ?? []).map((session, index) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </main>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <VenueCard workshop={workshop} />
            <InstructorsCard workshop={workshop} />
            <MaterialsCard materials={workshop.materials ?? []} />
          </aside>
        </div>
      </div>
    </div>
  );
};

function PublicWorkshopDetail({
  workshop,
  activeTab,
  expandedSyllabus,
  relatedWorkshops,
  onTabChange,
  onToggleSyllabus,
}: {
  workshop: OfflineWorkshop;
  activeTab: PublicWorkshopTab;
  expandedSyllabus: string[];
  relatedWorkshops: OfflineWorkshop[];
  onTabChange: (tab: PublicWorkshopTab) => void;
  onToggleSyllabus: (moduleId: string) => void;
}) {
  const heroDate = `${workshop.startDate} - ${workshop.endDate}`;
  const instructor = workshop.instructors?.[0];
  const heroRef = React.useRef<HTMLElement | null>(null);
  const [showStickyHeader, setShowStickyHeader] = React.useState(false);
  const relatedItems = relatedWorkshops.length
    ? relatedWorkshops
    : OFFLINE_WORKSHOPS_MOCK.filter((item) => item.id !== workshop.id).slice(0, 3);

  React.useEffect(() => {
    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      setShowStickyHeader(heroBottom <= 64);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-gradient relative py-12 md:py-16"
      >
        <div className="relative z-10 mx-auto max-w-container-max px-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-flex rounded bg-[#f97316] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {workshop.category}
            </span>
            <h1 className="mb-4 font-display text-[36px] font-bold leading-tight text-on-primary md:text-[42px]">
              {workshop.title}
            </h1>
            <p className="mb-6 max-w-full text-body-lg leading-relaxed text-primary-fixed-dim">
              {workshop.subtitle ?? workshop.description}
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-white/84">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} />
                {workshop.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={16} />
                {heroDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={16} />
                Còn {workshop.seatsRemaining ?? 24} chỗ
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#f7b955]">4.8</span>
              <span className="flex gap-0.5">{renderStars(4.8)}</span>
              <span className="text-sm text-white/70">(128 đánh giá)</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {showStickyHeader ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-primary-container px-4 py-3 text-white shadow-xl"
          >
            <div className="mx-auto flex max-w-container-max flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold md:text-lg">
                  {workshop.title}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded bg-cyan-100 px-2 py-0.5 text-xs font-bold text-primary">
                    {workshop.category}
                  </span>
                  <span className="font-bold text-amber-400">4.8</span>
                  <span className="flex gap-0.5">{renderStars(4.8, 12)}</span>
                  <span className="text-white/80">(128 đánh giá)</span>
                  <span className="text-white/80">
                    Còn {workshop.seatsRemaining ?? 24} chỗ
                  </span>
                  <span className="text-white/80">{heroDate}</span>
                </div>
              </div>
              <button className="hidden shrink-0 rounded-lg bg-secondary-container px-5 py-2 text-sm font-bold text-on-secondary-container shadow-lg hover:brightness-110 md:block">
                Đăng ký ngay
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto max-w-container-max px-md py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <main className="min-w-0">
            <nav className="mb-8 flex gap-6 overflow-x-auto border-b border-outline-variant">
              {PUBLIC_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`shrink-0 border-b-2 pb-3 text-sm font-bold transition-colors ${
                    activeTab === tab.id
                      ? "border-[#f97316] text-[#1267ad]"
                      : "border-transparent text-on-surface-variant hover:text-[#1267ad]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {activeTab === "overview" ? <PublicOverview workshop={workshop} /> : null}
            {activeTab === "curriculum" ? (
              <PublicCurriculum
                syllabus={workshop.syllabus ?? []}
                expandedSyllabus={expandedSyllabus}
                onToggleSyllabus={onToggleSyllabus}
              />
            ) : null}
            {activeTab === "instructor" ? (
              <PublicInstructor instructors={workshop.instructors ?? []} />
            ) : null}
            {activeTab === "reviews" ? (
              <EmptyPublicTab title="Đánh giá cho workshop này đang được tổng hợp." />
            ) : null}
            {activeTab === "faq" ? (
              <EmptyPublicTab title="Câu hỏi thường gặp sẽ được cập nhật sớm." />
            ) : null}

            {activeTab === "overview" ? (
              <div className="mt-10">
                <PublicCurriculum
                  syllabus={workshop.syllabus ?? []}
                  expandedSyllabus={expandedSyllabus}
                  onToggleSyllabus={onToggleSyllabus}
                />
              </div>
            ) : null}

            <section className="pt-14">
              <h2 className="mb-6 font-display text-2xl font-bold text-primary">
                Các workshop liên quan
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {relatedItems.map((item) => (
                  <RelatedWorkshopCard key={item.id} workshop={item} />
                ))}
              </div>
            </section>
          </main>

          <aside className="w-full shrink-0 self-start lg:sticky lg:top-36 lg:z-30">
            <PublicPricingCard workshop={workshop} instructorName={instructor?.name} />
          </aside>
        </div>
      </div>
    </>
  );
}

function PublicOverview({ workshop }: { workshop: OfflineWorkshop }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-[#1267ad]">
        Tổng quan khóa học
      </h2>
      <p className="mb-8 text-base leading-relaxed text-on-surface-variant">
        {workshop.description}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {(workshop.highlights ?? []).map((highlight) => (
          <div key={highlight.id} className="flex items-start gap-3">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#f97316]" />
            <div>
              <h3 className="font-bold text-[#1267ad]">{highlight.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PublicCurriculum({
  syllabus,
  expandedSyllabus,
  onToggleSyllabus,
}: {
  syllabus: WorkshopSyllabusItem[];
  expandedSyllabus: string[];
  onToggleSyllabus: (moduleId: string) => void;
}) {
  return (
    <section>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-2xl font-bold text-[#1267ad]">
          Chương trình học
        </h2>
        <span className="text-sm font-medium text-on-surface-variant">
          {syllabus.length} học phần
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-outline-variant bg-white">
        {syllabus.map((item) => {
          const isOpen = expandedSyllabus.includes(item.id);

          return (
            <div key={item.id} className="border-b border-outline-variant last:border-b-0">
              <button
                onClick={() => onToggleSyllabus(item.id)}
                className="flex w-full items-center justify-between gap-4 bg-surface-container-low px-5 py-4 text-left transition-colors hover:bg-surface-container"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <ChevronRight
                    size={18}
                    className={`shrink-0 text-[#1267ad] transition-transform ${isOpen ? "rotate-90" : ""}`}
                  />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-[#f97316]">
                      {item.day}
                    </span>
                    <span className="font-bold text-[#1267ad]">{item.title}</span>
                  </span>
                </span>
              </button>
              {isOpen ? (
                <div className="px-5 py-4">
                  <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {item.topics.map((topic) => (
                      <span key={topic} className="flex items-center gap-2 text-sm text-on-background">
                        <Play size={13} className="shrink-0 text-[#f97316]" />
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PublicInstructor({ instructors }: { instructors: OfflineWorkshop["instructors"] }) {
  return (
    <section>
      <h2 className="mb-6 font-display text-2xl font-bold text-[#1267ad]">
        Giảng viên
      </h2>
      <div className="space-y-6">
        {(instructors ?? []).map((instructor) => (
          <article key={instructor.id} className="flex gap-5">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-[#1267ad]">{instructor.name}</h3>
              <p className="mb-3 text-sm font-semibold text-on-surface-variant">
                {instructor.title}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                {instructor.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PublicPricingCard({
  workshop,
  instructorName,
}: {
  workshop: OfflineWorkshop;
  instructorName?: string;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-lg">
      <div className="relative aspect-video">
        <img src={workshop.thumbnail} alt={workshop.title} className="h-full w-full object-cover" />
        <button className="absolute inset-0 flex items-center justify-center bg-black/28 transition-colors hover:bg-black/38">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-xl">
            <Play size={25} className="ml-1 fill-primary" />
          </span>
        </button>
      </div>
      <div className="space-y-5 p-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-primary">
            {formatUsd(workshop.price ?? 0)}
          </span>
          <span className="text-sm font-semibold text-secondary-container">
            {workshop.progressText}
          </span>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary-container py-3.5 font-bold text-primary-container shadow-sm transition-all hover:brightness-110 active:scale-[0.98]">
          <ShoppingCart size={18} />
          Đăng ký workshop
        </button>


        <div>
          <h3 className="mb-3 font-bold text-primary">Workshop này bao gồm:</h3>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <PublicIncludeItem icon={<Calendar size={16} />} text={`${workshop.startDate} - ${workshop.endDate}`} />
            <PublicIncludeItem icon={<MapPin size={16} />} text={workshop.location} />
            <PublicIncludeItem icon={<Download size={16} />} text={`${workshop.materials?.length ?? 0} tài liệu có thể tải xuống`} />
            <PublicIncludeItem icon={<Infinity size={16} />} text="Truy cập cổng chuẩn bị trước khóa học" />
            <PublicIncludeItem icon={<Award size={16} />} text="Chứng chỉ hoàn thành" />
            {instructorName ? <PublicIncludeItem icon={<Users size={16} />} text={`Dẫn dắt bởi ${instructorName}`} /> : null}
          </ul>
        </div>

        <div className="flex gap-4 border-t border-outline-variant pt-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary">
            <Share2 size={16} />
            Chia sẻ
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary">
            <Heart size={16} />
            Yêu thích
          </button>
        </div>
      </div>
    </section>
  );
}

function PublicIncludeItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="shrink-0 text-primary">{icon}</span>
      <span>{text}</span>
    </li>
  );
}

function RelatedWorkshopCard({ workshop }: { workshop: OfflineWorkshop }) {
  return (
    <Link
      to={`/office-workshop/${workshop.id}`}
      className="group block overflow-hidden rounded-lg border border-outline-variant bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={workshop.thumbnail}
          alt={workshop.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-[#f97316] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {workshop.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-3 min-h-[48px] font-bold leading-snug text-[#1267ad]">
          {workshop.title}
        </h3>
        <div className="mb-3 flex items-center gap-1.5 text-sm">
          <span className="font-bold text-[#1267ad]">4.8</span>
          <span className="flex gap-0.5">{renderStars(4.8, 13)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#1267ad]">{formatUsd(workshop.price ?? 199)}</span>
          <Heart size={18} className="text-on-surface-variant transition-colors group-hover:text-[#f97316]" />
        </div>
      </div>
    </Link>
  );
}

function EmptyPublicTab({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-8 text-on-surface-variant">
      {title}
    </div>
  );
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function renderStars(rating: number, size = 14) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      size={size}
      className={index < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
    />
  ));
}

function SessionCard({
  session,
  index,
}: {
  session: WorkshopSession;
  index: number;
}) {
  const isActive = session.state === "active";
  const isCompleted = session.state === "completed";

  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`relative bg-white p-6 shadow-sm ${
        isActive ? "border-2 border-secondary-container " : "border border-[#cfd4dc]"
      }`}
    >
      <div
        className={`absolute -left-[30px] top-5 z-10 h-4 w-4 rounded-full border-2 border-white ${
          isActive
            ? "bg-secondary-container  shadow-[0_0_0_4px_rgba(242,134,51,0.18)]"
            : isCompleted
              ? "bg-[#1c9c4c]"
              : "bg-[#cfd4dc]"
        }`}
      />

      {isActive ? (
        <span className="absolute right-0 top-0 bg-secondary-container px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Hôm nay
        </span>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3
            className={`text-xl font-bold leading-snug ${
              isCompleted ? "text-[#6b7280]" : "text-[#0b4f8a]"
            }`}
          >
            {session.day}: {session.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#606a76]">
            {session.description}
          </p>
        </div>

        {isCompleted ? (
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#1c9c4c]">
            <CheckCircle2 size={15} />
            Đã hoàn thành
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-wide text-[#475467]">
        <span className="inline-flex items-center gap-1.5 bg-[#f6f3f2] px-3 py-1.5">
          <Clock size={13} />
          {session.time}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-[#f6f3f2] px-3 py-1.5">
          <Building2 size={13} />
          {session.room}
        </span>
        <span className="bg-[#f6f3f2] px-3 py-1.5">{session.date}</span>
      </div>

      {isActive && session.actionLabel ? (
        <div className="mt-5 flex justify-end">
          <button className="bg-primary px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1267ad]">
            {session.actionLabel}
          </button>
        </div>
      ) : null}
    </motion.article>
  );
}

function VenueCard({ workshop }: { workshop: OfflineWorkshop }) {
  const venueName = workshop.venue?.name ?? workshop.location;
  const address = workshop.venue?.address ?? workshop.location;
  const mapUrl = workshop.venue?.mapUrl ?? workshop.thumbnail;

  return (
    <section className="overflow-hidden border border-[#cfd4dc] bg-white shadow-sm">
      <div className="relative h-40">
        <img src={mapUrl} alt={venueName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#176da8]/10" />
        <MapPin
          className="absolute right-9 top-5 fill-[#f97316] text-[#f97316]"
          size={28}
        />
        <MapPin
          className="absolute left-16 top-8 fill-[#f97316] text-[#f97316]"
          size={24}
        />
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[6px] bg-white shadow-lg">
          <MapPin className="fill-[#f97316] text-[#f97316]" size={24} />
        </div>
      </div>

      <div className="p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#0b4f8a]">
          Thông tin địa điểm
        </p>
        <h3 className="text-base font-bold text-[#0b4f8a]">{venueName}</h3>
        <p className="mt-1 text-xs font-medium text-[#606a76]">{address}</p>

        {workshop.venue?.roomLabel ? (
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-[#cfd4dc] px-4 py-2.5 text-xs font-bold text-[#0b4f8a] hover:bg-[#f6f3f2]">
            <Navigation size={15} />
            {workshop.venue.roomLabel}
          </button>
        ) : null}

        {workshop.venue?.securityNotice ? (
          <div className="mt-4 flex gap-3 border border-[#f5c2bd] bg-[#fff3f1] p-3 text-xs leading-relaxed text-[#b42318]">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <p>{workshop.venue.securityNotice}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function InstructorsCard({ workshop }: { workshop: OfflineWorkshop }) {
  return (
    <section className="border border-[#cfd4dc] bg-white p-5 shadow-sm">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#0b4f8a]">
        Giảng viên khóa học
      </p>
      <div className="space-y-4">
        {(workshop.instructors ?? []).map((instructor) => (
          <div key={instructor.id} className="flex gap-3">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="h-12 w-12 object-cover"
            />
            <div>
              <h3 className="text-sm font-bold text-[#0b4f8a]">
                {instructor.name}
              </h3>
              <p className="text-[11px] font-semibold text-[#606a76]">
                {instructor.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MaterialsCard({ materials }: { materials: WorkshopAsset[] }) {
  return (
    <section className="bg-primary p-5 text-white shadow-sm">
      <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/72">
        Tài liệu workshop
      </p>
      <div className="space-y-4">
        {materials.map((item) => {
          const Icon = getAssetIcon(item.icon);

          return (
            <button
              key={item.id}
              className="flex w-full items-center gap-3 text-left text-xs font-bold leading-snug text-white hover:text-secondary-container"
            >
              <Icon size={16} className="shrink-0 text-secondary-container" />
              {item.title}
            </button>
          );
        })}
      </div>
      <button className="mt-6 flex w-full items-center justify-center gap-2 bg-secondary-container px-4 py-3 text-xs font-bold text-white hover:bg-[#d87b06]">
        <Download size={15} />
        Tải tất cả (.zip)
      </button>
    </section>
  );
}

function getAssetIcon(icon: WorkshopAssetIcon) {
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

export default OfflineWorkshopDetailPage;
