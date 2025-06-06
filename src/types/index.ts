export interface User {
  id: string;
  username: string;
  email: string;
  score: number;
  joinDate: string;
  role: 'user' | 'admin';
}

export interface Challenge {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text';
  options?: string[];
  correctAnswer: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  contestId: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  challenges: Challenge[];
  timeLimit: number; // in minutes
  startDate: string;
  endDate: string;
  isActive: boolean;
  maxAttempts: number;
  createdBy: string;
}

export interface UserProgress {
  userId: string;
  challengeId: string;
  completed: boolean;
  score: number;
  completedAt: string;
}

export interface ContestAttempt {
  id: string;
  userId: string;
  contestId: string;
  startTime: string;
  endTime?: string;
  score: number;
  answers: { challengeId: string; answer: string; isCorrect: boolean }[];
  timeSpent: number; // in seconds
  isCompleted: boolean;
}