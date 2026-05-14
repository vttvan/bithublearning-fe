import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

import { Buffer } from "buffer";
import { AuthProvider } from "./features/Auth/context/AuthContext.tsx";
import { ThemeProvider } from "./shared/contexts/theme-context.tsx";
import { SearchProvider } from "./shared/contexts/search-context.tsx";
(window as any).Buffer = Buffer;
(globalThis as any).Buffer = Buffer;

const container = document.getElementById("root")!;
const root = createRoot(container);

const renderApp = () => {
  root.render(
    <HashRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <HelmetProvider>
            <SearchProvider>
              <Toaster richColors position="top-right" />
              <App />
            </SearchProvider>
          </HelmetProvider>
        </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  );
};

const bootstrapApp = async () => {
  try {
  } catch {
    // Session restore is best-effort; auth hooks will handle any remaining errors.
  } finally {
    renderApp();
  }
};

void bootstrapApp();
