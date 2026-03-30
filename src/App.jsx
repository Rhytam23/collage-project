import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import TopNav from './components/TopNav.jsx';
import { C, font, fontBody } from './constants/theme.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from './context/AppContext';
import { Cpu } from 'lucide-react';

// Screens
import DashboardScreen from './screens/DashboardScreen.jsx';
import KnowledgeBaseScreen from './screens/KnowledgeBaseScreen.jsx';
import NeuralLinksScreen from './screens/NeuralLinksScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import CognitivePathScreen from './screens/CognitivePathScreen.jsx';
import QuizArenaScreen from './screens/QuizArenaScreen.jsx';

// Status Bar
const StatusBar = () => (
  <footer style={{ height: 32, background: C.surfaceLow2, borderTop: `1px solid ${C.outlineV}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.secondary, boxShadow: `0 0 6px ${C.secondary}` }} />
        <span style={{ fontSize: 8, fontWeight: 800, color: C.secondary, fontFamily: font, letterSpacing: '0.2em', textTransform: 'uppercase' }}>NEURAL LINK ONLINE</span>
      </div>
      {[['STATUS','OPTIMAL'],['ENCRYPTION','ACTIVE'],['LATENCY','12MS']].map(([k,v]) => (
        <span key={k} style={{ fontSize: 8, fontWeight: 700, color: C.outlineV, fontFamily: font, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}: <span style={{ color: C.outline }}>{v}</span></span>
      ))}
    </div>
    <span style={{ fontSize: 8, fontWeight: 700, color: C.outlineV, fontFamily: font, letterSpacing: '0.2em', textTransform: 'uppercase' }}>© 2026 NEURAL SECT</span>
  </footer>
);

const LevelUpOverlay = ({ level, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.5, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      style={{ 
        textAlign: 'center', background: C.surface, padding: '64px', borderRadius: '48px', 
        border: `2px solid ${C.primaryC}`, boxShadow: `0 0 120px rgba(79,70,229,0.5)`,
        position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})` }} />
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
        <Cpu size={84} color={C.primaryC} style={{ marginBottom: 32, filter: 'drop-shadow(0 0 15px rgba(79,70,229,0.6))' }} />
      </motion.div>
      <h2 style={{ fontSize: 42, fontWeight: 900, color: '#fff', fontFamily: font, margin: '0 0 12px', letterSpacing: '-0.02em' }}>NEURAL EVOLUTION</h2>
      <p style={{ fontSize: 16, color: C.primary, fontWeight: 800, fontFamily: fontBody, letterSpacing: '0.25em', margin: '0 0 40px', textTransform: 'uppercase' }}>CAPACITY EXPANDED TO L.{level}</p>
      
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 40 }}>
        {[
          { label: 'COGNITIVE RANGE', val: '+12%' },
          { label: 'PROCESSING', val: '+0.8 GHZ' },
          { label: 'SYNAPTIC LINK', val: 'ACTIVE' },
        ].map(b => (
          <div key={b.label} style={{ background: C.surfaceLow, padding: '12px 20px', borderRadius: 16, border: `1px solid ${C.outlineV}` }}>
            <div style={{ fontSize: 8, color: C.outline, fontWeight: 800, marginBottom: 4 }}>{b.label}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: C.onSurface }}>{b.val}</div>
          </div>
        ))}
      </div>

      <button 
        style={{ 
          padding: '18px 56px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, 
          color: '#fff', border: 'none', borderRadius: 20, fontWeight: 900, 
          fontSize: 14, cursor: 'pointer', fontFamily: font, letterSpacing: '0.1em',
          boxShadow: `0 8px 32px rgba(79,70,229,0.4)`
        }}
      >
        ACKNOWLEDGE UPGRADE
      </button>
    </motion.div>
  </motion.div>
);

import LoginScreen from './screens/LoginScreen.jsx';

export default function App() {
  const { isAuthenticated, profile } = useAppContext();
  const [showLevelUp, setShowLevelUp] = React.useState(false);
  const [lastSeenLevel, setLastSeenLevel] = React.useState(profile.level);

  React.useEffect(() => {
    if (profile.level > lastSeenLevel) {
      setShowLevelUp(true);
      setLastSeenLevel(profile.level);
    }
  }, [profile.level, lastSeenLevel]);

  return (
    <Router>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=Manrope:wght@400;500;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.bg}; color: ${C.onSurface}; font-family: 'Space Grotesk', sans-serif; }
        ::-webkit-scrollbar { width: 4px; background: ${C.surfaceLow2}; }
        ::-webkit-scrollbar-thumb { background: ${C.outlineV}; border-radius: 4px; }
        button:hover { filter: brightness(1.12); }
        a { text-decoration: none; color: inherit; }
      `}</style>
      
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', background: C.bg, overflow: 'hidden', fontFamily: font }}>
          <Sidebar />
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
            <TopNav />
            
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <AnimatePresence>
                {showLevelUp && (
                  <LevelUpOverlay 
                    level={profile.level} 
                    onClose={() => setShowLevelUp(false)} 
                  />
                )}
              </AnimatePresence>

              <Routes>
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/path" element={<CognitivePathScreen />} />
                <Route path="/links" element={<NeuralLinksScreen />} />
                <Route path="/kb" element={<KnowledgeBaseScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/arena" element={<QuizArenaScreen />} />
                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
            
            <StatusBar />
          </div>
        </div>
      )}
    </Router>
  );
}
