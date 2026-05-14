import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./fotter";
import ScrollToTop from "./scroll-to-top";

export function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        {!isDashboard && <ScrollToTop />}
        {!isDashboard && <Footer />}
      </div>
    </>
  );
}
