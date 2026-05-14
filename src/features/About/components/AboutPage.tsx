import React from "react";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Globe,
  Share2,
  HelpCircle,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AboutPage: React.FC = () => {
  return (
    <main className="bg-surface pb-xl">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aboutus.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-md max-w-3xl"
        >
          <h1 className="font-display text-display text-white mb-md">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-on-primary-fixed-variant text-body-lg leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trên hành trình chinh phục kỹ
            năng lập trình. Hãy để lại lời nhắn hoặc liên hệ trực tiếp với đội
            ngũ BitHub.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-container-max mx-auto px-md -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          {/* Left Column: Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-xs pt-20"
          >
            <h2 className="font-display text-headline-lg font-bold text-primary mb-md">
              Thông tin liên hệ
            </h2>

            {/* Address */}
            <motion.div
              variants={itemVariants}
              className="bg-[#f9f9f9] p-md rounded-lg border border-outline-variant/30 flex gap-md items-start group"
            >
              <div className="text-[#a85e1b] pt-1 shrink-0">
                <MapPin size={22} fill="currentColor" fillOpacity={0.2} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-xs uppercase text-label-xs tracking-wider">
                  Văn phòng
                </h3>
                <p className="text-on-surface-variant text-body-sm leading-relaxed">
                  Tòa nhà BitHub, Khu Công nghệ cao,
                  <br />
                  Quận 9, TP. Hồ Chí Minh, Việt Nam
                </p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={itemVariants}
              className="bg-[#f9f9f9] p-md rounded-lg border border-outline-variant/30 flex gap-md items-center group"
            >
              <div className="text-[#a85e1b] shrink-0">
                <Mail size={20} fill="currentColor" fillOpacity={0.2} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary uppercase text-label-xs tracking-wider inline-block mr-2">
                  Email chuyên nghiệp
                </h3>
                <p className="text-on-surface-variant text-body-sm inline-block">
                  support@bithub.edu.vn
                </p>
              </div>
            </motion.div>

            {/* Hotline */}
            <motion.div
              variants={itemVariants}
              className="bg-[#f9f9f9] p-md rounded-lg border border-outline-variant/30 flex gap-md items-center group"
            >
              <div className="text-[#a85e1b] shrink-0">
                <Phone size={20} fill="currentColor" fillOpacity={0.2} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary uppercase text-label-xs tracking-wider inline-block mr-2">
                  Hotline hỗ trợ
                </h3>
                <p className="text-on-surface-variant text-body-sm inline-block">
                  1900 8888 (08:00 - 18:00)
                </p>
              </div>
            </motion.div>

            {/* Social Connect */}
            <motion.div variants={itemVariants} className="pt-sm">
              <h3 className="font-display text-headline-xs font-bold text-primary mb-xs">
                Kết nối với chúng tôi
              </h3>
              <div className="flex gap-xs">
                <button className="bg-[#001c3d] text-white p-2 rounded-sm hover:bg-primary transition-colors">
                  <Globe size={16} />
                </button>
                <button className="bg-[#001c3d] text-white p-2 rounded-sm hover:bg-primary transition-colors flex items-center justify-center w-8 h-8">
                  <div className="font-bold text-md leading-none">@</div>
                </button>
                <button className="bg-[#001c3d] text-white p-2 rounded-sm hover:bg-primary transition-colors">
                  <Share2 size={16} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8 pt-28"
          >
            <div className="bg-white p-md md:p-lg rounded-lg shadow-sm border border-outline-variant/30">
              <form className="space-y-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-label-sm font-semibold text-on-surface-variant">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full px-md py-2 bg-[#f9f9f9] border border-outline-variant/50 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 text-body-sm"
                    />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-label-sm font-semibold text-on-surface-variant">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      className="w-full px-md py-2 bg-[#f9f9f9] border border-outline-variant/50 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 text-body-sm"
                    />
                  </div>
                </div>

                <div className="space-y-xs relative">
                  <label className="text-label-sm font-semibold text-on-surface-variant">
                    Chủ đề
                  </label>
                  <select className="w-full px-md py-2 bg-[#f9f9f9] border border-outline-variant/50 rounded focus:outline-none focus:border-primary transition-colors appearance-none pr-10 text-body-sm">
                    <option>Hỗ trợ khóa học</option>
                    <option>Vấn đề tài khoản</option>
                    <option>Hợp tác đào tạo</option>
                    <option>Khác</option>
                  </select>
                  <div className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-semibold text-on-surface-variant">
                    Lời nhắn
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bạn cần chúng tôi hỗ trợ gì?"
                    className="w-full px-md py-2 bg-[#f9f9f9] border border-outline-variant/50 rounded focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-gray-300 text-body-sm"
                  ></textarea>
                </div>

                <button className="w-full bg-[#001836] text-white py-sm rounded font-bold text-md flex items-center justify-center gap-md hover:bg-black transition-colors group">
                  Gửi tin nhắn
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Quick Answer CTA */}
        {/* Quote */}
        <motion.div
          variants={itemVariants}
          className="bg-[#fef2e8] border-l-[6px] border-[#a85e1b] p-md rounded-r-lg mt-md"
        >
          <p className="italic text-on-surface text-body-xs leading-relaxed font-medium">
            "Tại BitHub, chúng tôi không chỉ dạy lập trình, chúng tôi xây dựng
            nền tảng tư duy có hệ thống."
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-2xl bg-white p-lg md:p-xl rounded-2xl shadow-md border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-xl"
        >
          <div className="flex items-center gap-lg">
            <div className="bg-secondary/10 p-md rounded-2xl text-secondary shrink-0">
              <HelpCircle size={40} />
            </div>
            <div>
              <h2 className="font-display text-headline-md text-primary mb-xs">
                Bạn cần câu trả lời nhanh?
              </h2>
              <p className="text-on-surface-variant text-body-md">
                Khám phá Trung tâm trợ giúp của chúng tôi để tìm câu trả lời cho
                các vấn đề thường gặp.
              </p>
            </div>
          </div>
          <button className="whitespace-nowrap border-2 border-primary text-primary px-xl py-md rounded-xl font-bold flex items-center gap-md hover:bg-primary hover:text-on-primary transition-all group">
            Truy cập Help Center
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;
