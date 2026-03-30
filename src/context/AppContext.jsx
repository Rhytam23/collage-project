import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('neural_auth') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('neural_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('neural_auth');
  };

  // User profile & progression
  const [profile, setProfile] = useState({
    name: 'Felix',
    level: 5,
    xp: 1240,
    streak: 14,
    standing: 42,
  });

  // Settings
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    difficulty: 'medium',
  });

  // Global datasets
  const [knowledgeBase, setKnowledgeBase] = useState([
    { id: 'kb1', title: 'Multivariate Calculus Essentials', type: 'Video', status: 'completed', duration: '12:45' },
    { id: 'kb2', title: 'Gradient Descent Visualized', type: 'Interactive', status: 'in-progress', progress: 65 },
    { id: 'kb3', title: 'Linear Algebra for ML', type: 'PDF', status: 'new', size: '2.4MB' },
  ]);

  const [neuralLinks, setNeuralLinks] = useState({
    connections: [
      { id: 'p1', name: 'Neural_Entity_01', role: 'Architect', status: 'online', seed: 'entity01', xp: '24.8K', topic: 'Architecture' },
      { id: 'p2', name: 'QuantumLeap', role: 'Pulse', status: 'online', seed: 'quantum', xp: '21.2K', topic: 'Quantum' },
      { id: 'p3', name: 'Lyra_Node', role: 'Scribe', status: 'online', seed: 'conn01', xp: '8.2K', topic: 'Calculus' },
    ],
    suggested: [
      { id: 's1', name: 'Bio_System', role: 'Weaver', seed: 'biosys', match: '98%', xp: '18.5K', skills: ['Biology', 'Logic'] },
      { id: 's2', name: 'Data_Ghost', role: 'Scribe', seed: 'ghost', match: '94%', xp: '15.2K', skills: ['Python', 'SQL'] },
      { id: 's3', name: 'Logic_Gate', role: 'Guard', seed: 'logic', match: '89%', xp: '12.8K', skills: ['Security', 'C++'] },
      { id: 's4', name: 'VortexAI', role: 'Pulse', seed: 'sug02', match: '94%', xp: '10.1K', skills: ['Linear Algebra', 'Stats'] },
    ]
  });

  const [learningPath, setLearningPath] = useState([
    { id: '01', title: 'Advanced Calculus Optimization', sub: 'Completed 4 hours ago · +450 XP', status: 'done', icon: 'Σ' },
    { id: '02', title: 'Neural Network Weight Functions', sub: 'CURRENT OBJECTIVE', status: 'active', icon: 'Ψ' },
    { id: '03', title: 'Quantum Probability Theory', sub: 'Locked: Requires Level 6', status: 'locked', icon: 'Φ' },
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, seed: 'entity01', name: 'Neural_Entity_01', role: 'Architect', xp: '24.8K', border: '#FFD700' },
    { rank: 2, seed: 'quantum',  name: 'QuantumLeap',      role: 'Pulse',     xp: '21.2K', border: '#C0C0C0' },
    { rank: 3, seed: 'biosys',   name: 'Bio_System',       role: 'Weaver',    xp: '18.5K', border: '#CD7F32' },
  ]);

  // Constants from environment
  const XP_THRESHOLD = parseInt(import.meta.env.VITE_XP_THRESHOLD) || 1000;

  // Actions
  const addXP = (amount) => {
    setProfile(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_THRESHOLD) + 1;
      const levelUp = newLevel > prev.level;
      
      // Update standing based on new XP (simplistic simulation)
      const newStanding = Math.max(1, prev.standing - Math.floor(amount / 200));

      return { 
        ...prev, 
        xp: newXP, 
        level: Math.max(prev.level, newLevel), 
        standing: newStanding,
        lastLevelUp: levelUp ? Date.now() : prev.lastLevelUp 
      };
    });
  };

  const connectPeer = (peerId) => {
    const peer = neuralLinks.suggested.find(p => p.id === peerId);
    if (peer) {
      setNeuralLinks(prev => ({
        connections: [...prev.connections, { ...peer, status: 'online' }],
        suggested: prev.suggested.filter(p => p.id !== peerId)
      }));
    }
  };

  const completePathNode = (nodeId) => {
    setLearningPath(prev => prev.map(node => 
      node.id === nodeId ? { ...node, status: 'done', sub: 'Completed Just Now' } : node
    ));
  };

  const value = {
    isAuthenticated, login, logout,
    profile, setProfile,
    settings, setSettings,
    knowledgeBase, setKnowledgeBase,
    neuralLinks, connectPeer,
    learningPath, completePathNode,
    leaderboard,
    addXP,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
