import { Globe2, GraduationCap } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e6e9ef] bg-white">
      <div className="mx-auto flex max-w-container-max flex-col gap-6 px-4 py-8 sm:px-md lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <button
            type="button"
            className="flex items-center gap-3 text-left"
            aria-label="BitHub"
          >
            <img src="/assets/logo.svg" alt="" className="h-9 w-auto" />
        
          </button>
          <p className="mt-3 text-sm font-medium text-[#475467]">
            © {year} BITHUB. Structured Systematic Innovation.
          </p>
        </div>

        <nav
          aria-label="Liên kết footer"
          className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold text-[#001c3d]"
        >
          <a href="#" className="hover:text-[#f28633]">
            Điều khoản dịch vụ
          </a>
          <a href="#" className="hover:text-[#f28633]">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-[#f28633]">
            Cài đặt cookie
          </a>
          <a href="#" className="hover:text-[#f28633]">
            Hỗ trợ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Ngôn ngữ"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d0d5dd] text-[#003366] transition-colors hover:border-[#f28633] hover:text-[#f28633]"
          >
            <Globe2 size={18} />
          </a>
          <a
            href="#"
            aria-label="Học viện"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d0d5dd] text-[#003366] transition-colors hover:border-[#f28633] hover:text-[#f28633]"
          >
            <GraduationCap size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
