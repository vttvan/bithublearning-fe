import React from 'react';
import { Search, MapPin, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { OFFLINE_WORKSHOPS_MOCK } from '../mocks/offlineWorkshops.mock';
import { OfflineWorkshopCard } from './OfflineWorkshopCard';

const OfflineWorkshopsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-outline-variant pt-12 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[#003366] text-4xl font-bold mb-4">Offline Workshops</h1>
              <p className="text-on-surface-variant max-w-3xl text-lg leading-relaxed">
                Immersive, systematic engineering training led by industry experts. Master TRIZ-based problem solving and modern development architectures in person.
              </p>
            </div>
            <button className="bg-[#003366] text-white px-6 py-3 rounded-md font-bold hover:bg-[#002244] transition-colors shrink-0">
              View Schedule
            </button>
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
              placeholder="Search by course name or technology..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select className="px-4 py-2.5 rounded-md border border-outline-variant bg-white focus:outline-none focus:border-primary min-w-[200px]">
              <option>Location: All Cities</option>
              <option>Ho Chi Minh City</option>
              <option>Hanoi</option>
              <option>Da Nang</option>
            </select>
            
            <select className="px-4 py-2.5 rounded-md border border-outline-variant bg-white focus:outline-none focus:border-primary min-w-[200px]">
              <option>Duration: Any</option>
              <option>1-3 Days</option>
              <option>4-7 Days</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2.5 font-bold text-primary hover:bg-surface-variant rounded-md transition-colors whitespace-nowrap">
              <Filter size={18} />
              More Filters
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
          <button className="w-10 h-10 flex items-center justify-center bg-[#003366] text-white font-bold rounded">
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
