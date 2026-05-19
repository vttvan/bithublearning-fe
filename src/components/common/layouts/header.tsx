import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { CoursesNavItem } from "./courses-nav-item";
import logoImage from "../../../../assets/logo.svg";
import { useAuth } from "@/features/Auth/context/AuthContext";
import CartDropdown from "@/features/Cart/components/CartDropdown";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative inline-block pb-1.5 font-body-md transition-all duration-300 ease-out",
    "font-medium text-primary-container",
    "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-secondary-container after:transition-transform after:duration-300 after:ease-out after:content-['']",
    "hover:-translate-y-1 hover:text-primary hover:after:scale-x-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-on-primary",
    isActive &&
      "-translate-y-1 font-bold text-primary after:scale-x-100",
  );

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateMobile = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-on-primary shadow-sm border-b-2 border-secondary">
    <div className="grid h-16 w-full max-w-container-max mx-auto grid-cols-[1fr_auto] items-center gap-md px-md md:grid-cols-[1fr_auto_1fr]">
      <div className="flex min-w-0 items-center justify-self-start">
        <img src={logoImage} alt="bithub" className="cursor-pointer" onClick={() => navigate("/")} />
      </div>
      <nav className="hidden items-baseline gap-lg md:flex">
        <NavLink to="/" end className={navLinkClass}>
          Trang chủ
        </NavLink>
        <CoursesNavItem className={navLinkClass} />
       
        <NavLink to="/about" className={navLinkClass}>
          Về chúng tôi
        </NavLink>
         {isAuthenticated && (
          <NavLink to="/dashboard" className={navLinkClass}>
            Học tập của tôi
          </NavLink>
        )}
      </nav>
      <div className="hidden items-center justify-self-end gap-sm md:flex">
        {isAuthenticated ? (
          <div className="flex items-center gap-md">
            <CartDropdown />
            <div 
              className="flex items-center gap-sm cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/dashboard")}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                <img src={user?.avatar} alt="Ảnh đại diện" className="w-full h-full object-cover" />
              </div>
              <span className="text-body-sm font-bold text-primary hidden lg:inline">
                {user?.fullName}
              </span>
            </div>
          
          </div>
        ) : (
          <>
            <Button
              onClick={() => navigate("/signin")}
              className="px-sm bg-primary-container/90 py-xs text-on-primary font-medium hover:bg-primary-container/70 transition-all active:scale-95"
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="px-md py-xs  bg-secondary-container text-on-primary font-bold rounded-lg hover:brightness-110 transition-all active:scale-95"
            >
              Đăng ký
            </Button>
          </>
        )}
      </div>
      <button
        type="button"
        aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((current) => !current)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-primary md:hidden"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
    {mobileMenuOpen ? (
      <div className="border-t border-outline-variant bg-on-primary px-md py-sm shadow-lg md:hidden">
        <nav className="flex flex-col gap-xs">
          <button onClick={() => navigateMobile("/")} className="rounded-lg px-sm py-sm text-left font-semibold text-primary hover:bg-surface-container">
            Trang chủ
          </button>
          <button onClick={() => navigateMobile("/courses")} className="rounded-lg px-sm py-sm text-left font-semibold text-primary hover:bg-surface-container">
            Khóa học
          </button>
          <button onClick={() => navigateMobile("/about")} className="rounded-lg px-sm py-sm text-left font-semibold text-primary hover:bg-surface-container">
            Về chúng tôi
          </button>
          {isAuthenticated ? (
            <>
              <button onClick={() => navigateMobile("/dashboard")} className="rounded-lg px-sm py-sm text-left font-semibold text-primary hover:bg-surface-container">
                Học tập của tôi
              </button>
              <button onClick={() => navigateMobile("/cart")} className="rounded-lg px-sm py-sm text-left font-semibold text-primary hover:bg-surface-container">
                Giỏ hàng
              </button>
            </>
          ) : (
            <div className="mt-xs grid grid-cols-2 gap-xs">
              <button onClick={() => navigateMobile("/signin")} className="rounded-lg border border-outline-variant px-sm py-sm font-semibold text-primary">
                Đăng nhập
              </button>
              <button onClick={() => navigateMobile("/signup")} className="rounded-lg bg-secondary-container px-sm py-sm font-bold text-on-secondary-container">
                Đăng ký
              </button>
            </div>
          )}
        </nav>
      </div>
    ) : null}
  </header>
  );
};
export default Header;
