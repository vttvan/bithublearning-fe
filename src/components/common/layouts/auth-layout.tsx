import { Link } from "react-router-dom";
import { GraduationCap, Terminal } from "lucide-react";
import signinHeroImage from "../../../../assets/signin.png";

/** Đặt ảnh nền trái (server room / datacenter) vào public — ví dụ public/assets/signin.jpg */
export const SIGNIN_HERO_IMAGE = signinHeroImage;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Trái: branding — chỉ desktop lg; ảnh do bạn thay trong public */}
        <aside className="relative hidden min-h-[280px] overflow-hidden lg:flex lg:min-h-0 lg:basis-1/2 lg:flex-col lg:shrink-0">
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SIGNIN_HERO_IMAGE})` }}
          />
          <div className="absolute inset-0 bg-primary-container/75" aria-hidden />
          <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-between px-10 py-12 text-white lg:min-h-0 lg:px-14 lg:py-14">
            <div className="max-w-full mt-35">
              <p className=" text-4xl font-bold tracking-tight lg:text-5xl">
                BitHub
              </p>
              <p className="mt-6 font-body-md text-body-md leading-relaxed text-white/95 w-3/4">
                Engineering excellence through systematic innovation. Access the
                premier TRIZ-based curriculum for modern software architects.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-md border border-white/25 bg-black/25 px-4 py-3 font-label-sm text-label-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                <GraduationCap
                  className="size-5 shrink-0 opacity-90"
                  aria-hidden
                />
                Expert curriculum
              </div>
              <div className="flex items-center gap-2 rounded-md border border-white/25 bg-black/25 px-4 py-3 font-label-sm text-label-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                <Terminal className="size-5 shrink-0 opacity-90" aria-hidden />
                Technical mastery
              </div>
            </div>
          </div>
        </aside>

        {/* Phải: form */}
        <main className="flex flex-1 flex-col bg-[#fcf9f8] overflow-auto min-w-0">
        {children}
        </main>
      </div>

    </div>
  );
}
