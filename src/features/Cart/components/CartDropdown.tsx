import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingCart, Trash2 } from "lucide-react";
import { cartItemsMock } from "../mocks/cart.mock";

function formatVND(value: number): string {
  return value === 0 ? "Miễn phí" : `${value.toLocaleString("vi-VN")}đ`;
}

const CartDropdown = () => {
  const navigate = useNavigate();
  const previewItems = cartItemsMock.slice(0, 2);
  const total = cartItemsMock.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Giỏ hàng"
        onClick={() => navigate("/cart")}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-primary transition-all hover:border-secondary-container hover:bg-surface-container"
      >
        <ShoppingCart size={20} />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary-container px-1 text-[11px] font-bold text-on-secondary-container">
          {cartItemsMock.length}
        </span>
      </button>

      <div className="invisible absolute right-0 top-full z-50 w-[340px] translate-y-3 rounded-xl border border-outline-variant bg-surface-container-lowest opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100">
        <div className="border-b border-outline-variant px-5 py-4">
          <p className="font-display text-lg font-bold text-primary">
            Giỏ hàng của bạn
          </p>
          <p className="mt-1 text-xs text-on-surface-variant">
            {cartItemsMock.length} khóa học đang chờ thanh toán
          </p>
        </div>

        <div className="max-h-[310px] divide-y divide-outline-variant overflow-y-auto">
          {previewItems.map((item) => (
            <Link
              key={item.id}
              to={`/courses-online/${item.id}`}
              className="flex gap-3 px-5 py-4 transition-colors hover:bg-surface-container"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-20 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-bold leading-snug text-primary">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-xs text-on-surface-variant">
                  {item.instructor}
                </p>
                <p className="mt-1 font-bold text-primary">{formatVND(item.price)}</p>
              </div>
              <button
                type="button"
                aria-label="Xóa khỏi giỏ hàng"
                className="mt-1 h-fit text-on-surface-variant transition-colors hover:text-error"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <Trash2 size={15} />
              </button>
            </Link>
          ))}
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="flex items-center justify-between text-base font-bold">
            <span className="text-primary">Tổng cộng</span>
            <span className="text-primary">{formatVND(total)}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary-container px-4 py-3 font-bold text-on-secondary-container shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Chuyển đến giỏ hàng
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
