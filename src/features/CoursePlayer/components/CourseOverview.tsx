import React from "react";
import {
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  PlayCircle,
  Code2,
  FileQuestion,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  courseOverviewMock,
  type CourseOverviewLessonType,
} from "../mocks/courseOverview.mock";

const CourseOverview: React.FC = () => {
  const data = courseOverviewMock;

  return (
    <div className="h-full overflow-y-auto bg-white p-10">
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        {/* Course Intro Header */}
        <section className="space-y-6">
          <div className="flex flex-wrap gap-4">
            {data.tags.map((tag, index) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-label-sm font-bold ${
                  index === 0
                    ? "border-[#f28633]/10 bg-[#fff5ee] text-[#f28633]"
                    : "border-primary/10 bg-[#edf6ff] text-primary"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-display-md font-bold text-primary leading-tight">
            {data.title}
          </h1>

          <div className="flex flex-wrap gap-8 py-2">
            <InfoBadge
              icon={<Clock size={18} />}
              label="Thời lượng"
              value={data.stats.duration}
            />
            <InfoBadge
              icon={<BookOpen size={18} />}
              label="Bài học"
              value={data.stats.lessons}
            />
            <InfoBadge
              icon={<Award size={18} />}
              label="Chứng chỉ"
              value={data.stats.certificate}
            />
            <InfoBadge
              icon={<Users size={18} />}
              label="Đã tham gia"
              value={data.stats.enrolled}
            />
          </div>
        </section>

        {/* Description Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-outline-variant pt-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-headline-sm font-bold text-primary">
              {data.aboutTitle}
            </h2>
            <div className="space-y-4 text-body-lg text-on-surface-variant leading-relaxed">
              {data.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {data.learningOutcomes.map((outcome) => (
                <CheckItem key={outcome} text={outcome} />
              ))}
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-8 h-fit border border-outline-variant">
            <h3 className="text-title-md font-bold text-primary mb-6">
              {data.prerequisitesTitle}
            </h3>
            <ul className="space-y-4">
              {data.prerequisites.map((item) => (
                <li key={item} className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#f28633] rounded-full mt-2" />
                  <p className="text-body-md text-on-surface-variant font-medium">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="space-y-8 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-bold text-primary">
              {data.curriculumTitle}
            </h2>
            <p className="text-body-md font-bold text-[#f28633]">
              {data.curriculumSummary}
            </p>
          </div>

          <div className="space-y-4">
            {data.curriculum.map((module, mIdx) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mIdx * 0.1 }}
                className="bg-[#f8f9fa] rounded-2xl overflow-hidden border border-outline-variant hover:border-primary/20 transition-colors"
              >
                <div className="p-6 flex items-center justify-between bg-white border-b border-outline-variant">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#001c3d] text-white rounded-lg flex items-center justify-center font-bold">
                      {mIdx + 1}
                    </div>
                    <div>
                      <h3 className="text-title-md font-bold text-primary">
                        {module.title}
                      </h3>
                      <p className="text-[12px] font-bold text-on-surface-variant uppercase">
                        {module.duration} • {module.lessons.length}{" "}
                        {data.lessonUnitLabel}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-outline-variant" />
                </div>

                <div className="divide-y divide-outline-variant/30">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-5 flex items-center justify-between hover:bg-[#fff9f5] transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <LessonIcon type={lesson.type} />
                        <span className="text-body-md font-medium text-on-surface-variant group-hover:text-primary transition-colors">
                          {lesson.title}
                        </span>
                      </div>
                      {lesson.duration && (
                        <div className="flex items-center gap-2 text-[12px] font-bold text-outline-variant uppercase">
                          <Clock size={14} />
                          {lesson.duration}
                        </div>
                      )}
                      {!lesson.duration && (
                        <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {data.requiredLabel}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

/* ── Helpers ── */

function InfoBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#f28633]">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
          {label}
        </p>
        <p className="text-body-md font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-[#e7f9ee] flex items-center justify-center text-[#1c9c4c]">
        <ChevronRight size={14} strokeWidth={4} />
      </div>
      <span className="text-body-md font-medium text-on-surface-variant">
        {text}
      </span>
    </div>
  );
}

function LessonIcon({ type }: { type: CourseOverviewLessonType }) {
  switch (type) {
    case "video":
      return <PlayCircle size={18} className="text-[#f28633]" />;
    case "code":
      return <Code2 size={18} className="text-primary" />;
    case "quiz":
      return <FileQuestion size={18} className="text-secondary" />;
    default:
      return <BookOpen size={18} />;
  }
}

export default CourseOverview;
