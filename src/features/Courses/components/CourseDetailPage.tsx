import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Play,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Monitor,
  Download,
  Infinity,
  Smartphone,
  Award,
  Share2,
  Heart,
  User,
  Users,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCourseDetailById, courseDetailsMock } from "@mock/data/course-detail.mock";
import type { CourseDetail, CourseModule } from "@/types/course";

/* ─── helpers ─── */
function formatVND(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

function renderStars(rating: number, size = 14) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars: React.ReactNode[] = [];
  for (let i = 0; i < full; i++)
    stars.push(<Star key={`f${i}`} size={size} className="fill-amber-400 text-amber-400" />);
  if (half)
    stars.push(<Star key="h" size={size} className="fill-amber-400/50 text-amber-400" />);
  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++)
    stars.push(<Star key={`e${i}`} size={size} className="text-gray-300" />);
  return stars;
}

/* ─── Tab definitions ─── */
const TABS = ["Overview", "Curriculum", "Instructor", "Reviews", "FAQ"] as const;
type Tab = typeof TABS[number];

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = getCourseDetailById(id ?? "");

  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [expandedModules, setExpandedModules] = useState<string[]>(["m1"]);

  if (!course) {
    return (
      <div className="max-w-container-max mx-auto px-md py-20 text-center">
        <h1 className="text-display text-primary font-bold mb-4">404</h1>
        <p className="text-body-lg text-on-surface-variant mb-8">
          Khóa học không tìm thấy.
        </p>
        <Link
          to="/courses"
          className="inline-block bg-secondary-container text-on-secondary-container font-bold px-6 py-3 rounded-lg hover:brightness-110 transition-all"
        >
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId]
    );
  };

  /* Related courses: same category, different id */
  const relatedCourses = courseDetailsMock
    .filter((c) => c.category.id === course.category.id && c.id !== course.id)
    .slice(0, 3);

  return (
    <>
      {/* ══════ Hero Banner ══════ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-gradient relative py-12 md:py-16"
      >
        <div className="max-w-container-max mx-auto px-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Category badge */}
            <span
              className={`inline-block px-3 py-1 rounded text-label-sm font-bold tracking-wide mb-4 ${course.category.color} ${course.category.textColor}`}
            >
              {course.subtitle}
            </span>

            <h1 className="font-display text-[36px] md:text-[42px] font-bold text-on-primary leading-tight mb-4">
              {course.title}
            </h1>

            <p className="text-primary-fixed-dim text-body-lg leading-relaxed mb-6 max-w-full">
              {course.description}
            </p>

            {/* Instructor info row */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full border-2 border-white/30 object-cover"
                />
                <div>
                  <div className="text-white/60 text-[12px]">Instructor</div>
                  <div className="text-white font-medium text-[14px]">{course.instructor}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-white/60" />
                <div>
                  <div className="text-white/60 text-[12px]">Enrolled</div>
                  <div className="text-white font-medium text-[14px]">
                    {course.enrolledStudents.toLocaleString()} Students
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <div>
                  <div className="text-white/60 text-[12px]">Rating</div>
                  <div className="text-white font-medium text-[14px]">
                    {course.rating} ★
                  </div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-secondary-container hover:bg-secondary text-primary hover:text-on-primary font-bold px-8 py-3 rounded-lg transition-all active:scale-95 shadow-lg">
                Enroll Now
              </button>
              <button className="border border-white/40 text-white hover:bg-white/10 font-bold px-8 py-3 rounded-lg transition-all active:scale-95 flex items-center gap-2">
                <Play size={18} /> Watch Preview
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-container-max mx-auto px-md py-10"
      >
        {/* Tab Navigation */}
        <div className="border-b border-outline-variant mb-8">
          <nav className="flex gap-6 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-body-md font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-secondary-container text-primary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0">
            {activeTab === "Overview" && (
              <OverviewSection course={course} />
            )}
            {activeTab === "Curriculum" && (
              <CurriculumSection
                course={course}
                expandedModules={expandedModules}
                onToggle={toggleModule}
              />
            )}
            {activeTab === "Instructor" && (
              <InstructorSection course={course} />
            )}
            {activeTab === "Reviews" && (
              <div className="text-on-surface-variant text-body-lg py-10">
                Chức năng đánh giá đang được phát triển...
              </div>
            )}
            {activeTab === "FAQ" && (
              <div className="text-on-surface-variant text-body-lg py-10">
                Câu hỏi thường gặp đang được cập nhật...
              </div>
            )}

            {/* Curriculum always visible below Overview */}
            {activeTab === "Overview" && (
              <div className="mt-10">
                <CurriculumSection
                  course={course}
                  expandedModules={expandedModules}
                  onToggle={toggleModule}
                />
              </div>
            )}
          </div>

          {/* ── Right Sidebar (sticky) ── */}
          <aside className="w-full lg:w-[380px] shrink-0 sticky top-[70px] self-start z-30">
            <PricingSidebar course={course} />
          </aside>
        </div>
      </motion.div>

      {/* ══════ Related Courses ══════ */}
      {relatedCourses.length > 0 && (
        <section className="max-w-container-max mx-auto px-md pb-16">
          <h2 className="font-display text-headline-lg text-primary mb-6">
            Related {course.category.label.charAt(0) + course.category.label.slice(1).toLowerCase()} Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((rc) => (
              <RelatedCourseCard key={rc.id} course={rc} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

/* ──────────────────────────────────────── */
/*           Overview Section              */
/* ──────────────────────────────────────── */
function OverviewSection({ course }: { course: CourseDetail }) {
  return (
    <div>
      <h2 className="font-display text-headline-lg text-primary mb-4">
        Course Overview
      </h2>
      <p className="text-on-surface-variant text-body-lg leading-relaxed mb-8">
        {course.overview}
      </p>

      {/* Learning points grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {course.learningPoints.map((point, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-secondary-container shrink-0 mt-0.5" />
            <span className="text-body-md text-on-background">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────── */
/*          Curriculum Section             */
/* ──────────────────────────────────────── */
function CurriculumSection({
  course,
  expandedModules,
  onToggle,
}: {
  course: CourseDetail;
  expandedModules: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-headline-lg text-primary">Curriculum</h2>
        <span className="text-on-surface-variant text-body-md">
          {course.totalModules} Modules • {course.totalLessons} Lessons • {course.totalDuration}
        </span>
      </div>

      <div className="border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
        {course.curriculum.map((mod) => (
          <ModuleAccordion
            key={mod.id}
            module={mod}
            isOpen={expandedModules.includes(mod.id)}
            onToggle={() => onToggle(mod.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ModuleAccordion({
  module,
  isOpen,
  onToggle,
}: {
  module: CourseModule;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-surface-container-low hover:bg-surface-container transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown size={18} className="text-primary" />
          ) : (
            <ChevronRight size={18} className="text-on-surface-variant" />
          )}
          <div>
            <span className="text-body-md font-semibold text-primary">
              {module.title}
            </span>
            <span className="ml-2 text-on-surface-variant text-[13px]">
              {module.lessons.length} Lessons
            </span>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="bg-surface-container-lowest">
          {module.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between px-5 py-3 pl-14 border-t border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Play size={14} className="text-secondary-container" />
                <span className="text-body-md text-on-background">
                  {lesson.title}
                </span>
              </div>
              <span className="text-on-surface-variant text-[13px] shrink-0">
                {lesson.duration}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────── */
/*           Instructor Section            */
/* ──────────────────────────────────────── */
function InstructorSection({ course }: { course: CourseDetail }) {
  return (
    <div>
      <h2 className="font-display text-headline-lg text-primary mb-6">Instructor</h2>
      <div className="flex items-start gap-5">
        <img
          src={course.instructorAvatar}
          alt={course.instructor}
          className="w-20 h-20 rounded-full object-cover border-2 border-outline-variant"
        />
        <div>
          <h3 className="text-headline-md font-semibold text-primary mb-1">
            {course.instructor}
          </h3>
          <p className="text-on-surface-variant text-body-md mb-3">
            {course.subtitle} Expert
          </p>
          <div className="flex items-center gap-4 text-on-surface-variant text-body-md">
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {course.rating} Rating
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {course.enrolledStudents.toLocaleString()} Students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────── */
/*           Pricing Sidebar               */
/* ──────────────────────────────────────── */
function PricingSidebar({ course }: { course: CourseDetail }) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest shadow-lg overflow-hidden">
      {/* Video preview thumbnail */}
      <div className="relative aspect-video overflow-hidden group cursor-pointer">
        <img
          src={course.previewVideoThumb}
          alt="Preview"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play size={28} className="text-primary ml-1" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="font-bold text-primary text-[28px]">
            {course.price === 0 ? "Miễn phí" : formatVND(course.price)}
          </span>
          {course.originalPrice > 0 && course.discountPercent > 0 && (
            <>
              <span className="line-through text-on-surface-variant text-body-md">
                {formatVND(course.originalPrice)}
              </span>
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-label-sm font-bold">
                {course.discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* CTA buttons */}
        <button className="w-full bg-secondary-container text-on-secondary-container font-bold py-3.5 rounded-lg hover:brightness-110 transition-all active:scale-[0.98] shadow-md text-body-lg">
          Enroll in Course
        </button>
        <button className="w-full border-2 border-outline-variant text-primary font-bold py-3 rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] text-body-md">
          Add to Cart
        </button>

        <p className="text-center text-on-surface-variant text-[13px] italic">
          30-Day Money Back Guarantee
        </p>

        {/* What's included */}
        <div>
          <h4 className="font-semibold text-primary text-body-md mb-3">
            What's included:
          </h4>
          <ul className="space-y-2.5">
            <IncludeItem
              icon={<Monitor size={16} />}
              text={`${course.includes.hoursVideo} hours on-demand video`}
            />
            <IncludeItem
              icon={<Download size={16} />}
              text={`${course.includes.downloadableResources} downloadable resources`}
            />
            {course.includes.lifetimeAccess && (
              <IncludeItem icon={<Infinity size={16} />} text="Full lifetime access" />
            )}
            {course.includes.mobileAccess && (
              <IncludeItem
                icon={<Smartphone size={16} />}
                text="Access on mobile and TV"
              />
            )}
            {course.includes.certificate && (
              <IncludeItem icon={<Award size={16} />} text="Certificate of completion" />
            )}
          </ul>
        </div>

        {/* Share / Wishlist */}
        <div className="flex gap-4 pt-2 border-t border-outline-variant">
          <button className="flex items-center gap-2 text-on-surface-variant text-body-md hover:text-primary transition-colors">
            <Share2 size={16} /> Share
          </button>
          <button className="flex items-center gap-2 text-on-surface-variant text-body-md hover:text-primary transition-colors">
            <Heart size={16} /> Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

function IncludeItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 text-on-surface-variant text-body-md">
      <span className="text-primary shrink-0">{icon}</span>
      {text}
    </li>
  );
}

/* ──────────────────────────────────────── */
/*          Related Course Card            */
/* ──────────────────────────────────────── */
function RelatedCourseCard({ course }: { course: CourseDetail }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded text-label-sm font-bold tracking-wide ${course.category.color} ${course.category.textColor}`}
        >
          {course.category.label}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-headline-md text-[17px] font-semibold text-primary leading-snug mb-2 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-primary font-bold text-[15px]">{course.rating}</span>
          <div className="flex gap-0.5">{renderStars(course.rating)}</div>
          <span className="text-on-surface-variant text-[13px]">
            ({course.reviewCount.toLocaleString("vi-VN")})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary text-[18px]">
            {course.price === 0 ? "Miễn phí" : formatVND(course.price)}
          </span>
          <Heart size={18} className="text-on-surface-variant hover:text-red-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export default CourseDetailPage;
