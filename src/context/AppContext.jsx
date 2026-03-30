import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'levelupai_state_v1';
const AUTH_KEY = 'neural_auth';
const XP_THRESHOLD = parseInt(import.meta.env.VITE_XP_THRESHOLD, 10) || 1000;

const initialState = {
  profile: {
    name: 'Felix',
    seed: 'Felix',
    level: 5,
    xp: 4240,
    streak: 14,
    standing: 42,
    dailyGoal: 20,
    lastLevelUp: null,
  },
  settings: {
    notifications: true,
    darkMode: true,
    sound: true,
    aiDifficulty: true,
    analyticsSharing: false,
    difficulty: 'medium',
    pomodoro: true,
  },
  knowledgeBase: [
    { id: 'kb1', title: 'Multivariate Calculus Essentials', category: 'Mathematics', type: 'Video', status: 'completed', progress: 100, duration: '12:45', favorite: true, lastStudied: '2 hours ago' },
    { id: 'kb2', title: 'Gradient Descent Visualized', category: 'ML', type: 'Interactive', status: 'in-progress', progress: 65, duration: '18:10', favorite: true, lastStudied: 'Yesterday' },
    { id: 'kb3', title: 'Linear Algebra for ML', category: 'Neural Networks', type: 'PDF', status: 'new', progress: 0, size: '2.4MB', favorite: false, lastStudied: '3 days ago' },
    { id: 'kb4', title: 'Bayesian Thinking Primer', category: 'Statistics', type: 'Guide', status: 'completed', progress: 100, duration: '09:30', favorite: false, lastStudied: '4 days ago' },
    { id: 'kb5', title: 'Quantum Probability Map', category: 'Quantum Theory', type: 'Notebook', status: 'in-progress', progress: 42, duration: '22:00', favorite: true, lastStudied: '5 hours ago' },
    { id: 'kb6', title: 'Python for Cognitive Simulations', category: 'Python', type: 'Code Lab', status: 'new', progress: 0, duration: '14:20', favorite: false, lastStudied: 'New' },
  ],
  recommendations: [
    { id: 'r1', title: 'Backpropagation', match: 96, desc: 'Based on your Neural Network progress', category: 'Neural Networks' },
    { id: 'r2', title: 'Stochastic Calculus', match: 91, desc: 'Bridges your Calculus + Probability gaps', category: 'Mathematics' },
    { id: 'r3', title: 'Markov State Models', match: 88, desc: 'High-value path unlock for your current streak', category: 'Statistics' },
  ],
  neuralLinks: {
    connections: [
      { id: 'p1', name: 'Neural_Entity_01', role: 'Architect', status: 'online', seed: 'entity01', xp: '24.8K', topic: 'Architecture', connected: true },
      { id: 'p2', name: 'QuantumLeap', role: 'Pulse', status: 'online', seed: 'quantum', xp: '21.2K', topic: 'Quantum', connected: true },
      { id: 'p3', name: 'Lyra_Node', role: 'Scribe', status: 'online', seed: 'conn01', xp: '8.2K', topic: 'Calculus', connected: true },
    ],
    suggested: [
      { id: 's1', name: 'Bio_System', role: 'Weaver', seed: 'biosys', match: 98, xp: '18.5K', skills: ['Biology', 'Logic'] },
      { id: 's2', name: 'Data_Ghost', role: 'Scribe', seed: 'ghost', match: 94, xp: '15.2K', skills: ['Python', 'SQL'] },
      { id: 's3', name: 'Logic_Gate', role: 'Guard', seed: 'logic', match: 89, xp: '12.8K', skills: ['Security', 'C++'] },
      { id: 's4', name: 'VortexAI', role: 'Pulse', seed: 'sug02', match: 94, xp: '10.1K', skills: ['Linear Algebra', 'Stats'] },
    ],
    requests: [
      { id: 'rq1', seed: 'req01', name: 'Astra_Coder', topic: 'Quantum Computing', msg: 'Hey! I saw your streak on Calculus. Want to co-study Quantum Probability together?' },
      { id: 'rq2', seed: 'req02', name: 'DataPulse_X', topic: 'Machine Learning', msg: 'Your ML path is impressive. I can share my Neural Net notes if you help me with Backprop.' },
    ],
  },
  learningPath: [
    { id: '01', title: 'Advanced Calculus Optimization', sub: 'Completed 4 hours ago · +450 XP', status: 'done', icon: 'Σ', progress: 100, xp: 450, time: '2 weeks' },
    { id: '02', title: 'Neural Network Weight Functions', sub: 'CURRENT OBJECTIVE', status: 'active', icon: 'Ψ', progress: 67, xp: 600, time: '3 days left' },
    { id: '03', title: 'Quantum Probability Theory', sub: 'Locked: Requires Level 6', status: 'locked', icon: 'Φ', progress: 0, xp: 750, time: 'Locked' },
    { id: '04', title: 'Optimization Landscapes', sub: 'Queued after Stage 3 unlock', status: 'queued', icon: 'Δ', progress: 0, xp: 840, time: 'Queued' },
  ],
  leaderboard: [
    { rank: 1, seed: 'entity01', name: 'Neural_Entity_01', role: 'Architect', xp: '24.8K', border: '#FFD700' },
    { rank: 2, seed: 'quantum', name: 'QuantumLeap', role: 'Pulse', xp: '21.2K', border: '#C0C0C0' },
    { rank: 3, seed: 'biosys', name: 'Bio_System', role: 'Weaver', xp: '18.5K', border: '#CD7F32' },
  ],
  quiz: {
    currentDifficulty: 'medium',
    bestScore: 0,
    lastScore: 0,
    sessionsCompleted: 3,
    streak: 0,
  },
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialState;
  } catch {
    return initialState;
  }
}

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const updateProfile = (patch) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  };

  const updateSettings = (patch) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  };

  const addXP = (amount) => {
    setState(prev => {
      const newXP = prev.profile.xp + amount;
      const computedLevel = Math.floor(newXP / XP_THRESHOLD) + 1;
      const newLevel = Math.max(prev.profile.level, computedLevel);
      const levelUp = newLevel > prev.profile.level;
      const newStanding = Math.max(1, prev.profile.standing - Math.max(1, Math.floor(amount / 250)));

      return {
        ...prev,
        profile: {
          ...prev.profile,
          xp: newXP,
          level: newLevel,
          standing: newStanding,
          lastLevelUp: levelUp ? Date.now() : prev.profile.lastLevelUp,
        },
      };
    });
  };

  const connectPeer = (peerId) => {
    setState(prev => {
      const peer = prev.neuralLinks.suggested.find(p => p.id === peerId);
      if (!peer) return prev;

      return {
        ...prev,
        neuralLinks: {
          ...prev.neuralLinks,
          connections: [...prev.neuralLinks.connections, { ...peer, topic: peer.skills[0], connected: true, status: 'online' }],
          suggested: prev.neuralLinks.suggested.filter(p => p.id !== peerId),
        },
      };
    });
  };

  const handleRequest = (requestId, action) => {
    setState(prev => {
      const request = prev.neuralLinks.requests.find(r => r.id === requestId);
      const remaining = prev.neuralLinks.requests.filter(r => r.id !== requestId);
      const nextConnections = action === 'accept' && request
        ? [...prev.neuralLinks.connections, { ...request, connected: true, status: 'online', xp: '9.4K', role: 'Collaborator', seed: request.seed }]
        : prev.neuralLinks.connections;

      return {
        ...prev,
        neuralLinks: {
          ...prev.neuralLinks,
          requests: remaining,
          connections: nextConnections,
        },
      };
    });
  };

  const completePathNode = (nodeId) => {
    setState(prev => ({
      ...prev,
      learningPath: prev.learningPath.map((node, index) => {
        if (node.id === nodeId) {
          return { ...node, status: 'done', progress: 100, sub: 'Completed just now' };
        }

        if (prev.learningPath[index - 1]?.id === nodeId && node.status === 'queued') {
          return { ...node, status: 'active', sub: 'CURRENT OBJECTIVE', progress: 12 };
        }

        if (node.status === 'locked' && prev.profile.level >= 6) {
          return { ...node, status: 'active', sub: 'UNLOCKED · READY', progress: 8 };
        }

        return node;
      }),
    }));
  };

  const updateKnowledgeProgress = (itemId, progress) => {
    setState(prev => ({
      ...prev,
      knowledgeBase: prev.knowledgeBase.map(item =>
        item.id === itemId
          ? {
              ...item,
              progress,
              status: progress >= 100 ? 'completed' : 'in-progress',
              lastStudied: 'Just now',
            }
          : item,
      ),
    }));
  };

  const toggleFavoriteConcept = (itemId) => {
    setState(prev => ({
      ...prev,
      knowledgeBase: prev.knowledgeBase.map(item =>
        item.id === itemId ? { ...item, favorite: !item.favorite } : item,
      ),
    }));
  };

  const addRecommendationToPath = (recommendationId) => {
    setState(prev => {
      const rec = prev.recommendations.find(item => item.id === recommendationId);
      if (!rec) return prev;

      const exists = prev.learningPath.some(node => node.title === rec.title);
      if (exists) return prev;

      return {
        ...prev,
        learningPath: [
          ...prev.learningPath,
          {
            id: String(prev.learningPath.length + 1).padStart(2, '0'),
            title: rec.title,
            sub: 'Added from AI recommendation',
            status: 'queued',
            icon: 'Ω',
            progress: 0,
            xp: 520,
            time: 'Queued',
          },
        ],
      };
    });
  };

  const recordQuizSession = ({ score, total, difficulty, xpEarned }) => {
    setState(prev => ({
      ...prev,
      quiz: {
        currentDifficulty: difficulty,
        bestScore: Math.max(prev.quiz.bestScore, score),
        lastScore: score,
        sessionsCompleted: prev.quiz.sessionsCompleted + 1,
        streak: score === total ? prev.quiz.streak + 1 : 0,
      },
    }));
    addXP(xpEarned);
  };

  const resetProgress = () => {
    setState(prev => ({
      ...initialState,
      settings: prev.settings,
      profile: { ...initialState.profile, name: prev.profile.name, seed: prev.profile.seed },
    }));
  };

  const value = useMemo(() => ({
    isAuthenticated,
    login,
    logout,
    profile: state.profile,
    settings: state.settings,
    knowledgeBase: state.knowledgeBase,
    recommendations: state.recommendations,
    neuralLinks: state.neuralLinks,
    learningPath: state.learningPath,
    leaderboard: state.leaderboard,
    quiz: state.quiz,
    updateProfile,
    updateSettings,
    addXP,
    connectPeer,
    handleRequest,
    completePathNode,
    updateKnowledgeProgress,
    toggleFavoriteConcept,
    addRecommendationToPath,
    recordQuizSession,
    resetProgress,
  }), [isAuthenticated, state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
