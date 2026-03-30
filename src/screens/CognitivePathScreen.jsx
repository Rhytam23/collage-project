import React from 'react';
import { ArrowRight } from 'lucide-react';
import { C, font, fontBody } from '../constants/theme';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CognitivePathScreen = () => {
  const navigate = useNavigate();
  const { profile, learningPath } = useAppContext();

  // Map context model to local UI nodes for compatibility
  const nodes = learningPath.map(node => ({
    id: parseInt(node.id),
    title: node.title,
    xp: node.id === '01' ? 450 : node.id === '02' ? 600 : 750,
    status: node.status === 'done' ? 'complete' : node.id === '03' && profile.level < 6 ? 'locked' : node.status,
    progress: node.status === 'active' ? 67 : 0,
    time: node.id === '01' ? '2 weeks' : '3 days left',
    boost: '2.5x'
  }));

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
      {/* PAGE HEADER */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.03em', margin: 0 }}>Cognitive Path</h2>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>Your personalized AI learning journey</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>
        {/* ROADMAP COLUMN */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 24, paddingLeft: 40, borderLeft: `2px dashed ${C.outlineV}` }}>
          {nodes.map(node => {
            const isActive = node.status === 'active';
            const isComplete = node.status === 'complete';
            const isLocked = node.status === 'locked';

            return (
              <div key={node.id} style={{
                position: 'relative',
                background: isActive ? `rgba(79,70,229,0.1)` : isComplete ? C.surfaceLow : C.surfaceLow2,
                border: `1px solid ${isActive ? C.primaryC : C.outlineV}`,
                borderRadius: 20,
                padding: '24px 28px',
                opacity: isLocked ? 0.4 : 1,
                boxShadow: isActive ? `0 0 30px rgba(79,70,229,0.2)` : 'none',
              }}>
                {/* TIMELINE DOT */}
                <div style={{
                  position: 'absolute', left: -52, top: '50%', transform: 'translateY(-50%)',
                  width: 20, height: 20, borderRadius: '50%', background: isComplete ? '#22c55e' : isActive ? C.primaryC : C.surfaceHiH,
                  border: `4px solid ${C.bg}`, boxShadow: isActive ? `0 0 10px ${C.primaryC}` : 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: isComplete ? '#22c55e' : isActive ? C.primary : C.outline, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {isComplete ? 'STAGE ' + node.id + ' COMPLETE' : isActive ? 'STAGE ' + node.id + ' ACTIVE' : 'STAGE ' + node.id + ' LOCKED'}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: C.onSurface, fontFamily: font, margin: '0 0 8px' }}>{node.title}</h3>
                    {isComplete && <div style={{ fontSize: 11, color: C.onSurfV, fontFamily: fontBody }}>Finished in {node.time} · {node.xp} XP earned</div>}
                    {isActive && (
                      <div style={{ width: 280, marginTop: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: fontBody }}>{node.progress}% Progress</span>
                          <span style={{ fontSize: 11, fontWeight: 800, color: C.outline }}>{node.time}</span>
                        </div>
                        <div style={{ height: 6, background: C.surfaceHiH, borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ width: node.progress + '%', height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})` }} />
                        </div>
                        <button 
                          onClick={() => navigate('/arena')}
                          style={{ 
                          marginTop: 20, padding: '10px 24px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`,
                          border: 'none', borderRadius: 12, color: '#fff', fontWeight: 900, fontSize: 11, fontFamily: font, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.05em', boxShadow: `0 4px 15px rgba(236,72,153,0.3)`
                        }}>
                          RESUME SESSION <ArrowRight size={14}/>
                        </button>
                      </div>
                    )}
                  </div>
                  {isActive && <div style={{ background: 'rgba(79,70,229,0.2)', padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 900, color: C.primary, fontFamily: fontBody }}>BOOST {node.boost}</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* STATS SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: C.surface, borderRadius: 20, padding: 24, border: `1px solid ${C.outlineV}` }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>PATH STATS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Completion', val: '48%', unit: '' },
                { label: 'Total Path XP', val: '1,250', unit: '' },
                { label: 'Remaining Nodes', val: '12', unit: '' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 10, color: C.outline, fontFamily: fontBody, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.onSurface, fontFamily: font }}>{s.val}{s.unit}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: C.surface, borderRadius: 20, padding: 24, border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})` }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: C.secondary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>AI ADJUSTMENT</div>
            <p style={{ fontSize: 11, color: C.onSurfV, fontFamily: fontBody, lineHeight: 1.5, margin: '0 0 16px' }}>Your pace suggests you can handle deeper conceptual layers.</p>
            <button style={{ width: '100%', padding: '10px', background: C.surfaceHi, border: `1px solid ${C.outlineV}`, borderRadius: 12, color: C.onSurface, fontWeight: 800, fontSize: 10, fontFamily: fontBody, cursor: 'pointer' }}>
              OPTIMIZE DIFFICULTY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitivePathScreen;
