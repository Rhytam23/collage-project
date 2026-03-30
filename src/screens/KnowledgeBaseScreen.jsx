import React, { useState } from 'react';
import { C, font, fontBody } from '../constants/theme';

const KnowledgeBaseScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All','Mathematics','Neural Networks','Quantum Theory','Python','Statistics','ML'];
  const topics = [
    { icon: '∫', title: 'Advanced Calculus', pct: 87, date: '2 hours ago' },
    { icon: 'Pr', title: 'Probability Theory', pct: 64, date: 'Yesterday' },
    { icon: '⊗', title: 'Linear Algebra', pct: 42, date: '3 days ago' },
  ];
  const concepts = [
    { name: 'Gradient Descent', topic: 'ML', difficulty: 'Hard', diffColor: '#ef4444' },
    { name: "Bayes' Theorem", topic: 'Statistics', difficulty: 'Medium', diffColor: '#f59e0b' },
    { name: 'Eigenvalues & Vectors', topic: 'Linear Algebra', difficulty: 'Hard', diffColor: '#ef4444' },
    { name: 'Fourier Transform', topic: 'Mathematics', difficulty: 'Medium', diffColor: '#f59e0b' },
    { name: 'Markov Chains', topic: 'Probability Theory', difficulty: 'Easy', diffColor: '#22c55e' },
  ];
  const aiRecs = [
    { title: 'Backpropagation', match: 96, desc: 'Based on your Neural Network progress' },
    { title: 'Stochastic Calculus', match: 91, desc: 'Bridges your Calculus + Probability gaps' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.03em', margin: 0 }}>Knowledge Base</h2>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>Your personal AI-curated study library</p>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: 20, background: C.surface, borderRadius: 14, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${C.outlineV}` }}>
        <span style={{ fontSize: 16, color: C.outline }}>🔍</span>
        <input placeholder="Search topics, notes, concepts..." style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: C.onSurface, fontFamily: fontBody, fontSize: 13 }} />
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '5px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: fontBody, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', background: activeFilter === f ? `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})` : C.surface, color: activeFilter === f ? '#fff' : C.outline, boxShadow: activeFilter === f ? `0 4px 12px rgba(79,70,229,0.35)` : 'none' }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {/* RECENTLY STUDIED */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>📖 RECENTLY STUDIED</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {topics.map(t => (
                <div key={t.title} style={{ background: C.surface, borderRadius: 16, padding: '18px', border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})` }} />
                  <div style={{ fontSize: 28, fontWeight: 900, color: C.primary, fontFamily: font, marginBottom: 8 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.onSurface, fontFamily: font, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 9, color: C.outline, fontFamily: fontBody, marginBottom: 12 }}>Last: {t.date}</div>
                  <div style={{ height: 4, background: C.surfaceHiH, borderRadius: 999, marginBottom: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${t.pct}%`, height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: 999, boxShadow: `0 0 8px rgba(79,70,229,0.4)` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.primary, fontFamily: font }}>{t.pct}%</span>
                    <button style={{ padding: '5px 12px', background: `rgba(79,70,229,0.15)`, border: 'none', borderRadius: 8, color: C.primary, fontWeight: 800, fontSize: 9, fontFamily: fontBody, cursor: 'pointer', letterSpacing: '0.1em' }}>RESUME</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAVED CONCEPTS */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>🔖 SAVED CONCEPTS</div>
            <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.outlineV}`, overflow: 'hidden' }}>
              {concepts.map((c, i) => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', gap: 12, borderBottom: i < concepts.length - 1 ? `1px solid ${C.outlineV}` : 'none', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2.5, background: c.diffColor, opacity: 0.7 }} />
                  <div style={{ flex: 1, minWidth: 0, paddingLeft: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{c.name}</div>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, background: `rgba(79,70,229,0.12)`, color: C.primary, padding: '2px 8px', borderRadius: 999, fontFamily: fontBody, flexShrink: 0 }}>{c.topic}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, background: `${c.diffColor}22`, color: c.diffColor, padding: '2px 8px', borderRadius: 999, fontFamily: fontBody, flexShrink: 0 }}>{c.difficulty}</span>
                  <span style={{ color: '#ec4899', fontSize: 14, flexShrink: 0 }}>♥</span>
                  <button style={{ padding: '5px 12px', background: `rgba(79,70,229,0.15)`, border: 'none', borderRadius: 8, color: C.primary, fontWeight: 800, fontSize: 9, fontFamily: fontBody, cursor: 'pointer', letterSpacing: '0.1em', flexShrink: 0 }}>REVIEW</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT – AI RECOMMENDATIONS */}
        <div>
          <div style={{ background: C.surface, borderRadius: 16, padding: '20px', border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, #FFD700, ${C.primaryC})` }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>🧠 AI STUDY RECOMMENDATIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {aiRecs.map(r => (
                <div key={r.title} style={{ background: C.surfaceLow, borderRadius: 12, padding: '14px', border: `1px solid ${C.outlineV}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{r.title}</div>
                    <span style={{ fontSize: 10, fontWeight: 900, color: C.primary, fontFamily: font }}>{r.match}%</span>
                  </div>
                  <div style={{ fontSize: 10, color: C.outline, fontFamily: fontBody, marginBottom: 10 }}>{r.desc}</div>
                  <button style={{ width: '100%', padding: '8px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 800, fontSize: 9, fontFamily: fontBody, cursor: 'pointer', letterSpacing: '0.1em', boxShadow: `0 4px 12px rgba(79,70,229,0.3)` }}>ADD TO PATH</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseScreen;
