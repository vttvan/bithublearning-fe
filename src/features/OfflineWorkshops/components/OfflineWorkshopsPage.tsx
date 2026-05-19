import React from 'react';
import { Search, MapPin, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { OFFLINE_WORKSHOPS_MOCK } from '../mocks/offlineWorkshops.mock';
import { OfflineWorkshopCard } from './OfflineWorkshopCard';

const OfflineWorkshopsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      {/* Header Section */}
      <div className="courses-search-gradient relative overflow-hidden px-8 py-16 text-white md:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className='ml-8'>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Hội thảo trực tiếp
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-white/82">
                Chương trình đào tạo kỹ thuật chuyên sâu, bài bản do các chuyên
                gia trong ngành hướng dẫn. Nắm vững kỹ thuật giải quyết vấn đề
                dựa trên TRIZ và các kiến trúc phát triển hiện đại trực tiếp.
              </p>
            </div>
  
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-8 mt-8">
        <div className="bg-white border border-outline-variant rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input 
              type="text" 
              placeholder="Tìm theo tên khóa học hoặc công nghệ..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select className="px-4 py-2.5 rounded-md border border-outline-variant bg-white focus:outline-none focus:border-primary min-w-[200px]">
              <option>Địa điểm: Tất cả thành phố</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
            </select>
            
            <select className="px-4 py-2.5 rounded-md border border-outline-variant bg-white focus:outline-none focus:border-primary min-w-[200px]">
              <option>Thời lượng: Bất kỳ</option>
              <option>1-3 ngày</option>
              <option>4-7 ngày</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2.5 font-bold text-primary hover:bg-surface-variant rounded-md transition-colors whitespace-nowrap">
              <Filter size={18} />
              Thêm bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OFFLINE_WORKSHOPS_MOCK.map((workshop) => (
            <div key={workshop.id}>
              <OfflineWorkshopCard workshop={workshop} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-8 mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-variant text-on-surface-variant disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-[#1267ad] text-white font-bold rounded">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-variant font-medium">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-variant font-medium">
            3
          </button>
          <span className="px-2 text-on-surface-variant">...</span>
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-variant font-medium">
            8
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-variant text-on-surface-variant">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineWorkshopsPage;
