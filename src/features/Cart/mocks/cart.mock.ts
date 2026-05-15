import { courseDetailsMock } from "@mock/data/course-detail.mock";

export const cartItemsMock = courseDetailsMock.slice(0, 3).map((course) => ({
  id: course.id,
  title: course.title,
  instructor: course.instructor,
  category: course.category.label,
  price: course.price,
  image: course.image,
}));

export const recommendedCartCoursesMock = courseDetailsMock.slice(3, 7);

export const checkoutSuccessMock = {
  orderCode: "BH-2026-0515-9284",
  paidAt: "15/05/2026, 10:24",
  paymentMethod: "Thẻ tín dụng",
  status: "Đã thanh toán",
  customerName: "Nguyễn Minh Anh",
  customerEmail: "minhanh@example.com",
  invoiceNumber: "INV-BH-9284",
  courses: cartItemsMock.slice(0, 2),
  discount: 0,
  support: {
    hotline: "1900 636 099",
    email: "support@bithub.edu.vn",
    responseTime: "Phản hồi trong 15 phút",
  },
  nextSteps: [
    {
      title: "Kích hoạt tài khoản học",
      description: "Hệ thống đã mở quyền truy cập khóa học trên Dashboard của bạn.",
    },
    {
      title: "Tải hóa đơn điện tử",
      description: "Hóa đơn VAT và biên nhận thanh toán đã sẵn sàng trong đơn hàng.",
    },
    {
      title: "Bắt đầu lộ trình",
      description: "Hoàn thành bài kiểm tra đầu vào để nhận gợi ý bài học phù hợp.",
    },
  ],
};
