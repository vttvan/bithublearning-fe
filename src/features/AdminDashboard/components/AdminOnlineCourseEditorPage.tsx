import React from "react";
import {
  Braces,
  FileSpreadsheet,
  Grip,
  Plus,
  Save,
  Video,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { adminDashboardService } from "../services/adminDashboardService";
import type {
  CodeExerciseConfig,
  CodeExerciseTestCase,
  OnlineCourseEditorData,
  OnlineLessonContentType,
  OnlineLessonItem,
  QuizConfig,
  QuizQuestion,
  QuizQuestionOption,
} from "../types/adminDashboard";

const inputClassName =
  "w-full rounded-xl border border-[#d0d5dd] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#1267ad]";

type LessonEditorForm = {
  title: string;
  type: OnlineLessonContentType;
  videoUrl: string;
  durationMinutes: number;
  content: string;
  quizConfig?: QuizConfig;
  codeExercise?: CodeExerciseConfig;
};

const createEmptyQuizConfig = (): QuizConfig => ({
  passingScore: 70,
  durationMinutes: 15,
  questions: [],
});

const createEmptyCodeExercise = (): CodeExerciseConfig => ({
  language: "typescript",
  difficulty: "easy",
  starterCode:
    "export function solve(input: string): string {\n  return input;\n}",
  solutionCode:
    "export function solve(input: string): string {\n  return input;\n}",
  testCases: [],
});

const AdminOnlineCourseEditorPage: React.FC = () => {
  const { courseId = "online-1" } = useParams<{ courseId: string }>();
  const [data, setData] = React.useState<OnlineCourseEditorData | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isImportingQuiz, setIsImportingQuiz] = React.useState(false);
  const [spreadsheetName, setSpreadsheetName] = React.useState("");

  React.useEffect(() => {
    let mounted = true;
    const loadEditor = async () => {
      const response = await adminDashboardService.getOnlineCourseEditor(courseId);
      if (mounted) {
        setData(response);
      }
    };
    void loadEditor();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  const selectedLesson = React.useMemo(() => {
    if (!data) {
      return null;
    }

    return data.lessonDetails[data.selectedLessonId] ?? null;
  }, [data]);

  const [lessonForm, setLessonForm] = React.useState<LessonEditorForm>({
    title: "",
    type: "video",
    videoUrl: "",
    durationMinutes: 10,
    content: "",
    quizConfig: undefined,
    codeExercise: undefined,
  });

  React.useEffect(() => {
    if (!selectedLesson) {
      return;
    }

    setLessonForm({
      title: selectedLesson.title,
      type: selectedLesson.type,
      videoUrl: selectedLesson.videoUrl,
      durationMinutes: selectedLesson.durationMinutes,
      content: selectedLesson.content,
      quizConfig: selectedLesson.quizConfig,
      codeExercise: selectedLesson.codeExercise,
    });
    setSpreadsheetName(selectedLesson.quizConfig?.importedFileName ?? "");
  }, [selectedLesson]);

  const handleSelectLesson = (lessonId: string) => {
    setData((current) =>
      current
        ? {
            ...current,
            selectedLessonId: lessonId,
          }
        : current,
    );
  };

  const handleTypeChange = (type: OnlineLessonContentType) => {
    setLessonForm((current) => ({
      ...current,
      type,
      quizConfig: type === "quiz" ? current.quizConfig ?? createEmptyQuizConfig() : undefined,
      codeExercise:
        type === "exercise"
          ? current.codeExercise ?? createEmptyCodeExercise()
          : undefined,
    }));
  };

  const handleSaveLesson = async () => {
    if (!selectedLesson) {
      return;
    }

    setIsSaving(true);
    try {
      const updated = await adminDashboardService.updateOnlineLesson(courseId, {
        lessonId: selectedLesson.id,
        title: lessonForm.title,
        type: lessonForm.type,
        videoUrl: lessonForm.videoUrl,
        durationMinutes: lessonForm.durationMinutes,
        content: lessonForm.content,
        quizConfig: lessonForm.type === "quiz" ? lessonForm.quizConfig : undefined,
        codeExercise:
          lessonForm.type === "exercise" ? lessonForm.codeExercise : undefined,
      });
      setData(updated);
      toast.success("Đã lưu bài học trực tuyến.");
    } catch (error) {
      console.error("Failed to save lesson:", error);
      toast.error("Không thể lưu bài học.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateLesson = async (moduleId: string) => {
    try {
      const updated = await adminDashboardService.createOnlineLesson(courseId, {
        moduleId,
        title: "Bài học mới",
        type: "video",
      });
      setData(updated);
      toast.success("Đã thêm bài học mới.");
    } catch (error) {
      console.error("Failed to create lesson:", error);
      toast.error("Không thể thêm bài học.");
    }
  };

  const handleImportQuizSpreadsheet = async () => {
    if (!selectedLesson || !spreadsheetName.trim()) {
      toast.error("Nhập tên file Excel trước khi nhập dữ liệu.");
      return;
    }

    setIsImportingQuiz(true);
    try {
      const updated = await adminDashboardService.importQuizSpreadsheet(courseId, {
        lessonId: selectedLesson.id,
        fileName: spreadsheetName.trim(),
      });
      setData(updated);
      toast.success("Đã nhập bộ câu hỏi từ Excel.");
    } catch (error) {
      console.error("Failed to import spreadsheet:", error);
      toast.error("Không thể nhập file Excel.");
    } finally {
      setIsImportingQuiz(false);
    }
  };

  const handleAddQuizQuestion = () => {
    setLessonForm((current) => {
      const quizConfig = current.quizConfig ?? createEmptyQuizConfig();
      const questionId = `question-${Date.now()}`;
      const options: QuizQuestionOption[] = [
        { id: `${questionId}-a`, label: "Lựa chọn A" },
        { id: `${questionId}-b`, label: "Lựa chọn B" },
        { id: `${questionId}-c`, label: "Lựa chọn C" },
        { id: `${questionId}-d`, label: "Lựa chọn D" },
      ];

      return {
        ...current,
        quizConfig: {
          ...quizConfig,
          questions: [
            ...quizConfig.questions,
            {
              id: questionId,
              prompt: "Nhập nội dung câu hỏi mới",
              options,
              correctOptionId: options[0].id,
              explanation: "",
            },
          ],
        },
      };
    });
  };

  const handleUpdateQuizQuestion = (
    questionId: string,
    updater: (question: QuizQuestion) => QuizQuestion,
  ) => {
    setLessonForm((current) => ({
      ...current,
      quizConfig: current.quizConfig
        ? {
            ...current.quizConfig,
            questions: current.quizConfig.questions.map((question) =>
              question.id === questionId ? updater(question) : question,
            ),
          }
        : current.quizConfig,
    }));
  };

  const handleAddTestCase = () => {
    setLessonForm((current) => {
      const codeExercise = current.codeExercise ?? createEmptyCodeExercise();
      const testCaseId = `test-${Date.now()}`;

      return {
        ...current,
        codeExercise: {
          ...codeExercise,
          testCases: [
            ...codeExercise.testCases,
            {
              id: testCaseId,
              input: "",
              expectedOutput: "",
              visibility: "public",
            },
          ],
        },
      };
    });
  };

  const handleUpdateTestCase = (
    testCaseId: string,
    updater: (testCase: CodeExerciseTestCase) => CodeExerciseTestCase,
  ) => {
    setLessonForm((current) => ({
      ...current,
      codeExercise: current.codeExercise
        ? {
            ...current.codeExercise,
            testCases: current.codeExercise.testCases.map((testCase) =>
              testCase.id === testCaseId ? updater(testCase) : testCase,
            ),
          }
        : current.codeExercise,
    }));
  };

  if (!data || !selectedLesson) {
    return <div className="p-8">Đang tải trình chỉnh sửa...</div>;
  }

  return (
    <div className="p-8 pb-20">
      <div className="mx-auto grid max-w-8xl gap-6 xl:grid-cols-[330px_1fr]">
        <section className="rounded-2xl border border-[#e4e7ec] bg-[#0b2243] p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60">Trình dựng khóa học</p>
              <h1 className="mt-2 text-xl font-bold">{data.title}</h1>
            </div>
            <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold">
              {data.subtitle}
            </button>
          </div>
          <p className="mt-2 text-xs text-white/60">{data.updatedAt}</p>

          <div className="mt-5 space-y-4">
            {data.modules.map((module) => (
              <div key={module.id} className="rounded-xl bg-white/6 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold">{module.title}</h2>
                  <button
                    onClick={() => handleCreateLesson(module.id)}
                    className="text-xs text-white/70 hover:text-white"
                  >
                    + Thêm bài học
                  </button>
                </div>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <LessonNode
                      key={lesson.id}
                      lesson={lesson}
                      active={lesson.id === data.selectedLessonId}
                      onClick={() => handleSelectLesson(lesson.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => toast.message("Trình dựng học phần sẽ được mở rộng ở bước tiếp theo.")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-4 py-3 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Thêm học phần mới
          </button>
        </section>

        <section className="rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#98a2b3]">
                Khóa học trực tuyến / Chỉnh sửa bài học
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#0b4f8a]">
                {selectedLesson.title}
              </h2>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg border border-[#d0d5dd] px-4 py-2.5 text-sm font-semibold text-[#344054]">
                Xem trước
              </button>
              <button
                onClick={handleSaveLesson}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b4f8a] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                <Save size={16} />
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <Field label="Tiêu đề bài học">
                <input
                  value={lessonForm.title}
                  onChange={(event) =>
                    setLessonForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className={inputClassName}
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-[180px_1fr_180px]">
                <Field label="Loại bài học">
                  <select
                    value={lessonForm.type}
                    onChange={(event) =>
                      handleTypeChange(event.target.value as OnlineLessonContentType)
                    }
                    className={inputClassName}
                  >
                    <option value="video">Video</option>
                    <option value="quiz">Bài kiểm tra</option>
                    <option value="exercise">Bài thực hành</option>
                    <option value="reading">Bài đọc</option>
                  </select>
                </Field>
                <Field label="URL media / tài liệu tham chiếu">
                  <input
                    value={lessonForm.videoUrl}
                    onChange={(event) =>
                      setLessonForm((current) => ({
                        ...current,
                        videoUrl: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </Field>
                <Field label="Thời lượng (phút)">
                  <input
                    type="number"
                    min={1}
                    value={lessonForm.durationMinutes}
                    onChange={(event) =>
                      setLessonForm((current) => ({
                        ...current,
                        durationMinutes: Number(event.target.value) || 1,
                      }))
                    }
                    className={inputClassName}
                  />
                </Field>
              </div>

              <Field label="Nội dung chi tiết (Markdown / Code)">
                <textarea
                  value={lessonForm.content}
                  onChange={(event) =>
                    setLessonForm((current) => ({ ...current, content: event.target.value }))
                  }
                  rows={7}
                  className={`${inputClassName} resize-none`}
                />
              </Field>

              {lessonForm.type === "quiz" && lessonForm.quizConfig ? (
                <section className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-5">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0b4f8a]">Trình dựng bài kiểm tra</h3>
                      <p className="mt-1 text-sm text-[#667085]">
                        Tạo bộ câu hỏi, nhập Excel và cấu hình điểm đạt.
                      </p>
                    </div>
                    <button
                      onClick={handleAddQuizQuestion}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0b4f8a] px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <Plus size={16} />
                      Thêm câu hỏi
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <Field label="Điểm đạt (%)">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={lessonForm.quizConfig.passingScore}
                        onChange={(event) =>
                          setLessonForm((current) => ({
                            ...current,
                            quizConfig: current.quizConfig
                              ? {
                                  ...current.quizConfig,
                                  passingScore: Number(event.target.value) || 0,
                                }
                              : current.quizConfig,
                          }))
                        }
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Thời lượng bài kiểm tra (phút)">
                      <input
                        type="number"
                        min={1}
                        value={lessonForm.quizConfig.durationMinutes}
                        onChange={(event) =>
                          setLessonForm((current) => ({
                            ...current,
                            quizConfig: current.quizConfig
                              ? {
                                  ...current.quizConfig,
                                  durationMinutes: Number(event.target.value) || 1,
                                }
                              : current.quizConfig,
                          }))
                        }
                        className={inputClassName}
                      />
                    </Field>
                  </div>

                  <div className="mt-5 rounded-2xl border border-dashed border-[#bfc7d4] bg-white p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0b4f8a]">
                      <FileSpreadsheet size={16} />
                      Nhập ngân hàng câu hỏi từ Excel
                    </div>
                    <div className="mt-4 flex flex-col gap-3 md:flex-row">
                      <input
                        value={spreadsheetName}
                        onChange={(event) => setSpreadsheetName(event.target.value)}
                        placeholder="question-bank.xlsx"
                        className={`${inputClassName} md:flex-1`}
                      />
                      <button
                        onClick={handleImportQuizSpreadsheet}
                        disabled={isImportingQuiz}
                        className="rounded-lg bg-[#f97316] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                      >
                        {isImportingQuiz ? "Đang nhập..." : "Nhập Excel"}
                      </button>
                    </div>
                    {lessonForm.quizConfig.importedFileName ? (
                      <p className="mt-3 text-xs text-[#667085]">
                        File gần nhất: {lessonForm.quizConfig.importedFileName}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-5 space-y-4">
                    {lessonForm.quizConfig.questions.map((question, index) => (
                      <QuizQuestionCard
                        key={question.id}
                        index={index}
                        question={question}
                        onChange={(updater) =>
                          handleUpdateQuizQuestion(question.id, updater)
                        }
                      />
                    ))}
                    {lessonForm.quizConfig.questions.length === 0 ? (
                      <div className="rounded-xl bg-white px-4 py-4 text-sm text-[#98a2b3]">
                        Chưa có câu hỏi. Bạn có thể thêm thủ công hoặc nhập từ Excel.
                      </div>
                    ) : null}
                  </div>
                </section>
              ) : null}

              {lessonForm.type === "exercise" && lessonForm.codeExercise ? (
                <section className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-5">
                  <div className="flex items-center gap-2 text-lg font-bold text-[#0b4f8a]">
                    <Braces size={18} />
                    Trình dựng bài thực hành code
                  </div>
                  <p className="mt-2 text-sm text-[#667085]">
                    Cấu hình đề bài lập trình, code khởi tạo và test case chấm tự động.
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <Field label="Ngôn ngữ">
                      <select
                        value={lessonForm.codeExercise.language}
                        onChange={(event) =>
                          setLessonForm((current) => ({
                            ...current,
                            codeExercise: current.codeExercise
                              ? {
                                  ...current.codeExercise,
                                  language: event.target.value as CodeExerciseConfig["language"],
                                }
                              : current.codeExercise,
                          }))
                        }
                        className={inputClassName}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                      </select>
                    </Field>
                    <Field label="Độ khó">
                      <select
                        value={lessonForm.codeExercise.difficulty}
                        onChange={(event) =>
                          setLessonForm((current) => ({
                            ...current,
                            codeExercise: current.codeExercise
                              ? {
                                  ...current.codeExercise,
                                  difficulty: event.target.value as CodeExerciseConfig["difficulty"],
                                }
                              : current.codeExercise,
                          }))
                        }
                        className={inputClassName}
                      >
                        <option value="easy">Dễ</option>
                        <option value="medium">Trung bình</option>
                        <option value="hard">Khó</option>
                      </select>
                    </Field>
                  </div>

                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    <Field label="Code khởi tạo">
                      <textarea
                        rows={10}
                        value={lessonForm.codeExercise.starterCode}
                        onChange={(event) =>
                          setLessonForm((current) => ({
                            ...current,
                            codeExercise: current.codeExercise
                              ? {
                                  ...current.codeExercise,
                                  starterCode: event.target.value,
                                }
                              : current.codeExercise,
                          }))
                        }
                        className={`${inputClassName} font-mono resize-none`}
                      />
                    </Field>
                    <Field label="Lời giải kỳ vọng">
                      <textarea
                        rows={10}
                        value={lessonForm.codeExercise.solutionCode}
                        onChange={(event) =>
                          setLessonForm((current) => ({
                            ...current,
                            codeExercise: current.codeExercise
                              ? {
                                  ...current.codeExercise,
                                  solutionCode: event.target.value,
                                }
                              : current.codeExercise,
                          }))
                        }
                        className={`${inputClassName} font-mono resize-none`}
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-[#0b4f8a]">Bộ test case</h4>
                      <button
                        onClick={handleAddTestCase}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-xs font-semibold text-[#344054]"
                      >
                        <Plus size={14} />
                        Thêm test case
                      </button>
                    </div>
                    <div className="space-y-3">
                      {lessonForm.codeExercise.testCases.map((testCase, index) => (
                        <CodeTestCaseCard
                          key={testCase.id}
                          index={index}
                          testCase={testCase}
                          onChange={(updater) =>
                            handleUpdateTestCase(testCase.id, updater)
                          }
                        />
                      ))}
                      {lessonForm.codeExercise.testCases.length === 0 ? (
                        <div className="rounded-xl bg-white px-4 py-4 text-sm text-[#98a2b3]">
                          Chưa có test case. Thêm ít nhất 1 case công khai và 1 case ẩn để chấm bài.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-[#f8fafc]">
                <img
                  src={selectedLesson.previewImage}
                  alt={selectedLesson.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#e9eefb] px-3 py-1 text-xs font-semibold text-[#1267ad]">
                    <Video size={14} />
                    Đang chỉnh sửa
                  </div>
                  <p className="mt-3 text-sm text-[#475467]">
                    Học phần:{" "}
                    {
                      data.modules.find((module) => module.id === selectedLesson.moduleId)
                        ?.title
                    }
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-[#e4e7ec] p-4">
                <h3 className="text-sm font-semibold text-[#0b4f8a]">Tệp đính kèm</h3>
                <div className="mt-3 space-y-2">
                  {selectedLesson.attachments.map((attachment) => (
                    <div
                      key={attachment}
                      className="rounded-xl bg-[#f8fafc] px-3 py-2 text-sm text-[#475467]"
                    >
                      {attachment}
                    </div>
                  ))}
                  {selectedLesson.attachments.length === 0 ? (
                    <div className="rounded-xl bg-[#f8fafc] px-3 py-2 text-sm text-[#98a2b3]">
                      Chưa có file đính kèm
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

function LessonNode({
  lesson,
  active,
  onClick,
}: {
  lesson: OnlineLessonItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
        active ? "bg-[#f97316] text-white" : "bg-white/10 text-white hover:bg-white/15"
      }`}
    >
      <div className="flex items-center gap-2">
        <Grip size={14} className={active ? "text-white" : "text-white/60"} />
        <span>{lesson.title}</span>
      </div>
      <span className={`text-xs ${active ? "text-white/85" : "text-white/65"}`}>
        {lesson.durationLabel}
      </span>
    </button>
  );
}

function QuizQuestionCard({
  index,
  question,
  onChange,
}: {
  index: number;
  question: QuizQuestion;
  onChange: (updater: (question: QuizQuestion) => QuizQuestion) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#dbe3ee] bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#98a2b3]">
        Câu hỏi {index + 1}
      </p>
      <div className="mt-3 space-y-3">
        <Field label="Nội dung câu hỏi">
          <textarea
            rows={3}
            value={question.prompt}
            onChange={(event) =>
              onChange((current) => ({ ...current, prompt: event.target.value }))
            }
            className={`${inputClassName} resize-none`}
          />
        </Field>
        <div className="grid gap-3 md:grid-cols-2">
          {question.options.map((option) => (
            <label key={option.id} className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#344054]">
                <input
                  type="radio"
                  checked={question.correctOptionId === option.id}
                  onChange={() =>
                    onChange((current) => ({
                      ...current,
                      correctOptionId: option.id,
                    }))
                  }
                />
                Đáp án
              </span>
              <input
                value={option.label}
                onChange={(event) =>
                  onChange((current) => ({
                    ...current,
                    options: current.options.map((item) =>
                      item.id === option.id
                        ? { ...item, label: event.target.value }
                        : item,
                    ),
                  }))
                }
                className={inputClassName}
              />
            </label>
          ))}
        </div>
        <Field label="Giải thích">
          <textarea
            rows={2}
            value={question.explanation}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                explanation: event.target.value,
              }))
            }
            className={`${inputClassName} resize-none`}
          />
        </Field>
      </div>
    </div>
  );
}

function CodeTestCaseCard({
  index,
  testCase,
  onChange,
}: {
  index: number;
  testCase: CodeExerciseTestCase;
  onChange: (updater: (testCase: CodeExerciseTestCase) => CodeExerciseTestCase) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#dbe3ee] bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#98a2b3]">
        Test case {index + 1}
      </p>
      <div className="mt-3 grid gap-3">
        <Field label="Input">
          <textarea
            rows={2}
            value={testCase.input}
            onChange={(event) =>
              onChange((current) => ({ ...current, input: event.target.value }))
            }
            className={`${inputClassName} font-mono resize-none`}
          />
        </Field>
        <Field label="Kết quả mong đợi">
          <textarea
            rows={2}
            value={testCase.expectedOutput}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                expectedOutput: event.target.value,
              }))
            }
            className={`${inputClassName} font-mono resize-none`}
          />
        </Field>
        <Field label="Phạm vi hiển thị">
          <select
            value={testCase.visibility}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                visibility: event.target.value as CodeExerciseTestCase["visibility"],
              }))
            }
            className={inputClassName}
          >
            <option value="public">Công khai</option>
            <option value="hidden">Ẩn</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

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

export default AdminOnlineCourseEditorPage;
