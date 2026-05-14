import React, { useState } from "react";
import { 
  ChevronLeft, 
  PlayCircle, 
  Code2, 
  FileQuestion, 
  BookOpen, 
  Files, 
  Settings, 
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import CourseOverview from "./CourseOverview";
import { Button } from "@/components/common/ui/button";
import CodeExercise from "./CodeExercise";
import VideoPlayer from "./VideoPlayer";
import QuizEngine from "./QuizEngine";

type TabType = "overview" | "theory" | "code" | "quiz" | "resources";

const CoursePlayerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("theory");

  // Mock course data for the player
  const courseData = {
    title: "Full-Stack Engineering",
    module: "Module 3: Systematic Innovation",
    instructor: {
      name: "Dr. Alex Rivers",
      role: "Senior Engineer @ SBank",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <CourseOverview />;
      case "theory":
        return <VideoPlayer instructor={courseData.instructor} />;
      case "quiz":
        return <QuizEngine />;
      case "code":
        return <CodeExercise />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-on-surface-variant italic">
            This module is being updated. Please check back later.
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Course Navigation Sidebar */}
      <aside className="w-80 bg-white border-r border-outline-variant flex flex-col z-20 shadow-sm">
        {/* Header: Back to Dashboard */}
        <div className="p-6 border-b border-outline-variant">
          <Button 
          
            onClick={() => navigate("/dashboard")}
            className="w-full h-12 flex items-center gap-2 text-white font-bold uppercase mb-4"
          >
            <ChevronLeft size={16} strokeWidth={3} />
            Back to Dashboard
          </Button>
          <h2 className="text-headline-sm font-bold text-primary mb-1 leading-tight">
            {courseData.title}
          </h2>
          <p className="text-on-surface-variant text-body-sm font-medium">
            {courseData.module}
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          <PlayerSidebarLink 
            icon={<BookOpen size={20} />} 
            label="Course Overview" 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <PlayerSidebarLink 
            icon={<PlayCircle size={20} />} 
            label="Theory & Video" 
            active={activeTab === "theory"} 
            onClick={() => setActiveTab("theory")} 
          />
          <PlayerSidebarLink 
            icon={<Code2 size={20} />} 
            label="Code Exercises" 
            active={activeTab === "code"} 
            onClick={() => setActiveTab("code")} 
          />
          <PlayerSidebarLink 
            icon={<FileQuestion size={20} />} 
            label="Theory Quizzes" 
            active={activeTab === "quiz"} 
            onClick={() => setActiveTab("quiz")} 
          />
          <PlayerSidebarLink 
            icon={<Files size={20} />} 
            label="Resources" 
            active={activeTab === "resources"} 
            onClick={() => setActiveTab("resources")} 
          />
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-outline-variant space-y-1">
          <PlayerSidebarLink 
            icon={<Settings size={18} />} 
            label="Settings" 
          />
          <PlayerSidebarLink 
            icon={<HelpCircle size={18} />} 
            label="Help Center" 
          />
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
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

/* ── Helper Component ── */

function PlayerSidebarLink({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean,
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group ${
        active 
          ? "bg-[#f28633] text-white shadow-md shadow-orange-200" 
          : "text-on-surface-variant hover:bg-[#fff5ee] hover:text-primary"
      }`}
    >
      <span className={`${active ? "text-white" : "text-on-surface-variant group-hover:text-primary"}`}>
        {icon}
      </span>
      <span className="font-bold text-body-md whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
        />
      )}
    </button>
  );
}

export default CoursePlayerPage;
