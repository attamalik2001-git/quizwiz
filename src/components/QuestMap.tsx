import React from 'react';
import { FlaskConical, Rocket, Hourglass, Calculator, Star, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { QUEST_WORLDS } from '../data/fallbackQuestions';
import { Subject } from '../types';
import { soundManager } from '../utils/audio';

interface QuestMapProps {
  onSelectStage: (worldId: Subject, stageNumber: number) => void;
  completedStages: Record<string, number>;
}

export const QuestMap: React.FC<QuestMapProps> = ({ onSelectStage, completedStages }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical className="w-7 h-7" />;
      case 'Rocket': return <Rocket className="w-7 h-7" />;
      case 'Hourglass': return <Hourglass className="w-7 h-7" />;
      case 'Calculator': return <Calculator className="w-7 h-7" />;
      default: return <Sparkles className="w-7 h-7" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Adventure Quest Worlds
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Choose your subject world, conquer exciting challenges, and earn 3-star ratings on every stage!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUEST_WORLDS.map((world) => (
            <div
              key={world.id}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border ${world.borderColor} shadow-xl relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl ${world.bgColor} ${world.color} flex items-center justify-center shadow-md`}>
                    {getIcon(world.icon)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Class 6-8 Curriculum
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {world.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {world.description}
                  </p>
                </div>
              </div>

              {/* Stages List */}
              <div className="pt-6 space-y-3 mt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Stages</h4>
                <div className="space-y-2.5">
                  {world.stages.map((stage) => {
                    const stageKey = `${world.id}-${stage.stageNumber}`;
                    const starsEarned = completedStages[stageKey] || 0;
                    const isUnlocked = stage.stageNumber === 1 || completedStages[`${world.id}-${stage.stageNumber - 1}`] > 0;

                    return (
                      <div
                        key={stage.stageNumber}
                        onClick={() => {
                          if (isUnlocked) {
                            soundManager.playClick();
                            onSelectStage(world.id, stage.stageNumber);
                          }
                        }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          isUnlocked
                            ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-purple-500 cursor-pointer group shadow-sm'
                            : 'bg-slate-100/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isUnlocked ? 'bg-purple-600 text-white shadow' : 'bg-slate-300 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {isUnlocked ? stage.stageNumber : <Lock className="w-4 h-4" />}
                          </div>
                          <div>
                            <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                              Stage {stage.stageNumber}: {stage.title}
                            </h5>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[1, 2, 3].map((starIdx) => (
                                <Star
                                  key={starIdx}
                                  className={`w-3.5 h-3.5 ${
                                    starIdx <= starsEarned
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-slate-300 dark:text-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {isUnlocked && (
                          <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
