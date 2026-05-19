import { GraduationCap, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import signinHeroImage from "../../../../assets/signin.jpg";
import logoImage from "../../../../assets/logo.svg";

/** Đặt ảnh nền trái (server room / datacenter) vào public — ví dụ public/assets/signin.jpg */
export const SIGNIN_HERO_IMAGE = signinHeroImage;

export default function AuthLayout({
  children,
  isOpening = false,
}: {
  children: React.ReactNode;
  isOpening?: boolean;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <motion.div
        initial={false}
        animate={
          isOpening
            ? { opacity: [0, 0.5, 0], scaleX: [0, 1, 1] }
            : { opacity: 0, scaleX: 0 }
        }
        transition={{ duration: 0.95, times: [0, 0.45, 1], ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px origin-center bg-white shadow-[0_0_42px_rgba(255,255,255,0.9)]"
      />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Trái: branding */}
        <motion.aside
          initial={false}
          animate={isOpening ? { x: "-105%", rotateY: -6 } : { x: 0, rotateY: 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="relative hidden min-h-[280px] origin-left overflow-hidden lg:flex lg:min-h-0 lg:basis-1/2 lg:shrink-0 lg:flex-col"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SIGNIN_HERO_IMAGE})` }}
          />
          <div className="absolute inset-0" aria-hidden />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,57,103,0.9)_0%,rgba(6,57,103,0.76)_48%,rgba(6,57,103,0.64)_100%)]"
            aria-hidden
          />
          <div className="relative z-10 flex h-full min-h-[520px] flex-col px-10 py-12 text-white lg:min-h-0 lg:px-10 xl:px-14">
            <div className="mt-[14vh] max-w-full">
              <div className="inline-flex rounded-md border border-white/20 bg-white/92 px-5 py-3 shadow-sm backdrop-blur-sm">
                <img src={logoImage} alt="BitHub" className="h-12 w-auto xl:h-14" />
              </div>
              <p className="mt-8 max-w-[560px] text-[18px] font-semibold leading-8 text-white drop-shadow-sm">
                Engineering excellence through systematic innovation. Access the
                premier TRIZ-based curriculum for modern software architects.
              </p>
            </div>

            <div className="mt-14 grid max-w-[700px]  grid-cols-2 gap-6">
              <div className="min-h-[106px] rounded-md border border-white/18 bg-white/8 px-7 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px]">
                <GraduationCap
                  className="size-6 text-[#f97316]"
                  aria-hidden
                />
                <p className="mt-4 font-serif text-sm font-bold uppercase tracking-wide text-white">
                  Expert curriculum
                </p>
              </div>
              <div className="min-h-[106px] rounded-md border border-white/18 bg-white/8 px-7 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px]">
                <Terminal className="size-6 text-[#f97316]" aria-hidden />
                <p className="mt-4 font-serif text-sm font-bold uppercase tracking-wide text-white">
                  Technical mastery
                </p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Phải: form */}
        <motion.main
          initial={false}
          animate={isOpening ? { x: "105%", rotateY: 6 } : { x: 0, rotateY: 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-1 origin-right flex-col bg-[#fcf9f8] overflow-auto min-w-0"
        >
          {children}
        </motion.main>
      </div>

    </div>
  );
}
