export type Subject = 'science' | 'history' | 'math' | 'geography' | 'space';

export type GameMode = 'menu' | 'quest' | 'arcade' | 'ai-quiz' | 'badges';

export interface Question {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact?: string;
}

export interface QuestWorld {
  id: Subject;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  stages: {
    stageNumber: number;
    title: string;
    unlocked: boolean;
    stars: number; // 0 to 3
    highScore: number;
  }[];
}

export interface PlayerStats {
  xp: number;
  streak: number;
  coins: number;
  badges: string[];
  completedStages: Record<string, number>; // "science-1": 3 stars
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
