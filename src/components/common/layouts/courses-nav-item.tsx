import { Link, NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  CoursesNavApiError,
  fetchCoursesNavMenu,
} from "@mock/service/courses-data";
import type { CoursesNavSection } from "@/features/Courses/types/courses-nav";
import { cn } from "@/shared/lib/utils";

/** Khoảng trễ trước khi đóng menu — cho phép di chuột qua khe giữa link và panel */
const MENU_CLOSE_DELAY_MS = 280;

type CoursesNavItemProps = {
  className?: NavLinkProps["className"];
};

export function CoursesNavItem({ className }: CoursesNavItemProps) {
  const [sections, setSections] = useState<CoursesNavSection[]>([]);
  const [loadStatus, setLoadStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [loadError, setLoadError] = useState<CoursesNavApiError | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoadError(null);

    fetchCoursesNavMenu(ac.signal)
      .then((data) => {
        setSections(data);
        setLoadStatus("success");
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        const err =
          e instanceof CoursesNavApiError
            ? e
            : new CoursesNavApiError(
                e instanceof Error ? e.message : "Không tải được menu khóa học",
              );
        setLoadError(err);
        setLoadStatus("error");
      });

    return () => ac.abort();
  }, []);

  const cancelScheduledClose = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    cancelScheduledClose();
    setMenuOpen(true);
  };

  const scheduleCloseMenu = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      closeTimerRef.current = null;
    }, MENU_CLOSE_DELAY_MS);
  };

  useEffect(() => () => cancelScheduledClose(), []);

  return (
    <div className="relative">
      <NavLink
        to="/courses"
        className={className}
        aria-expanded={menuOpen}
        aria-haspopup="true"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}
      >
        Khóa học
      </NavLink>

      <div
        className={cn(
          "fixed inset-x-0 top-14 z-60 hidden border-b-2 border-secondary bg-on-primary pt-2 shadow-lg",
          "transition-opacity duration-200 ease-out",
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0",
          "md:block",
        )}
        role="navigation"
        aria-label="Danh sách khóa học"
        aria-hidden={!menuOpen}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}
      >
        <div className="mx-auto w-full max-w-[1400px] grid gap-x-xl gap-y-lg px-xl py-lg md:grid-cols-2">
          {loadStatus === "loading" ? (
            <CoursesNavMegaSkeleton />
          ) : loadError ? (
            <p
              className="col-span-full font-body-md text-body-md text-error"
              role="alert"
            >
              {loadError.message}
            </p>
          ) : (
            sections.map((section) => (
              <section key={section.id} aria-labelledby={`courses-nav-${section.id}`}>
                <div className="mb-md border-b border-outline-variant pb-sm">
                  {section.href ? (
                    <Link
                      to={section.href}
                      onClick={() => setMenuOpen(false)}
                      className="inline-block"
                    >
                      <h2
                        id={`courses-nav-${section.id}`}
                        className="font-headline-md text-headline-md font-semibold text-primary hover:underline"
                      >
                        {section.title}
                      </h2>
                    </Link>
                  ) : (
                    <h2
                      id={`courses-nav-${section.id}`}
                      className="font-headline-md text-headline-md font-semibold text-primary"
                    >
                      {section.title}
                    </h2>
                  )}
                  {section.subtitle ? (
                    <p className="mt-0.5 font-body-md text-body-md text-primary-fixed-dim">
                      {section.subtitle}
                    </p>
                  ) : null}
                </div>
                <ul className="flex flex-col gap-xs">
                  {section.items.map((item) => (
                    <li key={item.id} className="mb-2">
                      {item.href ? (
                        <Link
                          to={item.href}
                          className="block rounded-lg px-sm py-sm transition-colors hover:bg-surface-container hover:text-primary"
                        >
                          <span className="font-body-md text-body-md font-medium text-on-background">
                            {item.title}
                          </span>
                          {item.description ? (
                            <span className="mt-0.5 block font-body-md text-body-md text-primary-container">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      ) : (
                        <div className="px-sm py-xs">
                          <span className="font-body-md text-body-md font-bold text-on-background">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 block font-body-sm text-body-sm text-on-primary-container/80">
                              {item.description}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Render Children (if any) */}
                      {item.children && item.children.length > 0 && (
                        <ul className="mt-1 ml-4 border-l-2 border-outline-variant pl-2 flex flex-col gap-xs">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={child.href || "#"}
                                className="block rounded-lg px-sm py-xs transition-colors hover:bg-surface-container hover:text-primary"
                              >
                                <span className="font-body-sm text-body-sm font-medium text-on-background">
                                  {child.title}
                                </span>
                                {child.description ? (
                                  <span className="mt-0.5 block font-body-sm text-body-sm text-primary-fixed-dim">
                                    {child.description}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CoursesNavMegaSkeleton() {
  return (
    <>
      {[0, 1].map((col) => (
        <div key={col} className="flex flex-col gap-md" aria-hidden>
          <div className="mb-md space-y-sm border-b border-outline-variant pb-sm">
            <div className="h-7 w-3/5 animate-pulse rounded bg-surface-container-high" />
            <div className="h-4 w-2/5 animate-pulse rounded bg-surface-container-high" />
          </div>
          <ul className="flex flex-col gap-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <div className="space-y-xs rounded-lg px-sm py-sm">
                  <div className="h-5 w-4/5 animate-pulse rounded bg-surface-container-high" />
                  <div className="h-4 w-full animate-pulse rounded bg-surface-container-high/80" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
