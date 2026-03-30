import React, { useState } from 'react';
import { 
  LayoutDashboard, Share2, Database, Settings, Zap, 
  CircleCheck, Bell, ArrowRight, Cpu, Brain, Trophy,
  Flame, Target, TrendingUp
} from 'lucide-react';

const Avatar = ({ seed, size = 36 }) => (
  <div
    style={{
      width: size, height: size, minWidth: size, minHeight: size,
      borderRadius: 10,
      backgroundImage: `url(https://api.dicebear.com/7.x/bottts/svg?seed=${seed})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(255,255,255,0.1)',
      flexShrink: 0,
    }}
  />
);

const RankBadge = ({ rank }) => {
  const colors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
  return (
    <span style={{
      position: 'absolute', bottom: -4, right: -4,
      width: 16, height: 16, borderRadius: '50%',
      background: colors[rank] || '#6366f1',
      border: '2px solid #fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 8, fontWeight: 900, color: rank === 1 ? '#000' : '#fff',
    }}>{rank}</span>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('overview');

  const navItems = [
    { id: 'overview', icon: <LayoutDashboard size={16} />, label: 'OVERVIEW' },
    { id: 'links', icon: <Share2 size={16} />, label: 'NEURAL LINKS' },
    { id: 'kb', icon: <Database size={16} />, label: 'KNOWLEDGE BASE' },
    { id: 'settings', icon: <Settings size={16} />, label: 'SETTINGS' },
  ];

  const leaderboard = [
    { rank: 1, seed: 'entity01', name: 'Neural_Entity_01', role: 'Elite Architect', xp: '24.8K', color: '#FFD700' },
    { rank: 2, seed: 'quantum', name: 'QuantumLeap', role: 'Elite Pulse', xp: '21.2K', color: '#C084FC' },
    { rank: 3, seed: 'biosys', name: 'Bio_System', role: 'Data Weaver', xp: '18.5K', color: '#60A5FA' },
  ];

  const pathItems = [
    { id: '01', title: 'Advanced Calculus Optimization', sub: 'Completed 4 hours ago • +450 XP', status: 'done' },
    { id: '02', title: 'Neural Network Weight Functions', sub: 'CURRENT OBJECTIVE', status: 'active' },
    { id: '03', title: 'Quantum Probability Theory', sub: 'Locked: Requires Level 6', status: 'locked' },
  ];

  return (
    <div style={{
      display: 'flex', width: '100vw', height: '100vh',
      background: '#F0F2F5', fontFamily: "'Inter', system-ui, sans-serif",
      overflow: 'hidden', color: '#1A1C21',
    }}>
      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 240, minWidth: 240, background: '#0F1116',
        display: 'flex', flexDirection: 'column', padding: '24px 16px',
        borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', marginBottom: 32 }}>
          <div style={{
            width: 36, height: 36, background: '#4f46e5', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(79,70,229,0.4)', flexShrink: 0,
          }}>
            <Cpu size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Neural</div>
            <div style={{ fontSize: 9, color: '#555', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>Rank: Elite</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: activeNav === item.id ? 'rgba(79,70,229,0.12)' : 'transparent',
                color: activeNav === item.id ? '#818cf8' : '#555',
                borderRight: activeNav === item.id ? '3px solid #4f46e5' : '3px solid transparent',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                transition: 'all 0.15s', textAlign: 'left', width: '100%',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* System Load */}
        <div style={{ padding: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>SYSTEM LOAD</div>
          <div style={{ height: 4, background: 'rgba(0,0,0,0.4)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '34%', height: '100%', background: '#4f46e5', borderRadius: 999 }} />
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

        {/* TOP NAV */}
        <header style={{
          height: 68, background: '#fff', borderBottom: '1px solid #e8eaed',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', flexShrink: 0, zIndex: 5,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#4f46e5', letterSpacing: '-0.04em', margin: 0 }}>Level Up AI</h1>
            <nav style={{ display: 'flex', gap: 24 }}>
              {['Dashboard', 'Cognitive Path', 'Leaderboard', 'Arena'].map((tab, i) => (
                <button key={tab} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
                  color: i === 0 ? '#1A1C21' : '#94a3b8',
                  borderBottom: i === 0 ? '2px solid #4f46e5' : '2px solid transparent',
                  padding: '24px 0', transition: 'color 0.15s',
                }}>{tab}</button>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#ec4899', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>LEVEL 5</div>
              <div style={{ width: 100, height: 4, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#ec4899', borderRadius: 999 }} />
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><Settings size={18} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><Bell size={18} /></button>
            <div style={{ position: 'relative' }}>
              <Avatar seed="Felix" size={36} />
            </div>
          </div>
        </header>

        {/* DASHBOARD GRID */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, maxWidth: 1100, margin: '0 auto', height: '100%' }}>

            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>

              {/* LEARNING MOMENTUM */}
              <div style={{
                background: '#2D2F36', borderRadius: 24, padding: '28px 28px 24px',
                position: 'relative', overflow: 'hidden', flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', top: 20, right: 20, padding: 10,
                  background: 'rgba(255,255,255,0.05)', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <Zap size={22} color="#818cf8" />
                </div>
                <div style={{ fontSize: 9, fontWeight: 800, color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>CURRENT FOCUS</div>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '0 0 20px', letterSpacing: '-0.02em' }}>Learning Momentum</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                  {[
                    { icon: <Flame size={14} />, label: 'DAILY STREAK', val: '14', unit: 'DAYS' },
                    { icon: <Target size={14} />, label: 'CONCEPTS', val: '84', unit: 'NEW' },
                    { icon: <TrendingUp size={14} />, label: 'EFFICIENCY', val: '92', unit: '%' },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      background: 'rgba(0,0,0,0.2)', borderRadius: 16, padding: '16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <span style={{ color: '#818cf8' }}>{stat.icon}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                        <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.val}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>{stat.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COGNITIVE PATH */}
              <div style={{
                background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #e8eaed',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)', flex: 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, background: '#eef2ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#4f46e5', flexShrink: 0 }}>Σ</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: '#1A1C21', letterSpacing: '-0.02em' }}>Cognitive Path: Mathematics</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Neural Synthesis Stage 4</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em', textTransform: 'uppercase' }}>VIEW ALL NODES</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {pathItems.map(item => (
                    <div key={item.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 16px', borderRadius: 16, border: '1px solid transparent',
                      background: item.status === 'active' ? '#2D2F36' : item.status === 'locked' ? 'transparent' : '#f8fafc',
                      borderColor: item.status === 'active' ? 'transparent' : item.status === 'locked' ? '#e8eaed' : '#e8eaed',
                      opacity: item.status === 'locked' ? 0.5 : 1,
                      transition: 'transform 0.15s',
                      transform: item.status === 'active' ? 'scale(1.01)' : 'scale(1)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                        <div style={{
                          width: 36, height: 36, minWidth: 36, borderRadius: 10,
                          background: item.status === 'active' ? '#4f46e5' : '#fff',
                          border: `1px solid ${item.status === 'active' ? 'transparent' : '#e8eaed'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 900,
                          color: item.status === 'active' ? '#fff' : '#94a3b8',
                        }}>{item.id}</div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: item.status === 'active' ? '#fff' : '#1A1C21', letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: item.status === 'active' ? '#818cf8' : '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{item.sub}</div>
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, marginLeft: 12 }}>
                        {item.status === 'done'
                          ? <CircleCheck size={18} color="#ec4899" />
                          : item.status === 'active'
                            ? <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 8, fontWeight: 900, color: '#ec4899', letterSpacing: '0.1em' }}>BOOST ACTIVE</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>2.5× MULT</div>
                              </div>
                            : <ArrowRight size={14} color="#cbd5e1" />
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – LEADERBOARD */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{
                background: '#4B4F5A', borderRadius: 24, padding: '22px 20px',
                display: 'flex', flexDirection: 'column', gap: 0, height: '100%',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Trophy size={16} color="#FFD700" />
                    <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>Leaderboard</span>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 800, background: 'rgba(0,0,0,0.35)', color: '#94a3b8', padding: '4px 8px', borderRadius: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>GLOBAL</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {leaderboard.map(user => (
                    <div key={user.name} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px', background: 'rgba(0,0,0,0.2)', borderRadius: 16,
                      border: '1px solid rgba(255,255,255,0.05)', gap: 10,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            border: `2px solid ${user.color}`,
                            overflow: 'hidden', padding: 2, background: 'rgba(255,255,255,0.05)',
                            backgroundImage: `url(https://api.dicebear.com/7.x/bottts/svg?seed=${user.seed})`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                          }} />
                          <RankBadge rank={user.rank} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.05em', textTransform: 'uppercase', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.name}</div>
                          <div style={{ fontSize: 8, color: '#64748b', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{user.role}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#818cf8', fontStyle: 'italic', flexShrink: 0 }}>{user.xp}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, marginTop: 4 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>YOUR STANDING</div>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: 16,
                      border: '1px solid rgba(255,255,255,0.12)', gap: 10,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            border: '2px solid #4f46e5',
                            backgroundImage: `url(https://api.dicebear.com/7.x/bottts/svg?seed=Felix)`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                          }} />
                          <span style={{
                            position: 'absolute', bottom: -4, right: -4,
                            width: 16, height: 16, borderRadius: '50%',
                            background: '#4f46e5', border: '2px solid #fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 7, fontWeight: 900, color: '#fff',
                          }}>42</span>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>You (User_402)</div>
                          <div style={{ fontSize: 8, color: '#818cf8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Top 4% Global</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#fff', fontStyle: 'italic', flexShrink: 0 }}>12.4K</span>
                    </div>
                  </div>
                </div>

                <button style={{
                  marginTop: 16, padding: '12px', background: '#0F1116', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)', color: '#64748b', cursor: 'pointer',
                  fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                  transition: 'color 0.15s',
                }}>ENTER TOURNAMENT HUB</button>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTION BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 16px', maxWidth: 1100, margin: '0 auto' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 40px', background: '#0F1116', color: '#fff',
              borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              fontSize: 14, fontWeight: 900, letterSpacing: '0.02em', textTransform: 'uppercase',
              transition: 'transform 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Brain size={20} color="#818cf8" />
              INITIALIZE TEST ARENA
              <ArrowRight size={20} color="#ec4899" />
            </button>
          </div>
        </div>

        {/* STATUS FOOTER */}
        <footer style={{
          height: 36, background: '#0F1116', borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 8px #ec4899', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 8, fontWeight: 800, color: '#ec4899', letterSpacing: '0.2em', textTransform: 'uppercase' }}>NEURAL LINK ONLINE</span>
            </div>
            {[['SYSTEM', 'OPTIMAL'], ['ENCRYPTION', 'ACTIVE'], ['LATENCY', '12MS']].map(([k, v]) => (
              <span key={k} style={{ fontSize: 8, fontWeight: 700, color: '#374151', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {k}: <span style={{ color: '#6b7280' }}>{v}</span>
              </span>
            ))}
          </div>
          <span style={{ fontSize: 8, fontWeight: 700, color: '#374151', letterSpacing: '0.2em', textTransform: 'uppercase' }}>© 2026 NEURAL SECT ARCHITECTURE</span>
        </footer>
      </div>
    </div>
  );
}
