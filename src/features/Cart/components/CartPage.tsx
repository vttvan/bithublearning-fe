import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Star, Trash2 } from "lucide-react";
import { cartItemsMock, recommendedCartCoursesMock } from "../mocks/cart.mock";

function formatVND(value: number): string {
  return value === 0 ? "Miễn phí" : `${value.toLocaleString("vi-VN")}đ`;
}

const CartPage = () => {
  const subtotal = cartItemsMock.reduce((sum, item) => sum + item.price, 0);
  const discount = 550000;
  const total = Math.max(subtotal - discount, 0);

  return (
    <main className="bg-[#faf8f6]">
      <section className="mx-auto max-w-container-max px-md py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
            Giỏ hàng của bạn
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Bạn đang có {cartItemsMock.length} khóa học trong giỏ hàng
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {cartItemsMock.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm sm:flex-row"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-36 w-full rounded-lg object-cover sm:h-24 sm:w-36"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-secondary-container">
                    {item.category}
                  </span>
                  <h2 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Giảng viên: {item.instructor}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <p className="text-lg font-bold text-primary">{formatVND(item.price)}</p>
                  <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-error">
                    <Trash2 size={15} />
                    Xóa
                  </button>
                </div>
              </article>
            ))}

            <Link
              to="/courses-online"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary-container"
            >
              Tiếp tục mua sắm
              <ChevronRight size={16} />
            </Link>
          </div>

          <aside className="h-fit rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-lg lg:sticky lg:top-24">
            <h2 className="mb-5 font-display text-xl font-bold text-primary">
              Tổng đơn hàng
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Tạm tính</span>
                <span className="font-semibold text-primary">{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Giảm giá</span>
                <span className="font-semibold text-secondary-container">
                  -{formatVND(discount)}
                </span>
              </div>
            </div>
            <div className="my-5 border-t border-outline-variant" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">Tổng tiền</span>
              <span className="text-2xl font-bold text-primary">{formatVND(total)}</span>
            </div>
            <button className="mt-6 w-full rounded-lg bg-primary px-4 py-3.5 font-bold text-on-primary shadow-sm transition-all hover:brightness-110 active:scale-[0.98]">
              Thanh toán ngay
            </button>
            <div className="mt-5 space-y-2 text-xs text-on-surface-variant">
              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-secondary-container" />
                Thanh toán bảo mật SSL 256-bit
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-secondary-container" />
                Hoàn tiền trong 7 ngày nếu chưa bắt đầu học
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-container-max px-md pb-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary">
              Khóa học gợi ý cho bạn
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Dựa trên khóa học bạn đang chọn
            </p>
          </div>
          <Link
            to="/courses-online"
            className="hidden items-center gap-1 text-sm font-bold text-primary hover:text-secondary-container sm:inline-flex"
          >
            Xem tất cả
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedCartCoursesMock.map((course) => (
            <Link
              key={course.id}
              to={`/courses-online/${course.id}`}
              className="group overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <span
                  className={`rounded px-2 py-1 text-[10px] font-bold ${course.category.color} ${course.category.textColor}`}
                >
                  {course.category.label}
                </span>
                <h3 className="mt-3 line-clamp-2 min-h-11 font-bold leading-snug text-primary">
                  {course.title}
                </h3>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-primary">{course.rating}</span>
                  <span className="text-on-surface-variant">
                    ({course.reviewCount.toLocaleString("vi-VN")})
                  </span>
                </div>
                <p className="mt-3 font-bold text-primary">{formatVND(course.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CartPage;
