export type CoursesNavItem = {
  id: string;
  title: string;
  description?: string;
  /** Route SPA — backend có thể trả slug / path đầy đủ */
  href?: string;
  children?: CoursesNavItem[];
};

export type CoursesNavSection = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  items: CoursesNavItem[];
};
