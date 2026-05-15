import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  Download,
  Headphones,
  Mail,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { checkoutSuccessMock } from "../mocks/cart.mock";

function formatVND(value: number): string {
  return value === 0 ? "Miễn phí" : `${value.toLocaleString("vi-VN")}đ`;
}

const CheckoutSuccessPage = () => {
  const subtotal = checkoutSuccessMock.courses.reduce((sum, item) => sum + item.price, 0);
  const total = Math.max(subtotal - checkoutSuccessMock.discount, 0);

  return (
    <main className="bg-[#f7f8fb]">
      <section className="mx-auto max-w-7xl px-md py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#00412a] shadow-lg shadow-emerald-900/15">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#45bf73] text-[#00412a]">
              <Check size={19} strokeWidth={3.5} />
            </span>
          </div>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-secondary-container">
            Thanh toán thành công
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-primary md:text-4xl">
            Khóa học của bạn đã sẵn sàng
          </h1>
          <p className="mt-3 text-body-md leading-relaxed text-on-surface-variant">
            Cảm ơn {checkoutSuccessMock.customerName}. Đơn hàng đã được xác nhận và
            quyền truy cập khóa học đã được kích hoạt trên tài khoản của bạn.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <article className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-3 border-b border-outline-variant pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-primary">
                    Chi tiết khóa học
                  </h2>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {checkoutSuccessMock.courses.length} khóa học đã được thêm vào thư viện học tập
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
                  <BadgeCheck size={16} />
                  Đã kích hoạt
                </span>
              </div>

              <div className="divide-y divide-outline-variant">
                {checkoutSuccessMock.courses.map((course) => (
                  <div key={course.id} className="flex flex-col gap-4 py-5 sm:flex-row">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-40"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-secondary-container">
                        {course.category}
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-display text-lg font-bold leading-snug text-primary">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        Giảng viên: {course.instructor}
                      </p>
                    </div>
                    <div className="flex items-start justify-between gap-3 sm:block sm:text-right">
                      <p className="text-sm text-on-surface-variant">Học phí</p>
                      <p className="mt-1 whitespace-nowrap text-lg font-bold text-primary">
                        {formatVND(course.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-surface-container-low px-4 py-4">
                <div className="flex items-center justify-between text-sm text-on-surface-variant">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-primary">{formatVND(subtotal)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-on-surface-variant">
                  <span>Ưu đãi</span>
                  <span className="font-semibold text-secondary-container">
                    -{formatVND(checkoutSuccessMock.discount)}
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between border-t border-outline-variant pt-4">
                  <span className="font-bold text-primary">Tổng cộng thanh toán</span>
                  <span className="text-2xl font-bold text-primary">{formatVND(total)}</span>
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="text-secondary-container" size={22} />
                <h2 className="font-display text-xl font-bold text-primary">
                  Bước tiếp theo
                </h2>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {checkoutSuccessMock.nextSteps.map((step, index) => (
                  <div key={step.title} className="rounded-lg border border-outline-variant p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-on-primary">
                      {index + 1}
                    </div>
                    <h3 className="mt-3 font-bold text-primary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-5">
            <article className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm">
              <h2 className="font-display text-lg font-bold text-primary">
                Thông tin đơn hàng
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-on-surface-variant">Mã đơn hàng</dt>
                  <dd className="text-right font-bold text-primary">{checkoutSuccessMock.orderCode}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-on-surface-variant">Ngày thanh toán</dt>
                  <dd className="text-right font-semibold text-primary">{checkoutSuccessMock.paidAt}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-on-surface-variant">Phương thức</dt>
                  <dd className="text-right font-semibold text-primary">
                    {checkoutSuccessMock.paymentMethod}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-on-surface-variant">Trạng thái</dt>
                  <dd className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    {checkoutSuccessMock.status}
                  </dd>
                </div>
              </dl>

              <div className="my-5 border-t border-outline-variant" />

              <div className="space-y-3">
                <Link
                  to="/dashboard/courses"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  Bắt đầu học ngay
                  <ArrowRight size={17} />
                </Link>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-surface-container-low">
                  <Download size={17} />
                  Tải hóa đơn PDF
                </button>
              </div>
            </article>

            <article className="rounded-xl bg-primary-container p-5 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                  <Headphones size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold">Cần hỗ trợ?</h2>
                  <p className="text-xs text-primary-fixed-dim">
                    {checkoutSuccessMock.support.responseTime}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex items-center gap-2 text-primary-fixed-dim">
                  <ShieldCheck size={16} />
                  Cam kết bảo mật thông tin thanh toán
                </p>
                <p className="flex items-center gap-2">
                  <CalendarClock size={16} className="text-secondary-container" />
                  {checkoutSuccessMock.support.hotline}
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-secondary-container" />
                  {checkoutSuccessMock.support.email}
                </p>
              </div>
            </article>

            <article className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <ReceiptText className="text-secondary-container" size={21} />
                <div>
                  <h2 className="font-display text-lg font-bold text-primary">Biên nhận</h2>
                  <p className="text-sm text-on-surface-variant">
                    Số hóa đơn {checkoutSuccessMock.invoiceNumber}
                  </p>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CheckoutSuccessPage;
