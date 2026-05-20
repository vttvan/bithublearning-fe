import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, User } from "lucide-react";
import type { Course } from "@/types/course";

function formatVND(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

export function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars: React.ReactNode[] = [];
  for (let i = 0; i < full; i++)
    stars.push(<Star key={`f${i}`} size={14} className="fill-amber-400 text-amber-400" />);
  if (half)
    stars.push(<Star key="h" size={14} className="fill-amber-400/50 text-amber-400" />);
  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++)
    stars.push(<Star key={`e${i}`} size={14} className="text-gray-300" />);
  return stars;
}

export function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      {/* Image */}
      <Link to={`/courses-online/${course.id}`} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded text-label-sm font-bold tracking-wide ${course.category.color} ${course.category.textColor}`}
        >
          {course.category.label}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/courses-online/${course.id}`} className="block">
          <h3 className="font-headline-md text-[17px] font-semibold text-primary leading-snug mb-1 line-clamp-2 min-h-[44px]">
            {course.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-on-surface-variant text-[13px] mb-3">
          <User size={14} className="shrink-0" />
          <span className="truncate">{course.instructor}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-primary font-bold text-[15px]">{course.rating}</span>
          <div className="flex gap-0.5">{renderStars(course.rating)}</div>
          <span className="text-on-surface-variant text-[13px]">
            ({course.reviewCount.toLocaleString("vi-VN")})
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-outline-variant">
          <span className="font-bold text-primary text-[18px]">
            {course.price === 0 ? "Miễn phí" : formatVND(course.price)}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/courses-online/${course.id}`)}
            aria-label={`Xem chi tiết ${course.title}`}
            className="rounded-lg bg-secondary-container  px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-on-secondary-container hover:text-on-primary active:scale-90"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
