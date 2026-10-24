import React from 'react';
import { Trophy, Star, Sparkles, RotateCcw, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface VictoryModalProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  starsEarned: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  correctCount,
  totalQuestions,
  starsEarned,
  onPlayAgain,
  onGoHome,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="max-w-md w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-amber-500/30">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold text-white">Quest Complete! 🎉</h3>
          <p className="text-sm text-purple-200">
            You successfully finished the challenge with flying colors!
          </p>
        </div>

        {/* Stars Earned */}
        <div className="flex items-center justify-center gap-3 py-2">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`w-10 h-10 ${
                starIdx <= starsEarned
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-bounce'
                  : 'text-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Stats Box */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800 text-left">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <span className="text-xs text-slate-400">Total Score</span>
            <div className="text-2xl font-bold text-amber-400 tabular-nums">{score} pts</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <span className="text-xs text-slate-400">Correct Answers</span>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums">{correctCount} / {totalQuestions}</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="flex-1 py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onGoHome();
            }}
            className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
