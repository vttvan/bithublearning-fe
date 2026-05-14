import { useState, useMemo } from "react";
import { Search, Star, ShoppingCart, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { coursesMock } from "@mock/data/courses.mock";
import type { Course, CourseLevel } from "@/types/course";
import { Input } from "../../../components/common/ui/input";
import { Link } from "react-router-dom";
import { CourseCard } from "./CourseCard";

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─── helpers ─── */
function formatVND(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

function renderStars(rating: number) {
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

/* ─── filter option data ─── */
const CATEGORY_OPTIONS = [
  { id: "programming", label: "Programming" },
  { id: "soft-skills", label: "Soft Skills" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "data-science", label: "Data Science" },
  { id: "innovation", label: "Innovation" },
  { id: "architecture", label: "Architecture" },
  { id: "business", label: "Business" },
];

const LEVEL_OPTIONS: { id: CourseLevel; label: string }[] = [
  { id: "Beginner", label: "Beginner" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Advanced", label: "Advanced" },
];

const SORT_OPTIONS = [
  { id: "popular", label: "Phổ biến nhất" },
  { id: "rating", label: "Đánh giá cao" },
  { id: "price-asc", label: "Giá thấp → cao" },
  { id: "price-desc", label: "Giá cao → thấp" },
];

const ITEMS_PER_PAGE = 6;

/* ══════════════════════════════════════════════ */
/*                  CoursesPage                  */
/* ══════════════════════════════════════════════ */
const CoursesPage: React.FC = () => {
  /* ── state ── */
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["programming"]);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  /* ── derived data ── */
  const filtered = useMemo(() => {
    let list: Course[] = [...coursesMock];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
      );
    }

    // category
    if (selectedCategories.length > 0) {
      list = list.filter((c) => selectedCategories.includes(c.category.id));
    }

    // level
    if (selectedLevel) {
      list = list.filter((c) => c.level === selectedLevel);
    }

    // price
    list = list.filter((c) => c.price <= maxPrice || c.price === 0);

    // sort
    switch (sortBy) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default: // popular → by review count
        list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [search, selectedCategories, selectedLevel, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ── handlers ── */
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const handleLevelChange = (level: CourseLevel) => {
    setSelectedLevel((prev) => (prev === level ? null : level));
    setCurrentPage(1);
  };

  const buildPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, "...", totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* ── Search Hero Banner ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="courses-search-gradient relative py-20 md:py-32 overflow-hidden"
      >
        <div className="max-w-container-max mx-auto px-md relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-10"
              />
              <Input
                id="courses-search"
                type="text"
                placeholder="Bạn muốn học gì hôm nay? Tìm kiếm khóa học, kỹ năng hoặc chuyên gia..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full items-center justify-center rounded-full border-none bg-white  pl-12 pr-6 text-on-background placeholder-on-surface-variant/60 text-body-md shadow-lg outline-none transition-all focus:ring-2 focus:ring-secondary-container"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Title section ── */}
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-container-max mx-auto px-md pt-10 pb-2"
      >
        <h1 className="font-display text-display text-primary mb-xs leading-tight">
          Khám phá các Khóa học
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl leading-relaxed">
          Nâng tầm kỹ năng của bạn với lộ trình đào tạo bài bản từ chuyên gia.
          Học tập có hệ thống theo phương pháp đổi mới TRIZ.
        </p>
      </motion.section>

      {/* ── Content: Sidebar + Cards ── */}
      <section className="max-w-container-max mx-auto px-md py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Sidebar ── */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-20 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm space-y-6">
              <h3 className="text-body-md font-semibold text-on-surface-variant">
                Lọc khóa học
              </h3>

              {/* Category */}
              <div>
                <h4 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Danh mục
                </h4>
                <div className="space-y-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="w-4 h-4 rounded border-gray-300 text-secondary-container accent-secondary-container focus:ring-secondary-container"
                      />
                      <span className="text-body-md text-on-background group-hover:text-primary transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <h4 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Trình độ
                </h4>
                <div className="space-y-2">
                  {LEVEL_OPTIONS.map((lvl) => (
                    <label
                      key={lvl.id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl.id}
                        onChange={() => handleLevelChange(lvl.id)}
                        className="w-4 h-4 border-gray-300 text-secondary-container accent-secondary-container focus:ring-secondary-container"
                      />
                      <span className="text-body-md text-on-background group-hover:text-primary transition-colors">
                        {lvl.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h4 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Giá (VND)
                </h4>
                <input
                  type="range"
                  min={0}
                  max={5000000}
                  step={100000}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-secondary-container"
                />
                <div className="flex justify-between text-label-sm text-on-surface-variant mt-1">
                  <span>0</span>
                  <span>5M+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Right Main ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-body-md text-on-surface-variant">
                Đang hiển thị{" "}
                <span className="font-bold text-primary">{filtered.length}</span>{" "}
                khóa học hàng đầu
              </p>
              <div className="flex items-center gap-2">
                <span className="text-body-md text-on-surface-variant">Sắp xếp:</span>
                <select
                  id="courses-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md text-on-background outline-none focus:ring-2 focus:ring-secondary-container"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Cards Grid */}
            {paginated.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant text-body-lg">
                Không tìm thấy khóa học phù hợp.
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${currentPage}-${sortBy}-${search}-${selectedCategories.join(",")}`}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {paginated.map((course) => (
                  <motion.div key={course.id} variants={itemVariants}>
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Phân trang"
                className="flex justify-center items-center gap-1 mt-10"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={16} />
                </button>
                {buildPageNumbers().map((p, idx) =>
                  p === "..." ? (
                    <span
                      key={`dots-${idx}`}
                      className="w-9 h-9 flex items-center justify-center text-on-surface-variant"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-body-md font-medium transition-colors ${
                        currentPage === p
                          ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                          : "border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Trang sau"
                >
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesPage;
