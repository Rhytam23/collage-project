import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C, font, fontBody } from '../constants/theme';
import { Fingerprint, Cpu, Shield, Activity, ArrowRight, Zap, Mail, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LoginScreen = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState('idle'); // idle, validating, scanning, success

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setStage('validating');
    
    // Stage 1: Credential Validation
    setTimeout(() => {
      setStage('scanning');
      
      // Stage 2: Biometric Finalization
      setTimeout(() => {
        setStage('success');
        setTimeout(() => {
          login();
        }, 1200);
      }, 2000);
    }, 1500);
  };

  const isLocked = stage !== 'idle';

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: `radial-gradient(circle at center, ${C.surfaceLow} 0%, ${C.bg} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', position: 'relative', fontFamily: font
    }}>
      {/* Background Ambience */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: C.primary, opacity: 0.12, filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: C.secondary, opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: 440, background: 'rgba(10,10,25,0.7)', backdropFilter: 'blur(48px)',
          borderRadius: 40, border: `1px solid ${C.outlineV}`, padding: '48px 40px',
          boxShadow: `0 24px 80px rgba(0,0,0,0.5)`,
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.primaryC}, transparent)` }} />
        
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div
            animate={stage === 'scanning' ? { scale: [1, 1.1, 1], opacity: [1, 0.5, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ marginBottom: 24, display: 'inline-block' }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: 24,
              background: `rgba(79,70,229,0.1)`, border: `2px solid ${stage === 'scanning' ? C.secondaryC : C.primaryC}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 40px ${stage === 'scanning' ? 'rgba(170,2,102,0.3)' : 'rgba(79,70,229,0.3)'}`,
              transition: 'all 0.4s ease'
            }}>
              {stage === 'scanning' ? <Activity size={36} color={C.secondaryC} /> : <Cpu size={36} color={C.primaryC} />}
            </div>
          </motion.div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>NEURAL SECT</h1>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Access Cognitive Grid Node 01</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 10, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.1em' }}>NEURAL ID (EMAIL)</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color={C.outline} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input
                type="email"
                placeholder="architect@levelupai.dev"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLocked}
                style={{
                  width: '100%', padding: '16px 16px 16px 44px', borderRadius: 16,
                  background: C.surfaceLow, border: `1px solid ${C.outlineV}`,
                  color: '#fff', fontSize: 13, fontFamily: fontBody, outline: 'none',
                  transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: 10, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.1em' }}>SECURITY KEY</label>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.outline, fontFamily: fontBody, cursor: 'pointer' }}>FORGOT KEY?</span>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color={C.outline} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLocked}
                style={{
                  width: '100%', padding: '16px 16px 16px 44px', borderRadius: 16,
                  background: C.surfaceLow, border: `1px solid ${C.outlineV}`,
                  color: '#fff', fontSize: 13, fontFamily: fontBody, outline: 'none',
                  transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <button
              type="submit"
              disabled={isLocked || !email || !password}
              style={{
                width: '100%', padding: '18px', borderRadius: 20, border: 'none',
                background: isLocked ? C.surfaceLow : `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`,
                color: '#fff', fontSize: 13, fontWeight: 900, cursor: isLocked ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                boxShadow: isLocked ? 'none' : `0 8px 32px rgba(79,70,229,0.4)`,
                transition: 'all 0.3s ease', opacity: isLocked ? 0.8 : 1
              }}
            >
              {stage === 'idle' && <>ESTABLISH NEURAL LINK <ArrowRight size={18} /></>}
              {stage === 'validating' && <>VALIDATING CREDENTIALS...</>}
              {stage === 'scanning' && <>SYNCHRONIZING BRAINWAVES...</>}
              {stage === 'success' && <>ACCESS GRANTED</>}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ fontSize: 11, color: C.outline, fontFamily: fontBody }}>
            NOT PART OF THE SECT? <span style={{ color: C.secondary, fontWeight: 800, cursor: 'pointer' }}>JOIN NEURAL PATH</span>
          </p>
        </div>

        <AnimatePresence>
          {stage !== 'idle' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.outlineV}` }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {[
                  { icon: Shield, text: 'QUANTUM ENCRYPTED', color: stage === 'success' ? '#22c55e' : C.outline },
                  { icon: Zap, text: 'SECURE CORE', color: stage === 'success' ? '#22c55e' : C.outline },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 8, fontWeight: 800, color: item.color, transition: 'color 0.4s' }}>
                    <item.icon size={10} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: `radial-gradient(${C.outline} 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
    </div>
  );
};

export default LoginScreen;
