import React, { useState, useEffect } from 'react';
import { GameMode, Question, Subject } from './types';
import { FALLBACK_QUESTIONS } from './data/fallbackQuestions';
import { Navbar } from './components/Navbar';
import { TitleScreen } from './components/TitleScreen';
import { QuestMap } from './components/QuestMap';
import { GameScreen } from './components/GameScreen';
import { VictoryModal } from './components/VictoryModal';
import { BadgesModal } from './components/BadgesModal';
import { AiQuizModal } from './components/AiQuizModal';
import { RewardStore } from './components/RewardStore';
import { soundManager } from './utils/audio';

export default function App() {
  const [mode, setMode] = useState<GameMode>('menu');
  const [muted, setMuted] = useState(false);
  const [xp, setXp] = useState(150);
  const [coins, setCoins] = useState(100);
  const [streak, setStreak] = useState(3);
  const [score, setScore] = useState(0);

  // Avatar customization
  const [activeAvatar, setActiveAvatar] = useState('🤖');
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['🤖']);

  // Completed stages map: e.g. { "science-1": 3 }
  const [completedStages, setCompletedStages] = useState<Record<string, number>>({
    'science-1': 3,
  });

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeSubject, setActiveSubject] = useState<Subject>('science');
  const [activeStageTitle, setActiveStageTitle] = useState('Quiz Challenge');
  const [activeKey, setActiveKey] = useState<string>('science-1');

  // Modal toggles
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [lastGameResult, setLastGameResult] = useState<{ score: number; correctCount: number; total: number; stars: number } | null>(null);

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedXp = localStorage.getItem('quizwiz_xp');
    const savedCoins = localStorage.getItem('quizwiz_coins');
    const savedStreak = localStorage.getItem('quizwiz_streak');
    const savedStages = localStorage.getItem('quizwiz_stages');
    const savedAvatar = localStorage.getItem('quizwiz_avatar');
    const savedUnlocked = localStorage.getItem('quizwiz_unlocked_avatars');

    if (savedXp) setXp(Number(savedXp));
    if (savedCoins) setCoins(Number(savedCoins));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedAvatar) setActiveAvatar(savedAvatar);
    if (savedUnlocked) {
      try { setUnlockedAvatars(JSON.parse(savedUnlocked)); } catch {}
    }
    if (savedStages) {
      try { setCompletedStages(JSON.parse(savedStages)); } catch {}
    }
  }, []);

  const saveStats = (newXp: number, newCoins: number, newStreak: number, newStages: Record<string, number>) => {
    setXp(newXp);
    setCoins(newCoins);
    setStreak(newStreak);
    setCompletedStages(newStages);
    localStorage.setItem('quizwiz_xp', String(newXp));
    localStorage.setItem('quizwiz_coins', String(newCoins));
    localStorage.setItem('quizwiz_streak', String(newStreak));
    localStorage.setItem('quizwiz_stages', JSON.stringify(newStages));
  };

  const handleStartStage = (worldId: Subject, stageNumber: number) => {
    const key = `${worldId}-${stageNumber}`;
    setActiveKey(key);
    setActiveSubject(worldId);
    const questions = FALLBACK_QUESTIONS[key] || FALLBACK_QUESTIONS['science-1'];
    setActiveQuestions(questions);
    setActiveStageTitle(`${worldId.toUpperCase()} Stage ${stageNumber}`);
    setMode('arcade'); // Play game screen
  };

  const handleStartAiQuiz = (questions: Question[], subject: Subject, title: string) => {
    setActiveQuestions(questions);
    setActiveSubject(subject);
    setActiveStageTitle(title);
    setShowAiModal(false);
    setMode('arcade');
  };

  const handleFinishGame = (finalScore: number, correctCount: number, total: number) => {
    setScore(finalScore);
    const accuracy = correctCount / total;
    const stars = accuracy >= 0.8 ? 3 : accuracy >= 0.5 ? 2 : 1;
    const earnedXp = correctCount * 25 + (accuracy === 1 ? 100 : 50);
    const earnedCoins = correctCount * 10 + (accuracy === 1 ? 50 : 20);

    const newXp = xp + earnedXp;
    const newCoins = coins + earnedCoins;
    const newStreak = accuracy >= 0.6 ? streak + 1 : 0;

    const newStages = { ...completedStages };
    if (mode === 'arcade' && activeKey) {
      const currentStars = newStages[activeKey] || 0;
      if (stars > currentStars) {
        newStages[activeKey] = stars;
      }
    }

    saveStats(newXp, newCoins, newStreak, newStages);
    setLastGameResult({ score: finalScore, correctCount, total, stars });
    setShowVictoryModal(true);
  };

  const handleBuyAvatar = (avatarId: string, cost: number) => {
    if (coins >= cost) {
      const newCoins = coins - cost;
      const newUnlocked = [...unlockedAvatars, avatarId];
      setCoins(newCoins);
      setUnlockedAvatars(newUnlocked);
      setActiveAvatar(avatarId);
      localStorage.setItem('quizwiz_coins', String(newCoins));
      localStorage.setItem('quizwiz_avatar', avatarId);
      localStorage.setItem('quizwiz_unlocked_avatars', JSON.stringify(newUnlocked));
    }
  };

  const handleSelectAvatar = (avatarId: string) => {
    setActiveAvatar(avatarId);
    localStorage.setItem('quizwiz_avatar', avatarId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Navbar
        score={score}
        streak={streak}
        xp={xp}
        coins={coins}
        activeAvatar={activeAvatar}
        muted={muted}
        onToggleMute={() => setMuted(!muted)}
        onGoHome={() => setMode('menu')}
        onOpenBadges={() => setShowBadgesModal(true)}
        onOpenStore={() => setShowStoreModal(true)}
      />

      <main className="flex-1 flex flex-col">
        {mode === 'menu' && (
          <TitleScreen
            onSelectMode={(m) => {
              if (m === 'quest') setMode('quest');
              else if (m === 'arcade') {
                handleStartStage('science', 1);
              } else if (m === 'badges') {
                setShowBadgesModal(true);
              }
            }}
            onOpenAiModal={() => setShowAiModal(true)}
            onOpenStore={() => setShowStoreModal(true)}
            totalXp={xp}
            coins={coins}
            streak={streak}
          />
        )}

        {mode === 'quest' && (
          <QuestMap
            completedStages={completedStages}
            onSelectStage={handleStartStage}
          />
        )}

        {mode === 'arcade' && (
          <GameScreen
            questions={activeQuestions}
            subject={activeSubject}
            stageTitle={activeStageTitle}
            onFinish={handleFinishGame}
            onExit={() => setMode('menu')}
          />
        )}
      </main>

      {/* Modals */}
      {showBadgesModal && (
        <BadgesModal
          xp={xp}
          streak={streak}
          completedStagesCount={Object.keys(completedStages).length}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {showAiModal && (
        <AiQuizModal
          onStartQuiz={handleStartAiQuiz}
          onClose={() => setShowAiModal(false)}
        />
      )}

      {showStoreModal && (
        <RewardStore
          coins={coins}
          unlockedAvatars={unlockedAvatars}
          activeAvatar={activeAvatar}
          onSelectAvatar={handleSelectAvatar}
          onBuyAvatar={handleBuyAvatar}
          onClose={() => setShowStoreModal(false)}
        />
      )}

      {showVictoryModal && lastGameResult && (
        <VictoryModal
          score={lastGameResult.score}
          correctCount={lastGameResult.correctCount}
          totalQuestions={lastGameResult.total}
          starsEarned={lastGameResult.stars}
          onPlayAgain={() => {
            setShowVictoryModal(false);
            setMode('arcade');
          }}
          onGoHome={() => {
            setShowVictoryModal(false);
            setMode('menu');
          }}
        />
      )}
    </div>
  );
}
