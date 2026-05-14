import type { CoursesNavSection } from "@/features/Courses/types/courses-nav";
import type { ApiError } from "@/shared/api/ApiResponse";
import { request } from "@/shared/api/api";

/** Đường dẫn REST — khớp backend (GET) */
export const COURSES_NAV_MENU_PATH = "/courses/nav-menu";

const MOCK_LATENCY_MS = 280;

function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/**
 * `VITE_USE_MOCK_API=false` → gọi `{VITE_API_URL}/courses/nav-menu` qua axios `request()`.
 * `true` hoặc không set khi không có `VITE_API_URL` → mock + delay.
 */
export function shouldUseMockCoursesNavApi(): boolean {
  const explicit = import.meta.env.VITE_USE_MOCK_API;
  if (explicit === "false") return false;
  if (explicit === "true") return true;
  return !import.meta.env.VITE_API_URL?.trim();
}

export class CoursesNavApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "CoursesNavApiError";
  }
}

async function fetchCoursesNavMenuMock(
  signal?: AbortSignal,
): Promise<CoursesNavSection[]> {
  const { coursesNavSections } = await import("../data/courses-nav.mock");
  await delay(MOCK_LATENCY_MS, signal);
  return structuredClone(coursesNavSections);
}

async function fetchCoursesNavMenuRemote(
  signal?: AbortSignal,
): Promise<CoursesNavSection[]> {
  try {
    return await request<CoursesNavSection[]>({
      method: "GET",
      url: COURSES_NAV_MENU_PATH,
      signal,
    });
  } catch (e) {
    const ae = e as ApiError;
    throw new CoursesNavApiError(ae.message, ae.status);
  }
}

export async function fetchCoursesNavMenu(
  signal?: AbortSignal,
): Promise<CoursesNavSection[]> {
  if (shouldUseMockCoursesNavApi()) {
    return fetchCoursesNavMenuMock(signal);
  }
  return fetchCoursesNavMenuRemote(signal);
}
