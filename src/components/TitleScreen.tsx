import React from 'react';
import { Sparkles, Play, Flame, Trophy, Wand2, BookOpen, ShoppingBag, Coins } from 'lucide-react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';

interface TitleScreenProps {
  onSelectMode: (mode: GameMode) => void;
  onOpenAiModal: () => void;
  onOpenStore: () => void;
  totalXp: number;
  coins: number;
  streak: number;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onSelectMode,
  onOpenAiModal,
  onOpenStore,
  totalXp,
  coins,
  streak,
}) => {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Hero Content */}
      <div className="max-w-4xl w-full mx-auto text-center z-10 space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 text-sm font-medium animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Earn XP, Coins & Unlock Badges for Classes 6–8</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            QuizWiz Quest
          </h1>
          <p className="text-lg md:text-xl text-purple-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            Master Science, Space, History, and Math through thrilling missions, arcade speed rounds, and AI tutor challenges!
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectMode('quest');
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold text-lg shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>Start Adventure Map</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAiModal();
            }}
            className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Wand2 className="w-6 h-6 text-pink-300" />
            <span>AI Custom Quiz Creator</span>
          </button>
        </div>

        {/* Game Mode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 text-left">
          <div
            onClick={() => {
              soundManager.playClick();
              onSelectMode('quest');
            }}
            className="group p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quest Map</h3>
            <p className="text-sm text-purple-200/70">
              Conquer 4 worlds and earn 3-star ratings!
            </p>
          </div>

          <div
            onClick={() => {
              soundManager.playClick();
              onSelectMode('arcade');
            }}
            className="group p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Arcade Rush</h3>
            <p className="text-sm text-purple-200/70">
              Fast-paced trivia with timers and combo multipliers!
            </p>
          </div>

          <div
            onClick={() => {
              soundManager.playClick();
              onOpenStore();
            }}
            className="group p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Prize Store</h3>
            <p className="text-sm text-purple-200/70">
              Spend your {coins} coins on custom avatars & stickers!
            </p>
          </div>

          <div
            onClick={() => {
              soundManager.playClick();
              onSelectMode('badges');
            }}
            className="group p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Trophies</h3>
            <p className="text-sm text-purple-200/70">
              Total XP ({totalXp}) & streak achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
