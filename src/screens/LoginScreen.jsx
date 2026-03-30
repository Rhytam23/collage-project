import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C, font, fontBody } from '../constants/theme';
import { Fingerprint, Cpu, Shield, Activity, ArrowRight, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LoginScreen = () => {
  const { login } = useAppContext();
  const [isScanning, setIsScanning] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleLogin = () => {
    setIsScanning(true);
    // Simulate biometric scan
    setTimeout(() => {
      setShowStatus(true);
      setTimeout(() => {
        login();
      }, 1200);
    }, 1800);
  };

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: 480, background: 'rgba(10,10,25,0.7)', backdropFilter: 'blur(32px)',
          borderRadius: 40, border: `1px solid ${C.outlineV}`, padding: '64px 48px',
          textAlign: 'center', boxShadow: `0 24px 80px rgba(0,0,0,0.5)`,
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.primaryC}, transparent)` }} />
        
        <motion.div
          animate={isScanning ? { scale: [1, 1.1, 1], opacity: [1, 0.5, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ marginBottom: 40, display: 'inline-block', position: 'relative' }}
        >
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: `rgba(79,70,229,0.1)`, border: `2px solid ${isScanning ? C.secondaryC : C.primaryC}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 40px ${isScanning ? 'rgba(170,2,102,0.3)' : 'rgba(79,70,229,0.3)'}`,
            transition: 'all 0.4s ease'
          }}>
            {isScanning ? <Activity size={48} color={C.secondaryC} /> : <Fingerprint size={48} color={C.primaryC} />}
          </div>
          {isScanning && (
            <motion.div
              style={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, borderRadius: '50%', border: `1px solid ${C.secondaryC}` }}
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
        </motion.div>

        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>NEURAL SECT</h1>
        <p style={{ fontSize: 11, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 48 }}>Identity Authentication Required</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button
            onClick={handleLogin}
            disabled={isScanning}
            style={{
              width: '100%', padding: '18px', borderRadius: 20, border: 'none',
              background: isScanning ? C.surfaceLow : `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`,
              color: '#fff', fontSize: 13, fontWeight: 900, cursor: isScanning ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              boxShadow: isScanning ? 'none' : `0 8px 32px rgba(79,70,229,0.4)`,
              transition: 'all 0.3s ease', opacity: isScanning ? 0.8 : 1
            }}
          >
            {isScanning ? 'SCANNING BIOMETRICS...' : 'ACCESS COGNITIVE GRID'}
            {!isScanning && <ArrowRight size={18} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 12 }}>
            {[Shield, Cpu, Zap].map((Icon, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.outline, fontSize: 9, fontWeight: 800, fontFamily: fontBody }}>
                <Icon size={12} style={{ opacity: 0.6 }} />
                <span>SECURED</span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showStatus && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.outlineV}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#22c55e', fontSize: 12, fontWeight: 800, justifyContent: 'center' }}>
                <Shield size={14} />
                NEURAL SIGNATURE VERIFIED
              </div>
              <div style={{ fontSize: 9, color: C.outline, fontFamily: fontBody, marginTop: 4 }}>Redirecting to Node 01...</div>
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
