import React from "react";
import { 
  Clock, 
  BookOpen, 
  Award, 
  ChevronRight, 
  PlayCircle, 
  Code2, 
  FileQuestion,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const CourseOverview: React.FC = () => {
  const curriculum = [
    {
      title: "Module 1: Mathematical Foundations",
      duration: "4h 30m",
      lessons: [
        { type: "video", title: "Introduction to Algorithmic Logic", duration: "12:45" },
        { type: "video", title: "Linear Algebra for Engineers", duration: "45:00" },
        { type: "code", title: "Matrix Multiplication Exercise" },
        { type: "quiz", title: "Module 1 Assessment: Math Basics" },
      ]
    },
    {
      title: "Module 2: Advanced Data Structures",
      duration: "6h 15m",
      lessons: [
        { type: "video", title: "Heaps and Priority Queues", duration: "32:10" },
        { type: "video", title: "Trie Trees in Depth", duration: "28:50" },
        { type: "code", title: "Implement a Lisp Interpreter" },
        { type: "quiz", title: "Module 2 Assessment: Structures" },
      ]
    },
    {
      title: "Module 3: Systematic Innovation",
      duration: "5h 45m",
      lessons: [
        { type: "video", title: "The 40 Principles of TRIZ", duration: "40:00" },
        { type: "video", title: "Array Manipulation in Systemic Innovation", duration: "25:00" },
        { type: "code", title: "Maximum Element Detection" },
        { type: "quiz", title: "Module 3 Quiz: Logic and Flow" },
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-white p-10">
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        {/* Course Intro Header */}
        <section className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <span className="bg-[#fff5ee] text-[#f28633] px-3 py-1 rounded-full text-label-sm font-bold border border-[#f28633]/10">Development</span>
            <span className="bg-[#edf6ff] text-primary px-3 py-1 rounded-full text-label-sm font-bold border border-primary/10">Full-Stack Engineering</span>
          </div>
          
          <h1 className="text-display-md font-bold text-primary leading-tight">
            Full-Stack Engineering: Master Modern Systems
          </h1>

          <div className="flex flex-wrap gap-8 py-2">
            <InfoBadge icon={<Clock size={18} />} label="Duration" value="24 Hours" />
            <InfoBadge icon={<BookOpen size={18} />} label="Lessons" value="48 Modules" />
            <InfoBadge icon={<Award size={18} />} label="Certificate" value="Professional" />
            <InfoBadge icon={<Users size={18} />} label="Enrolled" value="1.2k Students" />
          </div>
        </section>

        {/* Description Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-outline-variant pt-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-headline-sm font-bold text-primary">About this course</h2>
            <div className="space-y-4 text-body-lg text-on-surface-variant leading-relaxed">
              <p>
                Our Comprehensive Program Is Designed To Take You From A Foundation In Systemic Logic To Advanced Implementation. You Will Master The Nuances Of High-Load System Design, Data Continuity, And Algorithmic Efficiency.
              </p>
              <p>
                Built In Partnership With Leading Engineering Firms, This Path Focuses On Real-World Challenges Rather Than Abstract Theory. By The End Of This Course, You Will Have Built Three Production-Ready Systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <CheckItem text="Master 40 principles of TRIZ Innovation" />
              <CheckItem text="Optimizing High-Performance Code" />
              <CheckItem text="Architecting Microservices for scale" />
              <CheckItem text="Automated Testing & CI/CD Pipelines" />
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-8 h-fit border border-outline-variant">
            <h3 className="text-title-md font-bold text-primary mb-6">Prerequisites</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#f28633] rounded-full mt-2" />
                <p className="text-body-md text-on-surface-variant font-medium">Basic knowledge of JS/TS</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#f28633] rounded-full mt-2" />
                <p className="text-body-md text-on-surface-variant font-medium">Understanding of JSON APIs</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#f28633] rounded-full mt-2" />
                <p className="text-body-md text-on-surface-variant font-medium">Comfortable with CLI</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="space-y-8 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-bold text-primary">Course Curriculum</h2>
            <p className="text-body-md font-bold text-[#f28633]">3 Modules • 12 Lessons</p>
          </div>

          <div className="space-y-4">
            {curriculum.map((module, mIdx) => (
              <motion.div 
                key={mIdx}
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
                      <h3 className="text-title-md font-bold text-primary">{module.title}</h3>
                      <p className="text-[12px] font-bold text-on-surface-variant uppercase">{module.duration} • {module.lessons.length} LESSONS</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-outline-variant" />
                </div>
                
                <div className="divide-y divide-outline-variant/30">
                  {module.lessons.map((lesson, lIdx) => (
                    <div key={lIdx} className="p-5 flex items-center justify-between hover:bg-[#fff9f5] transition-colors group">
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
                        <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">Required</span>
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

function InfoBadge({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#f28633]">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{label}</p>
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
      <span className="text-body-md font-medium text-on-surface-variant">{text}</span>
    </div>
  );
}

function LessonIcon({ type }: { type: string }) {
  switch (type) {
    case "video": return <PlayCircle size={18} className="text-[#f28633]" />;
    case "code": return <Code2 size={18} className="text-primary" />;
    case "quiz": return <FileQuestion size={18} className="text-secondary" />;
    default: return <BookOpen size={18} />;
  }
}

export default CourseOverview;
