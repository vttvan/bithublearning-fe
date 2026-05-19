import React from "react";
import { CalendarDays, Plus, Save, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { adminDashboardService } from "../services/adminDashboardService";
import type { OfflineCourseEditorData, OfflineSessionItem } from "../types/adminDashboard";

const inputClassName =
  "w-full rounded-xl border border-[#d0d5dd] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#1267ad]";

const AdminOfflineCourseEditorPage: React.FC = () => {
  const { courseId = "offline-1" } = useParams<{ courseId: string }>();
  const [data, setData] = React.useState<OfflineCourseEditorData | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [assetDraft, setAssetDraft] = React.useState({
    name: "",
    sizeLabel: "",
  });

  React.useEffect(() => {
    let mounted = true;
    const loadEditor = async () => {
      const response = await adminDashboardService.getOfflineCourseEditor(courseId);
      if (mounted) {
        setData(response);
      }
    };
    void loadEditor();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  const selectedSession = React.useMemo(() => {
    if (!data) {
      return null;
    }

    return data.sessions.find((session) => session.id === data.selectedSessionId) ?? null;
  }, [data]);

  const [sessionForm, setSessionForm] = React.useState({
    title: "",
    dateLabel: "",
    timeLabel: "",
    room: "",
    speaker: "",
    content: "",
  });

  React.useEffect(() => {
    if (!selectedSession) {
      return;
    }

    setSessionForm({
      title: selectedSession.title,
      dateLabel: selectedSession.dateLabel,
      timeLabel: selectedSession.timeLabel,
      room: selectedSession.room,
      speaker: selectedSession.speaker,
      content: selectedSession.content,
    });
  }, [selectedSession]);

  const handleSelectSession = (sessionId: string) => {
    setData((current) =>
      current
        ? {
            ...current,
            selectedSessionId: sessionId,
          }
        : current,
    );
  };

  const handleSaveSession = async () => {
    if (!selectedSession) {
      return;
    }

    setIsSaving(true);
    try {
      const updated = await adminDashboardService.updateOfflineSession(courseId, {
        sessionId: selectedSession.id,
        ...sessionForm,
      });
      setData(updated);
      toast.success("Đã lưu thông tin buổi học trực tiếp.");
    } catch (error) {
      console.error("Không thể lưu buổi học:", error);
      toast.error("Không thể lưu buổi học.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateSession = async () => {
    try {
      const updated = await adminDashboardService.createOfflineSession(courseId, {
        title: "Buổi học mới",
        dateLabel: "01 Th12, 2026",
        timeLabel: "09:00 - 12:00",
        room: "Phòng sẽ cập nhật",
        speaker: "Chưa phân công",
        content: "Nội dung buổi học mới. Bạn có thể cập nhật sau.",
      });
      setData(updated);
      toast.success("Đã thêm buổi học mới.");
    } catch (error) {
      console.error("Không thể tạo buổi học:", error);
      toast.error("Không thể thêm buổi học.");
    }
  };

  const handleAddAsset = async () => {
    if (!selectedSession || !assetDraft.name.trim() || !assetDraft.sizeLabel.trim()) {
      toast.error("Nhập tên file và kích thước file.");
      return;
    }

    try {
      const updated = await adminDashboardService.addOfflineSessionAsset(courseId, {
        sessionId: selectedSession.id,
        name: assetDraft.name.trim(),
        sizeLabel: assetDraft.sizeLabel.trim(),
      });
      setData(updated);
      setAssetDraft({ name: "", sizeLabel: "" });
      toast.success("Đã thêm file cho buổi học.");
    } catch (error) {
      console.error("Không thể thêm tài liệu:", error);
      toast.error("Không thể thêm file.");
    }
  };

  if (!data || !selectedSession) {
    return <div className="p-8">Đang tải trình chỉnh sửa workshop...</div>;
  }

  return (
    <div className="p-8 pb-20">
      <div className="mx-auto grid max-w-8xl gap-6 xl:grid-cols-[340px_1fr]">
        <section className="rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#98a2b3]">Workshop trực tiếp</p>
              <h1 className="mt-2 text-xl font-bold text-[#0b4f8a]">{data.title}</h1>
            </div>
            <span className="rounded-full bg-[#fff7e6] px-3 py-1 text-xs font-semibold text-[#b85f00]">
              {data.subtitle}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#667085]">{data.venue}</p>
          <p className="mt-4 text-xs text-[#98a2b3]">{data.uploadHint}</p>

          <div className="mt-5 space-y-3">
            {data.sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleSelectSession(session.id)}
                className={`w-full rounded-xl border px-4 py-4 text-left ${
                  session.id === data.selectedSessionId
                    ? "border-[#0b4f8a] bg-[#eef3ff]"
                    : "border-[#e4e7ec] bg-[#f8fafc]"
                }`}
              >
                <p className="font-semibold text-[#0b4f8a]">{session.title}</p>
                <p className="mt-1 text-xs text-[#667085]">
                  {session.dateLabel} • {session.room}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={handleCreateSession}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b4f8a] px-4 py-3 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Thêm buổi học mới
          </button>
        </section>

        <section className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#98a2b3]">Workshop / Chỉnh sửa buổi học</p>
              <h2 className="mt-2 text-3xl font-bold text-[#0b4f8a]">{selectedSession.title}</h2>
            </div>
            <button
              onClick={handleSaveSession}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0b4f8a] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              <Save size={16} />
              {isSaving ? "Đang lưu..." : "Lưu lịch học"}
            </button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_280px]">
            <div className="space-y-5">
              <Field label="Tiêu đề buổi học">
                <input
                  value={sessionForm.title}
                  onChange={(event) =>
                    setSessionForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className={inputClassName}
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Ngày học">
                  <input
                    value={sessionForm.dateLabel}
                    onChange={(event) =>
                      setSessionForm((current) => ({
                        ...current,
                        dateLabel: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </Field>
                <Field label="Khung giờ">
                  <input
                    value={sessionForm.timeLabel}
                    onChange={(event) =>
                      setSessionForm((current) => ({
                        ...current,
                        timeLabel: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </Field>
                <Field label="Phòng học">
                  <input
                    value={sessionForm.room}
                    onChange={(event) =>
                      setSessionForm((current) => ({ ...current, room: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </Field>
              </div>
              <Field label="Diễn giả">
                <input
                  value={sessionForm.speaker}
                  onChange={(event) =>
                    setSessionForm((current) => ({ ...current, speaker: event.target.value }))
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Nội dung buổi học">
                <textarea
                  rows={10}
                  value={sessionForm.content}
                  onChange={(event) =>
                    setSessionForm((current) => ({ ...current, content: event.target.value }))
                  }
                  className={`${inputClassName} resize-none`}
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0b4f8a]">
                  <CalendarDays size={16} />
                  Tài liệu buổi học
                </div>
                <div className="mt-4 space-y-2">
                  {selectedSession.assets.map((asset) => (
                    <div key={asset.id} className="rounded-xl bg-white px-3 py-3">
                      <p className="text-sm font-medium text-[#344054]">{asset.name}</p>
                      <p className="mt-1 text-xs text-[#667085]">{asset.sizeLabel}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-[#98a2b3] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#344054]">
                  <Upload size={16} />
                  Tải file cho buổi học
                </div>
                <div className="mt-4 space-y-3">
                  <input
                    value={assetDraft.name}
                    onChange={(event) =>
                      setAssetDraft((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="ten-file.pdf"
                    className={inputClassName}
                  />
                  <input
                    value={assetDraft.sizeLabel}
                    onChange={(event) =>
                      setAssetDraft((current) => ({
                        ...current,
                        sizeLabel: event.target.value,
                      }))
                    }
                    placeholder="2.4 MB"
                    className={inputClassName}
                  />
                  <button
                    onClick={handleAddAsset}
                    className="w-full rounded-xl bg-[#0b4f8a] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Thêm file
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#344054]">{label}</span>
      {children}
    </label>
  );
}

export default AdminOfflineCourseEditorPage;
