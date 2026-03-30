import React, { useMemo, useState } from 'react';
import { C, font, fontBody } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

const filters = ['All', 'Mathematics', 'Neural Networks', 'Quantum Theory', 'Python', 'Statistics', 'ML'];

const difficultyTone = {
  completed: '#22c55e',
  'in-progress': '#f59e0b',
  new: '#60a5fa',
};

const KnowledgeBaseScreen = () => {
  const {
    knowledgeBase,
    recommendations,
    updateKnowledgeProgress,
    toggleFavoriteConcept,
    addRecommendationToPath,
  } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return knowledgeBase.filter(item => {
      const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
      const matchesQuery = !normalizedQuery || [item.title, item.category, item.type].join(' ').toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [knowledgeBase, activeFilter, query]);

  const recentlyStudied = filteredItems.slice(0, 3);
  const savedConcepts = filteredItems.filter(item => item.favorite || item.status !== 'completed');

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.03em', margin: 0 }}>Knowledge Base</h2>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>Your personal AI-curated study library</p>
      </div>

      <div style={{ marginBottom: 20, background: C.surface, borderRadius: 14, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${C.outlineV}` }}>
        <span style={{ fontSize: 16, color: C.outline }}>🔍</span>
        <input
          placeholder="Search topics, notes, concepts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: C.onSurface, fontFamily: fontBody, fontSize: 13 }}
        />
        <span style={{ fontSize: 10, color: C.outline, fontFamily: fontBody }}>{filteredItems.length} results</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '5px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: fontBody, fontSize: 10,
              fontWeight: 700, letterSpacing: '0.08em', background: activeFilter === f ? `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})` : C.surface,
              color: activeFilter === f ? '#fff' : C.outline, boxShadow: activeFilter === f ? `0 4px 12px rgba(79,70,229,0.35)` : 'none'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>📖 RECENTLY STUDIED</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {recentlyStudied.map((item) => (
                <div key={item.id} style={{ background: C.surface, borderRadius: 16, padding: '18px', border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})` }} />
                  <div style={{ fontSize: 28, fontWeight: 900, color: C.primary, fontFamily: font, marginBottom: 8 }}>{item.category.slice(0, 2).toUpperCase()}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.onSurface, fontFamily: font, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 9, color: C.outline, fontFamily: fontBody, marginBottom: 12 }}>Last: {item.lastStudied}</div>
                  <div style={{ height: 4, background: C.surfaceHiH, borderRadius: 999, marginBottom: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${item.progress}%`, height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: 999, boxShadow: `0 0 8px rgba(79,70,229,0.4)` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.primary, fontFamily: font }}>{item.progress}%</span>
                    <button
                      onClick={() => updateKnowledgeProgress(item.id, Math.min(100, item.progress + 15))}
                      style={{ padding: '5px 12px', background: `rgba(79,70,229,0.15)`, border: 'none', borderRadius: 8, color: C.primary, fontWeight: 800, fontSize: 9, fontFamily: fontBody, cursor: 'pointer', letterSpacing: '0.1em' }}
                    >
                      RESUME
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>🔖 SAVED CONCEPTS</div>
            <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.outlineV}`, overflow: 'hidden' }}>
              {savedConcepts.length === 0 && (
                <div style={{ padding: 24, color: C.outline, fontFamily: fontBody }}>No items match your search.</div>
              )}
              {savedConcepts.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', gap: 12, borderBottom: i < savedConcepts.length - 1 ? `1px solid ${C.outlineV}` : 'none', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2.5, background: difficultyTone[item.status], opacity: 0.7 }} />
                  <div style={{ flex: 1, minWidth: 0, paddingLeft: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{item.title}</div>
                    <div style={{ fontSize: 9, color: C.outline, fontFamily: fontBody, marginTop: 4 }}>{item.type} · {item.duration || item.size || 'Ready'}</div>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, background: `rgba(79,70,229,0.12)`, color: C.primary, padding: '2px 8px', borderRadius: 999, fontFamily: fontBody, flexShrink: 0 }}>{item.category}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, background: `${difficultyTone[item.status]}22`, color: difficultyTone[item.status], padding: '2px 8px', borderRadius: 999, fontFamily: fontBody, flexShrink: 0 }}>{item.status}</span>
                  <button onClick={() => toggleFavoriteConcept(item.id)} style={{ color: item.favorite ? '#ec4899' : C.outline, fontSize: 14, flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer' }}>♥</button>
                  <button
                    onClick={() => updateKnowledgeProgress(item.id, Math.min(100, item.progress + 20))}
                    style={{ padding: '5px 12px', background: `rgba(79,70,229,0.15)`, border: 'none', borderRadius: 8, color: C.primary, fontWeight: 800, fontSize: 9, fontFamily: fontBody, cursor: 'pointer', letterSpacing: '0.1em', flexShrink: 0 }}
                  >
                    REVIEW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: C.surface, borderRadius: 16, padding: '20px', border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, #FFD700, ${C.primaryC})` }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>🧠 AI STUDY RECOMMENDATIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recommendations.map((r) => (
                <div key={r.id} style={{ background: C.surfaceLow, borderRadius: 12, padding: '14px', border: `1px solid ${C.outlineV}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{r.title}</div>
                    <span style={{ fontSize: 10, fontWeight: 900, color: C.primary, fontFamily: font }}>{r.match}%</span>
                  </div>
                  <div style={{ fontSize: 10, color: C.outline, fontFamily: fontBody, marginBottom: 10 }}>{r.desc}</div>
                  <button
                    onClick={() => addRecommendationToPath(r.id)}
                    style={{ width: '100%', padding: '8px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 800, fontSize: 9, fontFamily: fontBody, cursor: 'pointer', letterSpacing: '0.1em', boxShadow: `0 4px 12px rgba(79,70,229,0.3)` }}
                  >
                    ADD TO PATH
                  </button>
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
