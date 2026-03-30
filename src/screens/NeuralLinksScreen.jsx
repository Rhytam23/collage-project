import React, { useState } from 'react';
import { C, font, fontBody } from '../constants/theme';
import { Avatar } from '../components/Avatar';
import { UserCheck, Brain, MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const NeuralLinksScreen = () => {
  const { neuralLinks, connectPeer } = useAppContext();
  const [requests, setRequests] = useState([
    { id: 1, seed: 'req01', name: 'Astra_Coder', topic: 'Quantum Computing', msg: 'Hey! I saw your streak on Calculus. Want to co-study Quantum Probability together?' },
    { id: 2, seed: 'req02', name: 'DataPulse_X', topic: 'Machine Learning', msg: 'Your ML path is impressive. I can share my Neural Net notes if you help me with Backprop.' },
  ]);

  const { connections, suggested } = neuralLinks;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
      {/* PAGE HEADER */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.03em', margin: 0 }}>Neural Links</h2>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>Peer-to-peer knowledge connections</p>
      </div>

      {/* ACTIVE CONNECTIONS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <UserCheck size={12}/> ACTIVE CONNECTIONS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {connections.map(u => (
            <div key={u.name} style={{ background: C.surface, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
              {u.connected && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, #22c55e, ${C.primaryC})` }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <Avatar seed={u.seed} size={40} border={u.connected ? '#22c55e' : C.outlineV} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{u.name}</div>
                  <div style={{ fontSize: 9, color: C.outline, fontFamily: fontBody, letterSpacing: '0.1em', marginTop: 2 }}>XP: {u.xp}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, fontWeight: 700, background: `rgba(79,70,229,0.15)`, color: C.primary, padding: '3px 10px', borderRadius: 999, fontFamily: fontBody, letterSpacing: '0.08em' }}>{u.topic}</span>
                {u.connected
                  ? <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} /><span style={{ fontSize: 9, color: '#22c55e', fontWeight: 700, fontFamily: fontBody }}>LINKED</span></div>
                  : <button style={{ fontSize: 9, fontWeight: 800, background: C.primaryC, color: '#fff', border: 'none', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontFamily: fontBody, letterSpacing: '0.08em' }}>CONNECT</button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI SUGGESTED LINKS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Brain size={12}/> AI SUGGESTED LINKS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {suggested.map(u => (
            <div key={u.name} style={{ background: C.surface, borderRadius: 16, padding: '18px 16px', border: `1px solid ${C.outlineV}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Avatar seed={u.seed} size={44} border={C.primaryC} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{u.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: C.primary, fontFamily: font, marginTop: 2 }}>{u.match}% Match</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                {u.skills.map(s => (
                  <span key={s} style={{ fontSize: 8, fontWeight: 700, background: `rgba(79,70,229,0.12)`, color: C.onSurfV, padding: '2px 8px', borderRadius: 999, fontFamily: fontBody }}>{s}</span>
                ))}
              </div>
              <button 
                onClick={() => connectPeer(u.id)}
                style={{ width: '100%', padding: '9px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, fontSize: 10, fontFamily: font, letterSpacing: '0.1em', cursor: 'pointer', boxShadow: `0 4px 16px rgba(79,70,229,0.35)` }}
              >
                LINK
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* KNOWLEDGE EXCHANGE REQUESTS */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.secondary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <MessageCircle size={12}/> KNOWLEDGE EXCHANGE REQUESTS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map(r => (
            <div key={r.id} style={{ background: C.surface, borderRadius: 16, padding: '16px 20px', border: `1px solid ${C.outlineV}`, display: 'flex', alignItems: 'center', gap: 16, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${C.secondaryC}, ${C.primaryC})` }} />
              <Avatar seed={r.seed} size={40} border={C.secondaryC} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{r.name}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, background: `rgba(170,2,102,0.15)`, color: C.secondary, padding: '2px 8px', borderRadius: 999, fontFamily: fontBody }}>{r.topic}</span>
                </div>
                <p style={{ fontSize: 11, color: C.onSurfV, fontFamily: fontBody, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.msg}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => setRequests(prev => prev.filter(x => x.id !== r.id))} style={{ padding: '8px 16px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, fontSize: 10, fontFamily: font, cursor: 'pointer' }}>ACCEPT</button>
                <button onClick={() => setRequests(prev => prev.filter(x => x.id !== r.id))} style={{ padding: '8px 14px', background: C.surfaceHi, border: `1px solid ${C.outlineV}`, borderRadius: 10, color: C.outline, fontWeight: 700, fontSize: 10, fontFamily: fontBody, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><X size={12}/>DECLINE</button>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: C.outline, fontFamily: fontBody, fontSize: 11 }}>No pending requests 🎉</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeuralLinksScreen;
