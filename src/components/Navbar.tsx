import React from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, Flame, Home, Coins, ShoppingBag } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  score: number;
  streak: number;
  xp: number;
  coins: number;
  activeAvatar: string;
  muted: boolean;
  onToggleMute: () => void;
  onGoHome: () => void;
  onOpenBadges: () => void;
  onOpenStore: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  score,
  streak,
  xp,
  coins,
  activeAvatar,
  muted,
  onToggleMute,
  onGoHome,
  onOpenBadges,
  onOpenStore,
}) => {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
      {/* Zone 1: Brand Wordmark & Avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform text-xl">
            {activeAvatar}
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              QuizWiz
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">Class 6–8 Adventure</p>
          </div>
        </button>
      </div>

      {/* Zone 2: Stats & Quick Info */}
      <div className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-700 dark:text-slate-200">
        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
          <Coins className="w-4 h-4 text-amber-500" />
          <span className="tabular-nums">{coins} Coins</span>
        </div>
        <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-800">
          <Flame className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
          <span className="tabular-nums">{streak} Streak</span>
        </div>
        <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
          <Sparkles className="w-4 h-4" />
          <span className="tabular-nums">{xp} XP</span>
        </div>
      </div>

      {/* Zone 3: Actions (Home, Store, Badges, Mute) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onGoHome}
          title="Home Dashboard"
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenStore}
          title="Prize & Avatar Store"
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-500 transition-colors cursor-pointer relative"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenBadges}
          title="Badges & Achievements"
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
        >
          <Trophy className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            soundManager.muted = !muted;
            onToggleMute();
          }}
          title={muted ? "Unmute Sound" : "Mute Sound"}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
        >
          {muted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-500" />}
        </button>
      </div>
    </header>
  );
};
