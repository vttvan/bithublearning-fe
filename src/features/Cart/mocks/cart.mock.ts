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
