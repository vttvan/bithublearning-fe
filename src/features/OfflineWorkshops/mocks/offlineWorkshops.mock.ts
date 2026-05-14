import type { OfflineWorkshop } from "../types/offlineWorkshop";

export const OFFLINE_WORKSHOPS_MOCK: OfflineWorkshop[] = [
  {
    id: "ws-1",
    category: "KỸ THUẬT",
    title: "TRIZ nâng cao cho kỹ sư",
    subtitle:
      "Làm chủ Lý thuyết giải quyết vấn đề sáng tạo để xử lý mâu thuẫn kỹ thuật một cách có hệ thống và thúc đẩy đổi mới trong các hệ thống kỹ thuật phức tạp.",
    location: "Hanoi Hub - Khu 7",
    startDate: "02 Th11",
    endDate: "07 Th11, 2024",
    description:
      "Đi sâu vào thiết kế hệ thống quy mô lớn bằng các kỹ thuật đổi mới có hệ thống. Học cách nhận diện và giải quyết mâu thuẫn kỹ thuật.",
    progressText: "Đã lấp đầy 85%",
    progressPercent: 85,
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop",
    seatsRemaining: 12,
    price: 2450,
    attendance: {
      currentDay: 2,
      totalDays: 5,
      progressPercent: 40,
      statusLabel: "Đang diễn ra",
    },
    syllabus: [
      {
        id: "m1",
        day: "Ngày 1",
        title: "Nền tảng đổi mới có hệ thống",
        description:
          "Giới thiệu lịch sử TRIZ, khái niệm tính lý tưởng và cách nhận diện mâu thuẫn hành chính, vật lý và kỹ thuật.",
        topics: [
          "Quy luật tiến hóa của hệ thống kỹ thuật",
          "Mô hình hóa thành phần - chức năng",
          "Tính lý tưởng và Kết quả cuối cùng lý tưởng",
          "Kỹ thuật phân tích nguồn lực",
        ],
      },
      {
        id: "m2",
        day: "Ngày 2",
        title: "Giải quyết mâu thuẫn và 40 nguyên tắc",
        description:
          "Đi sâu vào 39 tham số kỹ thuật và cách dùng Ma trận mâu thuẫn để chọn nguyên tắc sáng tạo phù hợp.",
        topics: [
          "Thực hành Ma trận mâu thuẫn",
          "40 nguyên tắc sáng tạo",
          "Phân tích tình huống cùng phản hồi từ điều phối viên",
          "Định khung đánh đổi nhanh",
        ],
      },
      {
        id: "m3",
        day: "Ngày 3-4",
        title: "Mô hình hóa S-Field nâng cao",
        description:
          "Ứng dụng mô hình hóa Chất - Trường và 76 lời giải tiêu chuẩn để loại bỏ tương tác có hại trong hệ thống cơ khí.",
        topics: [
          "Ký hiệu S-Field",
          "76 lời giải tiêu chuẩn",
          "Chẩn đoán Chất - Trường",
          "Mô hình hóa tương tác có hại",
        ],
      },
      {
        id: "m4",
        day: "Ngày 5",
        title: "Dự án cuối khóa và chứng nhận",
        description:
          "Sprint đổi mới theo nhóm và đánh giá năng lực cá nhân để nhận chứng nhận TRIZ cấp độ 2.",
        topics: [
          "Trình bày dự án cuối khóa",
          "Đánh giá năng lực cá nhân",
          "Phiên góp ý đồng cấp",
          "Hướng dẫn nhận chứng nhận",
        ],
      },
    ],
    sessions: [
      {
        id: "s1",
        day: "Ngày 1",
        title: "Nền tảng đổi mới có hệ thống",
        description:
          "Giới thiệu lịch sử TRIZ, Quy luật lý tưởng và mô hình hóa mâu thuẫn cơ bản.",
        date: "02 Th11",
        time: "09:00 - 17:00",
        room: "Hội trường A",
        state: "completed",
      },
      {
        id: "s2",
        day: "Ngày 2",
        title: "Giải quyết mâu thuẫn và 40 nguyên tắc",
        description:
          "Ứng dụng thực tế Ma trận mâu thuẫn và lựa chọn nguyên tắc xử lý phù hợp cho các đánh đổi kỹ thuật.",
        date: "03 Th11",
        time: "09:00 - 17:00",
        room: "Phòng 402",
        state: "active",
        actionLabel: "Xem slide hôm nay",
      },
      {
        id: "s3",
        day: "Ngày 3-4",
        title: "Mô hình hóa S-Field nâng cao",
        description:
          "Mô hình hóa hệ thống kỹ thuật bằng phân tích Chất - Trường và áp dụng 76 lời giải tiêu chuẩn.",
        date: "04 - 05 Th11",
        time: "09:00 - 17:00",
        room: "Phòng 402",
        state: "upcoming",
      },
      {
        id: "s4",
        day: "Ngày 5",
        title: "Dự án cuối khóa và chứng nhận",
        description:
          "Sprint đổi mới theo nhóm và đánh giá năng lực cá nhân để nhận chứng nhận TRIZ cấp độ 2.",
        date: "07 Th11",
        time: "09:00 - 16:00",
        room: "Phòng thí nghiệm đổi mới 1",
        state: "upcoming",
      },
    ],
    instructors: [
      {
        id: "i1",
        name: "Dr. Artyom Petrov",
        title: "Chuyên gia TRIZ cao cấp",
        bio: "Chuyên gia TRIZ cấp độ 4 với hơn 20 năm kinh nghiệm đổi mới trong hàng không vũ trụ và hệ thống công nghiệp.",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
      },
      {
        id: "i2",
        name: "Le Thi Mai",
        title: "Tư vấn đổi mới",
        bio: "Điều phối các workshop giải quyết vấn đề liên ngành cho đội ngũ sản phẩm và kỹ thuật.",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
      },
    ],
    highlights: [
      {
        id: "h1",
        title: "Chứng nhận chính thức",
        description:
          "Chứng chỉ năng lực TRIZ cấp độ 1-2 của BitHub Academy được công nhận trong ngành.",
      },
      {
        id: "h2",
        title: "Bữa trưa kết nối",
        description:
          "Bữa trưa và đồ uống nhẹ buổi chiều được phục vụ hằng ngày tại địa điểm học.",
      },
      {
        id: "h3",
        title: "Tài liệu bản in",
        description:
          "Bộ tài liệu khóa học, poster Ma trận mâu thuẫn và giáo trình TRIZ.",
      },
      {
        id: "h4",
        title: "Cổng học trước khóa",
        description:
          "Truy cập tài liệu nhập môn 'Cơ bản về TRIZ' trước sự kiện 14 ngày.",
      },
    ],
    materials: [
      {
        id: "mat-1",
        title: "Sổ tay 40 nguyên tắc TRIZ.pdf",
        icon: "file-text",
        action: "download",
      },
      {
        id: "mat-2",
        title: "Bộ công cụ mô hình hóa S-Field v2",
        icon: "presentation",
        action: "download",
      },
      {
        id: "mat-3",
        title: "Sổ bài tập tình huống",
        icon: "file-archive",
        action: "download",
      },
    ],
    venue: {
      name: "Trung tâm Đổi mới, Hà Nội",
      address: "Khu 7, Quận Công nghệ, Hà Nội, VN",
      mapUrl:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
      roomLabel: "Phòng 402, tầng 4",
      securityNotice:
        "Quy định an ninh: cần xuất trình thẻ căn cước hoặc thẻ ra vào tại cổng chính.",
    },
  },
  {
    id: "ws-2",
    category: "THIẾT KẾ SẢN PHẨM",
    title: "Nền tảng đổi mới có hệ thống",
    location: "Hà Nội",
    startDate: "02 Th11",
    endDate: "07 Th11, 2024",
    description:
      "Workshop nhập môn về phương pháp TRIZ ứng dụng vào phát triển sản phẩm phần mềm hiện đại. Phù hợp với học viên trung cấp...",
    progressText: "Đã lấp đầy 40%",
    progressPercent: 40,
    thumbnail:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "ws-3",
    category: "VẬN HÀNH DEVOPS",
    title: "Hạ tầng dưới dạng mã: Làm chủ quy mô lớn",
    location: "Đà Nẵng",
    startDate: "10 Th12",
    endDate: "15 Th12, 2024",
    description:
      "Làm chủ Kubernetes và Terraform theo tư duy hệ thống. Workshop thực hành này bao gồm tự động hóa cấp triển khai thực tế và...",
    progressText: "Chỉ còn 2 chỗ!",
    progressPercent: 95,
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "ws-4",
    category: "LẬP TRÌNH FRONTEND",
    title: "Bộ máy web hiệu năng cao",
    location: "TP. Hồ Chí Minh",
    startDate: "12 Th01",
    endDate: "17 Th01, 2025",
    description:
      "Khám phá cơ chế bên trong trình duyệt và tối ưu hóa rendering. Học cách xây dựng ứng dụng web cực nhanh bằng việc hiểu...",
    progressText: "Đã lấp đầy 15%",
    progressPercent: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1664&auto=format&fit=crop",
  },
  {
    id: "ws-5",
    category: "AN NINH MẠNG",
    title: "An ninh tấn công và diễn tập đội đỏ",
    location: "Hà Nội",
    startDate: "05 Th02",
    endDate: "10 Th02, 2025",
    description:
      "Mô phỏng trực tiếp chuyên sâu về các hướng tấn công nâng cao. Hiểu các điểm yếu có hệ thống trong giao thức mạng...",
    progressText: "Đã lấp đầy 60%",
    progressPercent: 60,
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "ws-6",
    category: "TRÍ TUỆ NHÂN TẠO",
    title: "Workshop kỹ thuật LLM",
    location: "TP. Hồ Chí Minh",
    startDate: "15 Th03",
    endDate: "20 Th03, 2025",
    description:
      "Học cách xây dựng và triển khai hệ thống RAG bền vững. Workshop tập trung vào đánh giá có hệ thống và tinh chỉnh...",
    progressText: "Đã lấp đầy 30%",
    progressPercent: 30,
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1665&auto=format&fit=crop",
  },
];
