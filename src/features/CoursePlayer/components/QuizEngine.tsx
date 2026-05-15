import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Timer, 
  CheckCircle2, 
  Circle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import type { CoursePlayerQuiz } from "../types/coursePlayer";

interface QuizEngineProps {
  quiz: CoursePlayerQuiz;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(quiz.currentQuestionNumber);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitSeconds);
  const activeQuestion = quiz.questions[0];
  const [selectedOption, setSelectedOption] = useState<number | null>(
    activeQuestion?.selectedOptionIndex ?? null,
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setCurrentQuestion(quiz.currentQuestionNumber);
    setTimeLeft(quiz.timeLimitSeconds);
    setSelectedOption(quiz.questions[0]?.selectedOptionIndex ?? null);
  }, [quiz]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const questions = Array.from({ length: quiz.totalQuestions }, (_, i) => ({
    id: i + 1,
    status: i < quiz.solvedQuestions ? "answered" : i + 1 === currentQuestion ? "current" : "not-visited"
  }));

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Quiz Header */}
      <div className="h-20 border-b border-outline-variant px-12 flex items-center justify-between bg-[#fcfcfc]">
        <div>
          <p className="text-[#f28633] text-[10px] font-extrabold uppercase tracking-widest mb-1">{quiz.category}</p>
          <h2 className="text-title-lg font-bold text-primary">{quiz.title}</h2>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Timer Display */}
          <div className="flex items-center gap-4 bg-[#f8f9fa] border border-outline-variant rounded-xl px-6 py-2 shadow-sm">
            <div className="text-right">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Remaining</p>
              <p className="text-headline-xs font-mono font-bold text-primary">{formatTime(timeLeft)}</p>
            </div>
          </div>
          {/* Progress Display */}
          <div className="flex items-center gap-4 bg-[#fff5ee] border border-[#f28633]/20 rounded-xl px-6 py-2 shadow-sm">
            <div className="text-right">
              <p className="text-[10px] font-bold text-[#f28633] uppercase">Progress</p>
              <p className="text-headline-xs font-mono font-bold text-[#f28633]">
                {currentQuestion.toString().padStart(2, "0")}/{quiz.totalQuestions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="flex-1 overflow-hidden p-12 flex gap-10">
        {/* Question Container */}
        <div className="flex-1 flex flex-col h-full">
          <div className="bg-white border border-outline-variant rounded-2xl p-10 shadow-sm flex-1 overflow-y-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-[#001c3d] text-white text-[11px] font-extrabold px-2 py-1 rounded">Q{currentQuestion}</span>
              <span className="text-on-surface-variant text-label-sm font-bold uppercase tracking-wider">Multiple Choice</span>
            </div>

            <h3 className="text-headline-sm font-bold text-primary mb-10 leading-snug">
              {activeQuestion?.text}
            </h3>

            <div className="space-y-4">
              {activeQuestion?.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all flex items-start gap-4 group ${
                    selectedOption === idx 
                      ? "border-[#f28633] bg-[#fffcf9]" 
                      : "border-outline-variant hover:border-[#f28633]/50 bg-white"
                  }`}
                >
                  <div className={`mt-1 flex-shrink-0 ${selectedOption === idx ? "text-[#f28633]" : "text-outline-variant group-hover:text-primary transition-colors"}`}>
                    {selectedOption === idx ? <CheckCircle2 size={24} fill="currentColor" className="text-[#f28633] !fill-none" /> : <Circle size={24} />}
                  </div>
                  <span className={`text-body-lg font-medium leading-relaxed ${selectedOption === idx ? "text-primary" : "text-on-surface-variant"}`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between items-center bg-[#f8f9fa] p-4 rounded-xl border border-outline-variant">
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-white transition-colors active:scale-95">
              <ChevronLeft size={20} />
              Previous Question
            </button>
            <button className="bg-[#001c3d] text-white px-10 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-primary transition-colors active:scale-95">
              Save & Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Sidebar: Palette */}
        <div className="w-80 flex flex-col h-full gap-6">
          <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-label-sm font-extrabold text-primary uppercase tracking-widest">Question Palette</h4>
              <span className="text-[12px] font-bold text-[#f28633]">
                {quiz.solvedQuestions} of {quiz.totalQuestions} Solved
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-8">
              {questions.map(q => (
                <button 
                  key={q.id}
                  className={`aspect-square rounded-md text-body-sm font-bold flex items-center justify-center transition-all ${
                    q.status === "answered" ? "bg-[#8c4b1a] text-white" :
                    q.status === "current" ? "border-2 border-primary text-primary" :
                    "bg-[#eaecf0] text-on-surface-variant hover:bg-outline-variant"
                  }`}
                >
                  {q.id.toString().padStart(2, '0')}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-outline-variant mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8c4b1a]" />
                <span className="text-body-sm text-on-surface-variant font-medium">Answered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#eaecf0]" />
                <span className="text-body-sm text-on-surface-variant font-medium">Not Visited</span>
              </div>
            </div>

            <button className="w-full bg-[#b22222] text-white py-4 rounded-xl font-extrabold shadow-lg shadow-red-100 hover:bg-red-700 transition-colors uppercase tracking-widest active:scale-[0.98]">
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;
