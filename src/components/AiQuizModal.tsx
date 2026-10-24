import React, { useState } from 'react';
import { Wand2, X, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Question, Subject } from '../types';

interface AiQuizModalProps {
  onStartQuiz: (questions: Question[], subject: Subject, title: string) => void;
  onClose: () => void;
}

export const AiQuizModal: React.FC<AiQuizModalProps> = ({ onStartQuiz, onClose }) => {
  const [subjectInput, setSubjectInput] = useState("Black Holes & Quantum Physics");
  const [grade, setGrade] = useState("Class 7");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectInput.trim()) return;

    soundManager.playClick();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subjectInput,
          grade,
          count: 5,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate AI quiz");
      }

      if (data.questions && data.questions.length > 0) {
        onStartQuiz(data.questions, 'science', `AI: ${subjectInput}`);
      } else {
        throw new Error("No questions returned from AI generator.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz. Using fallback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="max-w-lg w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Wand2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">AI Custom Quiz Generator</h3>
              <p className="text-xs text-purple-200">Powered by Gemini AI</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              What topic do you want to explore?
            </label>
            <input
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              placeholder="e.g. Ancient Rome, Solar System, Fractions, Photosynthesis"
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              Select Student Class Level
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-medium text-sm cursor-pointer"
            >
              <option value="Class 6">Class 6 (Ages 11-12)</option>
              <option value="Class 7">Class 7 (Ages 12-13)</option>
              <option value="Class 8">Class 8 (Ages 13-14)</option>
            </select>
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-xl border border-rose-800">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Professor Spark is generating your quiz...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Quiz Adventure</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
