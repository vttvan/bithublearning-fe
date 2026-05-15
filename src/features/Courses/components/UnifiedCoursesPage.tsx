import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MonitorPlay, Users, ArrowRight } from 'lucide-react';
import { CourseCard } from './CourseCard';
import { OfflineWorkshopCard } from '../../OfflineWorkshops/components/OfflineWorkshopCard';
import { OFFLINE_WORKSHOPS_MOCK } from '../../OfflineWorkshops/mocks/offlineWorkshops.mock';
import { coursesMock } from '@mock/data/courses.mock';

const UnifiedCoursesPage: React.FC = () => {
  const navigate = useNavigate();

  // Get top 3 featured courses for each category
  const featuredOnlineCourses = coursesMock.slice(0, 3);
  const featuredOfflineWorkshops = OFFLINE_WORKSHOPS_MOCK.slice(0, 3);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8f9fa] pb-20">
      
      {/* ── Search Hero Banner ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="courses-search-gradient relative py-20 md:py-24 overflow-hidden mb-12"
      >
        <div className="max-w-container-max mx-auto px-md relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Chọn lộ trình học tập của bạn
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Dù bạn thích học trực tuyến theo tốc độ riêng hay tham gia các hội thảo trực tiếp chuyên sâu, chúng tôi đều có chương trình phù hợp dành cho bạn.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl w-full mx-auto px-6">
        

        {/* Featured Online Courses */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#003366] mb-2">Các khóa học trực tuyến nổi bật</h2>
              <p className="text-on-surface-variant">Các khóa học tự học chất lượng hàng đầu để bắt đầu hành trình của bạn.</p>
            </div>
            <button 
              onClick={() => navigate('/courses-online')}
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline"
            >
              View All <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOnlineCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/courses-online')}
            className="md:hidden mt-6 w-full flex justify-center items-center gap-2 text-primary font-bold hover:underline py-3 bg-white border border-outline-variant rounded-lg"
          >
            Xem tất cả các khóa học trực tuyến <ArrowRight size={20} />
          </button>
        </div>

        {/* Featured Offline Workshops */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#003366] mb-2">Các buổi hội thảo trực tiếp sắp tới</h2>
              <p className="text-on-surface-variant">Chương trình đào tạo chuyên sâu trực tiếp với các chuyên gia hàng đầu trong ngành.
              </p>
            </div>
            <button 
              onClick={() => navigate('/offline-workshops')}
              className="hidden md:flex items-center gap-2 text-[#f28633] font-bold hover:underline"
            >
              View All <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOfflineWorkshops.map(workshop => (
              <OfflineWorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/offline-workshops')}
            className="md:hidden mt-6 w-full flex justify-center items-center gap-2 text-[#f28633] font-bold hover:underline py-3 bg-white border border-outline-variant rounded-lg"
          >
            Xem tất cả các hội thảo trực tiếp <ArrowRight size={20} />
          </button>
        </div>
        {/* Navigation Cards Intro */}
        <div className="text-center mb-10 mt-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">
          Không biết bắt đầu từ đâu?
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          Khám phá hai hình thức học tập chính của chúng tôi bên dưới. Chọn lộ trình phù hợp nhất với lịch trình, phong cách học tập và mục tiêu nghề nghiệp của bạn.
          </p>
        </div>

      {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 relative z-20">
          {/* Online Courses Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 border border-outline-variant shadow-lg hover:shadow-xl hover:border-primary transition-all cursor-pointer group flex flex-col"
            onClick={() => navigate('/courses-online')}
          >
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MonitorPlay size={32} className="text-[#003366]" />
            </div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">Khóa học trực tuyến</h2>
            <p className="text-on-surface-variant flex-1 mb-8">
            Các khóa học video chất lượng cao, tự học theo tốc độ của riêng bạn. Học theo nhịp độ của riêng bạn với tài liệu toàn diện, bài kiểm tra tương tác và hỗ trợ cộng đồng.

            </p>
            <button className="w-full py-3 px-4 rounded-lg bg-surface-variant text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
            Khám phá các khóa học trực tuyến
            </button>
          </motion.div>

          {/* Offline Workshops Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 border border-outline-variant shadow-lg hover:shadow-xl hover:border-[#f28633] transition-all cursor-pointer group flex flex-col"
            onClick={() => navigate('/offline-workshops')}
          >
            <div className="w-16 h-16 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={32} className="text-[#f28633]" />
            </div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">Hội thảo trực tiếp</h2>
            <p className="text-on-surface-variant flex-1 mb-8">
            Chương trình đào tạo chuyên sâu, trực tiếp do các chuyên gia trong ngành hướng dẫn. Nắm vững kỹ năng giải quyết vấn đề một cách có hệ thống và các kiến ​​trúc hiện đại.
            </p>
            <button className="w-full py-3 px-4 rounded-lg bg-surface-variant text-[#f28633] font-bold group-hover:bg-[#f28633] group-hover:text-white transition-colors">
            Xem lịch hội thảo
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedCoursesPage;
