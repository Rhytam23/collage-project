import React from 'react';
import { C, font, fontBody } from '../constants/theme';
import { LayoutDashboard, Share2, Database, Settings, Cpu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { profile } = useAppContext();
  const items = [
    { id: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'OVERVIEW' },
    { id: 'path',      icon: <Cpu size={16} />,           label: 'COGNITIVE PATH' },
    { id: 'links',     icon: <Share2 size={16} />,        label: 'NEURAL LINKS' },
    { id: 'kb',        icon: <Database size={16} />,      label: 'KNOWLEDGE BASE' },
    { id: 'settings',  icon: <Settings size={16} />,      label: 'SETTINGS' },
  ];

  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: C.surfaceLow,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 14px',
      borderRight: `1px solid ${C.outlineV}`,
      zIndex: 10,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px', marginBottom: 32 }}>
        <div style={{
          width: 34,
          height: 34,
          background: C.primaryC,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 20px rgba(79,70,229,0.5)',
        }}>
          <Cpu size={18} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Neural L.{profile.level}
          </div>
          <div style={{ fontSize: 9, color: C.outline, fontWeight: 700, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
            Rank: {profile.level > 10 ? 'Architect' : profile.level > 5 ? 'Master' : 'Elite'}
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              background: isActive ? `rgba(79,70,229,0.15)` : 'transparent',
              color: isActive ? C.primary : C.outline,
              borderRight: isActive ? `3px solid ${C.primaryC}` : '3px solid transparent',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: fontBody,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.15s',
              textAlign: 'left',
              width: '100%',
              textDecoration: 'none',
            })}
          >
            {item.icon}
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '14px', background: C.surfaceLow2, borderRadius: 12, border: `1px solid ${C.outlineV}` }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.outline, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
          NEXT EVALUATION
        </div>
        <div style={{ height: 3, background: C.surfaceHiH, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${(profile.xp % 1000) / 10}%`, height: '100%', background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})`, borderRadius: 999 }} />
        </div>
        <div style={{ fontSize: 8, color: C.outline, fontFamily: fontBody, marginTop: 6, letterSpacing: '0.1em' }}>
          {profile.xp % 1000} / 1000 XP
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
