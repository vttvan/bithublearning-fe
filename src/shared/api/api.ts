import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiEnvelope, ApiError } from "./ApiResponse";
import { getAccessToken, getRefreshToken } from "@/shared/lib/cookies";
import { refreshAccessToken } from "@/shared/lib/auth-session";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "",
  withCredentials: true,
});

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const res = await api.request<unknown>(config);
    const body = res.data;

    if (body && typeof body === "object") {
      const envelope = body as ApiEnvelope<T>;
      if (envelope.success === false) {
        const err: ApiError = {
          timestamp: envelope.timestamp,
          success: envelope.success,
          status: res.status,
          message: envelope.message || "Request failed",
          path: envelope.path,
          errorCode: (envelope as ApiEnvelope<T> & { errorCode?: string })
            .errorCode,
        };
        return Promise.reject(err);
      }
      if ("data" in envelope && envelope.data !== undefined) {
        return envelope.data as T;
      }
    }

    return body as T;
  } catch (e) {
    throw toApiError(e);
  }
}

function toApiError(e: unknown): ApiError {
  if (
    typeof e === "object" &&
    e !== null &&
    "message" in e &&
    typeof (e as ApiError).message === "string" &&
    "status" in e &&
    typeof (e as ApiError).status === "number"
  ) {
    return e as ApiError;
  }

  const ax = e as AxiosError<ApiEnvelope<unknown> & { message?: string }>;
  const data = ax.response?.data;
  if (!ax.response) {
    return {
      status: 0,
      message: ax.message || "Network error",
    };
  }
  return {
    timestamp: data?.timestamp,
    success: data?.success,
    status: ax.response.status,
    message: data?.message || ax.message || "Network/Server error",
    path: data?.path,
    errorCode: (data as { errorCode?: string })?.errorCode,
  };
}

const isAuthRequest = (url?: string) =>
  !!url &&
  (url.includes("/auth/login") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/logout"));

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = AxiosHeaders.from({});
  }

  let token = getAccessToken();

  if (!token && getRefreshToken() && !isAuthRequest(config.url)) {
    try {
      token = await refreshAccessToken();
    } catch {
      token = undefined;
    }
  }

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
  }

  return config;
});
