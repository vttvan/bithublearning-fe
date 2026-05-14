export type CourseOverviewLessonType = "video" | "code" | "quiz";

export type CourseOverviewLesson = {
  id: string;
  type: CourseOverviewLessonType;
  title: string;
  duration?: string;
};

export type CourseOverviewModule = {
  id: string;
  title: string;
  duration: string;
  lessons: CourseOverviewLesson[];
};

export type CourseOverviewData = {
  tags: string[];
  title: string;
  stats: {
    duration: string;
    lessons: string;
    certificate: string;
    enrolled: string;
  };
  aboutTitle: string;
  aboutParagraphs: string[];
  learningOutcomes: string[];
  prerequisitesTitle: string;
  prerequisites: string[];
  curriculumTitle: string;
  curriculumSummary: string;
  requiredLabel: string;
  lessonUnitLabel: string;
  curriculum: CourseOverviewModule[];
};

export const courseOverviewMock: CourseOverviewData = {
  tags: ["Lập trình", "Lập trình Full-Stack"],
  title: "Lập trình Full-Stack: Làm chủ các hệ thống hiện đại",
  stats: {
    duration: "24 giờ",
    lessons: "48 bài học",
    certificate: "Chuyên nghiệp",
    enrolled: "1,2k học viên",
  },
  aboutTitle: "Về khóa học này",
  aboutParagraphs: [
    "Chương trình được thiết kế để đưa bạn từ nền tảng tư duy hệ thống đến khả năng triển khai nâng cao. Bạn sẽ nắm vững thiết kế hệ thống chịu tải lớn, tính liên tục của dữ liệu và hiệu quả thuật toán.",
    "Lộ trình được xây dựng dựa trên các tình huống kỹ thuật thực tế, ưu tiên bài toán sản phẩm thay vì lý thuyết trừu tượng. Khi hoàn thành khóa học, bạn sẽ có đủ năng lực xây dựng các hệ thống sẵn sàng triển khai.",
  ],
  learningOutcomes: [
    "Làm chủ 40 nguyên tắc đổi mới TRIZ",
    "Tối ưu mã nguồn hiệu năng cao",
    "Thiết kế microservices có khả năng mở rộng",
    "Tự động hóa kiểm thử và quy trình CI/CD",
  ],
  prerequisitesTitle: "Yêu cầu đầu vào",
  prerequisites: [
    "Có kiến thức cơ bản về JavaScript/TypeScript",
    "Hiểu cách hoạt động của JSON API",
    "Sử dụng được dòng lệnh CLI ở mức cơ bản",
  ],
  curriculumTitle: "Chương trình khóa học",
  curriculumSummary: "3 học phần • 12 bài học",
  requiredLabel: "Bắt buộc",
  lessonUnitLabel: "bài học",
  curriculum: [
    {
      id: "module-1",
      title: "Chương 1: Nền tảng toán học",
      duration: "4 giờ 30 phút",
      lessons: [
        {
          id: "lesson-1",
          type: "video",
          title: "Giới thiệu về logic thuật toán",
          duration: "12:45",
        },
        {
          id: "lesson-2",
          type: "video",
          title: "Đại số tuyến tính dành cho kỹ sư",
          duration: "45:00",
        },
        {
          id: "lesson-3",
          type: "code",
          title: "Bài tập nhân ma trận",
        },
        {
          id: "lesson-4",
          type: "quiz",
          title: "Bài kiểm tra học phần 1: Kiến thức toán cơ bản",
        },
      ],
    },
    {
      id: "module-2",
      title: "Chương 2: Cấu trúc dữ liệu nâng cao",
      duration: "6 giờ 15 phút",
      lessons: [
        {
          id: "lesson-5",
          type: "video",
          title: "Heap và hàng đợi ưu tiên",
          duration: "32:10",
        },
        {
          id: "lesson-6",
          type: "video",
          title: "Tìm hiểu sâu về cây Trie",
          duration: "28:50",
        },
        {
          id: "lesson-7",
          type: "code",
          title: "Triển khai trình thông dịch Lisp",
        },
        {
          id: "lesson-8",
          type: "quiz",
          title: "Bài kiểm tra học phần 2: Cấu trúc dữ liệu",
        },
      ],
    },
    {
      id: "module-3",
      title: "Chương 3: Đổi mới có hệ thống",
      duration: "5 giờ 45 phút",
      lessons: [
        {
          id: "lesson-9",
          type: "video",
          title: "40 nguyên tắc của TRIZ",
          duration: "40:00",
        },
        {
          id: "lesson-10",
          type: "video",
          title: "Thao tác mảng trong đổi mới hệ thống",
          duration: "25:00",
        },
        {
          id: "lesson-11",
          type: "code",
          title: "Phát hiện phần tử lớn nhất",
        },
        {
          id: "lesson-12",
          type: "quiz",
          title: "Bài kiểm tra học phần 3: Logic và luồng xử lý",
        },
      ],
    },
  ],
};
