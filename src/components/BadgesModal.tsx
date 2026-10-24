import React from 'react';
import { Trophy, Award, X, Sparkles, Flame, Star } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BadgesModalProps {
  xp: number;
  streak: number;
  completedStagesCount: number;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  xp,
  streak,
  completedStagesCount,
  onClose,
}) => {
  const achievements = [
    {
      title: "Science Pioneer",
      desc: "Complete your first Science stage",
      icon: "🔬",
      unlocked: completedStagesCount > 0,
    },
    {
      title: "Cosmic Voyager",
      desc: "Journey through Space Station quizzes",
      icon: "🚀",
      unlocked: xp >= 200,
    },
    {
      title: "Time Traveler",
      desc: "Master Ancient History trivia",
      icon: "⏳",
      unlocked: streak >= 3,
    },
    {
      title: "Math Wizard",
      desc: "Solve advanced equations & fractions",
      icon: "📐",
      unlocked: xp >= 500,
    },
    {
      title: "Streak Master",
      desc: "Maintain a 5-question correct streak",
      icon: "🔥",
      unlocked: streak >= 5,
    },
    {
      title: "QuizWiz Grandmaster",
      desc: "Reach 1,000 Total XP",
      icon: "👑",
      unlocked: xp >= 1000,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="max-w-xl w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 shadow-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Badges & Trophies</h3>
              <p className="text-xs text-purple-200">Your QuizWiz achievements</p>
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

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <div>
              <span className="text-xs text-slate-400">Total Experience</span>
              <div className="text-xl font-bold text-white tabular-nums">{xp} XP</div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center gap-3">
            <Flame className="w-6 h-6 text-rose-400" />
            <div>
              <span className="text-xs text-slate-400">Current Streak</span>
              <div className="text-xl font-bold text-white tabular-nums">{streak}</div>
            </div>
          </div>
        </div>

        {/* Badges List */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Achievements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                  ach.unlocked
                    ? 'bg-purple-950/30 border-purple-500/40 text-white shadow'
                    : 'bg-slate-800/30 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700 shrink-0">
                  {ach.icon}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                    {ach.title}
                    {ach.unlocked && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                  </h5>
                  <p className="text-xs text-slate-400 mt-0.5">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
