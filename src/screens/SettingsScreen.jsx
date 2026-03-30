import React, { useState } from 'react';
import { C, font, fontBody } from '../constants/theme';
import { Avatar } from '../components/Avatar';
import { LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SettingsScreen = () => {
  const { logout, profile } = useAppContext();
  const [prefs, setPrefs] = useState({ darkMode: true, sound: true, notifications: false, aiDifficulty: true });
  const [difficulty, setDifficulty] = useState(2); // 1=Easy, 2=Medium, 3=Hard
  const [dailyGoal, setDailyGoal] = useState(20);

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: 40, height: 22, borderRadius: 999, background: value ? C.primaryC : C.surfaceHiH, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', boxShadow: value ? `0 0 10px rgba(79,70,229,0.4)` : 'none' }}>
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: value ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.outlineV}`, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.outlineV}`, fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ padding: '8px 0' }}>{children}</div>
    </div>
  );

  const Row = ({ label, sub, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.onSurface, fontFamily: fontBody }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: C.outline, fontFamily: fontBody, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.03em', margin: 0 }}>Settings</h2>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.outline, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>Customize your neural experience</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        {/* LEFT COLUMN */}
        <div style={{ minWidth: 0 }}>
          {/* PROFILE */}
          <Section title="⚙ Profile">
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar seed={profile.seed || "Felix"} size={56} border={C.primaryC} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <input defaultValue={profile.name} style={{ fontSize: 16, fontWeight: 800, color: C.onSurface, fontFamily: font, background: 'none', border: 'none', outline: 'none', display: 'block', marginBottom: 4, width: '100%' }} />
                <input defaultValue="user402@levelupai.dev" style={{ fontSize: 11, color: C.outline, fontFamily: fontBody, background: 'none', border: 'none', outline: 'none', display: 'block', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ fontSize: 8, fontWeight: 800, background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, color: '#fff', padding: '4px 10px', borderRadius: 999, fontFamily: fontBody, letterSpacing: '0.1em', boxShadow: `0 4px 10px rgba(79,70,229,0.3)` }}>LEVEL {profile.level}</span>
                <button 
                  onClick={logout}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: C.secondary, fontSize: 8, fontWeight: 800, cursor: 'pointer', fontFamily: fontBody, letterSpacing: '0.1em', padding: 0 }}
                >
                  <LogOut size={10} /> DISCONNECT
                </button>
              </div>
            </div>
          </Section>

          {/* PREFERENCES */}
          <Section title="🎛 Preferences">
            {Object.entries({ 'Dark Mode': 'darkMode', 'Sound Effects': 'sound', 'Notifications': 'notifications', 'AI Difficulty Auto-Adjust': 'aiDifficulty' }).map(([label, key]) => (
              <Row key={key} label={label} right={<Toggle value={prefs[key]} onChange={v => setPrefs(p => ({ ...p, [key]: v }))} />} />
            ))}
          </Section>

          {/* COGNITIVE SETTINGS */}
          <Section title="🧠 Cognitive Settings">
            <Row
              label="Difficulty Level"
              sub={['Easy','Medium','Hard'][difficulty - 1]}
              right={
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Easy','Med','Hard'].map((l, i) => (
                    <button key={l} onClick={() => setDifficulty(i + 1)} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 9, fontWeight: 800, fontFamily: fontBody, background: difficulty === i + 1 ? C.primaryC : C.surfaceHi, color: difficulty === i + 1 ? '#fff' : C.outline }}>{l}</button>
                  ))}
                </div>
              }
            />
            <Row
              label="Daily Goal"
              sub="Questions per day"
              right={
                <div style={{ display: 'flex', gap: 6 }}>
                  {[10, 20, 30].map(g => (
                    <button key={g} onClick={() => setDailyGoal(g)} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 9, fontWeight: 800, fontFamily: fontBody, background: dailyGoal === g ? C.primaryC : C.surfaceHi, color: dailyGoal === g ? '#fff' : C.outline }}>{g}</button>
                  ))}
                </div>
              }
            />
            <Row label="Pomodoro Timer" sub="25 min study sessions" right={<Toggle value={true} onChange={() => {}} />} />
          </Section>

          {/* DANGER ZONE */}
          <Section title="⚠ Danger Zone">
            <Row
              label="Reset Progress"
              sub="Clears XP, streaks and path history"
              right={<button style={{ padding: '7px 14px', background: `rgba(239,68,68,0.1)`, border: `1px solid rgba(239,68,68,0.25)`, borderRadius: 10, color: '#ef4444', fontWeight: 800, fontSize: 10, fontFamily: fontBody, cursor: 'pointer' }}>RESET</button>}
            />
            <Row
              label="Delete Account"
              sub="This action is irreversible"
              right={<button style={{ padding: '7px 14px', background: `rgba(239,68,68,0.15)`, border: `1px solid rgba(239,68,68,0.35)`, borderRadius: 10, color: '#ef4444', fontWeight: 800, fontSize: 10, fontFamily: fontBody, cursor: 'pointer' }}>DELETE</button>}
            />
          </Section>

          <button style={{ width: '100%', padding: '14px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, border: 'none', borderRadius: 14, color: '#fff', fontWeight: 900, fontSize: 13, fontFamily: font, cursor: 'pointer', letterSpacing: '0.05em', boxShadow: `0 8px 24px rgba(79,70,229,0.4)` }}>SAVE CHANGES</button>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* NEURAL SYNC */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '18px', border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, #22c55e, ${C.primaryC})` }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: '#22c55e', fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>⚡ NEURAL SYNC STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: C.onSurface, fontFamily: font }}>CONNECTED</span>
            </div>
            <div style={{ fontSize: 10, color: C.outline, fontFamily: fontBody, marginBottom: 12 }}>Last sync: 2 minutes ago</div>
            <button style={{ width: '100%', padding: '8px', background: C.surfaceLow, border: `1px solid ${C.outlineV}`, borderRadius: 10, color: C.onSurface, fontWeight: 700, fontSize: 9, fontFamily: fontBody, cursor: 'pointer' }}>SYNC NOW</button>
          </div>

          {/* ACHIEVEMENT SUMMARY */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '18px', border: `1px solid ${C.outlineV}` }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>🏆 ACHIEVEMENT SUMMARY</div>
            {[['Total XP','12,450 pts'], ['Global Rank','#42'], ['Current Streak','14 Days'], ['Badges Earned','7']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.outlineV}` }}>
                <span style={{ fontSize: 10, color: C.outline, fontFamily: fontBody }}>{k}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: C.onSurface, fontFamily: font }}>{v}</span>
              </div>
            ))}
          </div>

          {/* PRIVACY */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '18px', border: `1px solid ${C.outlineV}` }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>🔒 PRIVACY & DATA</div>
            <button style={{ width: '100%', padding: '9px', background: C.surfaceLow, border: `1px solid ${C.outlineV}`, borderRadius: 10, color: C.onSurface, fontWeight: 700, fontSize: 10, fontFamily: fontBody, cursor: 'pointer', marginBottom: 8 }}>EXPORT MY DATA</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: C.outline, fontFamily: fontBody }}>Analytics Sharing</span>
              <div style={{ width: 32, height: 18, borderRadius: 999, background: C.surfaceHiH, position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.outline, position: 'absolute', top: 3, left: 3 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
