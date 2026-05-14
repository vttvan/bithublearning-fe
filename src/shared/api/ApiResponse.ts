/** Payload lỗi chuẩn — khớp backend / swagger */
export type ApiError = {
  timestamp?: string;
  success?: boolean;
  status: number;
  message: string;
  path?: string;
  errorCode?: string;
};

/** Body JSON bọc `data` — nếu backend trả thẳng T (không envelope) thì `request()` vẫn unwrap được */
export type ApiEnvelope<T> = {
  timestamp?: string;
  success?: boolean;
  message?: string;
  path?: string;
  data?: T;
};
