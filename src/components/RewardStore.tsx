import React, { useState } from 'react';
import { ShoppingBag, X, Sparkles, Check, Lock, Coins } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface RewardStoreProps {
  coins: number;
  unlockedAvatars: string[];
  activeAvatar: string;
  onSelectAvatar: (avatar: string) => void;
  onBuyAvatar: (avatarId: string, cost: number) => void;
  onClose: () => void;
}

export const RewardStore: React.FC<RewardStoreProps> = ({
  coins,
  unlockedAvatars,
  activeAvatar,
  onSelectAvatar,
  onBuyAvatar,
  onClose,
}) => {
  const avatars = [
    { id: '🤖', name: 'Sparky Robot', cost: 0 },
    { id: '🚀', name: 'Cosmic Cadet', cost: 50 },
    { id: '🧙‍♂️', name: 'Math Wizard', cost: 100 },
    { id: '🦖', name: 'Dino Explorer', cost: 150 },
    { id: '🦄', name: 'Galaxy Unicorn', cost: 200 },
    { id: '👑', name: 'QuizWiz Emperor', cost: 300 },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="max-w-lg w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 shadow-lg">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Prize & Avatar Store</h3>
              <p className="text-xs text-amber-200 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold">{coins} Coins available</span>
              </p>
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

        {/* Avatar Shop Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Unlock & Equip Avatars</h4>
          <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {avatars.map((av) => {
              const isUnlocked = unlockedAvatars.includes(av.id);
              const isActive = activeAvatar === av.id;
              const canAfford = coins >= av.cost;

              return (
                <div
                  key={av.id}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-between gap-3 transition-all ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                      : isUnlocked
                      ? 'bg-slate-800/60 border-slate-700 text-white hover:border-amber-400/50 cursor-pointer'
                      : 'bg-slate-800/30 border-slate-800 text-slate-400 opacity-80'
                  }`}
                  onClick={() => {
                    if (isUnlocked) {
                      soundManager.playClick();
                      onSelectAvatar(av.id);
                    } else if (canAfford) {
                      soundManager.playClick();
                      onBuyAvatar(av.id, av.cost);
                    }
                  }}
                >
                  <div className="text-4xl p-3 rounded-2xl bg-slate-900/80 border border-slate-700">
                    {av.id}
                  </div>
                  <div className="text-center">
                    <h5 className="font-bold text-sm text-white">{av.name}</h5>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">
                      {isUnlocked ? (isActive ? 'Equipped' : 'Owned') : `${av.cost} Coins`}
                    </p>
                  </div>

                  {!isUnlocked && (
                    <button
                      disabled={!canAfford}
                      className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Unlock' : 'Need Coins'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
