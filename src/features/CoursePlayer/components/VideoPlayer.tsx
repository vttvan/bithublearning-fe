import React, { useState, useRef } from "react";
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  MessageSquare,
  Clock,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface VideoPlayerProps {
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
}

const MOCK_TRANSCRIPT = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  time: `0${Math.floor(i / 2)}:${(i % 2) * 30 === 0 ? "00" : "30"}`,
  content: i % 2 === 0 
    ? "In this segment, we explore how systematic innovation (TRIZ) applies to data structure management. When handling large-scale arrays in real-time banking systems, the physical constraints often mirror engineering..."
    : "The principle of Segmentation allows us to break down complex problems into manageable sub-algorithms. Notice how the visual representation on screen demonstrates the recursive flow..."
}));

const VideoPlayer: React.FC<VideoPlayerProps> = ({ instructor }) => {
  const [activeBottomTab, setActiveBottomTab] = useState("transcript");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({ container: scrollRef });

  // Thu nhỏ ngay lập tức theo vị trí cuộn (1-to-1 mapping)
  const scale = useTransform(scrollY, [0, 400], [1, 0.4]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.7]);
  // Giảm marginBottom vì kích thước ban đầu đã nhỏ hơn
  const marginBottom = useTransform(scrollY, [0, 400], [0, -380]);
  
  // Thêm paddingBottom bù trừ cho marginBottom
  const paddingBottom = useTransform(scrollY, [0, 400], [0, 380]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-white relative">
      {/* Video Content Top Area */}
      <div className="bg-[#003366] text-white py-4 px-8 sticky top-0 z-10 shadow-lg">
        <motion.div 
          className="max-w-4xl mx-auto"
          style={{
            scale,
            opacity,
            marginBottom,
            transformOrigin: "top center"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="bg-[#f28633] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Current Lesson
              </span>
              <h1 className="text-title-lg font-bold">
                Array Manipulation in Systemic Innovation
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-on-primary-fixed-variant text-label-sm font-bold">Progress</span>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#f28633]" style={{ width: "60%" }} />
              </div>
              <span className="text-label-sm font-bold">60%</span>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="relative aspect-video bg-[#0a192f] rounded-xl overflow-hidden shadow-2xl group border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1631&auto=format&fit=crop" 
              alt="Video Preview" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-24 h-24 bg-[#f28633] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                <Play size={40} fill="currentColor" strokeWidth={0} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Video Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-body-sm">
              <ChevronLeft size={18} />
              Previous: Problem Framing
            </button>
            <button className="bg-[#f28633] text-white px-6 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-[#d97220] transition-colors active:scale-[0.98] text-body-sm">
              Next Lesson: Logical Flows
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Information & Details Area */}
      <motion.div 
        className="bg-white p-8 relative z-0 min-h-screen"
        style={{ paddingBottom }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Tabs Section */}
          <div className="flex-1">
            <div className="flex border-b border-outline-variant mb-8">
              <TabButton 
                label="Transcript" 
                active={activeBottomTab === "transcript"} 
                onClick={() => setActiveBottomTab("transcript")} 
              />
              <TabButton 
                label="Course Notes" 
                active={activeBottomTab === "notes"} 
                onClick={() => setActiveBottomTab("notes")} 
              />
              <TabButton 
                label="Discussions" 
                active={activeBottomTab === "discussions"} 
                onClick={() => setActiveBottomTab("discussions")} 
              />
            </div>

            <div className="space-y-6">
              {MOCK_TRANSCRIPT.map((item) => (
                <div key={item.id} className="flex gap-6 items-start">
                  <span className="text-secondary font-bold text-headline-xs whitespace-nowrap pt-1">{item.time}</span>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor & Assets Sidebar */}
          <div className="w-full lg:w-80 space-y-8">
            {/* Instructor Card */}
            <div className="bg-[#f8f9fa] border border-outline-variant rounded-xl p-6">
              <h3 className="text-label-sm font-bold text-on-surface-variant uppercase mb-4 tracking-wider">Instructor</h3>
              <div className="flex items-center gap-4">
                <img src={instructor.avatar} alt={instructor.name} className="w-14 h-14 rounded-lg object-cover border border-outline-variant" />
                <div>
                  <h4 className="text-title-md font-bold text-primary">{instructor.name}</h4>
                  <p className="text-body-sm text-on-surface-variant">{instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Assets */}
            <div className="bg-[#fffcf9] border border-[#f28633]/20 rounded-xl p-6">
              <h3 className="text-label-sm font-bold text-[#f28633] uppercase mb-4 tracking-wider">Learning Assets</h3>
              <div className="space-y-3">
                <AssetLink icon={<FileText size={18} />} label="Lesson_Notes_Module3.pdf" size="2.4 MB" />
                <AssetLink icon={<Download size={18} />} label="Array_Practice_Sheet.xlsx" size="1.1 MB" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Helpers ── */

function TabButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-4 font-bold text-title-md transition-all relative ${
        active ? "text-primary" : "text-on-surface-variant hover:text-primary"
      }`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="bottom-tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#f28633]"
        />
      )}
    </button>
  );
}

function AssetLink({ icon, label, size }: { icon: React.ReactNode, label: string, size: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-outline-variant rounded-lg group cursor-pointer hover:border-[#f28633] transition-colors">
      <div className="text-[#f28633] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-bold text-primary truncate">{label}</p>
        <p className="text-[11px] text-on-surface-variant">{size}</p>
      </div>
    </div>
  );
}

export default VideoPlayer;
