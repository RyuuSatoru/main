import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Challenge, UserProgress, Contest, ContestAttempt } from '../types';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  challenges: Challenge[];
  contests: Contest[];
  userProgress: UserProgress[];
  contestAttempts: ContestAttempt[];
  currentPage: string;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  setCurrentPage: (page: string) => void;
  submitAnswer: (challengeId: string, answer: string) => boolean;
  getUserScore: (userId: string) => number;
  getLeaderboard: () => User[];
  startContest: (contestId: string) => ContestAttempt | null;
  submitContestAnswer: (attemptId: string, challengeId: string, answer: string) => boolean;
  finishContest: (attemptId: string) => void;
  getCurrentAttempt: (contestId: string) => ContestAttempt | null;
  createContest: (contest: Omit<Contest, 'id' | 'createdBy'>) => boolean;
  addChallengeToContest: (contestId: string, challenge: Omit<Challenge, 'id' | 'contestId'>) => boolean;
  updateContest: (contestId: string, updates: Partial<Contest>) => boolean;
  deleteContest: (contestId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockChallenges: Challenge[] = [
  {
    id: '1',
    question: 'AI là viết tắt của từ gì?',
    type: 'multiple-choice',
    options: ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Applied Intelligence'],
    correctAnswer: 'Artificial Intelligence',
    points: 10,
    difficulty: 'easy',
    contestId: 'contest1'
  },
  {
    id: '2',
    question: 'Thuật toán nào thường được sử dụng cho nhận dạng hình ảnh?',
    type: 'multiple-choice',
    options: ['Linear Regression', 'Convolutional Neural Network', 'Decision Tree', 'K-Means'],
    correctAnswer: 'Convolutional Neural Network',
    points: 20,
    difficulty: 'medium',
    contestId: 'contest1'
  },
  {
    id: '3',
    question: 'Giải thích khái niệm overfitting trong machine learning.',
    type: 'text',
    correctAnswer: 'overfitting',
    points: 30,
    difficulty: 'hard',
    contestId: 'contest1'
  },
  {
    id: '4',
    question: 'Python được sử dụng phổ biến trong AI vì lý do gì?',
    type: 'multiple-choice',
    options: ['Dễ học và sử dụng', 'Có nhiều thư viện AI', 'Cộng đồng lớn', 'Tất cả các lý do trên'],
    correctAnswer: 'Tất cả các lý do trên',
    points: 15,
    difficulty: 'easy',
    contestId: 'contest2'
  },
  {
    id: '5',
    question: 'TensorFlow là gì?',
    type: 'text',
    correctAnswer: 'framework',
    points: 25,
    difficulty: 'medium',
    contestId: 'contest2'
  }
];

const mockContests: Contest[] = [
  {
    id: 'contest1',
    title: 'Kiến thức AI cơ bản',
    description: 'Cuộc thi kiểm tra kiến thức cơ bản về trí tuệ nhân tạo và machine learning',
    challenges: mockChallenges.filter(c => c.contestId === 'contest1'),
    timeLimit: 30,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    maxAttempts: 3,
    createdBy: 'admin'
  },
  {
    id: 'contest2',
    title: 'Python cho AI',
    description: 'Thử thách về việc sử dụng Python trong các dự án AI',
    challenges: mockChallenges.filter(c => c.contestId === 'contest2'),
    timeLimit: 20,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    maxAttempts: 2,
    createdBy: 'admin'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    username: 'AIExplorer',
    email: 'explorer@vaic.com',
    score: 150,
    joinDate: '2024-01-15',
    role: 'user'
  },
  {
    id: '2',
    username: 'TechWizard',
    email: 'wizard@vaic.com',
    score: 120,
    joinDate: '2024-01-20',
    role: 'user'
  },
  {
    id: '3',
    username: 'DataMaster',
    email: 'master@vaic.com',
    score: 180,
    joinDate: '2024-01-10',
    role: 'user'
  },
  {
    id: 'admin',
    username: 'Admin',
    email: 'admin@vaic.com',
    score: 999,
    joinDate: '2024-01-01',
    role: 'admin'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [contestAttempts, setContestAttempts] = useState<ContestAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user && password === 'password') {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    if (users.find(u => u.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      score: 0,
      joinDate: new Date().toISOString().split('T')[0],
      role: 'user'
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const submitAnswer = (challengeId: string, answer: string): boolean => {
    if (!currentUser) return false;
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return false;
    
    const isCorrect = challenge.type === 'multiple-choice' 
      ? answer === challenge.correctAnswer
      : answer.toLowerCase().includes(challenge.correctAnswer.toLowerCase());
    
    if (isCorrect) {
      const updatedUser = { ...currentUser, score: currentUser.score + challenge.points };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      const progress: UserProgress = {
        userId: currentUser.id,
        challengeId,
        completed: true,
        score: challenge.points,
        completedAt: new Date().toISOString()
      };
      setUserProgress(prev => [...prev, progress]);
    }
    
    return isCorrect;
  };

  const startContest = (contestId: string): ContestAttempt | null => {
    if (!currentUser) return null;
    
    const contest = contests.find(c => c.id === contestId);
    if (!contest) return null;
    
    // Check if user has exceeded max attempts
    const userAttempts = contestAttempts.filter(a => a.userId === currentUser.id && a.contestId === contestId);
    if (userAttempts.length >= contest.maxAttempts) return null;
    
    const attempt: ContestAttempt = {
      id: Date.now().toString(),
      userId: currentUser.id,
      contestId,
      startTime: new Date().toISOString(),
      score: 0,
      answers: [],
      timeSpent: 0,
      isCompleted: false
    };
    
    setContestAttempts(prev => [...prev, attempt]);
    return attempt;
  };

  const submitContestAnswer = (attemptId: string, challengeId: string, answer: string): boolean => {
    const attempt = contestAttempts.find(a => a.id === attemptId);
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (!attempt || !challenge) return false;
    
    const isCorrect = challenge.type === 'multiple-choice' 
      ? answer === challenge.correctAnswer
      : answer.toLowerCase().includes(challenge.correctAnswer.toLowerCase());
    
    const answerRecord = { challengeId, answer, isCorrect };
    const updatedAttempt = {
      ...attempt,
      answers: [...attempt.answers.filter(a => a.challengeId !== challengeId), answerRecord],
      score: attempt.score + (isCorrect ? challenge.points : 0)
    };
    
    setContestAttempts(prev => prev.map(a => a.id === attemptId ? updatedAttempt : a));
    return isCorrect;
  };

  const finishContest = (attemptId: string) => {
    const attempt = contestAttempts.find(a => a.id === attemptId);
    if (!attempt || !currentUser) return;
    
    const endTime = new Date();
    const startTime = new Date(attempt.startTime);
    const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    // Calculate time bonus (faster completion = more points)
    const contest = contests.find(c => c.id === attempt.contestId);
    const timeBonus = contest ? Math.max(0, Math.floor((contest.timeLimit * 60 - timeSpent) / 60) * 5) : 0;
    
    const finalScore = attempt.score + timeBonus;
    
    const updatedAttempt = {
      ...attempt,
      endTime: endTime.toISOString(),
      timeSpent,
      score: finalScore,
      isCompleted: true
    };
    
    setContestAttempts(prev => prev.map(a => a.id === attemptId ? updatedAttempt : a));
    
    // Update user total score
    const updatedUser = { ...currentUser, score: currentUser.score + finalScore };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const getCurrentAttempt = (contestId: string): ContestAttempt | null => {
    if (!currentUser) return null;
    return contestAttempts.find(a => 
      a.userId === currentUser.id && 
      a.contestId === contestId && 
      !a.isCompleted
    ) || null;
  };

  const createContest = (contestData: Omit<Contest, 'id' | 'createdBy'>): boolean => {
    if (!currentUser || currentUser.role !== 'admin') return false;
    
    const newContest: Contest = {
      ...contestData,
      id: Date.now().toString(),
      createdBy: currentUser.id,
      challenges: []
    };
    
    setContests(prev => [...prev, newContest]);
    return true;
  };

  const addChallengeToContest = (contestId: string, challengeData: Omit<Challenge, 'id' | 'contestId'>): boolean => {
    if (!currentUser || currentUser.role !== 'admin') return false;
    
    const newChallenge: Challenge = {
      ...challengeData,
      id: Date.now().toString(),
      contestId
    };
    
    setChallenges(prev => [...prev, newChallenge]);
    setContests(prev => prev.map(c => 
      c.id === contestId 
        ? { ...c, challenges: [...c.challenges, newChallenge] }
        : c
    ));
    return true;
  };

  const updateContest = (contestId: string, updates: Partial<Contest>): boolean => {
    if (!currentUser || currentUser.role !== 'admin') return false;
    
    setContests(prev => prev.map(c => 
      c.id === contestId ? { ...c, ...updates } : c
    ));
    return true;
  };

  const deleteContest = (contestId: string): boolean => {
    if (!currentUser || currentUser.role !== 'admin') return false;
    
    setContests(prev => prev.filter(c => c.id !== contestId));
    setChallenges(prev => prev.filter(c => c.contestId !== contestId));
    return true;
  };

  const getUserScore = (userId: string): number => {
    return users.find(u => u.id === userId)?.score || 0;
  };

  const getLeaderboard = (): User[] => {
    return [...users].sort((a, b) => b.score - a.score);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      challenges,
      contests,
      userProgress,
      contestAttempts,
      currentPage,
      login,
      register,
      logout,
      setCurrentPage,
      submitAnswer,
      getUserScore,
      getLeaderboard,
      startContest,
      submitContestAnswer,
      finishContest,
      getCurrentAttempt,
      createContest,
      addChallengeToContest,
      updateContest,
      deleteContest
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};