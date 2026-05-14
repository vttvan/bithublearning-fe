import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import type { OfflineWorkshop } from "../types/offlineWorkshop";

export function OfflineWorkshopCard({ workshop }: { workshop: OfflineWorkshop }) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Thumbnail */}
      <Link to={`/office-workshop/${workshop.id}`} className="block relative h-48 w-full overflow-hidden">
        <img 
          src={workshop.thumbnail} 
          alt={workshop.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-[#f28633] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">
          {workshop.category}
        </div>
      </Link>
      
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <Link to={`/office-workshop/${workshop.id}`} className="block">
          <h3 className="text-xl font-bold text-[#003366] mb-4 line-clamp-2 min-h-[56px] hover:underline">
            {workshop.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-6 text-sm text-on-surface-variant mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-outline" />
            <span className="truncate max-w-[100px]">{workshop.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-outline" />
            <span className="whitespace-nowrap">{workshop.startDate} - {workshop.endDate}</span>
          </div>
        </div>
        
        <p className="text-on-surface-variant text-sm mb-6 line-clamp-3">
          {workshop.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
          <div className="flex flex-col gap-1.5 w-1/2">
            <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div 
                className={`h-full ${workshop.progressPercent > 90 ? 'bg-error' : 'bg-[#f28633]'}`} 
                style={{ width: `${workshop.progressPercent}%` }}
              />
            </div>
            <span className={`text-xs font-bold ${workshop.progressPercent > 90 ? 'text-error' : 'text-[#f28633]'}`}>
              {workshop.progressText}
            </span>
          </div>
          
          <Link to={`/office-workshop/${workshop.id}`} className="border border-[#003366] text-[#003366] font-bold px-4 py-2 rounded hover:bg-[#003366] hover:text-white transition-colors text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
