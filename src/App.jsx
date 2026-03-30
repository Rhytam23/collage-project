import React, { useState } from 'react';
import { 
  LayoutDashboard, Share2, Database, Settings, Zap, 
  CircleCheck, Bell, ArrowRight, Cpu, Brain, Trophy,
  Flame, Target, TrendingUp, Lock, Play, Star, ChevronRight
} from 'lucide-react';

// ── DESIGN TOKENS (Indigo Nebula by Stitch) ──
const C = {
  bg:        '#111318',
  surface:   '#1e1f25',
  surfaceHi: '#282a2f',
  surfaceHiH:'#33353a',
  surfaceLow:'#1a1b21',
  surfaceLow2:'#0c0e13',
  primary:   '#c3c0ff',
  primaryC:  '#4f46e5',
  secondary: '#ffb0cd',
  secondaryC:'#aa0266',
  onSurface: '#e2e2e9',
  onSurfV:   '#c7c4d8',
  outline:   '#918fa1',
  outlineV:  '#464555',
};

const font = `'Space Grotesk', 'Manrope', system-ui, sans-serif`;
const fontBody = `'Manrope', system-ui, sans-serif`;

// ── AVATAR ──
const Avatar = ({ seed, size = 36, border = C.primaryC }) => (
  <div style={{
    width: size, height: size, minWidth: size, minHeight: size,
    borderRadius: 10, border: `2px solid ${border}`,
    backgroundImage: `url(https://api.dicebear.com/7.x/bottts/svg?seed=${seed})`,
    backgroundSize: 'cover', backgroundPosition: 'center',
    backgroundColor: C.surfaceHi, flexShrink: 0,
  }} />
);

// ── RANK BADGE ──
const RankBadge = ({ rank }) => {
  const colors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
  return (
    <span style={{
      position: 'absolute', bottom: -4, right: -4,
      width: 16, height: 16, borderRadius: '50%',
      background: colors[rank] || C.primaryC,
      border: '2px solid ' + C.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 7, fontWeight: 900, color: rank <= 2 ? '#000' : '#fff',
      fontFamily: font,
    }}>{rank}</span>
  );
};

// ── SIDEBAR ──
const Sidebar = ({ active, setActive }) => {
  const items = [
    { id: 'dashboard', icon: <LayoutDashboard size={16}/>, label: 'OVERVIEW' },
    { id: 'links',    icon: <Share2 size={16}/>,          label: 'NEURAL LINKS' },
    { id: 'kb',       icon: <Database size={16}/>,        label: 'KNOWLEDGE BASE' },
    { id: 'settings', icon: <Settings size={16}/>,        label: 'SETTINGS' },
  ];
  return (
    <aside style={{
      width: 220, minWidth: 220, background: C.surfaceLow,
      display: 'flex', flexDirection: 'column', padding: '24px 14px',
      borderRight: `1px solid ${C.outlineV}`, zIndex: 10, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px', marginBottom: 32 }}>
        <div style={{
          width: 34, height: 34, background: C.primaryC, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 0 20px rgba(79,70,229,0.5)',
        }}><Cpu size={18} color="#fff" /></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Neural</div>
          <div style={{ fontSize: 9, color: C.outline, fontWeight: 700, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>Rank: Elite</div>
        </div>
      </div>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: isActive ? `rgba(79,70,229,0.15)` : 'transparent',
              color: isActive ? C.primary : C.outline,
              borderRight: isActive ? `3px solid ${C.primaryC}` : '3px solid transparent',
              fontSize: 10, fontWeight: 700, fontFamily: fontBody, letterSpacing: '0.12em',
              textTransform: 'uppercase', transition: 'all 0.15s', textAlign: 'left', width: '100%',
            }}>
              {item.icon}
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div style={{ padding: '14px', background: C.surfaceLow2, borderRadius: 12, border: `1px solid ${C.outlineV}` }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.outline, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>SYSTEM LOAD</div>
        <div style={{ height: 3, background: C.surfaceHiH, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '34%', height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: 999 }} />
        </div>
        <div style={{ fontSize: 8, color: C.outline, fontFamily: fontBody, marginTop: 6, letterSpacing: '0.1em' }}>34% · OPTIMAL</div>
      </div>
    </aside>
  );
};

// ── TOP NAV ──
const TopNav = () => (
  <header style={{
    height: 64, background: C.surfaceLow, borderBottom: `1px solid ${C.outlineV}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 28px', flexShrink: 0, zIndex: 5,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      <h1 style={{ fontSize: 18, fontWeight: 900, color: C.primary, fontFamily: font, letterSpacing: '-0.04em', margin: 0 }}>Level Up AI</h1>
      <nav style={{ display: 'flex', gap: 20 }}>
        {['Dashboard', 'Cognitive Path', 'Leaderboard', 'Arena'].map((tab, i) => (
          <button key={tab} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontBody,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: i === 0 ? C.onSurface : C.outline,
            borderBottom: i === 0 ? `2px solid ${C.primaryC}` : '2px solid transparent',
            padding: '22px 0', transition: 'color 0.15s',
          }}>{tab}</button>
        ))}
      </nav>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.secondary, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>LEVEL 5</div>
        <div style={{ width: 96, height: 3, background: C.surfaceHiH, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '75%', height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: 999, boxShadow: '0 0 8px rgba(236,72,153,0.6)' }} />
        </div>
      </div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.outline }}><Settings size={16}/></button>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.outline }}><Bell size={16}/></button>
      <Avatar seed="Felix" size={32} />
    </div>
  </header>
);

// ── DASHBOARD SCREEN ──
const DashboardScreen = () => {
  const pathItems = [
    { id: '01', title: 'Advanced Calculus Optimization', sub: 'Completed 4 hours ago · +450 XP', status: 'done' },
    { id: '02', title: 'Neural Network Weight Functions', sub: 'CURRENT OBJECTIVE', status: 'active' },
    { id: '03', title: 'Quantum Probability Theory', sub: 'Locked: Requires Level 6', status: 'locked' },
  ];
  const leaderboard = [
    { rank: 1, seed: 'entity01', name: 'Neural_Entity_01', role: 'Architect', xp: '24.8K', border: '#FFD700' },
    { rank: 2, seed: 'quantum',  name: 'QuantumLeap',      role: 'Pulse',     xp: '21.2K', border: '#C0C0C0' },
    { rank: 3, seed: 'biosys',   name: 'Bio_System',       role: 'Weaver',    xp: '18.5K', border: '#CD7F32' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', minWidth: 0 }}>
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
                { icon: <Flame size={13}/>, label: 'DAILY STREAK', val: '14', unit: 'D' },
                { icon: <Target size={13}/>, label: 'CONCEPTS', val: '84', unit: '+' },
                { icon: <TrendingUp size={13}/>, label: 'EFFICIENCY', val: '92', unit: '%' },
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
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Neural Synthesis Stage 4</div>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, fontWeight: 700, color: C.primary, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                VIEW ALL <ChevronRight size={12}/>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pathItems.map(item => {
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
                        {isLocked ? <Lock size={12}/> : item.id}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: isActive ? C.onSurface : C.onSurfV, fontFamily: font, letterSpacing: '0.01em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                        <div style={{ fontSize: 8, fontWeight: 700, color: isActive ? C.primary : C.outline, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{item.sub}</div>
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      {item.status === 'done' ? <CircleCheck size={16} color={C.secondary}/> : item.status === 'active' ? <div style={{ textAlign: 'right' }}><div style={{ fontSize: 8, fontWeight: 900, color: C.secondary, letterSpacing: '0.1em', fontFamily: fontBody }}>BOOST ACTIVE</div><div style={{ fontSize: 8, color: C.outline, fontStyle: 'italic', fontFamily: fontBody }}>2.5× MULT</div></div> : <ArrowRight size={12} color={C.outline}/>}
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
                      <span style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: C.primaryC, border: `2px solid ${C.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 900, color: '#fff', fontFamily: font }}>42</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: C.onSurface, fontFamily: font, textTransform: 'uppercase' }}>User_402</div>
                      <div style={{ fontSize: 8, color: C.primary, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase' }}>TOP 4%</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900, color: C.onSurface, fontFamily: font, fontStyle: 'italic' }}>12.4K</span>
                </div>
              </div>
            </div>
            <button style={{ marginTop: 14, padding: '11px', background: C.surfaceLow2, borderRadius: 10, border: `1px solid ${C.outlineV}`, color: C.outline, cursor: 'pointer', fontSize: 9, fontWeight: 800, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ENTER TOURNAMENT HUB
            </button>
          </div>
        </div>
      </div>

      {/* INITIALIZE BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 8px', maxWidth: 1080, margin: '0 auto' }}>
        <button style={{
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

// ── STATUS BAR ──
const StatusBar = () => (
  <footer style={{ height: 32, background: C.surfaceLow2, borderTop: `1px solid ${C.outlineV}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.secondary, boxShadow: `0 0 6px ${C.secondary}` }} />
        <span style={{ fontSize: 8, fontWeight: 800, color: C.secondary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase' }}>NEURAL LINK ONLINE</span>
      </div>
      {[['STATUS','OPTIMAL'],['ENCRYPTION','ACTIVE'],['LATENCY','12MS']].map(([k,v]) => (
        <span key={k} style={{ fontSize: 8, fontWeight: 700, color: C.outlineV, fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}: <span style={{ color: C.outline }}>{v}</span></span>
      ))}
    </div>
    <span style={{ fontSize: 8, fontWeight: 700, color: C.outlineV, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase' }}>© 2026 NEURAL SECT</span>
  </footer>
);

// ── ROOT APP ──
export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=Manrope:wght@400;500;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.bg}; }
        ::-webkit-scrollbar { width: 4px; background: ${C.surfaceLow2}; }
        ::-webkit-scrollbar-thumb { background: ${C.outlineV}; border-radius: 4px; }
        button:hover { filter: brightness(1.12); }
      `}</style>
      <div style={{ display: 'flex', width: '100vw', height: '100vh', background: C.bg, overflow: 'hidden', fontFamily: font }}>
        <Sidebar active={activeNav} setActive={setActiveNav} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <TopNav />
          <DashboardScreen />
          <StatusBar />
        </div>
      </div>
    </>
  );
}
