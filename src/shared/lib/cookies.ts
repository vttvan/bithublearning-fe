/**
 * Stub — thay bằng đọc cookie / storage thật khi có auth.
 * Giữ export để `client.ts` interceptor không đổi khi nối backend.
 */
export function getAccessToken(): string | undefined {
  return undefined;
}

export function getRefreshToken(): string | undefined {
  return undefined;
}
