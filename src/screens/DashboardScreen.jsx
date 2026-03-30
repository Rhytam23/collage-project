import React from 'react';
import { C, font, fontBody } from '../constants/theme';
import { Avatar } from '../components/Avatar';
import { RankBadge } from '../components/RankBadge';
import { 
  Zap, CircleCheck, ArrowRight, Lock, Trophy, 
  Flame, Target, TrendingUp, ChevronRight, Brain 
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { profile, learningPath, leaderboard } = useAppContext();

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', minWidth: 0 }}>
      {/* PAGE HEADER / HERO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, maxWidth: 1080, margin: '0 auto' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
          {/* Learning Momentum */}
          <div style={{ background: C.surface, borderRadius: 20, padding: '24px 24px 20px', position: 'relative', overflow: 'hidden', border: `1px solid ${C.outlineV}` }}>
            {/* gradient accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: '20px 20px 0 0' }} />
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
              <Zap size={20} color={C.primary} style={{ opacity: 0.4 }} />
            </div>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>CURRENT FOCUS</div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: C.onSurface, fontFamily: font, margin: '0 0 18px', letterSpacing: '-0.02em' }}>Learning Momentum</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[
                { icon: <Flame size={13} />, label: 'DAILY STREAK', val: profile.streak, unit: 'D' },
                { icon: <Target size={13} />, label: 'CONCEPTS', val: '84', unit: '+' },
                { icon: <TrendingUp size={13} />, label: 'EFFICIENCY', val: '92', unit: '%' },
              ].map(s => (
                <div key={s.label} style={{ background: C.surfaceLow, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.outlineV}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                    <span style={{ color: C.primary }}>{s.icon}</span>
                    <span style={{ fontSize: 8, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <span style={{ fontSize: 26, fontWeight: 900, color: C.onSurface, fontFamily: font, lineHeight: 1 }}>{s.val}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.outline }}>{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cognitive Path */}
          <div style={{ background: C.surface, borderRadius: 20, padding: 22, border: `1px solid ${C.outlineV}`, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, background: `rgba(79,70,229,0.2)`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: C.primary, flexShrink: 0, fontFamily: font }}>Σ</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.02em' }}>Cognitive Path: Mathematics</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Neural Synthesis Stage {profile.level}</div>
                </div>
              </div>
              <button onClick={() => navigate('/path')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, fontWeight: 700, color: C.primary, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>VIEW ALL <ChevronRight size={12} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {learningPath.map(item => {
                const isActive = item.status === 'active';
                const isLocked = item.status === 'locked';
                return (
                  <div key={item.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: 14, gap: 10,
                    background: isActive ? `rgba(79,70,229,0.18)` : C.surfaceLow,
                    border: `1px solid ${isActive ? C.primaryC : C.outlineV}`,
                    opacity: isLocked ? 0.45 : 1,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: '14px 0 0 14px' }} />}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, paddingLeft: isActive ? 8 : 0 }}>
                      <div style={{ width: 32, height: 32, minWidth: 32, borderRadius: 8, background: isActive ? C.primaryC : C.surfaceHi, border: `1px solid ${isActive ? 'transparent' : C.outlineV}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: isActive ? '#fff' : C.outline, fontFamily: font }}>
                        {isLocked ? <Lock size={12} /> : item.icon || item.id}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: isActive ? C.onSurface : C.onSurfV, fontFamily: font, letterSpacing: '0.01em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                        <div style={{ fontSize: 8, fontWeight: 700, color: isActive ? C.primary : C.outline, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{item.sub}</div>
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      {item.status === 'done' ? <CircleCheck size={16} color={C.secondary} /> : item.status === 'active' ? <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 8, fontWeight: 900, color: C.secondary, letterSpacing: '0.1em', fontFamily: fontBody }}>BOOST ACTIVE</div>
                        <div style={{ fontSize: 8, color: C.outline, fontStyle: 'italic', fontFamily: fontBody }}>2.5× MULT</div>
                      </div> : <ArrowRight size={12} color={C.outline} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT – LEADERBOARD */}
        <div>
          <div style={{ background: C.surface, borderRadius: 20, padding: '20px 18px', border: `1px solid ${C.outlineV}`, height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, #FFD700, ${C.primaryC})`, borderRadius: '20px 20px 0 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trophy size={14} color="#FFD700" />
                <span style={{ fontSize: 14, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.01em' }}>Leaderboard</span>
              </div>
              <span style={{ fontSize: 8, fontWeight: 800, background: C.surfaceLow2, color: C.outline, padding: '3px 7px', borderRadius: 6, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: fontBody }}>GLOBAL</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {leaderboard.map(u => (
                <div key={u.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: C.surfaceLow, borderRadius: 12, border: `1px solid ${C.outlineV}`, gap: 8, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2.5, background: u.border, borderRadius: '12px 0 0 12px' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, paddingLeft: 6 }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <Avatar seed={u.seed} size={32} border={u.border} />
                      <RankBadge rank={u.rank} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: C.onSurface, fontFamily: font, letterSpacing: '0.02em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</div>
                      <div style={{ fontSize: 8, color: C.outline, fontFamily: fontBody, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 1 }}>{u.role}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900, color: C.primary, fontFamily: font, fontStyle: 'italic', flexShrink: 0 }}>{u.xp}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.outlineV}`, paddingTop: 12, marginTop: 4 }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: C.outline, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>YOUR STANDING</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: `rgba(79,70,229,0.12)`, borderRadius: 12, border: `1px solid ${C.primaryC}`, gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <div style={{ position: 'relative' }}>
                      <Avatar seed="Felix" size={32} border={C.primaryC} />
                      <span style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: C.primaryC, border: `2px solid ${C.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 900, color: '#fff', fontFamily: font }}>{profile.standing}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: C.onSurface, fontFamily: font, textTransform: 'uppercase' }}>{profile.name}</div>
                      <div style={{ fontSize: 8, color: C.primary, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase' }}>TOP {Math.round(profile.standing / 1.5)}%</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900, color: C.onSurface, fontFamily: font, fontStyle: 'italic' }}>{(profile.xp / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>
            <button style={{ marginTop: 14, padding: '11px', background: C.surfaceLow2, borderRadius: 10, border: `1px solid ${C.outlineV}`, color: C.outline, cursor: 'pointer', fontSize: 9, fontWeight: 800, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase' }}>ENTER TOURNAMENT HUB</button>
          </div>
        </div>
      </div>

      {/* INITIALIZE BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 8px', maxWidth: 1080, margin: '0 auto' }}>
        <button 
          onClick={() => navigate('/arena')}
          style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 40px', color: '#fff', borderRadius: 16, border: 'none',
          background: `linear-gradient(135deg, ${C.primaryC} 0%, ${C.secondaryC} 100%)`,
          cursor: 'pointer', boxShadow: `0 8px 32px rgba(79,70,229,0.4)`,
          fontSize: 13, fontWeight: 900, fontFamily: font, letterSpacing: '0.02em', textTransform: 'uppercase',
        }}>
          <Brain size={18} color="#fff" />
          INITIALIZE TEST ARENA
          <ArrowRight size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;
