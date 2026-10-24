import React, { useState, useEffect } from 'react';
import { Question, Subject } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Clock, Flame, Zap, HelpCircle, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface GameScreenProps {
  questions: Question[];
  subject: Subject;
  stageTitle?: string;
  onFinish: (score: number, correctCount: number, total: number) => void;
  onExit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  questions,
  subject,
  stageTitle = "Quiz Challenge",
  onFinish,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gameOver, setGameOver] = useState(false);

  // Power-ups state
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  // AI Tutor Modal state for incorrect answers
  const [tutorExplanation, setTutorExplanation] = useState<string | null>(null);
  const [loadingTutor, setLoadingTutor] = useState(false);

  const currentQ = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (gameOver || selectedOption !== null || tutorExplanation) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, gameOver, selectedOption, tutorExplanation]);

  const handleTimeOut = () => {
    soundManager.playIncorrect();
    setSelectedOption(-1);
    setIsCorrect(false);
    setStreak(0);
    fetchAiExplanation(currentQ, "Time expired", currentQ.options[currentQ.correctIndex]);
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || tutorExplanation) return;

    setSelectedOption(index);
    const correct = index === currentQ.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      const points = 100 + timeLeft * 2 + streak * 15;
      setScore((s) => s + points);
      setCorrectCount((c) => c + 1);
      setStreak((s) => s + 1);
    } else {
      soundManager.playIncorrect();
      setStreak(0);
      fetchAiExplanation(currentQ, currentQ.options[index], currentQ.options[currentQ.correctIndex]);
    }
  };

  const fetchAiExplanation = async (q: Question, selected: string, correct: string) => {
    setLoadingTutor(true);
    try {
      const res = await fetch("/api/quiz/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.question,
          selectedAnswer: selected,
          correctAnswer: correct,
          subject,
        }),
      });
      const data = await res.json();
      setTutorExplanation(data.explanation || q.explanation);
    } catch {
      setTutorExplanation(q.explanation);
    } finally {
      setLoadingTutor(false);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setHiddenOptions([]);
    setShowHint(false);
    setTutorExplanation(null);
    setTimeLeft(25);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setGameOver(true);
      soundManager.playVictory();
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      onFinish(score, correctCount + (isCorrect ? 1 : 0), questions.length);
    }
  };

  const handleUseFifty = () => {
    if (fiftyUsed || selectedOption !== null) return;
    setFiftyUsed(true);
    soundManager.playClick();

    const incorrectIndices = currentQ.options
      .map((_, idx) => idx)
      .filter((idx) => idx !== currentQ.correctIndex);

    // Hide 2 incorrect options
    const shuffled = incorrectIndices.sort(() => 0.5 - Math.random());
    setHiddenOptions(shuffled.slice(0, 2));
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-6">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-200">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-slate-300 font-normal">· {stageTitle}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Flame className="w-4 h-4 fill-amber-300" />
              <span>Streak: {streak}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Clock className="w-4 h-4" />
              <span className={`tabular-nums ${timeLeft <= 5 ? 'text-rose-400 animate-pulse font-bold' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            style={{ width: `${(timeLeft / 25) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold leading-snug text-white">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, idx) => {
              if (hiddenOptions.includes(idx)) return null;

              let btnStyle = "bg-white/5 hover:bg-white/15 border-white/10 text-white";
              if (selectedOption !== null) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = "bg-emerald-600/80 border-emerald-400 text-white shadow-lg shadow-emerald-500/20";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-600/80 border-rose-400 text-white shadow-lg shadow-rose-500/20";
                } else {
                  btnStyle = "bg-white/5 opacity-50 border-white/5 text-white/50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null || !!tutorExplanation}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Power-ups Row */}
          {selectedOption === null && !tutorExplanation && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUseFifty}
                  disabled={fiftyUsed}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    fiftyUsed
                      ? 'bg-white/5 border-white/5 text-white/40 cursor-not-allowed'
                      : 'bg-purple-600/40 hover:bg-purple-600/60 border-purple-400/50 text-purple-200 cursor-pointer'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>50/50 Power-up {fiftyUsed ? '(Used)' : ''}</span>
                </button>

                <button
                  onClick={() => {
                    setShowHint(true);
                    soundManager.playClick();
                  }}
                  disabled={showHint}
                  className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? currentQ.funFact || "Think about core principles!" : "Show Fun Hint"}</span>
                </button>
              </div>

              <div className="text-xs text-purple-300 font-medium">Score: {score}</div>
            </div>
          )}

          {/* AI Tutor Explanation Modal / Card on Incorrect / Correct */}
          {(selectedOption !== null || tutorExplanation) && (
            <div className="mt-6 p-6 rounded-2xl bg-slate-900/90 border border-purple-500/40 space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isCorrect ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                  {isCorrect ? <Sparkles className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">
                    {isCorrect ? 'Brilliant Job! 🎉' : 'Professor Spark Explains 🤖'}
                  </h4>
                  <p className="text-xs text-purple-200">
                    {isCorrect ? currentQ.funFact : 'Learn from Professor Spark below!'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-purple-100/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {loadingTutor ? "Professor Spark is thinking..." : tutorExplanation || currentQ.explanation}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Final Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
