import {
  Users,
  BookOpen,
  BadgeCheck,
  ArrowRight,
  ShoppingCart,
  Star,
  CheckCircle,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "circOut" },
  },
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="hero-gradient relative overflow-hidden py-14 sm:py-20 md:py-28 lg:py-32"
          data-alt="A professional corporate training room with large glass windows showing a city skyline at dusk. Professional business experts are seen in silhouettes engaged in collaborative learning. The lighting is deep blue with warm golden highlights reflecting off glass surfaces, creating an atmosphere of sophisticated academic achievement and technological progress."
        >
          <div className="max-w-container-max mx-auto px-4 sm:px-md relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="font-display text-4xl font-bold leading-tight text-on-primary mb-sm sm:text-5xl lg:text-display">
                Xây dựng{" "}
                <span className="text-secondary-container">
                  nền tảng sự nghiệp
                </span>{" "}
                trong công nghệ và kỹ năng mềm
              </h1>
              <p className="font-body-lg text-base text-primary-fixed-dim mb-lg leading-relaxed sm:text-body-lg">
                Tham gia các khóa học chuyên nghiệp do chuyên gia trong ngành
                thiết kế. Làm chủ đổi mới có hệ thống (TRIZ) và các ngôn ngữ lập
                trình đang được săn đón qua hệ sinh thái học tập bài bản.
              </p>
              <div className="flex flex-col gap-sm mb-xl sm:flex-row sm:flex-wrap sm:gap-md">
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-secondary-container hover:bg-secondary text-on-primary hover:text-primary px-lg py-sm rounded font-bold text-body-lg transition-all active:scale-95 shadow-lg"
                >
                  Khám phá khóa học
                </button>
                <button className="border border-on-primary text-on-primary hover:bg-on-primary hover:text-primary px-lg py-sm rounded font-bold text-body-lg transition-all active:scale-95">
                  Tìm hiểu thêm
                </button>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-sm sm:grid-cols-3 sm:gap-md"
              >
                <motion.div
                  variants={itemVariants}
                  className="stat-card-blur rounded-2xl border border-white/10 p-sm text-center text-white"
                >
                  <Users
                    className="mx-auto mb-sm text-secondary-container"
                    size={24}
                  />

                  <div className="text-xl font-bold mb-xs">500+</div>

                  <div className="text-sm uppercase tracking-[0.1em] text-white/70 font-semibold">
                    Học viên
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="stat-card-blur rounded-2xl border border-white/10 p-sm text-center text-white"
                >
                  <BookOpen
                    className="mx-auto mb-sm text-secondary-container"
                    size={24}
                  />

                  <div className="text-xl font-bold mb-xs">50+</div>

                  <div className="text-sm uppercase tracking-[0.1em] text-white/70 font-semibold">
                    Khóa học
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="stat-card-blur rounded-2xl border border-white/10 p-sm text-center text-white"
                >
                  <BadgeCheck
                    className="mx-auto mb-sm text-secondary-container"
                    size={24}
                  />

                  <div className="text-xl font-bold mb-xs">95%</div>

                  <div className="text-sm uppercase tracking-[0.1em] text-white/70 font-semibold">
                    Hài lòng
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        <section className="bg-surface py-14 sm:py-xl">
          <div className="max-w-container-max mx-auto px-4 sm:px-md">
            <div className="mb-lg flex flex-col gap-sm sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary mb-xs sm:text-headline-lg">
                  Lộ trình chuyên nghiệp nổi bật
                </h2>
                <p className="text-on-surface-variant max-w-full">
                  Các chuyên ngành được tuyển chọn để đưa bạn từ nền tảng ban
                  đầu đến năng lực thực chiến cùng chứng nhận được công nhận.
                </p>
              </div>
              <button className="flex w-fit items-center gap-xs text-secondary font-bold hover:underline decoration-2">
                Xem tất cả khóa học{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3"
            >
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  {/* Card content kept as is, just wrapped in motion.div */}
                  {i === 1 && (
                    <div className="bg-surface-container-lowest rounded overflow-hidden shadow-sm border border-outline-variant hover:shadow-md transition-shadow group h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt="Coding workspace"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdjr9VFe7o804yEA3TIJSoQ-XTrCCDD8MJdFo8vlPIFHIdxKVHwTuuWPZyDfW6uCPumL_V_pdjW2RJNnI8gKbEkjADU2n4gj1hE5Nc-ZuEWtVg4PKgBKmoKTmxVzXeHBlIsMeHZb0nSQ26t-2fLahBEjdudFM5VqDnOQ4AwMsrqMmS-QHMw-IzokN42XUH1w0HAsQa7xTCR6a2T0Xl2ER8Mj8O69v8hCFdJmUJq0lR-xsRmICvG4giIq-Q5ng_awtMHBAjbqiXdYc"
                        />
                      </div>
                      <div className="p-md">
                        <div className="bg-secondary-container/10 text-secondary px-xs py-base rounded text-label-sm inline-block mb-xs uppercase tracking-tighter">
                          Lập trình
                        </div>
                        <h3 className="font-display text-headline-md text-primary mb-xs">
                          Bootcamp phát triển web
                        </h3>
                        <p className="text-on-surface-variant text-body-md mb-md">
                          Làm chủ full-stack từ HTML/CSS đến React và Node.js.
                        </p>
                        <div className="flex items-center gap-xs mb-2">
                          <Star
                            className="fill-secondary-container text-secondary-container"
                            size={20}
                          />
                          <span className="font-bold text-primary">4.9</span>
                          <span className="text-on-surface-variant text-label-sm">
                            (2,1k đánh giá)
                          </span>
                        </div>
                        <div className="text-on-surface-variant text-label-sm mb-md">
                          Giảng viên: GS. Alex Rivera
                        </div>
                        <div className="flex items-center justify-between gap-xs border-t border-outline-variant pt-md">
                          <div className="text-headline-md font-bold text-primary">
                            $89.00
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => navigate("/cart")}
                              aria-label="Đi tới giỏ hàng"
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-secondary-container/20 active:scale-95"
                            >
                              <ShoppingCart
                                size={20}
                                className="text-secondary-container"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="bg-surface-container-lowest rounded overflow-hidden shadow-sm border border-outline-variant hover:shadow-md transition-shadow group h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          data-alt="An abstract artistic representation of creative problem solving. Geometric shapes like gears and lightbulbs are interconnected by thin glowing lines over a structured blueprint. The color scheme is a professional palette of deep navy blues and vibrant oranges, suggesting systematic innovation and cognitive rigor in a modern light-mode setting."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxWHkwaAa7puEQygHo_aYJTZaWdJfdhG_hwIwwQ2PPMJpbhxDqcHBmG8RtA61C8o1CgAGqRCn8aP03ccamxS3MFbBvQicP3nXWz7_K7WWx_0TM1mjKyn5IbRkS0KzA6L5z8uvj5dcZyC6A5IyRXJhbZK1hVMwXu-t8HUSJxu6le_4XvKxzXlKp6VpB2bxvYVx2haRdSpWmzurnNQCOg76OY_U65_mb0SP5IQxk41iA19AmZgkvzAjBrPv9YtviLIpNC1ifAYcvg4U"
                        />
                      </div>
                      <div className="p-md">
                        <div className="bg-tertiary-container/10 text-on-tertiary-container px-xs py-base rounded text-label-sm inline-block mb-xs uppercase tracking-tighter">
                          Đổi mới có hệ thống
                        </div>
                        <h3 className="font-display text-headline-md text-primary mb-xs">
                          TRIZ: Đổi mới có hệ thống
                        </h3>
                        <p className="text-on-surface-variant text-body-md mb-md">
                          Giải quyết vấn đề kỹ thuật phức tạp bằng phương pháp
                          TRIZ.
                        </p>
                        <div className="flex items-center gap-xs mb-2">
                          <Star
                            className="fill-secondary-container text-secondary-container"
                            size={20}
                          />
                          <span className="font-bold text-primary">5.0</span>
                          <span className="text-on-surface-variant text-label-sm">
                            (850 đánh giá)
                          </span>
                        </div>
                        <div className="text-on-surface-variant text-label-sm mb-md">
                          Giảng viên: TS. Elena Petrova
                        </div>
                        <div className="flex items-center justify-between gap-xs border-t border-outline-variant pt-md">
                          <div className="text-headline-md font-bold text-primary">
                            $120.00
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => navigate("/cart")}
                              aria-label="Đi tới giỏ hàng"
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-secondary-container/20 active:scale-95"
                            >
                              <ShoppingCart
                                size={20}
                                className="text-secondary-container"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {i === 3 && (
                    <div className="bg-surface-container-lowest rounded overflow-hidden shadow-sm border border-outline-variant hover:shadow-md transition-shadow group h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          data-alt="A sophisticated data visualization dashboard displayed on a high-resolution monitor. Complex charts and graphs in shades of blue and amber represent data science workflows. The room is a bright, modern office with minimalist decor, reinforcing a technical and authoritative academic environment."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhNgJHixX99JXZ8PYDudeXPA2b_h6--ia_1sW5dumbc6K2KIPLhiHUovaARRiH7N8unWPozgsOLXXMN4zUf64dzMGb6Sm4okwaLeaSWf3WJABBfUhxckr5SmpkNPbcljPQwurlM1NwuBt9AYyCQ1OGKm7kQ6cf2oWXtbhxsIov3R2C_6IokYDHQa9IVwApaAxFsIuAd-0rLrHLqxFzfqeZY5xMpM3csu12YfYmnGQMzQMcECJ7ZBi-S7QSqAi0KWWaYIFMvT9oMFY"
                        />
                      </div>
                      <div className="p-md">
                        <div className="bg-primary-container/10 text-primary-container px-xs py-base rounded text-label-sm inline-block mb-xs uppercase tracking-tighter">
                          Khoa học dữ liệu
                        </div>
                        <h3 className="font-display text-headline-md text-primary mb-xs">
                          Python cho khoa học dữ liệu
                        </h3>
                        <p className="text-on-surface-variant text-body-md mb-md">
                          Phân tích và trực quan hóa bộ dữ liệu phức tạp theo
                          chuẩn thực tế trong ngành.
                        </p>
                        <div className="flex items-center gap-xs mb-2">
                          <Star
                            className="fill-secondary-container text-secondary-container"
                            size={20}
                          />
                          <span className="font-bold text-primary">4.8</span>
                          <span className="text-on-surface-variant text-label-sm">
                            (1,5k đánh giá)
                          </span>
                        </div>
                        <div className="text-on-surface-variant text-label-sm mb-md">
                          Giảng viên: ThS. James Chen
                        </div>
                        <div className="flex items-center justify-between gap-xs border-t border-outline-variant pt-md">
                          <div className="text-headline-md font-bold text-primary">
                            $95.00
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => navigate("/cart")}
                              aria-label="Đi tới giỏ hàng"
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-secondary-container/20 active:scale-95"
                            >
                              <ShoppingCart
                                size={20}
                                className="text-secondary-container"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden bg-surface-container-low py-14 sm:py-xl"
        >
          <div className="max-w-container-max mx-auto flex flex-col items-center gap-lg px-4 sm:px-md md:flex-row lg:gap-xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full md:w-1/2"
            >
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-fixed opacity-20 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  className="w-full h-auto"
                  data-alt="A diverse team of professionals collaborating around a large touchscreen display in a bright, modern corporate innovation hub. They are engaged and smiling, wearing business casual attire. The environment is crisp and airy, with floor-to-ceiling windows and premium furniture in a high-key light mode style."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFHAmsmR7LZYv-SA-RWmdj2DYMbrFKHZEHF5V2E8RyPTE1WLVQtSJqVMUcf8Q9fWKvZblCpQpguSjlhCVhNI_ye7qQ05NqXUuIJUXn9_r88QQ4dw9kNurFzxEp8pv_jh4YIPmatgcAm-kZOd9IyPgfFzxHnB4MFnbqNA9PhrxNTEzexgOSqQGdio53C0Q_XAwXD8KmQER5ULX3WzJDTkRGgFC-9jD4AUAdYreWsMZl5U6cv1hxnoeV4X28CBpWTUpwK0XXO0y-YwI"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full md:w-1/2"
            >
              <div className="font-label-sm text-secondary font-bold uppercase tracking-widest mb-xs">
                Dành cho tổ chức
              </div>
              <h2 className="font-display text-3xl font-bold text-primary leading-tight mb-md sm:text-4xl lg:text-display">
                Trao quyền cho đội ngũ bằng đổi mới có hệ thống
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-lg">
                Mở rộng năng lực kỹ thuật và sáng tạo với giải pháp đào tạo
                doanh nghiệp. Chúng tôi cung cấp lộ trình tùy chỉnh, theo dõi
                tiến độ riêng và cố vấn chuyên môn cho mọi quy mô đội ngũ.
              </p>
              <div className="space-y-sm mb-lg">
                <div className="flex items-center gap-sm">
                  <CheckCircle
                    className="shrink-0 text-secondary-container"
                    size={22}
                  />
                  <span className="text-body-md font-semibold text-primary">
                    Tùy chỉnh học phần theo nhu cầu
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <CheckCircle
                    className="shrink-0 text-secondary-container"
                    size={22}
                  />
                  <span className="text-body-md font-semibold text-primary">
                    Tích hợp API với hệ thống LMS
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <CheckCircle
                    className="shrink-0 text-secondary-container"
                    size={22}
                  />
                  <span className="text-body-md font-semibold text-primary">
                    Kết nối trực tiếp với chuyên gia TRIZ
                  </span>
                </div>
              </div>
              <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95 shadow-md">
                Yêu cầu demo doanh nghiệp
              </button>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </>
  );
};
export default HomePage;
