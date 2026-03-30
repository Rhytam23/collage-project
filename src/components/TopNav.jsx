import React from 'react';
import { C, font, fontBody } from '../constants/theme';
import { Avatar } from './Avatar';
import { Settings, Bell } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const TopNav = () => {
  const navigate = useNavigate();
  const { profile } = useAppContext();

  return (
    <header style={{
      height: 64, background: C.surfaceLow, borderBottom: `1px solid ${C.outlineV}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', flexShrink: 0, zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: C.primary, fontFamily: font, letterSpacing: '-0.04em', margin: 0 }}>Level Up AI</h1>
        <nav style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Cognitive Path', path: '/path' },
            { label: 'Leaderboard', path: '/dashboard' }, 
            { label: 'Arena', path: '/arena' },
          ].map((item) => (
            <NavLink 
              key={item.label} 
              to={item.path}
              style={({ isActive }) => ({
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontBody,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                color: isActive ? C.onSurface : C.outline,
                borderBottom: isActive ? `2px solid ${C.primaryC}` : '2px solid transparent',
                padding: '22px 0', transition: 'color 0.15s',
                textDecoration: 'none',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: C.secondary, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>LEVEL {profile.level}</div>
          <div style={{ width: 96, height: 3, background: C.surfaceHiH, borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${(profile.xp % 1000) / 10}%`, height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: 999, boxShadow: '0 0 8px rgba(236,72,153,0.6)' }} />
          </div>
        </div>
        <button onClick={() => navigate('/settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.outline }}><Settings size={16}/></button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.outline }}><Bell size={16}/></button>
        <Avatar seed="Felix" size={32} />
      </div>
    </header>
  );
};

export default TopNav;
