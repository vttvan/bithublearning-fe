/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL backend — axios `baseURL`, ví dụ http://localhost:8080 hoặc https://api.example.com */
  readonly VITE_API_URL?: string;
  /**
   * `true` — luôn mock + delay.
   * `false` — luôn gọi API qua axios.
   * Không set — có `VITE_API_URL` thì gọi thật, không thì mock.
   */
  readonly VITE_USE_MOCK_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
