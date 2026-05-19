import React from "react";
import { Bold, CalendarClock, Check, Code2, Image, Italic, Link2, List, Mail, Send } from "lucide-react";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  AdminNotificationChannel,
  AdminNotificationItem,
  AdminNotificationsData,
} from "../types/adminDashboard";

const AdminNotificationsPage: React.FC = () => {
  const [data, setData] = React.useState<AdminNotificationsData | null>(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [channels, setChannels] = React.useState<AdminNotificationChannel[]>(["in-app"]);

  React.useEffect(() => {
    let mounted = true;
    const loadNotifications = async () => {
      const response = await adminDashboardService.getNotifications();
      if (mounted) setData(response);
    };
    void loadNotifications();
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) return <div className="p-8">Đang tải thông báo...</div>;

  const toggleChannel = (channel: AdminNotificationChannel) => {
    setChannels((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  };

  const createNotification = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    const notification: AdminNotificationItem = {
      id: `notification-${Date.now()}`,
      title,
      content: content || "Nội dung thông báo đang được cập nhật.",
      audience: "all",
      channels,
      sentAt: "Vừa tạo",
      status: "sent",
    };
    setData((current) =>
      current
        ? { ...current, notifications: [notification, ...current.notifications] }
        : current,
    );
    setTitle("");
    setContent("");
  };

  return (
    <div className="p-4 pb-20 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-[#0b4f8a] sm:text-4xl">{data.title}</h1>
        <p className="mt-2 text-sm text-[#606a76]">{data.subtitle}</p>

        <form onSubmit={createNotification} className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm">
            <label className="block">
              <span className="text-sm font-bold text-[#0b4f8a]">Tiêu đề thông báo</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Nhập tiêu đề thông báo..."
                className="mt-3 h-12 w-full rounded-lg border border-[#d0d5dd] px-4 text-sm outline-none focus:border-[#1267ad] focus:ring-2 focus:ring-[#1267ad]/15"
              />
            </label>

            <div className="mt-6">
              <p className="text-sm font-bold text-[#0b4f8a]">Nội dung thông báo</p>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#d0d5dd]">
                <div className="flex items-center gap-1 border-b border-[#e4e7ec] bg-[#f8fafc] px-3 py-2 text-[#0b4f8a]">
                  {[Bold, Italic, List, Link2, Image, Code2].map((Icon, index) => (
                    <button key={index} type="button" className="rounded p-2 hover:bg-white">
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Viết nội dung thông báo tại đây..."
                  rows={12}
                  className="w-full resize-none px-4 py-4 text-sm outline-none"
                />
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#0b4f8a]">Cấu hình gửi</h2>
              <label className="mt-5 block">
                <span className="text-xs font-bold text-[#344054]">Đối tượng nhận</span>
                <select className="mt-2 h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm">
                  <option>All Students</option>
                  <option>Active Students</option>
                  <option>Instructors</option>
                </select>
              </label>
              <div className="mt-5 space-y-3">
                <p className="text-xs font-bold text-[#344054]">Phương thức gửi</p>
                <ChannelCheckbox label="In-app Notification" checked={channels.includes("in-app")} onChange={() => toggleChannel("in-app")} />
                <ChannelCheckbox label="Email" checked={channels.includes("email")} onChange={() => toggleChannel("email")} />
                <ChannelCheckbox label="Push Notification" checked={channels.includes("push")} onChange={() => toggleChannel("push")} />
              </div>
            </section>

            <section className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#0b4f8a]">Thời gian</h2>
              <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#0b4f8a]">
                <input type="radio" defaultChecked />
                Gửi ngay
              </label>
              <label className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#475467]">
                <input type="radio" />
                Hẹn giờ gửi
              </label>
              <div className="mt-5 flex h-11 items-center gap-2 rounded-lg border border-[#d0d5dd] px-3 text-sm text-[#98a2b3]">
                <CalendarClock size={16} />
                mm/dd/yyyy --:--
              </div>
              <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b4f8a] px-4 py-3 text-sm font-bold text-white hover:bg-[#1267ad]">
                <Send size={16} />
                Gửi thông báo
              </button>
            </section>
          </aside>
        </form>

        <section className="mt-8 rounded-2xl border border-[#e4e7ec] bg-white shadow-sm">
          <div className="border-b border-[#eef1f5] px-6 py-5">
            <h2 className="text-xl font-bold text-[#0b4f8a]">Danh sách thông báo</h2>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[920px]">
              <div className="grid grid-cols-[1.4fr_1.5fr_0.8fr_1fr_0.8fr] bg-[#f8fafc] px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-[#667085]">
                <span>Tiêu đề</span>
                <span>Nội dung</span>
                <span>Kênh gửi</span>
                <span>Ngày gửi</span>
                <span>Trạng thái</span>
              </div>
              {data.notifications.map((notification) => (
                <NotificationRow key={notification.id} notification={notification} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

function ChannelCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 text-sm text-[#0b4f8a]">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4" />
      {label}
    </label>
  );
}

function NotificationRow({ notification }: { notification: AdminNotificationItem }) {
  return (
    <div className="grid grid-cols-[1.4fr_1.5fr_0.8fr_1fr_0.8fr] items-center border-t border-[#eef1f5] px-6 py-5 text-sm">
      <p className="font-bold text-[#0b4f8a]">{notification.title}</p>
      <p className="line-clamp-2 text-[#475467]">{notification.content}</p>
      <p className="flex items-center gap-2 text-[#475467]">
        <Mail size={15} />
        {notification.channels.join(", ")}
      </p>
      <p className="text-[#0b4f8a]">{notification.sentAt}</p>
      <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${getNotificationStatusClass(notification.status)}`}>
        {notification.status === "sent" && <Check size={13} />}
        {getNotificationStatusLabel(notification.status)}
      </span>
    </div>
  );
}

function getNotificationStatusClass(status: string) {
  if (status === "sent") return "bg-[#dcfce7] text-[#17803d]";
  if (status === "scheduled") return "bg-[#eef3ff] text-[#2563eb]";
  return "bg-[#f2f4f7] text-[#667085]";
}

function getNotificationStatusLabel(status: string) {
  if (status === "sent") return "Đã gửi";
  if (status === "scheduled") return "Đã hẹn giờ";
  return "Bản nháp";
}

export default AdminNotificationsPage;
