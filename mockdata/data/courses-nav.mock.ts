import type { CoursesNavSection } from "@/features/Courses/types/courses-nav";

/** Payload fake API — giữ nguyên shape JSON backend nên trả về */
export const coursesNavSections: CoursesNavSection[] = [
  {
    id: "online-courses",
    title: "Khóa học Online",
    subtitle: "Self-paced learning",
    href: "/courses-online",
    items: [
      {
        id: "online-programming",
        title: "Lập trình",
        children: [
          {
            id: "fe-react",
            title: "Web Frontend với React",
            description: "Components, hooks, React Router & deploy",
            href: "/courses-online#programming-fe-react",
          },
          {
            id: "node-backend",
            title: "Backend với Node.js",
            description: "REST API, auth, database & security cơ bản",
            href: "/courses-online#programming-node-backend",
          },
        ]
      },
      {
        id: "online-softskill",
        title: "Kỹ năng mềm",
        children: [
          {
            id: "communication",
            title: "Giao tiếp & thuyết trình",
            description: "Trình bày ý tưởng rõ ràng trước nhóm",
            href: "/courses-online#softskill-communication",
          },
          {
            id: "teamwork",
            title: "Làm việc nhóm hiệu quả",
            description: "Phối hợp đa chức năng, feedback & họp hiệu quả",
            href: "/courses-online#softskill-teamwork",
          },
        ]
      }
    ],
  },
  {
    id: "offline-workshops",
    title: "Hội thảo Offline",
    subtitle: "Đào tạo chuyên sâu trực tiếp",
    href: "/offline-workshops",
    items: [
      {
        id: "offline-engineering",
        title: "Kỹ thuật",
        children: [
          {
            id: "adv-system-arch",
            title: "Kiến trúc hệ thống nâng cao & TRIZ",
            description: "Khám phá sâu sắc thiết kế hệ thống quy mô lớn bằng cách sử dụng các kỹ thuật đổi mới có hệ thống.",
            href: "/offline-workshops",
          },
          {
            id: "infra-code",
            title: "Hạ tầng dưới dạng mã: Làm chủ quy mô",
            description: "Nắm vững Kubernetes và Terraform thông qua góc nhìn hệ thống.",
            href: "/offline-workshops",
          },
        ]
      },
      {
        id: "offline-product-design",
        title: "Thiết kế sản phẩm",
        children: [
          {
            id: "foundation-innovation",
            title: "Nền tảng của đổi mới có hệ thống",
            description: "Hội thảo giới thiệu về phương pháp TRIZ ứng dụng trong phát triển sản phẩm",
            href: "/offline-workshops",
          },
        ]
      }
    ],
  },
];
