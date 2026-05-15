import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Code2,
  FileQuestion,
  HelpCircle,
  Lock,
  PlayCircle,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import CourseOverview from "./CourseOverview";
import { Button } from "@/components/common/ui/button";
import CodeExercise from "./CodeExercise";
import VideoPlayer from "./VideoPlayer";
import QuizEngine from "./QuizEngine";
import { coursePlayerService } from "../services/coursePlayerService";
import type {
  CoursePlayerChapter,
  CoursePlayerNavItem,
  CoursePlayerPageData,
  CoursePlayerTab,
} from "../types/coursePlayer";

const CoursePlayerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CoursePlayerTab>("theory");
  const [courseData, setCourseData] = useState<CoursePlayerPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState({
    theory: "",
    code: "",
    quiz: "",
  });
  const [openGroups, setOpenGroups] = useState<Record<"theory" | "code" | "quiz", boolean>>({
    theory: true,
    code: false,
    quiz: false,
  });

  useEffect(() => {
    let isMounted = true;

    const loadCoursePlayer = async () => {
      try {
        setIsLoading(true);
        const data = await coursePlayerService.getCoursePlayer(id ?? "1");
        if (!isMounted) return;

        setCourseData(data);
        setSelectedIds({
          theory: getDefaultItemId(data.navigation.theory),
          code: getDefaultItemId(data.navigation.code),
          quiz: getDefaultItemId(data.navigation.quiz),
        });
      } catch (error) {
        console.error("Failed to load course player:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCoursePlayer();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const currentTheoryLesson = useMemo(
    () => courseData?.theoryLessons[selectedIds.theory],
    [courseData, selectedIds.theory],
  );
  const currentCodeExercise = useMemo(
    () => courseData?.codeExercises[selectedIds.code],
    [courseData, selectedIds.code],
  );
  const currentQuiz = useMemo(
    () => courseData?.quizzes[selectedIds.quiz],
    [courseData, selectedIds.quiz],
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-on-surface-variant">
          Đang tải nội dung khóa học...
        </div>
      );
    }

    if (!courseData) {
      return (
        <div className="flex h-full items-center justify-center text-on-surface-variant">
          Không thể tải dữ liệu khóa học.
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return <CourseOverview />;
      case "theory":
        return currentTheoryLesson ? (
          <VideoPlayer instructor={courseData.instructor} lesson={currentTheoryLesson} />
        ) : null;
      case "quiz":
        return currentQuiz ? <QuizEngine quiz={currentQuiz} /> : null;
      case "code":
        return currentCodeExercise ? <CodeExercise exercise={currentCodeExercise} /> : null;
      default:
        return (
          <div className="flex h-full items-center justify-center text-on-surface-variant italic">
            This module is being updated. Please check back later.
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
      <aside className="z-20 flex w-[344px] flex-col border-r border-outline-variant bg-white shadow-sm">
        <div className="border-b border-outline-variant p-6">
          <Button
            onClick={() => navigate("/dashboard")}
            className="mb-4 flex h-12 w-full items-center gap-2 bg-on-primary-fixed-variant font-bold uppercase text-white"
          >
            <ChevronLeft size={16} strokeWidth={3} />
            Quay lại Dashboard
          </Button>
          <h2 className="mb-1 text-headline-sm font-bold leading-tight text-primary">
            {courseData?.title ?? "Course Player"}
          </h2>
          <p className="text-body-sm font-medium text-on-surface-variant">
            {courseData?.module ?? "Đang tải chương học"}
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
          <PlayerSidebarLink
            icon={<BookOpen size={20} />}
            label="Tổng quan về khóa học"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />

          {courseData && (
            <>
              <PlayerSidebarGroup
                icon={<PlayCircle size={20} />}
                label="Lý thuyết & Video"
                active={activeTab === "theory"}
                isOpen={openGroups.theory}
                chapters={courseData.navigation.theory}
                selectedId={selectedIds.theory}
                onToggle={() =>
                  setOpenGroups((current) => ({ ...current, theory: !current.theory }))
                }
                onSelect={(itemId) => {
                  setActiveTab("theory");
                  setOpenGroups((current) => ({ ...current, theory: true }));
                  setSelectedIds((current) => ({ ...current, theory: itemId }));
                }}
              />
              <PlayerSidebarGroup
                icon={<Code2 size={20} />}
                label="Bài tập về Code"
                active={activeTab === "code"}
                isOpen={openGroups.code}
                chapters={courseData.navigation.code}
                selectedId={selectedIds.code}
                onToggle={() =>
                  setOpenGroups((current) => ({ ...current, code: !current.code }))
                }
                onSelect={(itemId) => {
                  setActiveTab("code");
                  setOpenGroups((current) => ({ ...current, code: true }));
                  setSelectedIds((current) => ({ ...current, code: itemId }));
                }}
              />
              <PlayerSidebarGroup
                icon={<FileQuestion size={20} />}
                label="Bài kiểm tra lý thuyết"
                active={activeTab === "quiz"}
                isOpen={openGroups.quiz}
                chapters={courseData.navigation.quiz}
                selectedId={selectedIds.quiz}
                onToggle={() =>
                  setOpenGroups((current) => ({ ...current, quiz: !current.quiz }))
                }
                onSelect={(itemId) => {
                  setActiveTab("quiz");
                  setOpenGroups((current) => ({ ...current, quiz: true }));
                  setSelectedIds((current) => ({ ...current, quiz: itemId }));
                }}
              />
            </>
          )}
        </nav>

        <div className="space-y-1 border-t border-outline-variant p-4">
          <PlayerSidebarLink icon={<Settings size={18} />} label="Settings" />
          <PlayerSidebarLink icon={<HelpCircle size={18} />} label="Help Center" />
        </div>
      </aside>

      <main className="relative flex-1 overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedIds[activeTab as keyof typeof selectedIds] ?? "overview"}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function getDefaultItemId(chapters: CoursePlayerChapter[]) {
  return (
    chapters.flatMap((chapter) => chapter.items).find((item) => item.status === "current")?.id ??
    chapters[0]?.items[0]?.id ??
    ""
  );
}

function PlayerSidebarGroup({
  icon,
  label,
  active,
  isOpen,
  chapters,
  selectedId,
  onToggle,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isOpen: boolean;
  chapters: CoursePlayerChapter[];
  selectedId: string;
  onToggle: () => void;
  onSelect: (itemId: string) => void;
}) {
  return (
    <div className="rounded-xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
          active ? "bg-[#fff5ee] text-primary" : "text-on-surface-variant"
        }`}
      >
        <span className="flex w-5 shrink-0 items-center justify-center">{icon}</span>
        <span className="min-w-0 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap text-body-md font-bold">
          {label}
        </span>
        <ChevronDown
          size={17}
          className={`transition-transform duration-200 ${
            active ? "text-[#f28633]" : "text-outline"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-3 border-l border-outline-variant/70 pl-4">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="space-y-1.5">
                  <div className="px-3">
                    <p className="line-clamp-1 text-[12px] font-bold uppercase tracking-wider text-primary">
                      {chapter.title}
                    </p>
                    <p className="text-[11px] font-medium text-on-surface-variant">
                      {chapter.subtitle}
                    </p>
                  </div>
                  {chapter.items.map((item) => (
                    <SubmenuItem
                      key={item.id}
                      item={item}
                      active={item.id === selectedId && active}
                      onClick={() => onSelect(item.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmenuItem({
  item,
  active,
  onClick,
}: {
  item: CoursePlayerNavItem;
  active: boolean;
  onClick: () => void;
}) {
  const isLocked = item.status === "locked";

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
        active
          ? "bg-[#f28633] text-white shadow-sm"
          : isLocked
            ? "cursor-not-allowed text-outline"
            : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
      }`}
    >
      <span className="shrink-0">
        {isLocked ? (
          <Lock size={14} />
        ) : item.status === "completed" ? (
          <CheckCircle2 size={15} />
        ) : (
          <span className={`block h-2 w-2 rounded-full ${active ? "bg-white" : "bg-[#f28633]"}`} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-sm font-semibold leading-snug">{item.title}</span>
        {item.duration && (
          <span className={`mt-0.5 block text-[11px] ${active ? "text-white/75" : "text-on-surface-variant"}`}>
            {item.duration}
          </span>
        )}
      </span>
    </button>
  );
}

function PlayerSidebarLink({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
        active
          ? "bg-[#f28633] text-white shadow-md shadow-orange-200"
          : "text-on-surface-variant hover:bg-[#fff5ee] hover:text-primary"
      }`}
    >
      <span
        className={`flex w-5 shrink-0 items-center justify-center ${
          active ? "text-white" : "text-on-surface-variant group-hover:text-primary"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap text-body-md font-bold">
        {label}
      </span>
      {active && (
        <motion.div layoutId="active-indicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
      )}
    </button>
  );
}

export default CoursePlayerPage;
