import React from "react";
import { 
  Award, 
  Files, 
  BookOpen, 
  Play,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/context/AuthContext";
import { 
  dashboardStatsMock, 
  currentEnrolledCourseMock, 
  enrolledCoursesMock 
} from "@mock/data/dashboard.mock";

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-1 text-3xl font-bold text-primary sm:text-display-sm">
          Chào mừng trở lại, {user?.fullName.split(" ")[0]}!
        </h1>
        <p className="text-base text-on-surface-variant sm:text-body-lg">
          Bạn đã hoàn thành 75% mục tiêu tuần này. Tiếp tục giữ nhịp nhé!
        </p>
      </motion.section>

      {/* Stats & Resume Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stats Left */}
        <div className="lg:col-span-4 space-y-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <StatsCard label="CHỨNG CHỈ ĐẠT ĐƯỢC" value={dashboardStatsMock.certificatesEarned.toString()} icon={<Award size={24} />} color="bg-[#fef2e8] text-[#f28633]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <StatsCard label="ĐIỂM QUIZ TRUNG BÌNH" value={dashboardStatsMock.quizAverage + "%"} icon={<Files size={24} />} color="bg-[#e7f9ee] text-[#1c9c4c]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <StatsCard label="GIỜ HỌC" value={dashboardStatsMock.studyHours + "h"} icon={<BookOpen size={24} />} color="bg-[#edf6ff] text-[#344054]" />
          </motion.div>
        </div>

        {/* Resume Task Right */}
        <motion.div 
          className="lg:col-span-8 bg-white border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm cursor-pointer"
          onClick={() => navigate("/course-player/1")}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative h-48">
            <img src={currentEnrolledCourseMock.image} alt="Khóa học" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto">
              <span className="bg-[#f28633] text-white text-label-sm font-bold px-3 py-1 rounded uppercase mb-2 inline-block">
                Tiếp tục học
              </span>
              <h3 className="text-xl font-bold text-white sm:text-headline-sm">
                {currentEnrolledCourseMock.title}
              </h3>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="italic text-on-surface-variant text-body-md mb-1">
                  Bài hiện tại: {currentEnrolledCourseMock.currentLesson}
                </p>
              </div>
              <span className="text-primary font-bold text-headline-xs">
                {currentEnrolledCourseMock.progress}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#eaecf0] rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${currentEnrolledCourseMock.progress}%` }}
                transition={{ duration: 0.9, delay: 0.9 }}
                className="h-full bg-[#f28633]"
              />
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate("/course-player/1"); }}
              className="w-full bg-[#001c3d] text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-primary transition-colors active:scale-[0.98]"
            >
              <Play size={20} fill="currentColor" />
              Tiếp tục khóa học
            </button>
          </div>
        </motion.div>
      </div>

      {/* Enrolled Courses */}
      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-headline-md font-bold text-primary">Khóa học đã tham gia</h2>
          <div className="flex flex-wrap gap-3">
            <button className="border border-outline-variant px-4 py-2 rounded-lg text-body-sm font-semibold flex items-center gap-2 hover:bg-white transition-colors">
              <Filter size={16} /> Lọc
            </button>
            <button className="border border-outline-variant px-4 py-2 rounded-lg text-body-sm font-semibold hover:bg-white transition-colors">
              Sắp xếp theo ngày
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCoursesMock.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              onClick={() => navigate(`/course-player/${course.id}`)}
              className="cursor-pointer"
            >
              <EnrolledCourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ── Components ── */

function StatsCard({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white border border-outline-variant rounded-xl p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-[11px] font-bold text-on-surface-variant tracking-wider mb-2 uppercase">
          {label}
        </p>
        <p className="text-headline-md font-bold text-primary">
          {value}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  );
}

function EnrolledCourseCard({ course }: { course: any }) {
  return (
    <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative h-44 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded text-[11px] font-bold text-primary uppercase shadow-sm">
          {course.category}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-title-md font-bold text-primary mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-on-surface-variant text-body-sm mb-4 line-clamp-2">
          Khám phá lập trình hệ thống hiệu năng cao với...
        </p>
        <div className="mt-auto">
          {/* Progress Bar Mini */}
          <div className="w-full h-2 bg-[#eaecf0] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[#f28633]" style={{ width: `${course.progress}%` }} />
          </div>
          <div className="flex flex-col gap-1 text-[12px] font-bold sm:flex-row sm:items-center sm:justify-between">
            <span className="text-primary">{course.progress}% hoàn thành</span>
            <span className="text-on-surface-variant">Còn {course.lessonsLeft} bài</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
